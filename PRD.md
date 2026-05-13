# Product Requirements Document
## InvestorBabu.com — Trading Signal Platform

**Version:** 1.0  
**Date:** May 2026  
**Status:** Phase 1 Active — Phase 2 Planned  
**Owner:** Dhaval Vadgama

---

## 1. Executive Summary

InvestorBabu is an automated trading signal platform built around the proprietary **Blue Candle indicator** on TradingView. The system detects Blue Candle signals on NSE equities using AI vision, automatically places intraday orders via Zerodha Kite API, and delivers real-time alerts via Telegram.

Phase 1 (current) serves the internal team — signal detection, order execution, P&L tracking.

Phase 2 (planned) opens the platform to paying subscribers who receive signals on their own broker accounts via a SaaS subscription model.

---

## 2. Problem Statement

Manual trading based on TradingView indicators requires:
- Constant chart monitoring during market hours (9:15 AM – 3:30 PM IST)
- Rapid order placement within seconds of signal detection
- Disciplined rule-following (entry, pyramid, stop-loss, exit)
- Manual P&L tracking across multiple instruments

This is mentally exhausting, error-prone, and unscalable. InvestorBabu automates the entire workflow end-to-end.

---

## 3. Target Users

### Phase 1 — Internal Admin
- **Dhaval** — Platform owner, receives all system + trade alerts
- **Suchit** — Broker account owner (Zerodha IW8682), receives trade alerts
- **Eashaan** — Team member, receives trade alerts

### Phase 2 — Subscribers
- Retail traders who follow the Blue Candle strategy
- Professionals who want automated signal-to-order execution
- Passive investors who want algo-assisted intraday trading

---

## 4. Core Features

### 4.1 Signal Detection Engine
- Screenshots TradingView charts every 15 minutes during market hours
- Uses Gemini Vision (primary) + Anthropic Claude (fallback) for Blue Candle detection
- Verifies signal date matches today (rejects stale signals)
- Enforces 2-hour signal age limit (3 hours for 9:15 AM opening candles)
- Checks price proximity (skips if within 0.3% of High/Low — avoids immediate fills)
- Checks spread width (skips if spread > 0.8%)
- Deduplicates — one signal per instrument per day

### 4.2 Order Execution Engine
- Places LIMIT BUY at Blue Candle High
- Places LIMIT SELL at Blue Candle Low
- Capital per trade: ₹10,000 (configurable)
- Quantity auto-calculated: floor(₹10,000 / entry price)
- Sets GTT OCO (One Cancels Other) for auto-exit:
  - Target: +1% from entry
  - Stop-Loss: opposite leg level
- MIS product — Zerodha auto-squares at 3:20 PM as backup

### 4.3 Trade Tracking & P&L
- Zerodha postback webhook at `https://api.investorbabu.com/kite/postback`
- Real-time order fill notifications via Telegram
- Daily P&L summary at 3:30 PM — verified against Zerodha trade book
- Local trade log: `trades_YYYYMMDD.json`

### 4.4 Telegram Alerts
- **Admin only** (Dhaval): Scanner start/stop, system errors, restarts
- **All 3 members**: Blue Candle signals, order placements, fills, daily P&L
- First scanner start of the day → all 3 members
- Subsequent restarts → Dhaval only

### 4.5 Admin Dashboard (Phase 1)
- Live signal feed
- Trade history with P&L
- System health status
- Log viewer
- Instrument management
- Configuration panel

---

## 5. Technical Architecture

```
┌─────────────────────────────────────────────────┐
│                  investorbabu.com                │
│              (React Frontend — Phase 2)          │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│           api.investorbabu.com (Flask)           │
│  /kite/postback  /api/*  /health                 │
└──────┬──────────────────────┬────────────────────┘
       │                      │
┌──────▼──────┐    ┌──────────▼──────────┐
│  Zerodha    │    │   Bluecandle Engine  │
│  Kite API   │    │   main.py            │
│  Orders     │    │   scraper.py         │
│  GTT OCO    │    │   vision.py          │
│  Trade book │    │   trade_engine.py    │
└─────────────┘    │   trade_tracker.py   │
                   │   postback_server.py │
                   └──────────┬───────────┘
                              │
              ┌───────────────┼──────────────┐
              │               │              │
    ┌─────────▼──┐  ┌────────▼───┐  ┌──────▼──────┐
    │ TradingView │  │  Gemini    │  │  Telegram   │
    │ Screenshots │  │  Vision    │  │  Bot        │
    │ (Playwright)│  │ (Primary)  │  │  Alerts     │
    └─────────────┘  └────────────┘  └─────────────┘
```

**Server:** 160.250.204.141 (AlmaLinux 8.10, dedicated)  
**Domain:** investorbabu.com (Cloudflare, SSL via CWP Pro)  
**Python:** 3.11  
**Key libraries:** playwright, kiteconnect, google-genai, anthropic, flask, python-dotenv

---

## 6. Instrument Coverage

### Current (Phase 1)
| Symbol | Exchange | Segment |
|--------|----------|---------|
| TATASTEEL | NSE | Equity |
| HAVELLS | NSE | Equity |
| POLYCAB | NSE | Equity |
| DLF | NSE | Equity |
| ADANIENSOL | NSE | Equity |

### Planned (Phase 2)
- Expand to 10–15 NSE large caps
- MCX commodities (GOLD, SILVER, CRUDEOIL)
- Bank Nifty options (requires separate risk framework)

---

## 7. Trade Rules (Blue Candle Strategy)

