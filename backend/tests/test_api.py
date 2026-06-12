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
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# ---------- Contact ----------
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Alice",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Hello, I'd like to refer a young person.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data

        # GET to verify persistence
        get_r = client.get(f"{API}/contact")
        assert get_r.status_code == 200
        msgs = get_r.json()
        assert any(m.get("id") == data["id"] and m.get("email") == payload["email"] for m in msgs)

    def test_create_contact_invalid_email(self, client):
        payload = {"name": "TEST_Bob", "email": "not-an-email", "message": "test"}
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_field(self, client):
        r = client.post(f"{API}/contact", json={"name": "x", "email": "a@b.com"})
        assert r.status_code == 422

    def test_get_contact_list(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid(self, client):
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

    def test_subscribe_invalid_email(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "bad"})
        assert r.status_code == 422

    def test_subscribe_missing_email(self, client):
        r = client.post(f"{API}/newsletter", json={})
        assert r.status_code == 422
