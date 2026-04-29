# CCB Group UK Ltd — Website Specification
**Document Version:** 1.0 | **Prepared:** April 2026  
**Client:** CCB Group (UK) Limited | **Domain:** www.ccbgroupuk.com  
**Reference Sites:** aspect.co.uk · kgelectricalcontractors.co.uk · ccbproperties.com (old)

---

## 1. Project Overview

CCB Group UK Ltd is a multi-trade property services and maintenance contractor operating across London, Hertfordshire, Bedfordshire, and Essex. The new site must position CCB as a credible, professional, and responsive contractor — communicating trust (via accreditations), range of services (including the Gutter Cleaning Co sub-brand), and ease of contact.

**Brand Colours (from existing materials):**
- Primary Navy: `#1E2A6E`
- Accent Red: `#E0131A`
- Accent Cyan: `#00AEEF`
- Accent Pink/Magenta: `#D4006A`
- Neutral Light Grey: `#EFF1F7`
- White: `#FFFFFF`

**Typography Recommendations:**
- Headings: `Montserrat ExtraBold` or `Barlow Condensed Bold` (strong, trade/industrial feel)
- Body: `Source Sans 3` or `Nunito Sans` (clean, readable)

---

## 2. Site Architecture & Navigation

### Primary Navigation Menu

```
[ LOGO ]   Home   Services ▾   Gutter Cleaning   Areas   About   Gallery   Contact   [ GET A QUOTE → ]
```

### Full Menu Tree

```
├── Home
├── Services
│   ├── Electrical Testing & Maintenance
│   ├── General Maintenance
│   ├── Roofing Works
│   ├── Refurbishment & Decorating
│   ├── Carpentry & Fencing
│   ├── Plumbing
│   ├── Brick Work & Plastering
│   ├── Power Washing
│   └── Site Inspections
├── Gutter Cleaning Co  ← Sub-brand page (Gutter Cleaning Co logo treatment)
├── Areas We Cover
├── About Us
│   ├── Our Story
│   └── Accreditations
├── Gallery / Case Studies
├── Blog / News           ← SEO driver (see Section 9)
├── FAQs
└── Contact Us
```

### Sticky Header Behaviour
- Desktop: Logo left, nav centre, `GET A QUOTE` CTA button right (navy bg, white text)
- Mobile: Hamburger menu; phone number always visible as click-to-call
- Scrolled state: background becomes solid navy with drop shadow

---

## 3. Page-by-Page Content & Image Placeholders

---

### 3.1 HOME PAGE

#### Hero Section
```
[IMAGE PLACEHOLDER — hero-home-01.jpg]
Full-width background: team on site / aerial gutter cleaning / scaffold work
Overlay: semi-transparent navy gradient (left to right)

HEADLINE:   "London's Trusted Property Maintenance Experts"
SUBHEADLINE: "Electrical · Gutters · Roofing · Plumbing · Refurbishment — all under one roof"
CTA BUTTONS:
  [ GET A FREE QUOTE ]   [ CALL 01727 614464 ]
```

#### Trust Bar (below hero)
```
[ TrustMark Logo ]  [ CHAS Accredited Logo ]  [ NICEIC Approved Logo ]
[ VAT Reg: 284 6962 52 ]  [ 5★ Google Rating ]
```
> **Image placeholders:** `logo-trustmark.png` · `logo-chas.png` · `logo-niceic.png`

#### "Why Choose CCB?" — 4-Column Icons
```
Icon: Shield        → "Fully Accredited"   — TrustMark, CHAS & NICEIC approved
Icon: Clock         → "Fast Response"       — Call-outs from £60 + VAT
Icon: Camera        → "Before & After"      — Photo evidence on every job
Icon: Map Pin       → "Across London & Home Counties"
```

#### Services Grid (6-card preview)
```
[IMAGE: electrical-test-01.jpg]   Electrical Testing & Maintenance
[IMAGE: gutter-cleaning-01.jpg]   Gutter Cleaning & Repairs
[IMAGE: roofing-01.jpg]           Roofing Works
[IMAGE: refurb-01.jpg]            Refurbishment & Decorating
[IMAGE: plumbing-01.jpg]          Plumbing
[IMAGE: maintenance-01.jpg]       General Maintenance

→ [ VIEW ALL SERVICES ] button
```

