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
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "20px 28px 16px",
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
        flexShrink: 0,
        gap: 16,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* ── Left ── */}
      <div>
        {label && (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 5 }}>
            {label}
          </div>
        )}
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 800, letterSpacing: "-0.035em", color: "var(--foreground)", lineHeight: 1.05, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", margin: "5px 0 0", lineHeight: 1, fontWeight: 400 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Right ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, paddingBottom: 2 }}>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setBell(!bell)}
            className="at-theme-toggle"
            style={{ position: "relative", background: bell ? "var(--hover-overlay-md)" : undefined, borderColor: bell ? "var(--surface-4)" : undefined }}
          >
            <Bell size={13} />
            <div style={{
              position: "absolute", top: 7, right: 7,
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--primary)",
              border: "1.5px solid var(--background)",
            }} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {bell && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: 306,
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-card)",
                  boxShadow: "var(--elevation-md)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>Notifications</span>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--primary-hover)", cursor: "pointer" }}>Mark all read</span>
                    <button onClick={() => setBell(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 2, display: "flex", lineHeight: 1 }}><X size={12} /></button>
                  </div>
                </div>
                {notifs.map((n, i) => (
                  <div
                    key={n.id}
                    style={{ display: "flex", gap: 10, padding: "11px 16px", borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
                    onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "var(--hover-overlay)"}
                    onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.dot, flexShrink: 0, marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--foreground)", lineHeight: 1.45, marginBottom: 2 }}>{n.msg}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action */}
        {actionLabel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 h-7.5 px-3 text-[11px]"
            style={{ fontFamily: "var(--font-sans)", gap: 5 }}
          >
            {ActionIcon && <ActionIcon size={11} />}
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
