"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, LayoutDashboard, Crosshair, Sparkles, PenTool,
  Image, BarChart3, Settings, ChevronLeft, LogOut, Crown,
} from "lucide-react";
import { LogoMark } from "./LogoMark";

const M = motion.create("div" as any);

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",         path: "/dashboard"                  },
  { icon: Crosshair,       label: "Gap Analyzer",      path: "/dashboard/gap-analyzer"      },
  { icon: Sparkles,        label: "Content Generator", path: "/dashboard/content-generator" },
  { icon: PenTool,         label: "Script Writer",     path: "/dashboard/script-writer"     },
  { icon: Image,           label: "Thumbnail Ideas",   path: "/dashboard/thumbnails"        },
  { icon: BarChart3,       label: "Analytics",         path: "/dashboard/analytics"         },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = usePathname();
  const navigate = useRouter();

  const isActive = (path: string) =>
    path === "/dashboard"
      ? location === "/dashboard"
      : location.startsWith(path);

  return (
    <M
      animate={{ width: collapsed ? 56 : 220 }}
      transition={{ type: "spring", stiffness: 400, damping: 38 }}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        overflow: "hidden",
        flexShrink: 0,
        zIndex: 20,
      }}
    >
      {/* ── Brand ── */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, padding: collapsed ? "0 14px" : "0 14px 0 16px", minHeight: 54, borderBottom: "1px solid var(--sidebar-border)", cursor: "pointer", flexShrink: 0 }}
        onClick={() => navigate.push("/")}
      >
        <div style={{ width: 26, height: 26, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LogoMark size={26} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, color: "var(--sidebar-foreground)", letterSpacing: "-0.025em", whiteSpace: "nowrap", lineHeight: 1.2 }}>AutoTube</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "var(--text-dim)", fontWeight: 500, letterSpacing: "0.03em", marginTop: 1 }}>Creator Platform</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={e => { e.stopPropagation(); setCollapsed(!collapsed); }}
          style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderRadius: "var(--radius)", color: "var(--text-dim)", cursor: "pointer", flexShrink: 0, marginLeft: collapsed ? "auto" : undefined }}
          onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget).style.background = "var(--hover-overlay-md)"; (e.currentTarget).style.color = "var(--muted-foreground)"; }}
          onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget).style.background = "none"; (e.currentTarget).style.color = "var(--text-dim)"; }}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </div>

      {/* ── Search ── */}
      <div style={{ padding: collapsed ? "8px 10px" : "8px 8px 4px", flexShrink: 0 }}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 10px", height: 30, borderRadius: "var(--radius)", background: "var(--subtle-overlay)", border: "1px solid var(--border)", cursor: "text" }}
                onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--surface-4)"}
                onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"}
              >
                <Search size={10} color="var(--text-dim)" />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", flex: 1 }}>Search…</span>
                <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "1px 4px", borderRadius: 3, background: "var(--hover-overlay-md)", color: "var(--text-dim)", border: "1px solid var(--border)" }}>⌘K</kbd>
              </div>
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button style={{ width: 36, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderRadius: "var(--radius)", color: "var(--text-dim)", cursor: "pointer" }}>
                  <Search size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Section label ── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div style={{ padding: "8px 16px 2px", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Menu
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ── */}
      <div style={{ flex: 1, padding: collapsed ? "4px 8px" : "4px 6px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
        {navItems.map(item => (
          <NavButton
            key={item.path}
            label={item.label}
            icon={item.icon}
            active={isActive(item.path)}
            collapsed={collapsed}
            onClick={() => navigate.push(item.path)}
          />
        ))}
      </div>

      {/* ── Bottom ── */}
      <div style={{ padding: collapsed ? "8px 8px 12px" : "8px 6px 12px", borderTop: "1px solid var(--sidebar-border)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 1 }}>

        {/* Upgrade banner */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
              <div
                style={{ margin: "0 2px 8px", padding: "10px 12px", borderRadius: "var(--radius-card)", background: "var(--sidebar-accent)", border: "1px solid var(--border-active)", cursor: "pointer" }}
                onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "color-mix(in srgb, var(--primary) 14%, transparent)"}
                onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "var(--sidebar-accent)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <Crown size={11} color="var(--neon-amber)" />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--foreground)" }}>Upgrade to Pro</span>
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", lineHeight: 1.4 }}>Unlock 500 analyses/mo</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavButton label="Settings" icon={Settings} active={isActive("/dashboard/settings")} collapsed={collapsed} onClick={() => navigate.push("/dashboard/settings")} />

        {/* User */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, padding: collapsed ? "6px 0" : "6px 10px", justifyContent: collapsed ? "center" : "flex-start", borderRadius: "var(--radius)", cursor: "pointer", marginTop: 2 }}
          onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "var(--hover-overlay)"}
          onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
        >
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--neon-purple))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 0 2px color-mix(in srgb, var(--primary) 25%, transparent)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 800, color: "white" }}>AT</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--sidebar-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.3 }}>Alex Turner</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--neon-emerald)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", color: "var(--text-dim)" }}>Pro Plan</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 2, display: "flex", alignItems: "center", flexShrink: 0 }}
              onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget).style.color = "var(--destructive)"}
              onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget).style.color = "var(--text-dim)"}
            >
              <LogOut size={11} />
            </button>
          )}
        </div>
      </div>
    </M>
  );
}

/* ── Nav Button ── */
function NavButton({
  label, icon: Icon, active, collapsed, onClick,
}: {
  label: string; icon: any; active: boolean; collapsed: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        height: 32,
        width: "100%",
        padding: collapsed ? 0 : "0 10px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: "var(--radius)",
        background: active ? "var(--sidebar-accent)" : hov ? "var(--hover-overlay)" : "transparent",
        border: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          style={{
            position: "absolute",
            left: 0, top: "50%",
            transform: "translateY(-50%)",
            width: 2.5, height: 16,
            borderRadius: "0 3px 3px 0",
            background: "var(--sidebar-primary)",
          }}
          transition={{ type: "spring", stiffness: 440, damping: 32 }}
        />
      )}
      <Icon
        size={13}
        style={{ flexShrink: 0 }}
        color={active ? "var(--sidebar-accent-foreground)" : hov ? "var(--muted-foreground)" : "var(--text-dim)"}
      />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.14 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: active ? 500 : 400,
              color: active ? "var(--sidebar-foreground)" : hov ? "var(--secondary-foreground)" : "var(--muted-foreground)",
              whiteSpace: "nowrap",
              flex: 1,
              textAlign: "left",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}