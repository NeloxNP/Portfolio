#!/usr/bin/env python3
"""
Backend API Testing for Contact Form Endpoints
Tests the contact form functionality including validation, persistence, and email handling.
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any, List

# Configuration
BASE_URL = "https://my-portfolio-794.preview.emergentagent.com/api"
CONTACT_ENDPOINT = f"{BASE_URL}/contact"
MESSAGES_ENDPOINT = f"{BASE_URL}/contact/messages"

class ContactFormTester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")

    def test_valid_contact_submission(self):
        """Test successful contact form submission"""
        test_name = "POST /api/contact - Valid submission"
        
        payload = {
            "name": "Marie Dubois",
            "email": "marie.dubois@example.com",
            "message": "Bonjour Gabriel, j'aimerais discuter d'un projet de développement web. Votre portfolio est très impressionnant!"
        }
        
        try:
            response = self.session.post(CONTACT_ENDPOINT, json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') is True and 'id' in data:
                    self.log_test(test_name, True, f"Message ID: {data['id']}")
                    return data['id']  # Return ID for persistence check
                else:
                    self.log_test(test_name, False, f"Invalid response format: {data}")
            else:
                self.log_test(test_name, False, f"Status {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
        
        return None

    def test_validation_errors(self):
        """Test various validation error scenarios"""
        
        test_cases = [
            {
                "name": "Missing name field",
                "payload": {"email": "test@example.com", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Empty name",
                "payload": {"name": "", "email": "test@example.com", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Missing email field",
                "payload": {"name": "Test User", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Invalid email format",
                "payload": {"name": "Test User", "email": "invalid-email", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Missing message field",
                "payload": {"name": "Test User", "email": "test@example.com"},
                "expected_status": 422
            },
            {
                "name": "Empty message",
                "payload": {"name": "Test User", "email": "test@example.com", "message": ""},
                "expected_status": 422
            },
            {
                "name": "Message too long (>5000 chars)",
                "payload": {
                    "name": "Test User", 
                    "email": "test@example.com", 
                    "message": "A" * 5001
                },
                "expected_status": 422
            },
            {
                "name": "Name too long (>100 chars)",
                "payload": {
                    "name": "A" * 101, 
                    "email": "test@example.com", 
                    "message": "Test message"
                },
                "expected_status": 422
            }
        ]
        
        for case in test_cases:
            try:
                response = self.session.post(CONTACT_ENDPOINT, json=case["payload"])
                
                if response.status_code == case["expected_status"]:
                    self.log_test(f"Validation: {case['name']}", True, f"Correctly returned {response.status_code}")
                else:
                    self.log_test(f"Validation: {case['name']}", False, 
                                f"Expected {case['expected_status']}, got {response.status_code}: {response.text}")
                    
            except Exception as e:
                self.log_test(f"Validation: {case['name']}", False, f"Request failed: {str(e)}")

    def test_message_length_boundary(self):
        """Test message length at boundary conditions"""
        
        # Test message just under 5000 chars (should pass)
        test_name = "Message length boundary - 4999 chars"
        payload = {
            "name": "Boundary Tester",
            "email": "boundary@example.com",
            "message": "A" * 4999
        }
        
        try:
            response = self.session.post(CONTACT_ENDPOINT, json=payload)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') is True:
                    self.log_test(test_name, True, "4999 char message accepted")
                else:
                    self.log_test(test_name, False, f"Unexpected response: {data}")
            else:
                self.log_test(test_name, False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")

        # Test message at exactly 5000 chars (should pass)
        test_name = "Message length boundary - 5000 chars"
        payload["message"] = "A" * 5000
        
        try:
            response = self.session.post(CONTACT_ENDPOINT, json=payload)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') is True:
                    self.log_test(test_name, True, "5000 char message accepted")
                else:
                    self.log_test(test_name, False, f"Unexpected response: {data}")
            else:
                self.log_test(test_name, False, f"Status {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")

    def test_get_messages_endpoint(self):
        """Test GET /api/contact/messages endpoint"""
        
        test_name = "GET /api/contact/messages - Basic functionality"
        
        try:
            response = self.session.get(MESSAGES_ENDPOINT)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(test_name, True, f"Retrieved {len(data)} messages")
                    return data
                else:
                    self.log_test(test_name, False, f"Expected list, got: {type(data)}")
            else:
                self.log_test(test_name, False, f"Status {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
        
        return []

    def test_get_messages_with_limit(self):
        """Test GET /api/contact/messages with limit parameter"""
        
        test_name = "GET /api/contact/messages?limit=5"
        
        try:
            response = self.session.get(f"{MESSAGES_ENDPOINT}?limit=5")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) <= 5:
                        self.log_test(test_name, True, f"Retrieved {len(data)} messages (≤5)")
                    else:
                        self.log_test(test_name, False, f"Expected ≤5 messages, got {len(data)}")
                else:
                    self.log_test(test_name, False, f"Expected list, got: {type(data)}")
            else:
                self.log_test(test_name, False, f"Status {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")

    def test_message_persistence(self, message_id: str = None):
        """Test that submitted messages are properly persisted"""
        
        if not message_id:
            self.log_test("Message persistence check", False, "No message ID provided from submission test")
            return
            
        test_name = "Message persistence verification"
        
        # Wait a moment for the message to be persisted
        time.sleep(1)
        
        try:
            response = self.session.get(MESSAGES_ENDPOINT)
            
            if response.status_code == 200:
                messages = response.json()
                
                # Look for our message ID in the retrieved messages
                found_message = None
                for msg in messages:
                    if msg.get('id') == message_id:
                        found_message = msg
                        break
                
                if found_message:
                    # Verify required fields are present
                    required_fields = ['id', 'name', 'email', 'message', 'created_at', 'email_sent']
                    missing_fields = [field for field in required_fields if field not in found_message]
                    
                    if not missing_fields:
                        # Check email_sent and email_error fields
                        email_sent = found_message.get('email_sent')
                        email_error = found_message.get('email_error')
                        
                        details = f"Message persisted with email_sent={email_sent}"
                        if not email_sent and email_error:
                            details += f", email_error='{email_error}'"
                        
                        self.log_test(test_name, True, details)
                    else:
                        self.log_test(test_name, False, f"Missing required fields: {missing_fields}")
                else:
                    self.log_test(test_name, False, f"Message with ID {message_id} not found in database")
            else:
                self.log_test(test_name, False, f"Failed to retrieve messages: {response.status_code}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")

    def test_message_sorting(self):
        """Test that messages are returned in descending order by created_at"""
        
        test_name = "Message sorting verification"
        
        try:
            response = self.session.get(MESSAGES_ENDPOINT)
            
            if response.status_code == 200:
                messages = response.json()
                
                if len(messages) >= 2:
                    # Check if messages are sorted by created_at in descending order
                    is_sorted = True
                    for i in range(len(messages) - 1):
                        current_time = messages[i].get('created_at', '')
                        next_time = messages[i + 1].get('created_at', '')
                        
                        if current_time < next_time:
                            is_sorted = False
                            break
                    
                    if is_sorted:
                        self.log_test(test_name, True, f"Messages properly sorted by created_at desc")
                    else:
                        self.log_test(test_name, False, "Messages not sorted by created_at in descending order")
                else:
                    self.log_test(test_name, True, f"Only {len(messages)} messages available, sorting cannot be verified")
            else:
                self.log_test(test_name, False, f"Failed to retrieve messages: {response.status_code}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all contact form tests"""
        print("🧪 Starting Contact Form Backend Tests")
        print("=" * 50)
        
        # Test valid submission first and get message ID
        message_id = self.test_valid_contact_submission()
        
        # Test validation errors
        self.test_validation_errors()
        
        # Test boundary conditions
        self.test_message_length_boundary()
        
        # Test GET endpoints
        self.test_get_messages_endpoint()
        self.test_get_messages_with_limit()
        
        # Test message persistence if we have a message ID
        if message_id:
            self.test_message_persistence(message_id)
        
        # Test message sorting
        self.test_message_sorting()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        print("\n" + "=" * 50)

if __name__ == "__main__":
    tester = ContactFormTester()
    tester.run_all_tests()