# InvestorBabu Dashboard — Design Feedback & Data Instructions
## For Antigravity — Round 2

---

## 1. Design Feedback on Current Build

The structure and layout is solid. Good foundation. Now we need to push the premium feel significantly harder. Here's exactly what needs to change:

### 1.1 Glass Cards (Priority Fix)
The stat cards currently look flat and solid. They need to feel like frosted glass:

```css
/* Apply to all stat cards and surface containers */
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
```

Every card, modal, sidebar — everything should use this glass treatment.

### 1.2 Background
Currently too plain. Replace with:

```css
body {
  background: #0a0a0f;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
}
```

Subtle. Not obvious. Just adds depth.

### 1.3 Typography
Replace system fonts immediately.

```html
<!-- Add to <head> -->
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet">
```

```css
/* Headings — "Trade History", "Overview", page titles */
font-family: 'Clash Display', sans-serif;
font-weight: 600;

/* Body, labels, table data */
font-family: 'Cabinet Grotesk', sans-serif;
font-weight: 400;

/* Prices, P&L numbers, percentages */
font-family: 'JetBrains Mono', monospace;
/* Google Fonts: https://fonts.google.com/specimen/JetBrains+Mono */
```

### 1.4 Sidebar Active State
The current active item highlight is too basic. Replace with:

```css
/* Active nav item */
.nav-item.active {
  background: rgba(0, 212, 255, 0.08);
  border-left: 2px solid #00d4ff;
  color: #00d4ff;
  border-radius: 0 8px 8px 0;
}

/* Inactive hover */
.nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #f8fafc;
}
```

### 1.5 Stat Cards — Numbers
Numbers are too small and lack visual weight. Fix:

```css
.stat-value {
  font-family: 'Clash Display', sans-serif;
  font-size: 2rem;        /* was too small */
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 8px;
}
```

Add count-up animation on page load for all numeric values:
```javascript
// Use countUp.js or implement simple vanilla counter
// Numbers should animate from 0 to final value over 800ms on mount
```

### 1.6 Table Polish
```css
/* Table header */
thead th {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475569;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 12px 16px;
}

/* Table rows */
tbody tr {
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.15s ease;
}

tbody tr:hover {
  background: rgba(255,255,255,0.03);
}

/* P&L positive */
.pnl-positive { color: #10b981; font-family: 'JetBrains Mono'; }

/* P&L negative */
.pnl-negative { color: #ef4444; font-family: 'JetBrains Mono'; }

/* Return % */
.return-positive { color: #10b981; font-size: 0.85rem; }
.return-negative { color: #ef4444; font-size: 0.85rem; }
```

### 1.7 BUY/SELL Badges
```css
.badge-buy {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 6px;
}

.badge-sell {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 6px;
}
```

### 1.8 Scanner Active Indicator
```css
.scanner-active {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  font-size: 0.75rem;
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Animated pulse dot */
.pulse-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
```

---

## 2. Missing Features to Add

- **Date range picker** — wire up the button, filter table by selected range
- **Export CSV** — download trades as CSV file
- **Pagination** — table should paginate (25 rows per page)
- **Loading states** — skeleton loaders while data fetches, not blank screens
- **Empty state** — "No trades yet" illustration when table is empty

---

## 3. Real Data — Hard Insert Friday & Monday

**Remove ALL dummy/mock data immediately.** The dashboard must show only real trades.

Here are the actual verified trade figures from Zerodha:

### Friday 8 May 2026 — Actual P&L

| Date | Stock | Side | Entry | Exit | Qty | Capital | P&L | Return% |
|------|-------|------|-------|------|-----|---------|-----|---------|
| 2026-05-08 | TATASTEEL | BUY | ₹217.50 | ₹219.68 | 45 | ₹9,788 | +₹98.10 | +1.00% |
| 2026-05-08 | POLYCAB | BUY | ₹9,150.00 | ₹9,241.50 | 1 | ₹9,150 | +₹91.50 | +1.00% |
| 2026-05-08 | HAVELLS | SELL | ₹1,264.00 | ₹1,251.36 | 7 | ₹8,848 | +₹88.48 | +1.00% |
| 2026-05-08 | DLF | BUY | ₹614.00 | ₹620.14 | 16 | ₹9,824 | +₹98.24 | +1.00% |
| 2026-05-08 | ADANIENSOL | SELL | ₹1,380.00 | ₹1,248.80 | 7 | ₹9,660 | -₹917.40 | -9.50% |

**Friday Net P&L: -₹541.08**
*(Note: ADANIENSOL was a significant loss that day due to stale signal — age check was not yet active)*

### Monday 11 May 2026 — Actual P&L (from Zerodha verified)

| Date | Stock | Side | Entry | Exit | Qty | Capital | P&L | Return% |
|------|-------|------|-------|------|-----|---------|-----|---------|
| 2026-05-11 | TATASTEEL | BUY+SELL | ₹213.40 | ₹213.20 | 46 | ₹9,816 | -₹0.92 | -0.01% |
| 2026-05-11 | ADANIENSOL | SELL | ₹1,308.00 | ₹1,298.40 | 7 | ₹9,156 | +₹67.20 | +0.73% |

**Monday Net P&L: +₹66.28**

---

## 4. Data Hygiene Rules

**Hard rules — no exceptions:**

1. **No dummy data anywhere** — not in components, not in fallbacks, not in loading states
2. **No hardcoded mock arrays** — all data must come from the API or be empty
3. **Empty states are fine** — show "No data yet" rather than fake data
4. **Stat cards show 0 or —** when there is no real data for the day
5. **From tomorrow (12 May 2026 onwards)** — all data flows live from the API:
   - Trades: `GET /api/trades`
   - Signals: `GET /api/signals`
   - P&L: pulled from Zerodha via `GET /api/dashboard/summary`

---

## 5. Dashboard Goes Live After 1 Week of Real Data

Do not share the dashboard URL publicly until **19 May 2026** at the earliest.

Between now and then:
- Real data accumulates daily
- Any bugs in data display get caught internally
- Design polish is completed
- All dummy data is fully removed

---

## 6. Summary Checklist

### Design
- [ ] Glass cards with backdrop-filter blur
- [ ] Background gradient mesh
- [ ] Clash Display + Cabinet Grotesk + JetBrains Mono fonts
- [ ] Sidebar active state with cyan left border
- [ ] Stat card numbers larger + count-up animation
- [ ] Table row hover states
- [ ] BUY/SELL badges updated to spec
- [ ] Scanner pulse animation

### Data
- [ ] All dummy/mock data removed
- [ ] Friday 8 May data hard-inserted (table above)
- [ ] Monday 11 May data hard-inserted (table above)
- [ ] All API endpoints wired to real backend
- [ ] Empty states for days with no trades
- [ ] Date range filter working

---

*Feedback from Dhaval — May 2026*
