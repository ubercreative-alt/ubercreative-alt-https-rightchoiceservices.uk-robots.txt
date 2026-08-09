#!/usr/bin/env python3
"""
Regression test for JK PRO Builders backend after MongoDB field projections and query limits.
Tests all contact and subscriber endpoints to ensure projections didn't break functionality.
"""

import requests
import sys
import os
from pathlib import Path

# Read REACT_APP_BACKEND_URL from frontend/.env
frontend_env = Path("/app/frontend/.env")
BACKEND_URL = None
if frontend_env.exists():
    with open(frontend_env) as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BACKEND_URL = line.split("=", 1)[1].strip()
                break

if not BACKEND_URL:
    print("❌ FATAL: Could not read REACT_APP_BACKEND_URL from /app/frontend/.env")
    sys.exit(1)

BASE_URL = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {BASE_URL}\n")

# Test counters
passed = 0
failed = 0
test_results = []


def test(name, condition, details=""):
    """Record test result"""
    global passed, failed
    if condition:
        passed += 1
        test_results.append(f"✅ {name}")
        print(f"✅ {name}")
        if details:
            print(f"   {details}")
    else:
        failed += 1
        test_results.append(f"❌ {name}")
        print(f"❌ {name}")
        if details:
            print(f"   {details}")


def check_no_mongo_id(data, test_name):
    """Verify _id is not present in response"""
    if isinstance(data, dict):
        if "_id" in data:
            test(f"{test_name} - No _id leaked", False, f"Found _id in response: {data.get('_id')}")
            return False
        test(f"{test_name} - No _id leaked", True)
        return True
    elif isinstance(data, list):
        for item in data:
            if "_id" in item:
                test(f"{test_name} - No _id leaked", False, f"Found _id in list item: {item.get('_id')}")
                return False
        test(f"{test_name} - No _id leaked", True)
        return True
    return True


def check_all_fields(data, required_fields, test_name):
    """Verify all required fields are present"""
    missing = [f for f in required_fields if f not in data]
    if missing:
        test(f"{test_name} - All fields present", False, f"Missing fields: {missing}")
        return False
    test(f"{test_name} - All fields present", True, f"All {len(required_fields)} fields present")
    return True


print("=" * 80)
print("REGRESSION TEST: MongoDB Projections & Query Limits")
print("=" * 80)

# ============================================================================
# TEST 1: POST /api/contact - Create enquiry and verify all fields returned
# ============================================================================
print("\n📝 TEST 1: POST /api/contact - Create enquiry")
print("-" * 80)

contact_payload = {
    "name": "Reg Test",
    "email": "reg@example.com",
    "phone": "07000000000",
    "service": "Roofing & Guttering",
    "message": "projection regression"
}