#### Gutter Cleaning Co Feature Banner
```
[IMAGE PLACEHOLDER — gutter-banner-home.jpg]
Background: action shot of operative with gutter vac system

"Introducing Gutter Cleaning Co"
Part of CCB Group (UK) Limited

"We clean all types and all heights of gutters using our Gutter Vacs Hoover System
— with before and after camera footage on every clean."

[ GUTTER CLEANING SERVICES → ]     Discount on Multiple Blocks / Houses
```

#### Call-Out Pricing Strip
```
Solid navy background, white text
"Call-outs from £60.00 + VAT — Subject to area and trade"
[ REQUEST A CALL-OUT ]
```

#### Areas We Cover — Map Preview
```
[IMAGE PLACEHOLDER — areas-map.jpg]
Interactive Google Map embed OR styled static map
Highlighted counties: North London · East London · South London (limited)
              Hertfordshire · Bedfordshire · Essex
```

#### Testimonials / Reviews Carousel
```
[★★★★★]  "Quote here from happy client..."  — Name, Location
[★★★★★]  "Another testimonial..."           — Name, Location
[★★★★★]  "Third review..."                  — Name, Company
```
> Source from Google Reviews API or hard-coded initially

#### Contact Strip (above footer)
```
"Ready to book? Get in touch today."
Mobile: 07956 552 477  |  Mobile: 07528 233611  |  Office: 01727 614464
info@ccbgroupuk.com

[ SEND US A MESSAGE → ]  (triggers contact form modal or scrolls to contact section)
```

---

### 3.2 SERVICES LANDING PAGE

```
[IMAGE PLACEHOLDER — services-hero.jpg]
Hero: collage/montage of different trade works

H1: "Our Services"
Intro: "CCB Group UK Ltd provides a comprehensive range of property maintenance
and building services for residential, commercial, and managed properties."

Call-outs from £60 + VAT | Across London & Home Counties
```

**Service Cards (full grid — 14 services):**

| # | Service | Image Placeholder | Short Description |
|---|---------|-------------------|-------------------|
| 1 | General Maintenance | `svc-maintenance.jpg` | Reactive and planned maintenance for residential and commercial properties |
| 2 | Electrical Testing | `svc-electrical-test.jpg` | NICEIC approved periodic inspection and testing (EICR certificates) |
| 3 | Electrical Maintenance | `svc-electrical-maint.jpg` | Full electrical maintenance, fault finding, and installation works |
| 4 | Gutter Repairs & Clearances | `svc-gutters.jpg` | Gutter vac cleaning, camera inspection, and gutter repairs at all heights |
| 5 | Carpentry | `svc-carpentry.jpg` | Doors, frames, skirting, fitted furniture, and bespoke joinery |
| 6 | Roofing Works | `svc-roofing.jpg` | Flat and pitched roofing, repairs, felt work, and emergency call-outs |
| 7 | Site Inspections | `svc-inspection.jpg` | Professional property condition reports and site audits |
| 8 | Refurbishment | `svc-refurb.jpg` | Full property refurbishment — kitchens, bathrooms, full fit-outs |
| 9 | Decorating | `svc-decorating.jpg` | Interior and exterior painting and decorating |
| 10 | Plastering | `svc-plastering.jpg` | Skimming, dry-lining, artexing, and full plastering works |
| 11 | Power Washing | `svc-powerwash.jpg` | Driveway, patio, building facade, and fleet power washing |
| 12 | Brick Work | `svc-brickwork.jpg` | Repointing, new build brickwork, and repairs |
| 13 | Plumbing | `svc-plumbing.jpg` | General plumbing maintenance, leak repairs, and installations |
| 14 | Fencing | `svc-fencing.jpg` | Timber, metal, and composite fencing supply and installation |

---

### 3.3 INDIVIDUAL SERVICE PAGE TEMPLATE

*(Repeat for each of the 14 services above)*

