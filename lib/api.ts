const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const VERIFIED_TRADES = [
  // Friday 8 May 2026
  { id: 't1', date: '2026-05-08', stock: 'TATASTEEL', side: 'BUY', entry: 217.50, exit: 219.68, qty: 45, capital: 9788, pnl: 98.10, return_pct: 1.00 },
  { id: 't2', date: '2026-05-08', stock: 'POLYCAB', side: 'BUY', entry: 9150.00, exit: 9241.50, qty: 1, capital: 9150, pnl: 91.50, return_pct: 1.00 },
  { id: 't3', date: '2026-05-08', stock: 'HAVELLS', side: 'SELL', entry: 1264.00, exit: 1251.36, qty: 7, capital: 8848, pnl: 88.48, return_pct: 1.00 },
  { id: 't4', date: '2026-05-08', stock: 'DLF', side: 'BUY', entry: 614.00, exit: 620.14, qty: 16, capital: 9824, pnl: 98.24, return_pct: 1.00 },
  { id: 't5', date: '2026-05-08', stock: 'ADANIENSOL', side: 'SELL', entry: 1380.00, exit: 1248.80, qty: 7, capital: 9660, pnl: -917.40, return_pct: -9.50 },
  // Monday 11 May 2026
  { id: 't6', date: '2026-05-11', stock: 'TATASTEEL', side: 'BUY+SELL', entry: 213.40, exit: 213.20, qty: 46, capital: 9816, pnl: -0.92, return_pct: -0.01 },
  { id: 't7', date: '2026-05-11', stock: 'ADANIENSOL', side: 'SELL', entry: 1308.00, exit: 1298.40, qty: 7, capital: 9156, pnl: 67.20, return_pct: 0.73 },
];

/**
 * Basic fetch wrapper for InvestorBabu API
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.warn(`API Error on ${endpoint}, returning empty or verified data:`, err);
    throw err;
  }
}

export const api = {
  dashboard: {
    getSummary: async () => {
      return await apiFetch("/api/dashboard/summary");
    },
    getStatus: () => apiFetch("/api/status"),
  },
  signals: {
    list: (date?: string, status?: string) => {
      const params = new URLSearchParams();
      if (date) params.append("date", date);
      if (status) params.append("status", status);
      return apiFetch(`/api/signals?${params.toString()}`).catch(() => []);
    },
  },
  trades: {
    list: async (from?: string, to?: string) => {
      return await apiFetch("/api/trades");
    },
  },
  stocks: {
    list: () => apiFetch("/api/stocks").catch(() => []),
  },
  scanner: {
    restart: () => apiFetch("/api/scanner/restart", { method: "POST" }),
    stop: () => apiFetch("/api/scanner/stop", { method: "POST" }),
  },
  logs: {
    get: (lines = 100) => apiFetch(`/api/logs?lines=${lines}`),
  }
};
