# InvestorBabu.com — Backend Dashboard
## Instructions for Antigravity

**Project:** investorbabu.com admin dashboard + client portal  
**Stack:** React + Tailwind (or Next.js) — your call based on complexity  
**Design Direction:** Apple-style frosted glass UI, premium animated dashboard  
**Server:** 160.250.204.141 (AlmaLinux, Apache, CWP Pro)  
**Domain:** investorbabu.com (SSL active, Cloudflare DNS)

---

## Design Philosophy

Think Apple meets Bloomberg Terminal. Dark background, frosted glass cards, subtle motion, premium typography. Every interaction should feel considered. No generic SaaS templates.

**Palette:**
- Background: `#0a0a0f` (near black, deep navy undertone)
- Surface: `rgba(255,255,255,0.05)` with `backdrop-filter: blur(20px)`
- Border: `rgba(255,255,255,0.08)`
- Accent: `#00d4ff` (electric cyan) + `#7c3aed` (deep violet)
- Success: `#10b981` | Warning: `#f59e0b` | Danger: `#ef4444`
- Text primary: `#f8fafc` | Text secondary: `#94a3b8`

**Typography:**
- Display: `Clash Display` or `Cabinet Grotesk`
- Body: `DM Sans` or `Geist`
- Mono (for prices/data): `JetBrains Mono`

**Motion principles:**
- Page transitions: 300ms ease-out fade + subtle Y translate
- Cards: staggered reveal on load (50ms delay between each)
- Numbers: count-up animation on first render
- Hover: subtle scale(1.01) + shadow lift on cards
- No jarring or flashy animations — refined, purposeful motion only

---

## Phase 1 — Admin Dashboard (Build Now)

### Route Structure
```
/                    → redirect to /dashboard
/login               → admin login
/dashboard           → main overview
/dashboard/signals   → live signal feed
/dashboard/trades    → trade history + P&L
/dashboard/positions → open positions
/dashboard/stocks    → manage instruments
/dashboard/logs      → system logs
/settings            → config + API keys
```

---

### Page Specs

#### 1. Login Page
- Full bleed dark background with animated gradient mesh
- Frosted glass card centered
- Logo + "InvestorBabu" wordmark at top
- Email + Password fields (styled, not default browser)
- "Sign in" CTA button — cyan gradient, subtle glow on hover
- No "forgot password" for now (admin only)

#### 2. Dashboard — Main Overview
Top stats row (4 cards in glass panels):
- **Today's P&L** — large number, green/red, count-up animation
- **Active Positions** — count with live pulse indicator
- **Signals Today** — count with instrument breakdown
- **Capital Deployed** — Rs amount

Below: two-column layout
- Left (60%): **Live Signal Feed** — scrollable, real-time updates
- Right (40%): **Quick P&L Chart** — sparkline or area chart for today

Footer bar: System status — Scanner ✅ | Postback ✅ | Kite ✅ | Gemini ✅

#### 3. Signals Page
Table with columns:
`Time | Instrument | High | Low | Spread | Confidence | Status | Orders`

Status badges: `DETECTED` `TRADED` `SKIPPED (stale)` `SKIPPED (spread)` `SKIPPED (duplicate)`

Filterable by date, instrument, status. Click row → expand to show full trade details.

#### 4. Trades Page
Full trade history pulled from Zerodha + local logs.

Table: `Date | Stock | Side | Entry | Exit | Qty | Capital | P&L | Return%`

Top summary bar: Total P&L | Win Rate | Avg Return | Best Day | Worst Day

Date range picker. Export to CSV button.

#### 5. Positions Page
Live open positions (if any). During market hours shows real-time P&L.
After 3:30 PM shows "No open positions — all MIS squared off."

#### 6. Stocks Page
Manage the 5 instruments being scanned.
Table: `Symbol | Exchange | Status | Last Signal | Active`
Toggle active/inactive per stock. Add new stock (symbol search).