```
[IMAGE PLACEHOLDER — svc-[name]-hero.jpg]
Hero image: relevant trade in action

H1: "[Service Name]"
Breadcrumb: Home › Services › [Service Name]

[Left Column — 70%]
  Body copy: 3–4 paragraphs explaining the service, who it's for,
             what the process looks like, and why CCB is the right choice.

  [IMAGE PLACEHOLDER — svc-[name]-detail-01.jpg]   (mid-article visual break)

  Key benefits:
  ✔ Fully qualified and insured operatives
  ✔ Before and after photographic evidence
  ✔ Emergency and planned options available
  ✔ Competitive, transparent pricing

[Right Column — 30% — Sticky Sidebar]
  ┌─────────────────────────────┐
  │  GET A QUOTE                │
  │  [Quick enquiry form]       │
  │  Name / Phone / Message     │
  │  [ SEND ENQUIRY ]           │
  │─────────────────────────────│
  │  📞 01727 614464            │
  │  📱 07956 552 477           │
  │  📧 info@ccbgroupuk.com     │
  └─────────────────────────────┘

Related Services (3 cards)
```

---

### 3.4 GUTTER CLEANING CO PAGE *(Sub-brand — Priority Page)*

```
[IMAGE PLACEHOLDER — gutter-hero-01.jpg]
Full-width hero: operative using gutter vac / before & after split

Sub-brand logo treatment: "Gutter Cleaning Co | Part of CCB Group (UK) Limited"

H1: "Professional Gutter Cleaning — All Types, All Heights"

Body:
"We clean all types and all heights of gutters using our Gutter Vacs Hoover System,
whilst using cameras to provide before and after photographs on every single job."

Service Types (3 cards):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ [IMAGE: res.jpg]│  │[IMAGE: comm.jpg]│  │[IMAGE: plan.jpg]│
│ RESIDENTIAL     │  │ COMMERCIAL      │  │ PLANNED MAINT.  │
│ Private homes & │  │ Blocks, offices │  │ Regular schedule│
│ residential     │  │ & retail units  │  │ maintenance     │
│ properties      │  │                 │  │ contracts       │
└─────────────────┘  └─────────────────┘  └─────────────────┘

Why Choose Our Gutter Vac System?
[IMAGE: gutter-vac-system.jpg]
✔ No ladders required — safer for your property
✔ Camera inspection before AND after every clean
✔ Ground-based operation — no roof access disruption
✔ Works at all heights including high-rise blocks
✔ Debris fully vacuumed and removed from site

Discount Section:
[Highlighted box — navy background]
"Discount Available on Multiple Blocks / Houses"
"Managing a portfolio? Ask us about our planned maintenance pricing."
[ REQUEST A MULTI-PROPERTY QUOTE ]

Before & After Gallery:
[IMAGE: before-01.jpg] → [IMAGE: after-01.jpg]
[IMAGE: before-02.jpg] → [IMAGE: after-02.jpg]
[IMAGE: before-03.jpg] → [IMAGE: after-03.jpg]

Contact strip:
Mobile: 07956 552 477  |  Mobile: 07528 233611  |  Office: 01727 614464
```

---

### 3.5 AREAS WE COVER

```
[IMAGE PLACEHOLDER — areas-hero.jpg]

H1: "Areas We Cover"
Intro: "Based in Hertfordshire, CCB Group serves clients across London
and the surrounding Home Counties."

[Google Maps Embed — full width, custom styled in brand colours]

Coverage Grid:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ North London │ │ East London  │ │Hertfordshire │
│  ✔ Full      │ │  ✔ Full      │ │  ✔ Full      │
└──────────────┘ └──────────────┘ └──────────────┘
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│South London  │ │Bedfordshire  │ │    Essex     │
│ ⚡ Limited   │ │  ✔ Full      │ │  ✔ Full      │
└──────────────┘ └──────────────┘ └──────────────┘

"Not sure if we cover your area? Give us a call — we'll always try to help."
Call-out pricing note: from £60.00 + VAT subject to area and trade
```

---

### 3.6 ABOUT US PAGE

