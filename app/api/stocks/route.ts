import { NextResponse } from 'next/server';
import { getSignals, getAllTrades } from '@/lib/data-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const signals = getSignals();
    const trades = await getAllTrades();
    
    const symbols = new Set<string>();
    signals.forEach((s: any) => symbols.add(s.stock));
    trades.forEach((t: any) => symbols.add(t.stock));
    
    const stocks = Array.from(symbols).map((symbol, i) => {
      const lastTrade = trades.find((t: any) => t.stock === symbol);
      const lastSignal = signals.find((s: any) => s.stock === symbol);
      
      return {
        id: i + 1,
        symbol,
        exchange: "NSE",
        status: "Active",
        lastSignal: lastSignal?.time || lastTrade?.time || "---",
        isActive: true
      };
    });

    return NextResponse.json(stocks);
  } catch (error) {
    return NextResponse.json([]);
  }
}