```
When Blue Candle detected on instrument X:
  High (H) = top of Blue Candle body
  Low  (L) = bottom of Blue Candle body

BUY LEG:
  Entry:     Limit BUY at H (break above)
  Lot 1:     floor(₹10,000 / H) shares
  Target:    H × 1.01 (+1%)
  Stop-Loss: L
  Pyramid:   If price hits H+1%, add 2× lots more

SELL LEG:
  Entry:     Limit SELL at L (break below)
  Lot 1:     floor(₹10,000 / L) shares
  Target:    L × 0.99 (-1%)
  Stop-Loss: H
  Pyramid:   If price hits L-1%, add 2× lots more

When one leg pyramids → cancel the other leg
Force exit: 3:20 PM IST (Zerodha MIS auto-square)
```

---

## 8. Risk Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Capital per trade | ₹10,000 | Limits single trade exposure |
| Max spread | 0.8% | Ensures adequate risk/reward |
| Signal age limit | 2 hours (3 hrs for 9:15 AM) | Avoids stale signals |
| Price proximity | 0.3% buffer | Avoids immediate fills at wrong price |
| Product type | MIS (intraday) | Auto-squared, no overnight risk |
| GTT OCO | Target +1%, SL at opposite level | Automated exit, no monitoring needed |

---

## 9. Daily Operations

### Morning Routine (Before 9:15 AM IST)
1. Run `morning_start.sh` on Mac
   - Exports TradingView cookies (browser opens, already logged in → press Enter)
   - Gets Zerodha Kite token (browser opens → login + TOTP)
   - Copies both to server
   - Restarts scanner + postback server

### During Market Hours (9:15 AM – 3:30 PM IST)
- Scanner runs automatically every 15 minutes
- Signals detected → orders placed → Telegram alerts sent
- No manual intervention required

### End of Day (3:30 PM IST)
- Daily P&L summary sent to all 3 members
- P&L verified against Zerodha trade book
- All MIS positions auto-squared by Zerodha at 3:20 PM

---

## 10. Phase 2 — Subscription Model

### Overview
Open the platform to paying subscribers. Each subscriber connects their own Zerodha (or other broker) account. Signals are detected centrally and orders are placed on each subscriber's account.

### Subscription Tiers

| Tier | Price | Instruments | Features |
|------|-------|-------------|---------|
| **Starter** | ₹999/month | 3 stocks | Telegram alerts only, manual trading |
| **Growth** | ₹2,499/month | 5 stocks | Dashboard access, basic analytics |
| **Pro** | ₹4,999/month | All stocks | Full dashboard, auto-execution, priority support |

### Client Onboarding Flow
```
1. User signs up at investorbabu.com
2. Selects plan + payment (Razorpay)
3. Connects broker account:
   - Enters Kite API key + secret
   - Authorises via OAuth
4. Selects instruments to trade
5. Sets capital per trade (min ₹5,000, max ₹50,000)
6. Receives welcome + first signal on Telegram
```

### Multi-Tenant Architecture (Phase 2)
```
Signal detected (central)
    → For each active subscriber:
        → Check their broker connection is valid
        → Check they have this instrument enabled
        → Check their capital settings
        → Place order on THEIR account
        → Send THEM a Telegram alert
        → Log to THEIR trade history
```

### Compliance Considerations
- SEBI registration requirement for algo trading services
- Each subscriber must have their own SEBI-registered broker account
- Platform provides signals/automation tool — not investment advice
- Disclaimer required: "Past performance does not guarantee future results"
- SEBI static IP mandate: each subscriber's orders placed from registered IP

---

## 11. Admin Dashboard — Feature Requirements

### 11.1 Overview Page
- Today's aggregate P&L (all instruments)
- Active positions count
- Signals fired today
- Total capital deployed today
- System health indicators (scanner, postback, Kite, Gemini)
- P&L chart for current day

### 11.2 Signals Page
- All signals detected today + historical
- Filter by date, instrument, status
- Signal details: time, H, L, spread, confidence, age at detection
- Status: TRADED / SKIPPED (with reason) / PENDING

### 11.3 Trades Page
- All trades with entry/exit prices
- P&L per trade + running total
- Source: Zerodha verified vs local log
- Date range filter
- Export CSV

### 11.4 System Logs
- Live tail of bluecandle.log
- Filter by level (INFO/WARNING/ERROR)
- Color coded display

### 11.5 Configuration
- Trade parameters (capital, spread limit, age limit)
- Instrument management (add/remove/toggle)
- API key management (masked)
- Telegram routing config
- Scanner controls (start/stop/restart)

---

## 12. Success Metrics

### Phase 1 (Internal)
- Signal detection accuracy > 95%
- Order placement within 30 seconds of signal detection
- Zero missed signals during market hours
- Daily P&L summary accuracy matches Zerodha

### Phase 2 (Subscription)
- Subscriber onboarding < 5 minutes
- Signal-to-order latency < 60 seconds per subscriber
- 99.5% uptime during market hours
- Subscriber retention > 80% month-over-month

---

## 13. Open Questions

1. SEBI registration — required before Phase 2 launch?
2. Broker integrations for Phase 2 — Zerodha only or also Angel One, Upstox?
3. Payment gateway — Razorpay or Cashfree?
4. Mobile app — Phase 3 or skip?
5. WhatsApp alerts — in addition to or instead of Telegram?
6. Backtesting module — needed before Phase 2 launch?

---

## 14. Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Signal detection live | Apr 2026 | ✅ Done |
| Zerodha auto-execution | May 2026 | ✅ Done |
| Postback P&L tracking | May 2026 | ✅ Done |
| Admin dashboard | Jun 2026 | 🔄 In Progress |
| Subscriber onboarding flow | Jul 2026 | 📋 Planned |
| Phase 2 soft launch | Aug 2026 | 📋 Planned |
| Full subscription launch | Sep 2026 | 📋 Planned |

---

*Document maintained by Dhaval Vadgama. Last updated May 2026.*