```
[IMAGE PLACEHOLDER — team-01.jpg]
Hero: team photo or branded van with operatives

H1: "About CCB Group UK Ltd"

Body Copy:
Paragraph 1 — Who we are: established property maintenance company serving
              London and the Home Counties.
Paragraph 2 — Our approach: fully qualified, accredited, insured operatives;
              photo evidence on every job; responsive to both planned and reactive needs.
Paragraph 3 — Our values: transparency, quality, and reliability for private,
              commercial, and managed property clients.

[IMAGE PLACEHOLDER — van-branded.jpg]   [IMAGE PLACEHOLDER — operative-close.jpg]

KEY FIGURES (stats row):
[ 10+ Years Experience ]  [ 500+ Properties Maintained ]  [ 6 Counties Covered ]

Accreditations Section:
H2: "Our Accreditations"

[IMAGE: trustmark-logo.png]
TrustMark — Government Endorsed Quality standard for trades working in and around the home.

[IMAGE: chas-logo.png]
CHAS — Accredited Contractor status demonstrating compliance with health and safety legislation.

[IMAGE: niceic-logo.png]
NICEIC — Approved Contractor for electrical installation and testing work.

VAT Registration: 284 6962 52
```

---

### 3.7 GALLERY / CASE STUDIES

```
H1: "Our Work"
Filter tabs: [ All ] [ Electrical ] [ Gutters ] [ Roofing ] [ Refurb ] [ Other ]

Masonry / grid gallery:
[IMAGE: gallery-01.jpg] [IMAGE: gallery-02.jpg] [IMAGE: gallery-03.jpg]
[IMAGE: gallery-04.jpg] [IMAGE: gallery-05.jpg] [IMAGE: gallery-06.jpg]
... (lightbox on click)

Case Studies (optional expanded section):
┌────────────────────────────────────────────────────┐
│ [IMAGE: case-study-01.jpg]                         │
│ CASE STUDY: Commercial Gutter Clean — Block of 40  │
│ Location: North London | Services: Gutter Vac Clean│
│ Challenge / Solution / Result                      │
└────────────────────────────────────────────────────┘
```

---

### 3.8 FAQs PAGE

```
H1: "Frequently Asked Questions"

Suggested FAQ items (expandable accordion):

Q: What areas do you cover?
A: We cover North London, East London, South London (limited), Hertfordshire,
   Bedfordshire, and Essex. Call-outs start from £60 + VAT depending on area and trade.

Q: Are you accredited?
A: Yes — we are TrustMark endorsed, CHAS accredited, and NICEIC approved.

Q: Do you offer emergency call-outs?
A: Yes. Contact us on 07956 552 477 or 07528 233611 for urgent works.

Q: How does your gutter cleaning service work?
A: We use a Gutter Vacs Hoover System operated from ground level. Cameras provide
   before and after photographic evidence on every single clean.

Q: Do you offer planned maintenance contracts?
A: Yes — for commercial clients, property managers, and landlords we offer
   scheduled planned maintenance agreements.

Q: Can I get a discount for multiple properties?
A: Absolutely. We offer discounts on multiple blocks or houses. Get in touch
   for a bespoke quote.

Q: Are you VAT registered?
A: Yes. Our VAT Registration Number is 284 6962 52.

Q: What is your minimum call-out charge?
A: Call-outs start from £60.00 + VAT, subject to area and trade.
```

---

### 3.9 CONTACT PAGE

```
H1: "Get in Touch"

[Two columns]

Left Column — Contact Form (Resend-powered — see Section 7):
  Name *
  Email *
  Phone
  Service Required  [dropdown: all 14 services + Gutter Cleaning]
  Area              [dropdown: coverage areas]
  Message *
  [ SEND MESSAGE → ]

Right Column — Contact Details:
  📞 Office: 01727 614464
  📱 Mobile: 07956 552 477
  📱 Mobile: 07528 233611
  📧 info@ccbgroupuk.com
  🌐 www.ccbgroupuk.com

  Opening Hours:
  Mon–Fri: 8:00am – 6:00pm
  Saturday: 9:00am – 2:00pm
  Sunday: Emergency calls only

[Google Maps embed — office/base location]

Emergency Banner:
"For urgent works call 07956 552 477 or 07528 233611"
```

---

## 4. Footer

