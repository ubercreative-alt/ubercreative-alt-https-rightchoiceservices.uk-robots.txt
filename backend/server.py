from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()


# Health check endpoints (root-level, no /api prefix) for Kubernetes probes
@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/healthz")
async def healthz():
    return {"status": "healthy"}


# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ---------- Email (Emergent managed Resend) ----------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"  # constant, survives deploy
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "JK PRO Builders")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not set; skipping email send")
        return None
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str


class ContactEnquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    service: str = ""
    message: str
    status: str = "new"
    created_at: str = Field(default_factory=now_iso)


class SubscribeCreate(BaseModel):
    email: EmailStr


class Subscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=now_iso)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "JK PRO Builders API"}


@api_router.get("/health")
async def api_health():
    return {"status": "healthy"}


@api_router.post("/contact", response_model=ContactEnquiry)
async def create_contact(payload: ContactCreate):
    enquiry = ContactEnquiry(**payload.dict())
    await db.enquiries.insert_one(enquiry.dict())
    # Notify the business inbox (non-fatal: enquiry is saved regardless of email outcome)
    if OWNER_EMAIL:
        try:
            subject = f"New enquiry from {enquiry.name} - JK PRO Builders"
            html = (
                '<table role="presentation" width="100%" style="background:#faf7f2;padding:24px">'
                '<tr><td style="font-family:Arial,sans-serif;color:#1f2124;max-width:600px;margin:0 auto">'
                '<div style="background:#2b0606;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">'
                '<h2 style="margin:0;font-family:Arial,sans-serif">New Quote / Contact Enquiry</h2>'
                '<p style="margin:6px 0 0;color:#e8cccc">JK PRO Builders website</p></div>'
                '<div style="background:#fff;padding:24px;border-radius:0 0 12px 12px">'
                f'<p><strong>Name:</strong> {escape(enquiry.name)}</p>'
                f'<p><strong>Email:</strong> {escape(enquiry.email)}</p>'
                f'<p><strong>Phone:</strong> {escape(enquiry.phone or "-")}</p>'
                f'<p><strong>Service:</strong> {escape(enquiry.service or "-")}</p>'
                f'<p><strong>Message:</strong><br>{escape(enquiry.message)}</p>'
                f'<p style="color:#7f8995;font-size:13px;margin-top:16px">Received: {escape(enquiry.created_at)}</p>'
                '<p style="font-size:12px;color:#888;margin-top:16px">Sent automatically by the JK PRO Builders website. '
                'The customer\'s email and phone number are shown above so you can get back to them.</p>'
                '</div></td></tr></table>'
            )
            await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        except Exception as e:
            logger.error(f"Contact notification email failed: {e}")
    return enquiry


@api_router.get("/contact", response_model=List[ContactEnquiry])
async def list_contacts():
    projection = {"_id": 0, "id": 1, "name": 1, "email": 1, "phone": 1, "service": 1, "message": 1, "status": 1, "created_at": 1}
    items = await db.enquiries.find({}, projection).sort("created_at", -1).limit(100).to_list(100)
    return [ContactEnquiry(**it) for it in items]


@api_router.patch("/contact/{enquiry_id}/read")
async def mark_read(enquiry_id: str):
    res = await db.enquiries.update_one({"id": enquiry_id}, {"$set": {"status": "read"}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"ok": True, "id": enquiry_id, "status": "read"}


@api_router.delete("/contact/{enquiry_id}")
async def delete_contact(enquiry_id: str):
    res = await db.enquiries.delete_one({"id": enquiry_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"ok": True, "id": enquiry_id}


@api_router.post("/subscribe", response_model=Subscriber)
async def subscribe(payload: SubscribeCreate):
    projection = {"_id": 0, "id": 1, "email": 1, "created_at": 1}
    existing = await db.subscribers.find_one({"email": payload.email}, projection)
    if existing:
        return Subscriber(**existing)
    sub = Subscriber(email=payload.email)
    await db.subscribers.insert_one(sub.dict())
    if OWNER_EMAIL:
        try:
            html = (
                '<table role="presentation" width="100%" style="background:#faf7f2;padding:24px">'
                '<tr><td style="font-family:Arial,sans-serif;color:#1f2124;max-width:600px;margin:0 auto">'
                '<div style="background:#fff;padding:24px;border-radius:12px">'
                '<h2 style="margin:0 0 8px">New Newsletter Subscriber</h2>'
                f'<p><strong>Email:</strong> {escape(sub.email)}</p>'
                f'<p style="color:#7f8995;font-size:13px">Subscribed: {escape(sub.created_at)}</p>'
                '<p style="font-size:12px;color:#888">Sent automatically by the JK PRO Builders website.</p>'
                '</div></td></tr></table>'
            )
            await send_email(to=OWNER_EMAIL, subject="New newsletter subscriber - JK PRO Builders", html=html)
        except Exception as e:
            logger.error(f"Subscribe notification email failed: {e}")
    return sub


@api_router.get("/subscribers", response_model=List[Subscriber])
async def list_subscribers():
    projection = {"_id": 0, "id": 1, "email": 1, "created_at": 1}
    items = await db.subscribers.find({}, projection).sort("created_at", -1).limit(100).to_list(100)
    return [Subscriber(**it) for it in items]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
