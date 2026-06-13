"""Backend API tests for Right Choice Services marketing site.

Covers:
- Health endpoint
- Contact endpoints (POST/GET)
- Newsletter endpoint (idempotency)
- Validation errors
"""
import os
import uuid

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://services-refresh-1.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client() -> requests.Session:
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client: requests.Session) -> None:
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# ---------- Contact ----------
def _contact_payload() -> dict:
    return {
        "name": "TEST_Alice",
        "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
        "message": "Hello, I'd like to refer a young person.",
    }


class TestContact:
    def test_create_contact_returns_fields(self, client: requests.Session) -> None:
        payload = _contact_payload()
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]

    def test_create_contact_generates_id_and_timestamp(self, client: requests.Session) -> None:
        r = client.post(f"{API}/contact", json=_contact_payload())
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert "created_at" in data

    def test_create_contact_is_persisted(self, client: requests.Session) -> None:
        payload = _contact_payload()
        created = client.post(f"{API}/contact", json=payload).json()
        get_r = client.get(f"{API}/contact")
        assert get_r.status_code == 200
        msgs = get_r.json()
        assert any(m.get("id") == created["id"] and m.get("email") == payload["email"] for m in msgs)

    @pytest.mark.parametrize(
        "payload",
        [
            {"name": "TEST_Bob", "email": "not-an-email", "message": "test"},  # invalid email
            {"name": "x", "email": "a@b.com"},  # missing message
        ],
        ids=["invalid_email", "missing_field"],
    )
    def test_create_contact_invalid_payload_rejected(self, client: requests.Session, payload: dict) -> None:
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_get_contact_list(self, client: requests.Session) -> None:
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Referrals ----------
def _referral_payload() -> dict:
    return {
        "name": "TEST_Referrer",
        "email": f"test_ref_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "01992 850277",
        "organisation": "Test Local Authority",
        "service_area": "Essex",
        "details": "Young person, 17, requires supported accommodation from next month.",
        "gdpr_consent": True,
    }


class TestReferrals:
    def test_create_referral_valid(self, client: requests.Session) -> None:
        payload = _referral_payload()
        r = client.post(f"{API}/referrals", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["service_area"] == "Essex"
        assert data["gdpr_consent"]
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0

    def test_create_referral_is_persisted(self, client: requests.Session) -> None:
        created = client.post(f"{API}/referrals", json=_referral_payload()).json()
        r = client.get(f"{API}/referrals")
        assert r.status_code == 200
        assert any(ref.get("id") == created["id"] for ref in r.json())

    def test_optional_fields_default_empty(self, client: requests.Session) -> None:
        payload = _referral_payload()
        del payload["organisation"]
        del payload["service_area"]
        r = client.post(f"{API}/referrals", json=payload)
        assert r.status_code == 200
        assert r.json()["organisation"] == ""
        assert r.json()["service_area"] == ""

    @pytest.mark.parametrize(
        "missing_field",
        ["name", "email", "phone", "details", "gdpr_consent"],
    )
    def test_missing_required_field_rejected(self, client: requests.Session, missing_field: str) -> None:
        payload = _referral_payload()
        del payload[missing_field]
        r = client.post(f"{API}/referrals", json=payload)
        assert r.status_code == 422

    def test_invalid_email_rejected(self, client: requests.Session) -> None:
        payload = _referral_payload()
        payload["email"] = "not-an-email"
        r = client.post(f"{API}/referrals", json=payload)
        assert r.status_code == 422


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid(self, client: requests.Session) -> None:
        email = f"test_news_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{API}/newsletter", json={"email": email})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert "id" in data
        first_id = data["id"]

        # Idempotency - subscribe same email again, should return existing
        r2 = client.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200
        assert r2.json()["id"] == first_id
        assert r2.json()["email"] == email

    def test_subscribe_invalid_email(self, client: requests.Session) -> None:
        r = client.post(f"{API}/newsletter", json={"email": "bad"})
        assert r.status_code == 422

    def test_subscribe_missing_email(self, client: requests.Session) -> None:
        r = client.post(f"{API}/newsletter", json={})
        assert r.status_code == 422
