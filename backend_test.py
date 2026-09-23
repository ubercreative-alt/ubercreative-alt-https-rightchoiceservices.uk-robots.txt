#!/usr/bin/env python3
"""
Backend API Test Suite for JK PRO Builders - Email Functionality Verification
Tests contact form and newsletter subscription with email notifications
"""

import requests
import json
import time
import os
from datetime import datetime

# Base URLs
BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://renovation-kit.preview.emergentagent.com")
API_BASE = f"{BACKEND_URL}/api"
LOCAL_BACKEND = "http://localhost:8001"

# Test results tracking
results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_result(test_name, passed, details=""):
    """Log test result"""
    if passed:
        results["passed"].append(test_name)
        print(f"✅ PASS: {test_name}")
    else:
        results["failed"].append(test_name)
        print(f"❌ FAIL: {test_name}")
    if details:
        print(f"   {details}")

def log_warning(test_name, details):
    """Log warning"""
    results["warnings"].append(test_name)
    print(f"⚠️  WARNING: {test_name}")
    print(f"   {details}")


print("=" * 80)
print("JK PRO BUILDERS - EMAIL FUNCTIONALITY TEST SUITE")
print("=" * 80)
print(f"Backend URL: {BACKEND_URL}")
print(f"API Base: {API_BASE}")
print(f"Local Backend: {LOCAL_BACKEND}")
print(f"Test Time: {datetime.now().isoformat()}")
print("=" * 80)
print()

# ============================================================================
# TEST 1: POST /api/contact - Create enquiry with email notification
# ============================================================================
print("\n[TEST 1] POST /api/contact - Create enquiry with email notification")
print("-" * 80)

contact_payload = {
    "name": "Email Test",
    "email": "customer@example.com",
    "phone": "07123456789",
    "service": "Bathroom Renovation",
    "message": "Please send me a quote for a full bathroom."
}

