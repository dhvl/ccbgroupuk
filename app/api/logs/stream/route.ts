import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const logFilePath = process.env.LOG_FILE_PATH || '/home/investo/bluecandle/bluecandle.log';
  
  // Check if file exists
  if (!fs.existsSync(logFilePath)) {
    return new Response(`Log file not found at ${logFilePath}`, { status: 404 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // 1. Send initial logs (last 50 lines)
      try {
        const stats = fs.statSync(logFilePath);
        const bufferSize = 1024 * 16; // 16KB
        const fd = fs.openSync(logFilePath, 'r');
        const start = Math.max(0, stats.size - bufferSize);
        const buffer = Buffer.alloc(bufferSize);
        const bytesRead = fs.readSync(fd, buffer, 0, bufferSize, start);
        fs.closeSync(fd);

        const lastChunk = buffer.toString('utf8', 0, bytesRead);
        const lines = lastChunk.split('\n').slice(-50);
        lines.forEach(line => {
          if (line.trim()) {
            const parsed = parseLogLine(line);
            if (parsed) sendEvent(JSON.stringify(parsed));
          }
        });
      } catch (err) {
        console.error('Error reading initial logs:', err);
      }

      // 2. Watch for changes
      let lastSize = fs.statSync(logFilePath).size;
      const watcher = fs.watch(logFilePath, (event) => {
        if (event === 'change') {
          try {
            const stats = fs.statSync(logFilePath);
            if (stats.size > lastSize) {
              const fd = fs.openSync(logFilePath, 'r');
              const buffer = Buffer.alloc(stats.size - lastSize);
              fs.readSync(fd, buffer, 0, buffer.length, lastSize);
              fs.closeSync(fd);
              
              const newContent = buffer.toString('utf8');
              const lines = newContent.split('\n');
              lines.forEach(line => {
                if (line.trim()) {
                  const parsed = parseLogLine(line);
                  if (parsed) sendEvent(JSON.stringify(parsed));
                }
              });
              lastSize = stats.size;
            } else if (stats.size < lastSize) {
              // File truncated
              lastSize = stats.size;
            }
          } catch (err) {
            console.error('Error watching logs:', err);
          }
        }
      });

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        watcher.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}

function parseLogLine(line: string) {
  // Regex to match: 2026-05-12 13:33:02,024  INFO  Message...
  // Or: 2026-05-12 13:33:02 [INFO] Message...
  const match = line.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})(?:,\d+)?\s+(?:\[)?(INFO|WARNING|ERROR|DEBUG)(?:\])?\s+(.*)$/);
  
  if (match) {
    return {
      timestamp: match[1],
      level: match[2],
      message: match[3].trim()
    };
  }
  
  // Fallback for lines that don't match the standard format (e.g. stack traces)
  return {
    timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
    level: 'INFO',
    message: line
  };
}