```
[ CCB Group Logo ]

Services:                  Gutter Cleaning:           Company:
• General Maintenance      • Residential              • About Us
• Electrical Testing       • Commercial               • Accreditations
• Gutter Repairs           • Planned Maintenance      • Gallery
• Roofing Works            • Multi-Property Discount  • FAQs
• Refurbishment                                       • Blog
• Plumbing                 Areas:                     • Contact
• All Services →           • North London
                           • East London              Follow Us:
                           • Hertfordshire            [Facebook] [Instagram]
                           • Bedfordshire             [LinkedIn] [Google]
                           • Essex

Contact:
📞 01727 614464  📱 07956 552 477  📧 info@ccbgroupuk.com

[TrustMark logo]  [CHAS logo]  [NICEIC logo]

© 2026 CCB Group (UK) Limited | VAT Reg: 284 6962 52
Privacy Policy | Cookie Policy | Terms & Conditions
```

---

## 5. Global UI Components

### 5.1 "Get a Quote" Modal / Slide-Over
Triggered from any CTA button on the site. Quick 4-field form:
- Name, Phone, Service, Message → Resend API (see Section 7)

### 5.2 Emergency Call Banner
Thin red bar at very top of page (above nav):
```
"Emergency call-outs available: 📱 07956 552 477"    [×]
```

### 5.3 WhatsApp Floating Button
Fixed bottom-right: green WhatsApp icon → links to `https://wa.me/447956552477`  
Tooltip: "Chat with us on WhatsApp"

### 5.4 Cookie Consent Banner
GDPR-compliant. Accept / Manage Preferences / Decline  
Required before loading Google Analytics and Google Maps.

### 5.5 Click-to-Call on Mobile
All phone numbers must be wrapped: `<a href="tel:+441727614464">01727 614464</a>`

### 5.6 Back to Top Button
Appears after 300px scroll. Smooth scroll. Navy circle, white arrow.

---

## 6. Image Placeholder Summary

> All images below to be replaced with real photography. Recommended: professional trade photography shoot of 1 day covering operations, team, vehicles, and completed works.

| Placeholder Filename | Page Used | Subject |
|---------------------|-----------|---------|
| `hero-home-01.jpg` | Home Hero | Team on site / aerial gutter shot |
| `gutter-banner-home.jpg` | Home Gutter Banner | Operative with gutter vac |
| `areas-map.jpg` | Home & Areas | London/counties coverage map |
| `team-01.jpg` | About Hero | Team photo |
| `van-branded.jpg` | About | CCB branded van |
| `operative-close.jpg` | About | Operative at work |
| `services-hero.jpg` | Services page | Multi-trade collage |
| `svc-[name].jpg` (×14) | Each service page | Trade-specific action shot |
| `gutter-hero-01.jpg` | Gutter Cleaning hero | Vac system in operation |
| `before-01/02/03.jpg` | Gutter before/after | Blocked gutters |
| `after-01/02/03.jpg` | Gutter before/after | Cleaned gutters |
| `gallery-01...12.jpg` | Gallery | Completed works |
| `case-study-01.jpg` | Case Studies | Featured project |
| `logo-trustmark.png` | Trust Bar, About | TrustMark logo |
| `logo-chas.png` | Trust Bar, About | CHAS logo |
| `logo-niceic.png` | Trust Bar, About | NICEIC logo |

---

## 7. Resend Email API Integration

### 7.1 Overview
All contact and quote forms on the site submit via the **Resend API** (`https://api.resend.com/emails`).  
Resend is a modern, developer-friendly transactional email service with excellent deliverability.

