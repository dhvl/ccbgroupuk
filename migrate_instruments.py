import json
import os

# Initial instruments from config.py
INSTRUMENTS = {
    "TATASTEEL":  "NSE:TATASTEEL",
    "HAVELLS":    "NSE:HAVELLS",
    "POLYCAB":    "NSE:POLYCAB",
    "DLF":        "NSE:DLF",
    "ADANIENSOL": "NSE:ADANIENSOL",
}

def migrate():
    with open('instruments.json', 'w') as f:
        json.dump(INSTRUMENTS, f, indent=4)
    print("Migrated instruments to instruments.json")

if __name__ == "__main__":
    migrate()