#### 7. System Logs Page
Tail of `bluecandle.log` — live streaming via WebSocket or polling.
Filter by level: INFO | WARNING | ERROR
Color coded: INFO (white) | WARNING (amber) | ERROR (red)
Auto-scroll toggle.

#### 8. Settings Page
Sections:
- API Keys (Kite, Gemini, Anthropic) — masked, show/hide toggle
- Trade Config (capital per trade, spread limit, age limit)
- Telegram (bot token, chat IDs per role)
- Instruments (same as Stocks page)
- Danger Zone (restart scanner, clear daily state)

---

## API Endpoints Needed from Backend

The frontend talks to a Flask API already running at `https://api.investorbabu.com`.

Add these endpoints:

```
GET  /api/dashboard/summary       → today's P&L, positions, signals count
GET  /api/signals?date=&status=   → signal history
GET  /api/trades?from=&to=        → trade history from Zerodha + local log
GET  /api/positions                → open positions (live)
GET  /api/logs?lines=100          → last N log lines
GET  /api/status                  → scanner/postback/kite/gemini health
POST /api/scanner/restart         → restart scanner
POST /api/scanner/stop            → stop scanner
GET  /api/stocks                  → list instruments
POST /api/stocks                  → add instrument
PUT  /api/stocks/:symbol          → toggle active
```

All endpoints return JSON. Auth via Bearer token in header.

---

## Phase 2 — Client Portal (Future, Design Now)

> Design the shell now. Wire it up when subscription model goes live.

### Client Routes
```
/client/login        → subscriber login
/client/dashboard    → their signal feed (read only)
/client/trades       → their trade history (manual entry or broker link)
/client/alerts       → notification preferences
/client/subscription → plan details, billing, upgrade
/client/profile      → account settings
```

### Subscription Tiers (for reference when designing)

| Tier | Price | Features |
|------|-------|---------|
| Starter | ₹999/month | Telegram alerts only, 3 stocks |
| Growth | ₹2,499/month | Dashboard access, 5 stocks, basic analytics |
| Pro | ₹4,999/month | Full dashboard, all stocks, auto-execution, priority support |

---

## Component Library Checklist

Build these reusable components:

- `<GlassCard>` — frosted glass container with optional glow border
- `<StatCard>` — metric display with label, value, delta, sparkline
- `<SignalBadge>` — status pill with color
- `<PriceTag>` — price display with green/red colouring
- `<LiveDot>` — animated pulse indicator for live data
- `<DataTable>` — sortable, filterable table with glass styling
- `<LineChart>` — P&L chart using Recharts or D3
- `<LogViewer>` — terminal-style log display
- `<Toggle>` — iOS-style toggle switch
- `<Modal>` — glass overlay modal

---

## Technical Notes

- Backend Flask API is already live at `https://api.investorbabu.com`
- Python 3.11, Kite Connect 5.2, Gemini Vision, Anthropic (fallback)
- Scanner runs at `/home/investo/bluecandle/main.py`
- Logs at `/home/investo/bluecandle/bluecandle.log`
- Trade data at `/home/investo/bluecandle/trades_YYYYMMDD.json`
- Signals state at `/home/investo/bluecandle/signals.json`
- Deploy frontend build to `/home/investo/public_html/`
- Apache serves `investorbabu.com` → `/home/investo/public_html/`

---

## Deliverables Expected

1. Figma mockup or direct code (your call)
2. React component library (the ones listed above)
3. All 8 admin pages fully built
4. Client portal shell (login + dashboard + subscription page)
5. Responsive — works on desktop + tablet (mobile is secondary for admin)
6. README with setup instructions

---

## Questions to Resolve Before Starting

1. Next.js or pure React + Vite?
2. Auth method — JWT stored in httpOnly cookie or localStorage?
3. Real-time data — WebSocket or polling (SSE)?
4. Charting library preference — Recharts, Chart.js, or D3?
5. Do you want the API endpoints built as part of this scope or just frontend?
