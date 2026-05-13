"use client";

import { GlassCard } from "@/components/GlassCard";
import { 
  Key, 
  Settings as SettingsIcon, 
  Bell, 
  ShieldAlert, 
  RefreshCw, 
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleKey = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-text-secondary">Configure API integrations, risk parameters, and notifications.</p>
      </div>

      <div className="space-y-8">
        {/* API Keys Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-accent-cyan" />
            <h2 className="text-xl font-bold text-white">API Keys & Tokens</h2>
          </div>
          <GlassCard className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Zerodha Kite API Key</label>
                <div className="relative">
                  <input 
                    type={showKeys['kite'] ? "text" : "password"} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white pr-10"
                    value="4k92m0x8n2v1p9q"
                    readOnly
                  />
                  <button onClick={() => toggleKey('kite')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                    {showKeys['kite'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Google Gemini API Key</label>
                <div className="relative">
                  <input 
                    type={showKeys['gemini'] ? "text" : "password"} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white pr-10"
                    value="AIzaSyB9X2m-0x8n2v1p9q"
                    readOnly
                  />
                  <button onClick={() => toggleKey('gemini')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                    {showKeys['gemini'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <button className="text-accent-cyan text-sm font-bold hover:underline">Update Credentials</button>
          </GlassCard>
        </section>

        {/* Trade Configuration */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="w-5 h-5 text-accent-violet" />
            <h2 className="text-xl font-bold text-white">Trade Parameters</h2>
          </div>
          <GlassCard className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Capital per Trade</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" defaultValue="₹10,000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Max Spread Limit</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" defaultValue="0.8%" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Signal Age Limit</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white" defaultValue="120 mins" />
            </div>
          </GlassCard>
        </section>

        {/* Telegram Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-bold text-white">Telegram Alerts</h2>
          </div>
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-sm font-bold text-white">Admin Channel</p>
                <p className="text-xs text-text-secondary">Scanner status, errors, and system events.</p>
              </div>
              <span className="text-xs font-mono text-white/40">ID: -1004829384</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-sm font-bold text-white">Team Signals</p>
                <p className="text-xs text-text-secondary">Buy/Sell signals and trade execution updates.</p>
              </div>
              <span className="text-xs font-mono text-white/40">ID: -1009283746</span>
            </div>
          </GlassCard>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-danger" />
            <h2 className="text-xl font-bold text-white">Danger Zone</h2>
          </div>
      <GlassCard className="border-danger/20 bg-danger/5">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={async () => {
              try {
                await api.scanner.restart();
                alert("Scanner restart signal sent.");
              } catch (err) {
                alert("Failed to restart scanner.");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm font-bold hover:bg-danger/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Restart Scanner
          </button>
          <button 
            onClick={async () => {
              try {
                await api.scanner.stop();
                alert("Scanner stop signal sent.");
              } catch (err) {
                alert("Failed to stop scanner.");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm font-bold hover:bg-danger/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Stop Scanner
          </button>
        </div>
        <p className="mt-4 text-xs text-danger/60 italic">Note: These actions will interrupt live trading activities.</p>
      </GlassCard>
        </section>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-violet text-white font-bold rounded-2xl shadow-xl shadow-accent-cyan/30 hover:shadow-accent-cyan/50 hover:scale-[1.05] transition-all">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Trash2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
