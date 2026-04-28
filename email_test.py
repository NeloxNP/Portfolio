#!/usr/bin/env python3
"""
Additional test to verify email behavior and Resend integration
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/backend/.env')

# Configuration
BASE_URL = "https://my-portfolio-794.preview.emergentagent.com/api"
CONTACT_ENDPOINT = f"{BASE_URL}/contact"
MESSAGES_ENDPOINT = f"{BASE_URL}/contact/messages"

def test_email_behavior():
    """Test email sending behavior with current configuration"""
    print("🔍 Testing Email Behavior")
    print("=" * 40)
    
    # Check environment variables
    resend_key = os.environ.get("RESEND_API_KEY", "")
    contact_to = os.environ.get("CONTACT_EMAIL_TO", "")
    contact_from = os.environ.get("CONTACT_EMAIL_FROM", "")
    
    print(f"RESEND_API_KEY configured: {'Yes' if resend_key else 'No'}")
    print(f"CONTACT_EMAIL_TO: {contact_to}")
    print(f"CONTACT_EMAIL_FROM: {contact_from}")
    print()
    
    # Submit a test message
    payload = {
        "name": "Email Test User",
        "email": "emailtest@example.com",
        "message": "This is a test to verify email behavior and persistence."
    }
    
    print("📤 Submitting test message...")
    response = requests.post(CONTACT_ENDPOINT, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        message_id = data.get('id')
        print(f"✅ Message submitted successfully: {message_id}")
        
        # Check persistence and email status
        import time
        time.sleep(1)
        
        messages_response = requests.get(MESSAGES_ENDPOINT)
        if messages_response.status_code == 200:
            messages = messages_response.json()
            
            # Find our message
            test_message = None
            for msg in messages:
                if msg.get('id') == message_id:
                    test_message = msg
                    break
            
            if test_message:
                print("\n📋 Message Details:")
                print(f"  ID: {test_message.get('id')}")
                print(f"  Name: {test_message.get('name')}")
                print(f"  Email: {test_message.get('email')}")
                print(f"  Message: {test_message.get('message')[:50]}...")
                print(f"  Created At: {test_message.get('created_at')}")
                print(f"  Email Sent: {test_message.get('email_sent')}")
                print(f"  Email Error: {test_message.get('email_error')}")
                
                # Verify the expected behavior
                email_sent = test_message.get('email_sent')
                email_error = test_message.get('email_error')
                
                if email_sent is False and email_error:
                    print("\n✅ CORRECT BEHAVIOR: Message persisted even though email failed")
                    print(f"   Email error: {email_error}")
                elif email_sent is True:
                    print("\n✅ CORRECT BEHAVIOR: Message persisted and email sent successfully")
                else:
                    print("\n❌ UNEXPECTED BEHAVIOR: Email status unclear")
                    
            else:
                print("❌ Test message not found in database")
        else:
            print(f"❌ Failed to retrieve messages: {messages_response.status_code}")
    else:
        print(f"❌ Failed to submit message: {response.status_code} - {response.text}")

if __name__ == "__main__":
    test_email_behavior()