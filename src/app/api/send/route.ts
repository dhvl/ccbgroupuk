import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory rate limiting: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Standard UK Postcode regex (validates both outward and inward codes, e.g. AL1 4TA, SW1A 1AA)
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;

// UK Phone format regex (01xxx, 02xxx, 03xxx, 07xxx, 08xxx, or international +44 / 0044)
const UK_PHONE_REGEX = /^(0[12378]\d{8,9}|\+?44[12378]\d{8,9}|0044[12378]\d{8,9})$/;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

// Detect random bot-generated alphanumeric strings like "LUIYQuyUhXoDUnGxTOMs" or "uxUQtAZgfCLupqpIspJetb"
function isGibberish(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  
  // Single unbroken word > 14 chars with excessive alternating cases
  if (!trimmed.includes(' ') && trimmed.length > 14) {
    let caseSwitches = 0;
    for (let i = 0; i < trimmed.length - 1; i++) {
      const isCurUpper = trimmed[i] === trimmed[i].toUpperCase() && /[A-Z]/.test(trimmed[i]);
      const isNextUpper = trimmed[i + 1] === trimmed[i + 1].toUpperCase() && /[A-Z]/.test(trimmed[i + 1]);
      if (isCurUpper !== isNextUpper) {
        caseSwitches++;
      }
    }
    if (caseSwitches >= 4) return true;
  }
  
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (ip !== 'unknown' && isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please call us directly on 01727 614464.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, postcode, service, message, honeypot, website_url, _ts } = body;

    // 1. Honeypot traps: if filled, silently succeed so the bot doesn't retry
    if (honeypot || website_url) {
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    // 2. Speed trap: humans need at least 2.5 seconds to fill out the form
    if (_ts) {
      const elapsed = Date.now() - Number(_ts);
      if (elapsed > 0 && elapsed < 2500) {
        return NextResponse.json({ success: true, message: 'Enquiry received' });
      }
    }

    // 3. Gibberish check: silently drop automated randomized bot strings
    if (isGibberish(name) || isGibberish(message)) {
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    // 4. Required fields validation
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !postcode?.trim()) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    // 5. UK Postcode validation (blocks foreign zipcodes like "71552")
    const cleanedPostcode = postcode.trim().toUpperCase();
    if (!UK_POSTCODE_REGEX.test(cleanedPostcode)) {
      return NextResponse.json(
        { error: 'Please enter a valid UK postcode (e.g. AL1 4TA or NW1 2DB).' },
        { status: 400 }
      );
    }

    // 6. UK Phone validation (blocks foreign numbers like "3678140832")
    const cleanedPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    if (!UK_PHONE_REGEX.test(cleanedPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid UK phone number (e.g. 07123 456 789 or 01727 614464).' },
        { status: 400 }
      );
    }

    // 7. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'CCB Group <info@ccbgroupuk.com>',
      to: ['info@ccbgroupuk.com'],
      reply_to: email.trim(),
      subject: `New Quote Request: ${service || 'General Enquiry'}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Phone:</strong> ${phone.trim()}</p>
        <p><strong>Postcode:</strong> ${cleanedPostcode}</p>
        <p><strong>Service:</strong> ${service || 'General'}</p>
        <p><strong>Message:</strong></p>
        <p>${message ? message.trim() : 'N/A'}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
