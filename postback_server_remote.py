"""
postback_server.py — Receives real-time order updates from Zerodha.

Zerodha sends a POST request to this server whenever an order status changes.
We then send a Telegram notification and log the trade.

Setup:
1. Run this server on port 5000
2. Set Postback URL in Kite developer console to:
   https://api.investorbabu.com/kite/postback
3. Apache proxy forwards api.investorbabu.com → localhost:5000

Runs alongside main.py as a separate process.
"""

import json
import logging
import os
from datetime import datetime, timezone, timedelta
from flask import Flask, request, jsonify
from telegram_bot import send_trade_message, send_message
from kite_token import get_kite_client
from config import INSTRUMENTS

app = Flask(__name__)
logging.basicConfig(
    level   = logging.INFO,
    format  = "%(asctime)s  %(levelname)s  %(message)s",
    handlers= [
        logging.FileHandler("postback.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

IST = timezone(timedelta(hours=5, minutes=30))

# Track orders we placed today (loaded from signals.json)
def load_our_orders():
    """Load order IDs we placed today from signals.json."""
    try:
        if os.path.exists("signals.json"):
            with open("signals.json") as f:
                data = json.load(f)
                orders = {}
                for signal in data.get("signals", []):
                    if signal.get("buy_order_id"):
                        orders[str(signal["buy_order_id"])] = {
                            "symbol":           signal["instrument"],
                            "transaction_type": "BUY",
                            "entry_price":      signal["high"],
                            "quantity":         signal.get("quantity", 0),
                            "target_price":     signal["buy_target"],
                            "stop_loss_price":  signal["low"],
                        }
                    if signal.get("sell_order_id"):
                        orders[str(signal["sell_order_id"])] = {
                            "symbol":           signal["instrument"],
                            "transaction_type": "SELL",
                            "entry_price":      signal["low"],
                            "quantity":         signal.get("quantity", 0),
                            "target_price":     signal["sell_target"],
                            "stop_loss_price":  signal["high"],
                        }
                return orders
    except Exception as e:
        logger.error(f"Error loading orders: {e}")
    return {}


def save_trade_log(trade: dict):
    """Append trade to daily log file."""
    today    = datetime.now(IST).strftime("%Y%m%d")
    log_file = f"trades_{today}.json"

    trades = []
    if os.path.exists(log_file):
        with open(log_file) as f:
            trades = json.load(f)

    trades.append(trade)
    with open(log_file, "w") as f:
        json.dump(trades, f, indent=2)


@app.route("/kite/postback", methods=["POST"])
def kite_postback():
    """Receive order update from Zerodha."""
    try:
        data = request.get_json(force=True) or request.form.to_dict()
        logger.info(f"Postback received: {json.dumps(data)}")

        order_id   = str(data.get("order_id", ""))
        status     = data.get("status", "")
        symbol     = data.get("tradingsymbol", "")
        filled_qty = data.get("filled_quantity", 0)
        avg_price  = float(data.get("average_price", 0))
        tx_type    = data.get("transaction_type", "")

        if not order_id or not status:
            return jsonify({"status": "ignored"}), 200

        # Load our orders to check if this is our order
        our_orders = load_our_orders()
        our_order  = our_orders.get(order_id)

        now_str = datetime.now(IST).strftime("%d %b, %I:%M %p IST")

        if status == "COMPLETE":
            entry_price = our_order["entry_price"] if our_order else avg_price
            quantity    = our_order["quantity"] if our_order else filled_qty

            # Calculate P&L
            if tx_type == "BUY":
                pnl = (avg_price - entry_price) * quantity
            else:
                pnl = (entry_price - avg_price) * quantity

            pnl_pct   = round((abs(pnl) / (entry_price * quantity)) * 100, 2) if entry_price else 0
            pnl_emoji = "✅" if pnl >= 0 else "❌"

            msg = (
                f"{pnl_emoji} <b>ORDER FILLED — {symbol}</b>\n\n"
                f"{'📈' if tx_type == 'BUY' else '📉'} {tx_type} completed\n"
                f"Entry    : Rs {entry_price:.2f}\n"
                f"Exit     : Rs {avg_price:.2f}\n"
                f"Quantity : {quantity} shares\n"
                f"P&L      : Rs {pnl:+.2f} ({'+' if pnl >= 0 else ''}{pnl_pct}%)\n"
                f"Time     : {now_str}"
            )
            send_trade_message(msg)

            # Save to trade log
            save_trade_log({
                "order_id":         order_id,
                "symbol":           symbol,
                "transaction_type": tx_type,
                "entry_price":      entry_price,
                "exit_price":       avg_price,
                "quantity":         quantity,
                "pnl":              round(pnl, 2),
                "status":           "COMPLETE",
                "time":             now_str,
            })

        elif status == "CANCELLED":
            msg = (
                f"🚫 <b>ORDER CANCELLED — {symbol}</b>\n\n"
                f"{tx_type} order cancelled\n"
                f"Time: {now_str}"
            )
            send_trade_message(msg)

        elif status == "REJECTED":
            reason = data.get("status_message", "Unknown")
            msg = (
                f"⛔ <b>ORDER REJECTED — {symbol}</b>\n\n"
                f"{tx_type} order rejected\n"
                f"Reason: {reason}\n"
                f"Time: {now_str}"
            )
            send_message(msg)  # Admin only for rejections

        logger.info(f"Postback processed: {symbol} {tx_type} {status}")
        return jsonify({"status": "ok"}), 200

    except Exception as e:
        logger.error(f"Postback error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/kite/reconcile", methods=["GET"])
def reconcile_trades():
    """Fetch actual P&L and trades directly from Zerodha for today."""
    try:
        kite      = get_kite_client()
        positions = kite.positions().get("net", [])
        trades    = kite.trades()

        # Map positions for easy lookup
        pos_map = {p["tradingsymbol"]: p for p in positions}
        
        symbol_stats = {}
        # Use trades to identify what was active today
        for t in trades:
            symbol = t["tradingsymbol"]
            if symbol not in INSTRUMENTS:
                continue

            if symbol not in symbol_stats:
                pos = pos_map.get(symbol, {})
                symbol_stats[symbol] = {
                    "symbol": symbol,
                    "pnl": round(pos.get("pnl", 0), 2),
                    "buy_val": round(pos.get("buy_value", 0), 2),
                    "sell_val": round(pos.get("sell_value", 0), 2),
                    "avg_price": pos.get("average_price", 0),
                    "last_price": pos.get("last_price", 0),
                    "trades": []
                }
            
            symbol_stats[symbol]["trades"].append({
                "order_id": t["order_id"],
                "type": t["transaction_type"],
                "qty": t["quantity"],
                "price": t["average_price"],
                "time": str(t["exchange_timestamp"])
            })

        # Add any active positions that didn't have trades today
        for symbol, p in pos_map.items():
            if symbol in INSTRUMENTS and symbol not in symbol_stats:
                symbol_stats[symbol] = {
                    "symbol": symbol,
                    "pnl": round(p.get("pnl", 0), 2),
                    "buy_val": round(p.get("buy_value", 0), 2),
                    "sell_val": round(p.get("sell_value", 0), 2),
                    "avg_price": p.get("average_price", 0),
                    "last_price": p.get("last_price", 0),
                    "trades": []
                }

        results = list(symbol_stats.values())

        return jsonify({
            "status": "ok",
            "date": datetime.now(IST).strftime("%Y-%m-%d"),
            "kite_data": results
        }), 200

    except Exception as e:
        logger.error(f"Reconcile error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/kite/instruments", methods=["GET", "POST"])
def manage_instruments():
    """List or add instruments to instruments.json."""
    path = os.path.join(os.path.dirname(__file__), 'instruments.json')
    
    if request.method == "POST":
        try:
            data = request.get_json(force=True)
            symbol = data.get("symbol", "").upper().strip()
            name   = data.get("name", symbol)
            
            if not symbol:
                return jsonify({"error": "Symbol is required"}), 400
                
            with open(path, "r") as f:
                instruments = json.load(f)
            
            # Add new instrument (e.g. "INFY" -> "NSE:INFY")
            full_symbol = f"NSE:{symbol}" if ":" not in symbol else symbol
            instruments[symbol] = full_symbol
            
            with open(path, "w") as f:
                json.dump(instruments, f, indent=4)
                
            # Reload INSTRUMENTS in memory (for this process)
            global INSTRUMENTS
            INSTRUMENTS = instruments
            
            logger.info(f"Added instrument: {symbol} ({full_symbol})")
            return jsonify({"status": "ok", "message": f"Added {symbol}"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            
    # GET method
    try:
        if os.path.exists(path):
            with open(path) as f:
                return jsonify(json.load(f)), 200
        return jsonify({}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({
        "status":  "ok",
        "time":    datetime.now(IST).strftime("%d %b %Y %I:%M %p IST"),
        "service": "Bluecandle Postback Server"
    }), 200


@app.route("/", methods=["GET"])
def index():
    return jsonify({"service": "investorbabu.com API", "status": "running"}), 200


if __name__ == "__main__":
    logger.info("Starting Bluecandle Postback Server on port 5000...")
    app.run(host="0.0.0.0", port=5000, debug=False)
