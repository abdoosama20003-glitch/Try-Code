"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Crosshair, Sparkles, PenTool,
  Image, BarChart3, Settings, LogOut, Crown, Film, X, Menu,
} from "lucide-react";
import { LogoMark } from "./LogoMark";
import { useSidebar } from "@/hooks/useSidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Home",          path: "/dashboard" },
  { icon: Crosshair,       label: "Gap Analyzer",  path: "/dashboard/gap-analyzer" },
  { icon: Film,            label: "Video Gen",     path: "/dashboard/video-generator" },
  { icon: PenTool,         label: "Scripts",       path: "/dashboard/script-writer" },
  { icon: Image,           label: "Thumbnails",    path: "/dashboard/thumbnails" },
  { icon: BarChart3,       label: "Analytics",     path: "/dashboard/analytics" },
  { icon: Sparkles,        label: "All-in-One",    path: "/dashboard/content-generator" },
];

export function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileOpen, setIsMobileOpen } = useSidebar();

  const isActive = (path: string) =>
    path === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(path);

  /* ── Shared inner content ── */
  const NavContent = ({ expanded, onNav }: { expanded: boolean; onNav?: () => void }) => (
    <div className="flex flex-col h-full py-3">
      {/* Logo */}
      <div className={`flex items-center gap-3 shrink-0 mb-6 cursor-pointer ${expanded ? "px-4" : "justify-center px-0"}`} onClick={() => router.push("/")}>
        <LogoMark size={expanded ? 26 : 22} />
        {expanded && (
          <div className="overflow-hidden whitespace-nowrap">
            <div className="text-[13px] font-bold text-foreground tracking-tight font-heading">AutoTube</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-1.5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => { router.push(item.path); onNav?.(); }}
              className={`group relative flex items-center border-none cursor-pointer rounded-xl transition-all duration-200 ${
                expanded ? "gap-3 h-10 px-3" : "justify-center h-10 w-10 mx-auto px-0"
              } ${active
                ? "text-white"
                : "bg-transparent text-[var(--text-dim)] hover:text-foreground hover:bg-[var(--hover-overlay)]"
              }`}
              style={active ? {
                background: "var(--gradient-aurora)",
                backgroundSize: "200% 200%",
                animation: "at-gradient-shift 4s ease infinite",
                boxShadow: "var(--glow-primary-sm)",
              } : {}}
            >
              <item.icon size={16} className="shrink-0" />
              {expanded && (
                <span className="text-[12px] font-medium whitespace-nowrap">{item.label}</span>
              )}
              {/* Tooltip */}
              {!expanded && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-popover border border-border text-[11px] font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-elevation-md z-[999]">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`space-y-1 ${expanded ? "px-1.5" : "px-1.5"}`}>
        {/* Upgrade */}
        {expanded && (
          <div className="mx-1 p-3 rounded-xl border border-[var(--border-active)] cursor-pointer hover:opacity-90 transition-opacity mb-2 relative overflow-hidden"
            style={{ background: "var(--gradient-subtle)" }}>
            <div className="flex items-center gap-2 mb-1">
              <Crown size={11} color="var(--neon-amber)" />
              <span className="text-[10px] font-bold text-foreground">Go Pro</span>
            </div>
            <p className="text-[9px] text-[var(--text-dim)] leading-relaxed m-0">Unlimited everything.</p>
          </div>
        )}

        <button
          onClick={() => router.push("/dashboard/settings")}
          className={`group relative flex items-center border-none cursor-pointer rounded-xl transition-all duration-200 bg-transparent text-[var(--text-dim)] hover:text-foreground hover:bg-[var(--hover-overlay)] ${
            expanded ? "gap-3 h-10 px-3 w-full" : "justify-center h-10 w-10 mx-auto px-0"
          }`}
        >
          <Settings size={15} />
          {expanded && <span className="text-[12px] font-medium">Settings</span>}
          {!expanded && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-popover border border-border text-[11px] font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-elevation-md z-[999]">
              Settings
            </div>
          )}
        </button>

        {/* Avatar */}
        <div className={`flex items-center gap-3 mt-2 ${expanded ? "px-3" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-white shrink-0">A</div>
          {expanded && (
            <div className="overflow-hidden">
              <div className="text-[11px] font-semibold text-foreground truncate">Alex Chen</div>
              <div className="text-[9px] text-[var(--text-dim)]">Pro Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed top-0 left-0 bottom-0 w-[240px] z-50 md:hidden bg-[var(--surface-0)] border-r border-border"
          >
            <button onClick={() => setIsMobileOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] hover:text-foreground cursor-pointer z-10">
              <X size={14} />
            </button>
            <NavContent expanded onNav={() => setIsMobileOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Desktop: icon rail that expands on hover ── */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: hovered ? 200 : 64 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="hidden md:flex flex-col h-full bg-[var(--surface-0)] border-r border-border shrink-0 overflow-hidden relative z-30"
      >
        <NavContent expanded={hovered} />
      </motion.aside>
    </>
  );
}