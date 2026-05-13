import json
import re
from datetime import datetime

def parse_history(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find blocks: Name, [DD.MM.YYYY HH:mm]\nText
    # We look for lines starting with a name followed by a date in brackets
    blocks = re.split(r'\n(?=[^,\n]+, \[\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}\])', content)
    
    history = []
    
    admin_ids = ["945073334"]
    trade_ids = ["945073334", "1488710204", "929350168"]

    for block in blocks:
        match = re.match(r'^([^,\n]+), \[(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})\]\n(.*)', block, re.DOTALL)
        if match:
            sender, dd, mm, yyyy, hh, minute, text = match.groups()
            
            # We only care about messages from the bot "tradbot"
            if "tradbot" not in sender.lower():
                continue
                
            timestamp = f"{yyyy}-{mm}-{dd}T{hh}:{minute}:00"
            text = text.strip()
            
            # Heuristic to determine recipients
            target_ids = admin_ids
            if any(kw in text for kw in ["BLUE CANDLE SIGNAL", "ORDERS PLACED", "DAILY SUMMARY", "ORDER FILLED"]):
                target_ids = trade_ids
            
            history.append({
                "timestamp": timestamp,
                "chat_ids": target_ids,
                "text": text
            })

    # Sort by timestamp ascending
    history.sort(key=lambda x: x['timestamp'])
    
    return history

if __name__ == "__main__":
    input_file = "/Users/apple/Documents/gemini/antigravity/scratch/investorbabu/bluecandle-brain/telegram-bot-history.md"
    output_file = "/Users/apple/Documents/gemini/antigravity/scratch/investorbabu/scratch/telegram_history.json"
    
    parsed_data = parse_history(input_file)
    with open(output_file, 'w') as f:
        json.dump(parsed_data, f, indent=2)
    
    print(f"Parsed {len(parsed_data)} messages.")
