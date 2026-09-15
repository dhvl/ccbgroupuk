import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, postcode, service, message } = await request.json();

    const data = await resend.emails.send({
      from: 'CCB Group <info@ccbgroupuk.com>',
      to: ['info@ccbgroupuk.com'],
      reply_to: email || undefined,
      subject: `New Quote Request: ${service || 'General Enquiry'}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Postcode:</strong> ${postcode || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'N/A'}</p>
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
