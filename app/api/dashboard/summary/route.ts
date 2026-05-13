import { NextResponse } from 'next/server';
import { getSummary } from '@/lib/data-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = await getSummary();
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
  }
}
