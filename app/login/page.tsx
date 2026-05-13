"use client";

import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";
import { TrendingUp, User, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin login logic
    window.location.href = "/dashboard";
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full animate-pulse-soft delay-700" />

      <GlassCard className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-violet rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-accent-cyan/20">
            <TrendingUp className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">InvestorBabu</h1>
          <p className="text-text-secondary text-sm">Trading Signal Platform Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
              placeholder="admin@investorbabu.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent-cyan to-accent-violet text-white font-semibold py-3 rounded-xl shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </GlassCard>

      <p className="mt-8 text-text-secondary text-xs opacity-50">
        &copy; 2026 InvestorBabu. Admin Access Only.
      </p>
    </main>
  );
}
