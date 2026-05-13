import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date'); // Expecting YYYY-MM-DD
  
  // Path to the history file on the server
  // In dev it might be different, but in production it's /home/investo/bluecandle/telegram_history.json
  // We can use an env var or a hardcoded path for this specific server
  const HISTORY_PATH = process.env.HISTORY_LOG_PATH || '/home/investo/bluecandle/telegram_history.json';

  try {
    if (!fs.existsSync(HISTORY_PATH)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(HISTORY_PATH, 'utf-8');
    let history = JSON.parse(fileContent);

    // If no date provided, default to "today"
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    
    // Filter by date
    const filtered = history.filter((msg: any) => {
      return msg.timestamp.startsWith(targetDate);
    });

    // Sort by timestamp descending (newest first for UI)
    filtered.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error reading telegram history:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}
