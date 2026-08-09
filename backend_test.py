#!/usr/bin/env python3
"""
Backend API Test Suite for JK PRO Builders
Tests all contact and subscriber endpoints
"""
import requests
import json
import sys
from pathlib import Path

# Read backend URL from frontend/.env
env_path = Path("/app/frontend/.env")
BACKEND_URL = None
with open(env_path) as f:
    for line in f:
        if line.startswith("REACT_APP_BACKEND_URL="):
            BACKEND_URL = line.split("=", 1)[1].strip()
            break

if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in /app/frontend/.env")
    sys.exit(1)

BASE_URL = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {BASE_URL}\n")

# Test results tracking
tests_passed = 0
tests_failed = 0
test_results = []

def log_test(name, passed, details=""):
    global tests_passed, tests_failed
    if passed:
        tests_passed += 1
        status = "✅ PASS"
    else:
        tests_failed += 1
        status = "❌ FAIL"
    
    result = f"{status}: {name}"
    if details:
        result += f"\n   {details}"
    print(result)
    test_results.append({"name": name, "passed": passed, "details": details})

# Store created IDs for cleanup
created_contact_id = None
created_subscriber_email = None

print("=" * 80)
print("CONTACT ENQUIRY ENDPOINTS TESTING")
print("=" * 80)

