import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline" | "buy" | "sell";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    outline: "bg-transparent border border-white/10 text-slate-400",
    buy: "bg-emerald-500/12 text-emerald-500 border border-emerald-500/25 uppercase tracking-wider",
    sell: "bg-red-500/12 text-red-500 border border-red-500/25 uppercase tracking-wider",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.65rem] font-bold",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
