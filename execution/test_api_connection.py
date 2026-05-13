import requests
import json

def test_api():
    base_url = "https://api.investorbabu.com"
    endpoints = [
        "/api/status",
        "/api/dashboard/summary",
        "/api/stocks"
    ]

    print(f"🌐 Testing Backend Connection to {base_url}...")
    
    for ep in endpoints:
        url = f"{base_url}{ep}"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ {ep}: Success (200)")
                # Print a sample of the data
                data = response.json()
                print(f"   Data: {str(data)[:100]}...")
            else:
                print(f"❌ {ep}: Failed ({response.status_code})")
        except Exception as e:
            print(f"❌ {ep}: Error ({type(e).__name__})")

if __name__ == "__main__":
    test_api()
