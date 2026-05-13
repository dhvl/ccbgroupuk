"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -150, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo / Brand */}
          <div className="flex justify-center">
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">
              Coming Soon
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white font-display">
            Investor<span className="text-blue-500">Babu</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Empowering your financial journey with institutional-grade algorithms and 
            real-time market intelligence. The future of trading is arriving.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="px-8 py-4 bg-white text-black font-semibold rounded-full cursor-default opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Join the Waitlist
              </div>
            </motion.div>
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Admin Login
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="absolute bottom-[-100px] left-0 right-0 py-8 text-zinc-500 text-sm tracking-widest uppercase font-medium">
          &copy; 2026 InvestorBabu Technologies
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </main>
  );
}