# Test 1: POST /api/contact - Create valid contact enquiry
print("\n1️⃣  Testing POST /api/contact (valid data)...")
try:
    payload = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "07872 164 350",
        "service": "Kitchen Remodeling",
        "message": "Please quote my kitchen renovation project."
    }
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        # Validate response structure
        required_fields = ["id", "name", "email", "phone", "service", "message", "status", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_test("POST /api/contact - valid data", False, 
                    f"Missing fields in response: {missing_fields}")
        elif data["status"] != "new":
            log_test("POST /api/contact - valid data", False, 
                    f"Expected status='new', got '{data['status']}'")
        elif data["name"] != payload["name"] or data["email"] != payload["email"]:
            log_test("POST /api/contact - valid data", False, 
                    "Response data doesn't match request payload")
        else:
            created_contact_id = data["id"]
            log_test("POST /api/contact - valid data", True, 
                    f"Created enquiry with id={created_contact_id}, status={data['status']}")
    else:
        log_test("POST /api/contact - valid data", False, 
                f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("POST /api/contact - valid data", False, f"Exception: {str(e)}")

# Test 2: POST /api/contact - Invalid email validation
print("\n2️⃣  Testing POST /api/contact (invalid email - should return 422)...")
try:
    payload = {
        "name": "Test User",
        "email": "not-an-email",
        "message": "Test message"
    }
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        log_test("POST /api/contact - invalid email validation", True, 
                "Correctly rejected invalid email with 422")
    else:
        log_test("POST /api/contact - invalid email validation", False, 
                f"Expected 422, got {response.status_code}")
except Exception as e:
    log_test("POST /api/contact - invalid email validation", False, f"Exception: {str(e)}")

# Test 3: POST /api/contact - Missing required field 'name'
print("\n3️⃣  Testing POST /api/contact (missing 'name' - should return 422)...")
try:
    payload = {
        "email": "test@example.com",
        "message": "Test message"
    }
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        log_test("POST /api/contact - missing 'name' validation", True, 
                "Correctly rejected missing 'name' with 422")
    else:
        log_test("POST /api/contact - missing 'name' validation", False, 
                f"Expected 422, got {response.status_code}")
except Exception as e:
    log_test("POST /api/contact - missing 'name' validation", False, f"Exception: {str(e)}")

# Test 4: POST /api/contact - Missing required field 'message'
print("\n4️⃣  Testing POST /api/contact (missing 'message' - should return 422)...")
try:
    payload = {
        "name": "Test User",
        "email": "test@example.com"
    }
    response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        log_test("POST /api/contact - missing 'message' validation", True, 
                "Correctly rejected missing 'message' with 422")
    else:
        log_test("POST /api/contact - missing 'message' validation", False, 
                f"Expected 422, got {response.status_code}")
except Exception as e:
    log_test("POST /api/contact - missing 'message' validation", False, f"Exception: {str(e)}")

# Test 5: GET /api/contact - List enquiries
print("\n5️⃣  Testing GET /api/contact (list enquiries)...")
try:
    response = requests.get(f"{BASE_URL}/contact", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if not isinstance(data, list):
            log_test("GET /api/contact", False, "Response is not a list")
        elif created_contact_id:
            # Check if our created enquiry is in the list
            found = any(item.get("id") == created_contact_id for item in data)
            if found:
                log_test("GET /api/contact", True, 
                        f"Retrieved {len(data)} enquiries, including our created one")
            else:
                log_test("GET /api/contact", False, 
                        f"Created enquiry (id={created_contact_id}) not found in list")
        else:
            log_test("GET /api/contact", True, f"Retrieved {len(data)} enquiries")
    else:
        log_test("GET /api/contact", False, 
                f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("GET /api/contact", False, f"Exception: {str(e)}")

# Test 6: PATCH /api/contact/{id}/read - Mark as read
print("\n6️⃣  Testing PATCH /api/contact/{id}/read (mark as read)...")
if created_contact_id:
    try:
        response = requests.patch(f"{BASE_URL}/contact/{created_contact_id}/read", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "read" and data.get("id") == created_contact_id:
                log_test("PATCH /api/contact/{id}/read", True, 
                        f"Successfully marked enquiry as read")
            else:
                log_test("PATCH /api/contact/{id}/read", False, 
                        f"Response doesn't confirm status='read': {data}")
        else:
            log_test("PATCH /api/contact/{id}/read", False, 
                    f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("PATCH /api/contact/{id}/read", False, f"Exception: {str(e)}")
else:
    log_test("PATCH /api/contact/{id}/read", False, "Skipped - no contact ID available")

# Test 7: PATCH /api/contact/{id}/read - Non-existent ID (should return 404)
print("\n7️⃣  Testing PATCH /api/contact/{id}/read (non-existent id - should return 404)...")
try:
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = requests.patch(f"{BASE_URL}/contact/{fake_id}/read", timeout=10)
    
    if response.status_code == 404:
        log_test("PATCH /api/contact/{id}/read - non-existent id", True, 
                "Correctly returned 404 for non-existent enquiry")
    else:
        log_test("PATCH /api/contact/{id}/read - non-existent id", False, 
                f"Expected 404, got {response.status_code}")
except Exception as e:
    log_test("PATCH /api/contact/{id}/read - non-existent id", False, f"Exception: {str(e)}")

# Test 8: DELETE /api/contact/{id} - Delete enquiry
print("\n8️⃣  Testing DELETE /api/contact/{id} (delete enquiry)...")
if created_contact_id:
    try:
        response = requests.delete(f"{BASE_URL}/contact/{created_contact_id}", timeout=10)
        
        if response.status_code == 200:
            log_test("DELETE /api/contact/{id}", True, 
                    f"Successfully deleted enquiry {created_contact_id}")
        else:
            log_test("DELETE /api/contact/{id}", False, 
                    f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("DELETE /api/contact/{id}", False, f"Exception: {str(e)}")
else:
    log_test("DELETE /api/contact/{id}", False, "Skipped - no contact ID available")

# Test 9: DELETE /api/contact/{id} - Delete again (should return 404)
print("\n9️⃣  Testing DELETE /api/contact/{id} again (should return 404)...")
if created_contact_id:
    try:
        response = requests.delete(f"{BASE_URL}/contact/{created_contact_id}", timeout=10)
        
        if response.status_code == 404:
            log_test("DELETE /api/contact/{id} - already deleted", True, 
                    "Correctly returned 404 for already deleted enquiry")
        else:
            log_test("DELETE /api/contact/{id} - already deleted", False, 
                    f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_test("DELETE /api/contact/{id} - already deleted", False, f"Exception: {str(e)}")
else:
    log_test("DELETE /api/contact/{id} - already deleted", False, "Skipped - no contact ID available")

# Test 10: GET /api/contact - Verify deletion
print("\n🔟 Testing GET /api/contact (verify deletion)...")
if created_contact_id:
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            found = any(item.get("id") == created_contact_id for item in data)
            if not found:
                log_test("GET /api/contact - verify deletion", True, 
                        "Deleted enquiry no longer appears in list")
            else:
                log_test("GET /api/contact - verify deletion", False, 
                        "Deleted enquiry still appears in list")
        else:
            log_test("GET /api/contact - verify deletion", False, 
                    f"Expected 200, got {response.status_code}")
    except Exception as e:
        log_test("GET /api/contact - verify deletion", False, f"Exception: {str(e)}")
else:
    log_test("GET /api/contact - verify deletion", False, "Skipped - no contact ID available")

print("\n" + "=" * 80)
print("NEWSLETTER SUBSCRIPTION ENDPOINTS TESTING")
print("=" * 80)

# Test 11: POST /api/subscribe - Create subscription
print("\n1️⃣1️⃣  Testing POST /api/subscribe (valid email)...")
try:
    payload = {"email": "subscriber@example.com"}
    response = requests.post(f"{BASE_URL}/subscribe", json=payload, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        required_fields = ["id", "email", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_test("POST /api/subscribe - valid email", False, 
                    f"Missing fields in response: {missing_fields}")
        elif data["email"] != payload["email"]:
            log_test("POST /api/subscribe - valid email", False, 
                    "Response email doesn't match request")
        else:
            created_subscriber_email = data["email"]
            log_test("POST /api/subscribe - valid email", True, 
                    f"Created subscription with id={data['id']}, email={data['email']}")
    else:
        log_test("POST /api/subscribe - valid email", False, 
                f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("POST /api/subscribe - valid email", False, f"Exception: {str(e)}")

# Test 12: POST /api/subscribe - Idempotent (same email again)
print("\n1️⃣2️⃣  Testing POST /api/subscribe (same email - idempotent)...")
try:
    payload = {"email": "subscriber@example.com"}
    response = requests.post(f"{BASE_URL}/subscribe", json=payload, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        # Should return existing subscriber, not create duplicate
        log_test("POST /api/subscribe - idempotent", True, 
                f"Returned existing subscriber (idempotent): {data['email']}")
    else:
        log_test("POST /api/subscribe - idempotent", False, 
                f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("POST /api/subscribe - idempotent", False, f"Exception: {str(e)}")

# Test 13: POST /api/subscribe - Invalid email
print("\n1️⃣3️⃣  Testing POST /api/subscribe (invalid email - should return 422)...")
try:
    payload = {"email": "not-valid-email"}
    response = requests.post(f"{BASE_URL}/subscribe", json=payload, timeout=10)
    
    if response.status_code == 422:
        log_test("POST /api/subscribe - invalid email validation", True, 
                "Correctly rejected invalid email with 422")
    else:
        log_test("POST /api/subscribe - invalid email validation", False, 
                f"Expected 422, got {response.status_code}")
except Exception as e:
    log_test("POST /api/subscribe - invalid email validation", False, f"Exception: {str(e)}")

# Test 14: GET /api/subscribers - List subscribers
print("\n1️⃣4️⃣  Testing GET /api/subscribers (list subscribers)...")
try:
    response = requests.get(f"{BASE_URL}/subscribers", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if not isinstance(data, list):
            log_test("GET /api/subscribers", False, "Response is not a list")
        else:
            # Check for our subscriber
            found = any(item.get("email") == "subscriber@example.com" for item in data)
            # Check for duplicates
            subscriber_emails = [item.get("email") for item in data]
            duplicate_count = subscriber_emails.count("subscriber@example.com")
            
            if found and duplicate_count == 1:
                log_test("GET /api/subscribers", True, 
                        f"Retrieved {len(data)} subscribers, including our test subscriber (no duplicates)")
            elif found and duplicate_count > 1:
                log_test("GET /api/subscribers", False, 
                        f"Found {duplicate_count} duplicates of test subscriber (idempotency failed)")
            elif not found:
                log_test("GET /api/subscribers", False, 
                        "Test subscriber not found in list")
            else:
                log_test("GET /api/subscribers", True, f"Retrieved {len(data)} subscribers")
    else:
        log_test("GET /api/subscribers", False, 
                f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("GET /api/subscribers", False, f"Exception: {str(e)}")

# Final Summary
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"✅ Passed: {tests_passed}")
print(f"❌ Failed: {tests_failed}")
print(f"📊 Total:  {tests_passed + tests_failed}")
print(f"📈 Success Rate: {(tests_passed / (tests_passed + tests_failed) * 100):.1f}%")
print("=" * 80)

# Exit with appropriate code
sys.exit(0 if tests_failed == 0 else 1)