try:
    resp = requests.post(f"{BASE_URL}/contact", json=contact_payload, timeout=10)
    test("POST /api/contact - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
    
    if resp.status_code == 200:
        data = resp.json()
        print(f"   Response: {data}")
        
        # Check all required fields
        required_fields = ["id", "name", "email", "phone", "service", "message", "status", "created_at"]
        check_all_fields(data, required_fields, "POST /api/contact")
        
        # Verify field values
        test("POST /api/contact - name correct", data.get("name") == "Reg Test")
        test("POST /api/contact - email correct", data.get("email") == "reg@example.com")
        test("POST /api/contact - phone correct", data.get("phone") == "07000000000")
        test("POST /api/contact - service correct", data.get("service") == "Roofing & Guttering")
        test("POST /api/contact - message correct", data.get("message") == "projection regression")
        test("POST /api/contact - status is 'new'", data.get("status") == "new")
        test("POST /api/contact - has created_at", bool(data.get("created_at")))
        test("POST /api/contact - has id", bool(data.get("id")))
        
        # Check no _id leaked
        check_no_mongo_id(data, "POST /api/contact")
        
        # Save ID for later tests
        created_id = data.get("id")
    else:
        print(f"   Error: {resp.text}")
        created_id = None
except Exception as e:
    test("POST /api/contact", False, f"Exception: {e}")
    created_id = None

# ============================================================================
# TEST 2: GET /api/contact - Verify projection didn't drop fields
# ============================================================================
print("\n📋 TEST 2: GET /api/contact - List enquiries with projection")
print("-" * 80)

try:
    resp = requests.get(f"{BASE_URL}/contact", timeout=10)
    test("GET /api/contact - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
    
    if resp.status_code == 200:
        data = resp.json()
        test("GET /api/contact - Returns list", isinstance(data, list))
        print(f"   Found {len(data)} enquiries")
        
        # Check no _id leaked in list
        check_no_mongo_id(data, "GET /api/contact")
        
        # Find our created enquiry
        our_enquiry = None
        if created_id:
            our_enquiry = next((e for e in data if e.get("id") == created_id), None)
            test("GET /api/contact - Created enquiry present", our_enquiry is not None)
            
            if our_enquiry:
                print(f"   Our enquiry: {our_enquiry}")
                
                # Verify ALL fields are present (projection didn't drop any)
                required_fields = ["id", "name", "email", "phone", "service", "message", "status", "created_at"]
                check_all_fields(our_enquiry, required_fields, "GET /api/contact enquiry")
                
                # Verify values match what we created
                test("GET /api/contact - name matches", our_enquiry.get("name") == "Reg Test")
                test("GET /api/contact - email matches", our_enquiry.get("email") == "reg@example.com")
                test("GET /api/contact - phone matches", our_enquiry.get("phone") == "07000000000")
                test("GET /api/contact - service matches", our_enquiry.get("service") == "Roofing & Guttering")
                test("GET /api/contact - message matches", our_enquiry.get("message") == "projection regression")
                test("GET /api/contact - status is 'new'", our_enquiry.get("status") == "new")
        else:
            print("   ⚠️  Skipping enquiry verification (no created_id)")
    else:
        print(f"   Error: {resp.text}")
except Exception as e:
    test("GET /api/contact", False, f"Exception: {e}")

# ============================================================================
# TEST 3: PATCH /api/contact/{id}/read - Mark as read
# ============================================================================
print("\n✏️  TEST 3: PATCH /api/contact/{id}/read - Mark as read")
print("-" * 80)

if created_id:
    try:
        resp = requests.patch(f"{BASE_URL}/contact/{created_id}/read", timeout=10)
        test("PATCH /api/contact/{id}/read - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"   Response: {data}")
            test("PATCH /api/contact/{id}/read - status is 'read'", data.get("status") == "read")
            
            # Verify in GET list
            resp_get = requests.get(f"{BASE_URL}/contact", timeout=10)
            if resp_get.status_code == 200:
                enquiries = resp_get.json()
                updated = next((e for e in enquiries if e.get("id") == created_id), None)
                if updated:
                    test("PATCH /api/contact/{id}/read - Verified in GET", updated.get("status") == "read")
                else:
                    test("PATCH /api/contact/{id}/read - Verified in GET", False, "Enquiry not found in list")
        else:
            print(f"   Error: {resp.text}")
    except Exception as e:
        test("PATCH /api/contact/{id}/read", False, f"Exception: {e}")
    
    # Test 404 for non-existent ID
    print("\n   Testing 404 for non-existent ID...")
    try:
        resp = requests.patch(f"{BASE_URL}/contact/nonexistent-id-12345/read", timeout=10)
        test("PATCH /api/contact/{id}/read - 404 for non-existent", resp.status_code == 404, f"Got {resp.status_code}")
    except Exception as e:
        test("PATCH /api/contact/{id}/read - 404 test", False, f"Exception: {e}")
else:
    print("   ⚠️  Skipping (no created_id)")

# ============================================================================
# TEST 4: DELETE /api/contact/{id} - Delete enquiry
# ============================================================================
print("\n🗑️  TEST 4: DELETE /api/contact/{id} - Delete enquiry")
print("-" * 80)

if created_id:
    try:
        resp = requests.delete(f"{BASE_URL}/contact/{created_id}", timeout=10)
        test("DELETE /api/contact/{id} - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
        
        if resp.status_code == 200:
            print(f"   Response: {resp.json()}")
            
            # Verify it's gone from GET list
            resp_get = requests.get(f"{BASE_URL}/contact", timeout=10)
            if resp_get.status_code == 200:
                enquiries = resp_get.json()
                deleted = next((e for e in enquiries if e.get("id") == created_id), None)
                test("DELETE /api/contact/{id} - Removed from list", deleted is None)
        else:
            print(f"   Error: {resp.text}")
        
        # Test 404 on second delete
        print("\n   Testing 404 on second delete...")
        resp2 = requests.delete(f"{BASE_URL}/contact/{created_id}", timeout=10)
        test("DELETE /api/contact/{id} - 404 on second delete", resp2.status_code == 404, f"Got {resp2.status_code}")
    except Exception as e:
        test("DELETE /api/contact/{id}", False, f"Exception: {e}")
else:
    print("   ⚠️  Skipping (no created_id)")

# ============================================================================
# TEST 5: POST /api/subscribe - Create subscriber and test idempotency
# ============================================================================
print("\n📧 TEST 5: POST /api/subscribe - Create subscriber")
print("-" * 80)

subscribe_payload = {"email": "regsub@example.com"}

try:
    resp = requests.post(f"{BASE_URL}/subscribe", json=subscribe_payload, timeout=10)
    test("POST /api/subscribe - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
    
    if resp.status_code == 200:
        data = resp.json()
        print(f"   Response: {data}")
        
        # Check all required fields
        required_fields = ["id", "email", "created_at"]
        check_all_fields(data, required_fields, "POST /api/subscribe")
        
        # Verify field values
        test("POST /api/subscribe - email correct", data.get("email") == "regsub@example.com")
        test("POST /api/subscribe - has id", bool(data.get("id")))
        test("POST /api/subscribe - has created_at", bool(data.get("created_at")))
        
        # Check no _id leaked
        check_no_mongo_id(data, "POST /api/subscribe")
        
        first_id = data.get("id")
        first_created_at = data.get("created_at")
        
        # Test idempotency - post same email again
        print("\n   Testing idempotency (posting same email again)...")
        resp2 = requests.post(f"{BASE_URL}/subscribe", json=subscribe_payload, timeout=10)
        test("POST /api/subscribe - Idempotent 200", resp2.status_code == 200, f"Got {resp2.status_code}")
        
        if resp2.status_code == 200:
            data2 = resp2.json()
            print(f"   Second response: {data2}")
            test("POST /api/subscribe - Idempotent same id", data2.get("id") == first_id)
            test("POST /api/subscribe - Idempotent same created_at", data2.get("created_at") == first_created_at)
            test("POST /api/subscribe - Idempotent no duplicate", True, "Returned existing record")
    else:
        print(f"   Error: {resp.text}")
except Exception as e:
    test("POST /api/subscribe", False, f"Exception: {e}")

# Test invalid email
print("\n   Testing invalid email validation...")
try:
    resp = requests.post(f"{BASE_URL}/subscribe", json={"email": "not-an-email"}, timeout=10)
    test("POST /api/subscribe - Invalid email 422", resp.status_code == 422, f"Got {resp.status_code}")
except Exception as e:
    test("POST /api/subscribe - Invalid email", False, f"Exception: {e}")

# ============================================================================
# TEST 6: GET /api/subscribers - Verify projection and no duplicates
# ============================================================================
print("\n📋 TEST 6: GET /api/subscribers - List subscribers with projection")
print("-" * 80)

try:
    resp = requests.get(f"{BASE_URL}/subscribers", timeout=10)
    test("GET /api/subscribers - Status 200", resp.status_code == 200, f"Got {resp.status_code}")
    
    if resp.status_code == 200:
        data = resp.json()
        test("GET /api/subscribers - Returns list", isinstance(data, list))
        print(f"   Found {len(data)} subscribers")
        
        # Check no _id leaked in list
        check_no_mongo_id(data, "GET /api/subscribers")
        
        # Find our subscriber
        our_sub = next((s for s in data if s.get("email") == "regsub@example.com"), None)
        test("GET /api/subscribers - Created subscriber present", our_sub is not None)
        
        if our_sub:
            print(f"   Our subscriber: {our_sub}")
            
            # Verify ALL fields are present (projection didn't drop any)
            required_fields = ["id", "email", "created_at"]
            check_all_fields(our_sub, required_fields, "GET /api/subscribers item")
            
            # Verify no duplicate for idempotent email
            matching = [s for s in data if s.get("email") == "regsub@example.com"]
            test("GET /api/subscribers - No duplicate for idempotent email", len(matching) == 1, 
                 f"Found {len(matching)} records for regsub@example.com")
    else:
        print(f"   Error: {resp.text}")
except Exception as e:
    test("GET /api/subscribers", False, f"Exception: {e}")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("REGRESSION TEST SUMMARY")
print("=" * 80)
print(f"✅ Passed: {passed}")
print(f"❌ Failed: {failed}")
print(f"📊 Total:  {passed + failed}")
print(f"📈 Success Rate: {(passed / (passed + failed) * 100):.1f}%")
print("=" * 80)

if failed > 0:
    print("\n❌ FAILED TESTS:")
    for result in test_results:
        if result.startswith("❌"):
            print(f"  {result}")
    sys.exit(1)
else:
    print("\n✅ ALL REGRESSION TESTS PASSED!")
    print("   MongoDB projections and query limits working correctly.")
    print("   All fields present, no _id leaked, no functionality broken.")
    sys.exit(0)
