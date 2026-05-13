import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if scanner (main.py) is running
    let scannerStatus = 'inactive';
    try {
      const ps = execSync('ps aux | grep main.py | grep -v grep').toString();
      if (ps) scannerStatus = 'active';
    } catch {}

    // Check if postback server is running
    let status = 'offline';
    try {
      const ps = execSync('ps aux | grep postback_server.py | grep -v grep').toString();
      if (ps) status = 'online';
    } catch {}

    return NextResponse.json({
      status,
      scanner: scannerStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ status: 'unknown', scanner: 'unknown' });
  }
}
