import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Detect random bot-generated alphanumeric strings like "LUIYQuyUhXoDUnGxTOMs"
function isObviousBotGibberish(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  
  // Single unbroken word of length >= 16 with excessive alternating case
  if (!trimmed.includes(' ') && trimmed.length >= 16) {
    let caseSwitches = 0;
    for (let i = 0; i < trimmed.length - 1; i++) {
      const isCurUpper = trimmed[i] === trimmed[i].toUpperCase() && /[A-Z]/.test(trimmed[i]);
      const isNextUpper = trimmed[i + 1] === trimmed[i + 1].toUpperCase() && /[A-Z]/.test(trimmed[i + 1]);
      if (isCurUpper !== isNextUpper) {
        caseSwitches++;
      }
    }
    // LUIYQuyUhXoDUnGxTOMs has 9 case switches
    if (caseSwitches >= 6) return true;
  }
  
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, postcode, service, message, b_hp_code } = body;

    // 1. Honeypot check: humans never see or fill this field
    if (b_hp_code && String(b_hp_code).trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    // 2. Clear bot gibberish filter: drop random strings like LUIYQuyUhXoDUnGxTOMs
    if (isObviousBotGibberish(name) || isObviousBotGibberish(message)) {
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    // 3. Required fields validation
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !postcode?.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Phone, Postcode).' },
        { status: 400 }
      );
    }

    // 4. Basic Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // 5. Phone validation: at least 7 digits (flexible for all UK landlines, mobiles, and formatting)
    const phoneDigits = String(phone).replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number (at least 7 digits).' },
        { status: 400 }
      );
    }

    // 6. Postcode validation:
    // Reject pure 5-digit US zipcodes (e.g. 71552 or 90210) used by spam bots
    const cleanedPostcode = postcode.trim();
    if (/^\d{5}(-\d{4})?$/.test(cleanedPostcode)) {
      return NextResponse.json(
        { error: 'Please enter a valid UK postcode or area.' },
        { status: 400 }
      );
    }

    if (cleanedPostcode.length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid postcode or area.' },
        { status: 400 }
      );
    }

    // 7. Dispatch via Resend
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
        <p><strong>Postcode:</strong> ${cleanedPostcode.toUpperCase()}</p>
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
