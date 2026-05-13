import { NextResponse } from 'next/server';

const KITE_API_URL = 'http://127.0.0.1:5000/kite/instruments';

export async function GET() {
  try {
    const response = await fetch(KITE_API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch instruments');
    const data = await response.json();
    
    // Convert dictionary format to array for UI
    const instruments = Object.keys(data).map((symbol, i) => ({
      id: i + 1,
      symbol,
      exchange: data[symbol].split(':')[0] || 'NSE',
      status: 'Active',
      lastSignal: '---', // Will be populated by separate call if needed
      isActive: true
    }));
    
    return NextResponse.json(instruments);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(KITE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error('Failed to add instrument');
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(KITE_API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error('Failed to remove instrument');
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
