"use client";

import { GlassCard } from "@/components/GlassCard";
import Badge from "@/components/ui/Badge";
import { Plus, Search, MoreVertical, Loader2, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function StocksPage() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchStocks() {
    try {
      const res = await fetch('/api/instruments');
      const data = await res.json();
      if (Array.isArray(data)) {
        setStocks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/instruments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: newSymbol })
      });

      if (res.ok) {
        setNewSymbol("");
        setIsAddModalOpen(false);
        fetchStocks();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStock = async (symbol: string) => {
    if (!confirm(`Are you sure you want to remove ${symbol}?`)) return;

    try {
      const res = await fetch('/api/instruments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol })
      });

      if (res.ok) {
        fetchStocks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Manage Stocks</h1>
          <p className="text-text-secondary">Configure instruments for real-time Blue Candle scanning.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-xl text-sm font-bold text-white shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Instrument
        </button>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search symbols..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30"
          />
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span>Loading instruments...</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Exchange</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">{stock.symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{stock.exchange}</td>
                  <td className="px-6 py-4">
                    <Badge variant={stock.isActive ? "success" : "outline"}>
                      {stock.isActive ? "Active" : "Paused"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleDeleteStock(stock.symbol)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-all group"
                      >
                        <Trash2 className="w-4 h-4 text-text-secondary group-hover:text-red-500" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-text-secondary">
                    No instruments configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </GlassCard>

      {/* Add Instrument Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-md p-6 border-white/20 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add New Instrument</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleAddStock}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Trading Symbol (e.g. INFY, RELIANCE)
                </label>
                <input 
                  type="text"
                  autoFocus
                  placeholder="Enter symbol..."
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 placeholder:text-text-secondary/30"
                  required
                />
                <p className="mt-2 text-xs text-text-secondary">
                  The scanner will automatically prefix with NSE: unless specified.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-xl text-sm font-bold text-white shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? "Adding..." : "Add Instrument"}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
