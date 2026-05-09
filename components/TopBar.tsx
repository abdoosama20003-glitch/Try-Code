"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Menu, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "@/hooks/useSidebar";

interface TopBarProps {
  title: string;
  subtitle?: string;
  label?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

const notifs = [
  { id: 1, msg: "Gap analysis complete — Python Automation", time: "2m ago", dot: "var(--neon-indigo)" },
  { id: 2, msg: "New golden opportunity: Rust for Beginners", time: "1h ago", dot: "var(--neon-emerald)" },
  { id: 3, msg: "Script is ready to review", time: "3h ago", dot: "var(--neon-purple)" },
];

export function TopBar({ title, subtitle, label, actionLabel, actionIcon: ActionIcon, onAction }: TopBarProps) {
  const [bell, setBell] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-between px-5 md:px-8 h-16 border-b border-border bg-background/80 backdrop-blur-md shrink-0 sticky top-0 z-50 gap-4"
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[var(--text-dim)] bg-transparent border border-border cursor-pointer hover:bg-[var(--hover-overlay)] hover:text-foreground transition-colors"
        >
          <Menu size={16} />
        </button>

        <div className="min-w-0">
          {label && (
            <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">
              {label}
            </div>
          )}
          <h1 className="font-heading font-bold text-foreground text-lg tracking-tight truncate m-0">
            {title}
          </h1>
        </div>

        {subtitle && (
          <span className="hidden lg:block text-[11px] text-[var(--text-dim)] border-l border-border pl-4 ml-1">
            {subtitle}
          </span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Search */}
        <button className="flex items-center justify-center w-9 h-9 rounded-lg text-[var(--text-dim)] bg-transparent border-none cursor-pointer hover:bg-[var(--hover-overlay)] hover:text-foreground transition-colors">
          <Search size={15} />
        </button>

        <ThemeToggle />

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setBell(!bell)}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-[var(--text-dim)] bg-transparent border-none cursor-pointer hover:bg-[var(--hover-overlay)] hover:text-foreground transition-colors"
          >
            <Bell size={15} />
            <div className="absolute top-[8px] right-[8px] w-[6px] h-[6px] rounded-full bg-primary border-2 border-background" />
          </button>

          <AnimatePresence>
            {bell && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[calc(100%+8px)] right-0 w-[320px] bg-popover border border-border rounded-xl shadow-elevation-lg z-[100] overflow-hidden"
              >
                <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                  <span className="text-xs font-bold text-foreground">Notifications</span>
                  <div className="flex gap-3 items-center">
                    <span className="text-[10px] text-primary cursor-pointer hover:text-primary-hover">Mark all read</span>
                    <button onClick={() => setBell(false)} className="bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-0.5 flex hover:text-foreground transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                </div>
                {notifs.map((n, i) => (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors"
                    style={{ borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: n.dot }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-foreground leading-relaxed mb-0.5">{n.msg}</div>
                      <div className="text-[10px] text-[var(--text-dim)]">{n.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-white cursor-pointer ml-1 hover:ring-2 hover:ring-ring transition-all">
          A
        </div>

        {/* Action button */}
        {actionLabel && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className="hidden sm:inline-flex items-center gap-1.5 font-bold text-[11px] rounded-lg transition-all text-white border-none cursor-pointer h-9 px-4 ml-1"
            style={{
              background: "var(--gradient-aurora)",
              backgroundSize: "200% 200%",
              animation: "at-gradient-shift 4s ease infinite",
              boxShadow: "var(--glow-primary-sm)",
            }}
          >
            {ActionIcon && <ActionIcon size={12} />}
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
