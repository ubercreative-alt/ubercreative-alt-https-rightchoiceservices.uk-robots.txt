#!/usr/bin/env python3
"""
Health Endpoint Fix Verification Test
Tests the fix for Kubernetes health probe 404 issue
"""
import requests
import sys
import json
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://renovation-kit.preview.emergentagent.com"

def print_test(test_name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {test_name}")
    if details:
        print(f"   {details}")
    return passed

def test_root_health():
    """Test 1: GET /health (root-level, no /api prefix) - THE CRITICAL FIX"""
    print("\n=== TEST 1: Root Health Endpoint (Critical Fix) ===")
    try:
        url = f"{BASE_URL}/health"
        print(f"Testing: GET {url}")
        response = requests.get(url, timeout=10)
        
        passed = (
            response.status_code == 200 and
            response.json() == {"status": "healthy"}
        )
        
        details = f"Status: {response.status_code}, Body: {response.json()}"
        if response.status_code == 404:
            details += " ⚠️ STILL GETTING 404 - FIX NOT WORKING!"
        
        return print_test("GET /health returns 200 with {\"status\":\"healthy\"}", passed, details)
    except Exception as e:
        return print_test("GET /health returns 200 with {\"status\":\"healthy\"}", False, f"Error: {str(e)}")

def test_healthz():
    """Test 2: GET /healthz"""
    print("\n=== TEST 2: Healthz Endpoint ===")
    try:
        url = f"{BASE_URL}/healthz"
        print(f"Testing: GET {url}")
        response = requests.get(url, timeout=10)
        
        passed = (
            response.status_code == 200 and
            response.json() == {"status": "healthy"}
        )
        
        details = f"Status: {response.status_code}, Body: {response.json()}"
        return print_test("GET /healthz returns 200 with {\"status\":\"healthy\"}", passed, details)
    except Exception as e:
        return print_test("GET /healthz returns 200 with {\"status\":\"healthy\"}", False, f"Error: {str(e)}")

def test_api_health():
    """Test 3: GET /api/health"""
    print("\n=== TEST 3: API Health Endpoint ===")
    try:
        url = f"{BASE_URL}/api/health"
        print(f"Testing: GET {url}")
        response = requests.get(url, timeout=10)
        
        passed = (
            response.status_code == 200 and
            response.json() == {"status": "healthy"}
        )
        
        details = f"Status: {response.status_code}, Body: {response.json()}"
        return print_test("GET /api/health returns 200 with {\"status\":\"healthy\"}", passed, details)
    except Exception as e:
        return print_test("GET /api/health returns 200 with {\"status\":\"healthy\"}", False, f"Error: {str(e)}")

def test_api_root():
    """Test 4: GET /api/ (root API message)"""
    print("\n=== TEST 4: API Root Endpoint ===")
    try:
        url = f"{BASE_URL}/api/"
        print(f"Testing: GET {url}")
        response = requests.get(url, timeout=10)
        
        passed = response.status_code == 200
        
        details = f"Status: {response.status_code}, Body: {response.json()}"
        return print_test("GET /api/ returns 200 (root API message)", passed, details)
    except Exception as e:
        return print_test("GET /api/ returns 200 (root API message)", False, f"Error: {str(e)}")

def test_contact_regression():
    """Test 5: Regression - Contact endpoints still work"""
    print("\n=== TEST 5: Contact Endpoints Regression ===")
    results = []
    
    # POST /api/contact
    try:
        url = f"{BASE_URL}/api/contact"
        payload = {
            "name": "Deploy Test",
            "email": "deploy@example.com",
            "message": "health check regression"
        }
        print(f"Testing: POST {url}")
        response = requests.post(url, json=payload, timeout=10)
        
        passed = response.status_code == 200
        data = response.json() if passed else {}
        
        if passed:
            # Verify response has required fields
            required_fields = ["id", "name", "email", "message", "status", "created_at"]
            has_all_fields = all(field in data for field in required_fields)
            passed = has_all_fields and data["status"] == "new"
            
            details = f"Status: {response.status_code}, ID: {data.get('id', 'N/A')}, Status: {data.get('status', 'N/A')}"
            results.append(print_test("POST /api/contact creates enquiry", passed, details))
            
            # Store ID for later tests
            contact_id = data.get("id")
        else:
            details = f"Status: {response.status_code}"
            results.append(print_test("POST /api/contact creates enquiry", False, details))
            contact_id = None
    except Exception as e:
        results.append(print_test("POST /api/contact creates enquiry", False, f"Error: {str(e)}"))
        contact_id = None
    
    # GET /api/contact
    try:
        url = f"{BASE_URL}/api/contact"
        print(f"Testing: GET {url}")
        response = requests.get(url, timeout=10)
        
        passed = response.status_code == 200
        data = response.json() if passed else []
        
        if passed and contact_id:
            # Check if our contact is in the list
            found = any(item.get("id") == contact_id for item in data)
            passed = found
            details = f"Status: {response.status_code}, Found test contact: {found}, Total: {len(data)}"
        else:
            details = f"Status: {response.status_code}"
        
        results.append(print_test("GET /api/contact returns enquiries", passed, details))
    except Exception as e:
        results.append(print_test("GET /api/contact returns enquiries", False, f"Error: {str(e)}"))
    
    return all(results)

def test_subscribe_regression():
    """Test 6: Regression - Subscribe endpoint still works"""
    print("\n=== TEST 6: Subscribe Endpoint Regression ===")
    try:
        url = f"{BASE_URL}/api/subscribe"
        payload = {
            "email": "deploysub@example.com"
        }
        print(f"Testing: POST {url}")
        response = requests.post(url, json=payload, timeout=10)
        
        passed = response.status_code == 200
        data = response.json() if passed else {}
        
        if passed:
            # Verify response has required fields
            required_fields = ["id", "email", "created_at"]
            has_all_fields = all(field in data for field in required_fields)
            passed = has_all_fields and data["email"] == "deploysub@example.com"
            
            details = f"Status: {response.status_code}, ID: {data.get('id', 'N/A')}, Email: {data.get('email', 'N/A')}"
        else:
            details = f"Status: {response.status_code}"
        
        return print_test("POST /api/subscribe creates subscriber", passed, details)
    except Exception as e:
        return print_test("POST /api/subscribe creates subscriber", False, f"Error: {str(e)}")

def main():
    print("=" * 80)
    print("HEALTH ENDPOINT FIX VERIFICATION TEST")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print("=" * 80)
    
    results = []
    
    # Critical fix test
    results.append(test_root_health())
    
    # Other health endpoints
    results.append(test_healthz())
    results.append(test_api_health())
    results.append(test_api_root())
    
    # Regression tests
    results.append(test_contact_regression())
    results.append(test_subscribe_regression())
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    total = len(results)
    passed = sum(results)
    failed = total - passed
    
    print(f"Total Tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED! Health endpoint fix verified successfully.")
        print("✅ GET /health now returns 200 (was 404) - Kubernetes probe will work!")
        return 0
    else:
        print("\n⚠️ SOME TESTS FAILED - Review details above")
        if not results[0]:  # First test is the critical /health endpoint
            print("❌ CRITICAL: GET /health still returning 404 - Kubernetes probe will fail!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
