import os
from pathlib import Path

def validate_env():
    env_path = Path(".env")
    if not env_path.exists():
        print("❌ .env file not found!")
        return

    required_keys = [
        "NEXT_PUBLIC_API_URL",
        "KITE_API_KEY",
        "KITE_API_SECRET",
        "GEMINI_API_KEY",
        "TELEGRAM_BOT_TOKEN",
        "TELEGRAM_ADMIN_CHAT_ID"
    ]

    print("🔍 Validating Environment Variables...")
    
    with open(env_path, "r") as f:
        lines = f.readlines()
        
    found_keys = {}
    for line in lines:
        if "=" in line and not line.strip().startswith("#"):
            key, val = line.split("=", 1)
            found_keys[key.strip()] = val.strip()

    errors = 0
    for key in required_keys:
        if key in found_keys:
            val = found_keys[key]
            if val:
                print(f"✅ {key}: Present")
            else:
                print(f"⚠️ {key}: Present but EMPTY")
                errors += 1
        else:
            print(f"❌ {key}: MISSING")
            errors += 1

    if errors == 0:
        print("\n✨ All required environment variables are set!")
    else:
        print(f"\n⚠️ Validation complete with {errors} issue(s).")

if __name__ == "__main__":
    validate_env()
