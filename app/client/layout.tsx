"use client";

import { 
  TrendingUp, 
  Bell, 
  History,
  CreditCard,
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Signal Feed", icon: Bell, href: "/client/dashboard" },
    { id: "trades", label: "My Trades", icon: History, href: "/client/trades" },
    { id: "subscription", label: "Subscription", icon: CreditCard, href: "/client/subscription" },
    { id: "profile", label: "Profile", icon: User, href: "/client/profile" },
  ];

  // Don't show sidebar on login page
  if (pathname === "/client/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Client Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-8 sticky top-0 h-screen">
        <Link href="/client/dashboard" className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-violet rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">InvestorBabu</span>
        </Link>

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-accent-violet/20 text-white" 
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-accent-violet" : "group-hover:text-accent-violet")} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link href="/client/login" className="flex items-center gap-3 px-3 py-2 rounded-xl text-danger hover:bg-danger/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex justify-between items-center px-8 py-6 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
           <div>
             <h2 className="text-sm font-medium text-text-secondary uppercase tracking-widest">Client Portal</h2>
           </div>
           <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">John Doe</p>
                <p className="text-xs text-success font-medium">Pro Member</p>
              </div>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center border-accent-violet/30">
                <User className="w-5 h-5 text-white/70" />
              </div>
           </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