### 7.2 Required Resend Account Setup
1. Create account at [resend.com](https://resend.com)
2. Verify sending domain: `ccbgroupuk.com` (add DNS records: SPF, DKIM, DMARC)
3. Generate API key (store in environment variable: `RESEND_API_KEY`)
4. Set up receiving address: `info@ccbgroupuk.com`

### 7.3 Environment Variables
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=website@ccbgroupuk.com
RESEND_TO_EMAIL=info@ccbgroupuk.com
RESEND_CC_EMAIL=admin@ccbgroupuk.com   # optional secondary
```

### 7.4 API Route (Next.js / Node.js)

```javascript
// /api/contact.js  (Next.js App Router: /app/api/contact/route.js)

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, phone, service, area, message } = await request.json();

  // Validation
  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // 1. Send notification to CCB team
    await resend.emails.send({
      from: `CCB Website <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.RESEND_TO_EMAIL],
      subject: `New Enquiry: ${service || 'General'} — ${name}`,
      html: `
        <h2>New Website Enquiry</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone || 'Not provided'}</td></tr>
          <tr><td><strong>Service:</strong></td><td>${service || 'Not specified'}</td></tr>
          <tr><td><strong>Area:</strong></td><td>${area || 'Not specified'}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#666">
          Sent from CCB Group website — ${new Date().toLocaleString('en-GB')}
        </p>
      `,
    });

    // 2. Send auto-reply to customer
    await resend.emails.send({
      from: `CCB Group UK Ltd <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: 'Thank you for your enquiry — CCB Group UK Ltd',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1E2A6E;padding:20px;text-align:center">
            <img src="https://www.ccbgroupuk.com/logo.png" alt="CCB Group" height="60">
          </div>
          <div style="padding:30px">
            <h2 style="color:#1E2A6E">Thank you, ${name}!</h2>
            <p>We've received your enquiry and one of our team will be in touch
            within 1 business day.</p>
            <p>If your matter is urgent, please call us directly:</p>
            <ul>
              <li>📞 Office: <a href="tel:+441727614464">01727 614464</a></li>
              <li>📱 Mobile: <a href="tel:+447956552477">07956 552 477</a></li>
              <li>📱 Mobile: <a href="tel:+447528233611">07528 233611</a></li>
            </ul>
            <p>Your enquiry reference: <strong>#${Date.now()}</strong></p>
          </div>
          <div style="background:#EFF1F7;padding:15px;text-align:center;font-size:12px;color:#666">
            CCB Group (UK) Limited | VAT Reg: 284 6962 52<br>
            <a href="https://www.ccbgroupuk.com">www.ccbgroupuk.com</a>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'Enquiry sent successfully' });

  } catch (error) {
    console.error('Resend error:', error);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

### 7.5 Frontend Form Handler (React)

```javascript
const [status, setStatus] = useState('idle'); // idle | loading | success | error

async function handleSubmit(e) {
  e.preventDefault();
  setStatus('loading');

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, service, area, message }),
  });

  const data = await res.json();
  setStatus(data.success ? 'success' : 'error');
}
```

### 7.6 Spam Protection
- Add Google reCAPTCHA v3 (invisible) or Cloudflare Turnstile (preferred — no challenge)
- Honeypot hidden field on all forms
- Rate-limit endpoint: max 5 submissions per IP per hour

---

## 8. Technical Stack Recommendations

| Layer | Recommendation | Notes |
|-------|---------------|-------|
| Framework | **Next.js 14+** (App Router) | SSG for speed, API routes for forms |
| Hosting | **Vercel** or **Cloudflare Pages** | Global CDN, free SSL |
| CMS | **Sanity.io** or **Contentful** | Client to manage blog/gallery themselves |
| Email | **Resend** | See Section 7 |
| Analytics | **Google Analytics 4** + **Search Console** | Track traffic & SEO |
| Maps | **Google Maps JavaScript API** (styled) | Custom branded map |
| Reviews | **Google Reviews widget** or **Trustpilot** | Social proof |
| Spam | **Cloudflare Turnstile** | Replaces reCAPTCHA |
| Images | **next/image** with WebP conversion | Core Web Vitals compliance |
| CSS | **Tailwind CSS** | Utility-first, fast styling |

---

## 9. SEO Strategy

### 9.1 Priority Pages & Target Keywords

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|--------------------|
| Home | property maintenance London | building maintenance contractors London |
| Gutter Cleaning | gutter cleaning London | gutter cleaning Hertfordshire, gutter vac service |
| Electrical | NICEIC electrician Hertfordshire | electrical testing London, EICR certificate |
| Roofing | roofing contractors North London | roof repair Hertfordshire |
| Areas — Hertfordshire | property maintenance Hertfordshire | maintenance contractors St Albans |
| Areas — North London | property maintenance North London | building services North London |

### 9.2 On-Page SEO Requirements
- Unique `<title>` and `<meta description>` on every page
- H1 → H2 → H3 hierarchy on every page (one H1 only)
- `alt` text on every image (descriptive, keyword-natural)
- Internal linking: every service links to related services and contact
- Schema markup: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`
- Sitemap.xml + Robots.txt submitted to Google Search Console

### 9.3 Local SEO
- **Google Business Profile**: claim/update with all services, photos, hours
- **NAP consistency**: Name/Address/Phone identical across site, GBP, directories
- **Local citations**: Checkatrade, Rated People, MyBuilder, Yell, Thomson Local
- **Borough-specific landing pages** (optional Phase 2): `/gutters-north-london/`, `/electrician-hertfordshire/` etc.

### 9.4 Blog / News Content Plan (for SEO)
Suggested articles (500–1,000 words each, targeting long-tail searches):
1. "How often should you clean your gutters?" 
2. "Signs your gutters need replacing"
3. "What is an EICR and does my property need one?"
4. "How to find a trusted maintenance contractor in London"
5. "What does a building refurbishment involve?"
6. "Planned vs reactive property maintenance — which is right for you?"

---

## 10. Additional Recommendations

### 10.1 WhatsApp Business Integration
- Link floating button to WhatsApp Business number
- Set up WhatsApp auto-reply for out-of-hours enquiries
- Consider WhatsApp Business API for volume quote requests

### 10.2 Online Booking / Scheduling (Phase 2)
- Integrate **Calendly** or **Acuity Scheduling** for site inspection bookings
- Embed booking widget on Contact and service pages

### 10.3 Customer Portal (Phase 3)
- Secure login area for property managers / block management clients
- View scheduled maintenance, reports, invoices
- Download EICR certificates, gutter clean reports with photos

### 10.4 Photo Evidence Showcase
- Create a dedicated "Before & After" gallery section
- Particularly powerful for gutter cleaning — camera evidence is a USP
- Tag by service type and area for SEO filtering

### 10.5 Live Chat
- **Tawk.to** (free) or **Intercom Lite** for real-time website chat
- Show agent availability during business hours
- Offline form captures enquiries out of hours

### 10.6 Performance Targets (Core Web Vitals)
- LCP < 2.5s | FID < 100ms | CLS < 0.1
- Google PageSpeed Score: 90+ (mobile & desktop)
- All images served as WebP, lazy-loaded below the fold
- Fonts preloaded; no layout shift on load

### 10.7 Accessibility (WCAG 2.1 AA)
- All images have descriptive alt text
- Colour contrast ratio ≥ 4.5:1 (navy on white, white on navy ✔)
- Keyboard navigation throughout
- Focus indicators visible on all interactive elements

### 10.8 GDPR Compliance Checklist
- [ ] Privacy Policy page (data collected, third parties, retention)
- [ ] Cookie Policy page (types of cookies, opt-out mechanism)
- [ ] Cookie consent banner with granular controls
- [ ] Contact form: checkbox "I agree to be contacted by CCB Group"
- [ ] Data stored within UK/EEA (Resend, Vercel both compliant)

### 10.9 Redirect Map (from old site ccbproperties.com)
```
ccbproperties.com/*  →  301  →  ccbgroupuk.com/*
```
- Preserve any existing Google rankings by mapping old URLs
- Submit change of address in Google Search Console

### 10.10 Social Media Profiles to Create/Link
- [ ] Facebook Business Page (before/after posts, reviews)
- [ ] Instagram (photo evidence of works — gutter cleaning is very visual)
- [ ] LinkedIn Company Page (for commercial/property management clients)
- [ ] Google Business Profile (most important for local SEO)

---

## 11. Phased Launch Plan

| Phase | Scope | Timeline |
|-------|-------|----------|
| **Phase 1 — MVP** | Home, Services (grid only), Gutter Cleaning, About, Contact, Resend forms | 3–4 weeks |
| **Phase 2 — Full** | Individual service pages, Areas, Gallery, FAQs, Blog (3 articles), SEO setup | +2–3 weeks |
| **Phase 3 — Growth** | Online booking, customer portal, live chat, local landing pages | TBD |

---

*End of CCB Group UK Ltd Website Specification v1.0*  
*Prepared for client review — all content, copy, and imagery to be supplied/approved by CCB Group*
