"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface TopBarProps {
  title: string;
  subtitle?: string;
  label?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

const notifs = [
  { id: 1, msg: "Gap analysis complete — Python Automation",   time: "2m ago",  dot: "var(--neon-indigo)"  },
  { id: 2, msg: "New golden opportunity: Rust for Beginners",  time: "1h ago",  dot: "var(--neon-emerald)" },
  { id: 3, msg: "Script is ready to review",                   time: "3h ago",  dot: "var(--neon-purple)"  },
];

export function TopBar({ title, subtitle, label, actionLabel, actionIcon: ActionIcon, onAction }: TopBarProps) {
  const [bell, setBell] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-end justify-between px-7 pt-5 pb-4 border-b border-border bg-background shrink-0 gap-4 relative z-10"
    >
      <div>
        {label && (
          <div className="text-[9.5px] font-bold tracking-[0.13em] uppercase text-[var(--text-dim)] mb-[5px]">
            {label}
          </div>
        )}
        <h1 className="font-extrabold text-foreground leading-[1.05] m-0" style={{ fontSize: "clamp(18px, 2.2vw, 26px)", letterSpacing: "-0.035em" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] text-[var(--text-dim)] mt-[5px] leading-none font-normal">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 pb-[2px]">
        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setBell(!bell)}
            className="at-theme-toggle relative"
            style={{ background: bell ? "var(--hover-overlay-md)" : undefined, borderColor: bell ? "var(--surface-4)" : undefined }}
          >
            <Bell size={13} />
            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] rounded-full bg-primary border-[1.5px] border-background" />
          </button>

          <AnimatePresence>
            {bell && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[calc(100%+10px)] right-0 w-[306px] bg-popover border border-border rounded-lg shadow-elevation-md z-[100] overflow-hidden"
              >
                <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                  <span className="text-xs font-semibold text-foreground">Notifications</span>
                  <div className="flex gap-[10px] items-center">
                    <span className="text-[10px] text-[var(--primary-hover)] cursor-pointer">Mark all read</span>
                    <button onClick={() => setBell(false)} className="bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-[2px] flex leading-none">
                      <X size={12} />
                    </button>
                  </div>
                </div>
                {notifs.map((n, i) => (
                  <div
                    key={n.id}
                    className="flex gap-[10px] px-4 py-[11px] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors duration-100"
                    style={{ borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <div className="w-[7px] h-[7px] rounded-full shrink-0 mt-1" style={{ background: n.dot }} />
                    <div className="flex-1">
                      <div className="text-[11px] text-foreground leading-[1.45] mb-[2px]">{n.msg}</div>
                      <div className="text-[10px] text-[var(--text-dim)]">{n.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {actionLabel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className="inline-flex items-center justify-center gap-[5px] font-semibold text-[11px] rounded-md transition-all bg-foreground text-background hover:opacity-90 h-[30px] px-3"
          >
            {ActionIcon && <ActionIcon size={11} />}
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
