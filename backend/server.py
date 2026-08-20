from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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
