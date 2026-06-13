import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Brain,
  Network,
  Menu,
  X,
  Zap,
  ShoppingBag,
  Home,
  Store,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { name: "Board", icon: KanbanSquare, page: "Board" },
  { name: "Skill Map", icon: Network, page: "SkillMap" },
  { name: "AI Allocator", icon: Brain, page: "AIAllocator" },
  { name: "Team", icon: Users, page: "Team" },
];

const storeNavItems = [
  { name: "Homepage", icon: Home, page: "Home" },
  { name: "Store", icon: Store, page: "Store" },
];

// Pages that render without sidebar (public-facing pages)
const NO_LAYOUT_PAGES = ["Home", "Store"];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // For public pages (Home, Store), render without sidebar
  if (NO_LAYOUT_PAGES.includes(currentPageName)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <style>{`
        :root {
          --background: 240 5.9% 6%;
          --foreground: 0 0% 95%;
          --card: 240 5.9% 8%;
          --card-foreground: 0 0% 95%;
          --popover: 240 5.9% 8%;
          --popover-foreground: 0 0% 95%;
          --primary: 263 70% 58%;
          --primary-foreground: 0 0% 100%;
          --secondary: 240 5.9% 14%;
          --secondary-foreground: 0 0% 95%;
          --muted: 240 5.9% 14%;
          --muted-foreground: 240 5% 55%;
          --accent: 240 5.9% 14%;
          --accent-foreground: 0 0% 95%;
          --destructive: 0 62.8% 50.6%;
          --destructive-foreground: 0 0% 100%;
          --border: 240 5.9% 16%;
          --input: 240 5.9% 16%;
          --ring: 263 70% 58%;
          --radius: 0.75rem;
        }
        body { background: #09090b; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800/50 flex flex-col transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">OneSpace</span>
        </div>

        {/* Store Links */}
        <div className="px-3 mb-1">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-1.5">Storefront</p>
          {storeNavItems.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5",
                  isActive
                    ? "bg-amber-500/10 text-amber-400 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "text-amber-400")} />
                {item.name}
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />}
                {!isActive && <ExternalLink className="ml-auto h-3 w-3 opacity-30" />}
              </Link>
            );
          })}
        </div>

        <div className="mx-3 my-2 h-px bg-zinc-800/60" />

        {/* Dashboard Links */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-1.5">Workspace</p>
          {navItems.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-violet-500/15 text-violet-400 shadow-sm shadow-violet-500/5"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "text-violet-400")} />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/10">
          <p className="text-xs text-zinc-400">AI-Powered Allocation</p>
          <p className="text-xs text-zinc-500 mt-1">Smart task assignment based on team skills & availability</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm">OneSpace</span>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}