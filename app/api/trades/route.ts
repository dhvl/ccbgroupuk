import { NextResponse } from 'next/server';
import { getAllTrades } from '@/lib/data-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const trades = await getAllTrades();
    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json([]);
  }
}
