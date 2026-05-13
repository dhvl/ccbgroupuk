import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "glass-panel rounded-2xl p-6 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