try:
    response = requests.post(f"{API_BASE}/contact", json=contact_payload, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        # Verify all required fields
        required_fields = ["id", "name", "email", "phone", "service", "message", "status", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_result("POST /api/contact returns 200 with all fields", False, 
                      f"Missing fields: {missing_fields}")
        elif data.get("status") != "new":
            log_result("POST /api/contact returns 200 with status=new", False,
                      f"Expected status='new', got '{data.get('status')}'")
        elif data.get("name") != "Email Test":
            log_result("POST /api/contact saves correct data", False,
                      f"Expected name='Email Test', got '{data.get('name')}'")
        else:
            log_result("POST /api/contact returns 200 and saves enquiry", True,
                      f"Enquiry ID: {data.get('id')}, Status: {data.get('status')}")
            # Store ID for later tests
            test_enquiry_id = data.get("id")
    else:
        log_result("POST /api/contact returns 200", False,
                  f"Expected 200, got {response.status_code}: {response.text}")
        test_enquiry_id = None
        
except Exception as e:
    log_result("POST /api/contact", False, f"Exception: {str(e)}")
    test_enquiry_id = None

# ============================================================================
# TEST 2: GET /api/contact - Verify enquiry persisted
# ============================================================================
print("\n[TEST 2] GET /api/contact - Verify enquiry persisted")
print("-" * 80)

try:
    response = requests.get(f"{API_BASE}/contact", timeout=10)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Total enquiries: {len(data)}")
        
        # Find the "Email Test" enquiry
        email_test_enquiry = None
        for enquiry in data:
            if enquiry.get("name") == "Email Test" and enquiry.get("email") == "customer@example.com":
                email_test_enquiry = enquiry
                break
        
        if email_test_enquiry:
            log_result("GET /api/contact returns Email Test enquiry", True,
                      f"Found enquiry: {email_test_enquiry.get('id')}")
            print(f"   Enquiry details: {json.dumps(email_test_enquiry, indent=2)}")
        else:
            log_result("GET /api/contact returns Email Test enquiry", False,
                      "Email Test enquiry not found in list")
    else:
        log_result("GET /api/contact", False,
                  f"Expected 200, got {response.status_code}")
        
except Exception as e:
    log_result("GET /api/contact", False, f"Exception: {str(e)}")

# ============================================================================
# TEST 3: Backend logs - Verify email send succeeded
# ============================================================================
print("\n[TEST 3] Backend logs - Verify email send to Emergent proxy succeeded")
print("-" * 80)

try:
    # Read backend logs
    import subprocess
    result = subprocess.run(
        ["tail", "-n", "200", "/var/log/supervisor/backend.err.log"],
        capture_output=True,
        text=True,
        timeout=5
    )
    
    log_lines = result.stdout.split("\n")
    print(f"Analyzing last 200 lines of backend.err.log...")
    
    # Look for email-related log entries
    email_send_success = False
    email_send_failure = False
    contact_notification_failed = False
    
    # Search for recent email activity (last 50 lines should be enough for recent test)
    recent_lines = log_lines[-50:]
    
    for line in recent_lines:
        # Check for successful POST to Emergent email API
        if "POST" in line and "integrations.emergentagent.com/api/v1/email/send" in line:
            if "200" in line or "202" in line:
                email_send_success = True
                print(f"   ✓ Found successful email send: {line.strip()}")
        
        # Check for "Contact notification email failed" error
        if "Contact notification email failed" in line:
            contact_notification_failed = True
            print(f"   ✗ Found email failure: {line.strip()}")
    
    # Also check stdout log
    result_stdout = subprocess.run(
        ["tail", "-n", "200", "/var/log/supervisor/backend.out.log"],
        capture_output=True,
        text=True,
        timeout=5
    )
    
    stdout_lines = result_stdout.stdout.split("\n")
    recent_stdout = stdout_lines[-50:]
    
    for line in recent_stdout:
        if "POST" in line and "integrations.emergentagent.com/api/v1/email/send" in line:
            if "200" in line or "202" in line:
                email_send_success = True
                print(f"   ✓ Found successful email send in stdout: {line.strip()}")
        
        if "Contact notification email failed" in line:
            contact_notification_failed = True
            print(f"   ✗ Found email failure in stdout: {line.strip()}")
    
    # Evaluate results
    if contact_notification_failed:
        log_result("Email send to Emergent proxy succeeded", False,
                  "Found 'Contact notification email failed' error in logs")
    elif email_send_success:
        log_result("Email send to Emergent proxy succeeded", True,
                  "Found successful POST to https://integrations.emergentagent.com/api/v1/email/send with HTTP 200/202")
    else:
        log_warning("Email send verification inconclusive",
                   "No explicit email send success or failure found in recent logs. Email may have been sent but not logged, or logs may have rotated.")
        
except Exception as e:
    log_result("Backend log verification", False, f"Exception: {str(e)}")

# ============================================================================
# TEST 4: POST /api/subscribe - Create subscriber with email notification
# ============================================================================
print("\n[TEST 4] POST /api/subscribe - Create subscriber with email notification")
print("-" * 80)

subscribe_payload = {
    "email": "newsub@example.com"
}

try:
    response = requests.post(f"{API_BASE}/subscribe", json=subscribe_payload, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        # Verify all required fields
        required_fields = ["id", "email", "created_at"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            log_result("POST /api/subscribe returns 200 with all fields", False,
                      f"Missing fields: {missing_fields}")
        elif data.get("email") != "newsub@example.com":
            log_result("POST /api/subscribe saves correct email", False,
                      f"Expected email='newsub@example.com', got '{data.get('email')}'")
        else:
            log_result("POST /api/subscribe returns 200 and saves subscriber", True,
                      f"Subscriber ID: {data.get('id')}, Email: {data.get('email')}")
    else:
        log_result("POST /api/subscribe returns 200", False,
                  f"Expected 200, got {response.status_code}: {response.text}")
        
except Exception as e:
    log_result("POST /api/subscribe", False, f"Exception: {str(e)}")

# Wait a moment for email to be sent
time.sleep(2)

# Check logs for subscriber email
print("\n[TEST 4b] Backend logs - Verify subscriber notification email")
print("-" * 80)

try:
    result = subprocess.run(
        ["tail", "-n", "100", "/var/log/supervisor/backend.err.log"],
        capture_output=True,
        text=True,
        timeout=5
    )
    
    log_lines = result.stdout.split("\n")
    recent_lines = log_lines[-30:]
    
    subscribe_email_success = False
    subscribe_notification_failed = False
    
    for line in recent_lines:
        if "POST" in line and "integrations.emergentagent.com/api/v1/email/send" in line:
            if "200" in line or "202" in line:
                subscribe_email_success = True
                print(f"   ✓ Found successful subscriber email send: {line.strip()}")
        
        if "Subscribe notification email failed" in line:
            subscribe_notification_failed = True
            print(f"   ✗ Found subscriber email failure: {line.strip()}")
    
    # Check stdout too
    result_stdout = subprocess.run(
        ["tail", "-n", "100", "/var/log/supervisor/backend.out.log"],
        capture_output=True,
        text=True,
        timeout=5
    )
    
    stdout_lines = result_stdout.stdout.split("\n")
    recent_stdout = stdout_lines[-30:]
    
    for line in recent_stdout:
        if "POST" in line and "integrations.emergentagent.com/api/v1/email/send" in line:
            if "200" in line or "202" in line:
                subscribe_email_success = True
                print(f"   ✓ Found successful subscriber email in stdout: {line.strip()}")
        
        if "Subscribe notification email failed" in line:
            subscribe_notification_failed = True
            print(f"   ✗ Found subscriber email failure in stdout: {line.strip()}")
    
    if subscribe_notification_failed:
        log_result("Subscriber notification email succeeded", False,
                  "Found 'Subscribe notification email failed' error in logs")
    elif subscribe_email_success:
        log_result("Subscriber notification email succeeded", True,
                  "Found successful email send for subscriber notification")
    else:
        log_warning("Subscriber email verification inconclusive",
                   "No explicit subscriber email success or failure found in recent logs")
        
except Exception as e:
    log_result("Subscriber email log verification", False, f"Exception: {str(e)}")

# ============================================================================
# TEST 5: Regression - GET /health on localhost:8001
# ============================================================================
print("\n[TEST 5] Regression - GET /health on localhost:8001")
print("-" * 80)

try:
    response = requests.get(f"{LOCAL_BACKEND}/health", timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "healthy":
            log_result("GET /health on localhost:8001", True,
                      "Returns 200 with status=healthy")
        else:
            log_result("GET /health returns correct status", False,
                      f"Expected status='healthy', got {data}")
    else:
        log_result("GET /health on localhost:8001", False,
                  f"Expected 200, got {response.status_code}")
        
except Exception as e:
    log_result("GET /health on localhost:8001", False, f"Exception: {str(e)}")

# ============================================================================
# TEST 6: Regression - GET /api/health
# ============================================================================
print("\n[TEST 6] Regression - GET /api/health")
print("-" * 80)

try:
    response = requests.get(f"{API_BASE}/health", timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "healthy":
            log_result("GET /api/health", True, "Returns 200 with status=healthy")
        else:
            log_result("GET /api/health returns correct status", False,
                      f"Expected status='healthy', got {data}")
    else:
        log_result("GET /api/health", False,
                  f"Expected 200, got {response.status_code}")
        
except Exception as e:
    log_result("GET /api/health", False, f"Exception: {str(e)}")

# ============================================================================
# TEST 7: Regression - PATCH /api/contact/{id}/read
# ============================================================================
print("\n[TEST 7] Regression - PATCH /api/contact/{id}/read")
print("-" * 80)

if test_enquiry_id:
    try:
        response = requests.patch(f"{API_BASE}/contact/{test_enquiry_id}/read", timeout=5)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "read" and data.get("id") == test_enquiry_id:
                log_result("PATCH /api/contact/{id}/read", True,
                          f"Marked enquiry {test_enquiry_id} as read")
            else:
                log_result("PATCH /api/contact/{id}/read returns correct data", False,
                          f"Expected status='read' and id='{test_enquiry_id}', got {data}")
        else:
            log_result("PATCH /api/contact/{id}/read", False,
                      f"Expected 200, got {response.status_code}")
            
    except Exception as e:
        log_result("PATCH /api/contact/{id}/read", False, f"Exception: {str(e)}")
else:
    log_result("PATCH /api/contact/{id}/read", False,
              "Skipped - no test enquiry ID available from TEST 1")

# ============================================================================
# TEST 8: Regression - DELETE /api/contact/{id}
# ============================================================================
print("\n[TEST 8] Regression - DELETE /api/contact/{id}")
print("-" * 80)

if test_enquiry_id:
    try:
        response = requests.delete(f"{API_BASE}/contact/{test_enquiry_id}", timeout=5)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") and data.get("id") == test_enquiry_id:
                log_result("DELETE /api/contact/{id}", True,
                          f"Deleted enquiry {test_enquiry_id}")
                
                # Verify it's actually deleted
                time.sleep(1)
                verify_response = requests.get(f"{API_BASE}/contact", timeout=5)
                if verify_response.status_code == 200:
                    enquiries = verify_response.json()
                    deleted_found = any(e.get("id") == test_enquiry_id for e in enquiries)
                    if deleted_found:
                        log_result("DELETE /api/contact/{id} actually removes enquiry", False,
                                  f"Enquiry {test_enquiry_id} still found in GET /api/contact")
                    else:
                        log_result("DELETE /api/contact/{id} actually removes enquiry", True,
                                  f"Enquiry {test_enquiry_id} no longer in list")
            else:
                log_result("DELETE /api/contact/{id} returns correct data", False,
                          f"Expected ok=true and id='{test_enquiry_id}', got {data}")
        else:
            log_result("DELETE /api/contact/{id}", False,
                      f"Expected 200, got {response.status_code}")
            
    except Exception as e:
        log_result("DELETE /api/contact/{id}", False, f"Exception: {str(e)}")
else:
    log_result("DELETE /api/contact/{id}", False,
              "Skipped - no test enquiry ID available from TEST 1")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"✅ PASSED: {len(results['passed'])}")
for test in results['passed']:
    print(f"   - {test}")

if results['warnings']:
    print(f"\n⚠️  WARNINGS: {len(results['warnings'])}")
    for test in results['warnings']:
        print(f"   - {test}")

if results['failed']:
    print(f"\n❌ FAILED: {len(results['failed'])}")
    for test in results['failed']:
        print(f"   - {test}")
else:
    print("\n🎉 ALL TESTS PASSED!")

print("\n" + "=" * 80)
print(f"Total Tests: {len(results['passed']) + len(results['failed'])}")
print(f"Pass Rate: {len(results['passed']) / (len(results['passed']) + len(results['failed'])) * 100:.1f}%")
print("=" * 80)
