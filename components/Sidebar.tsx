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
      className="h-screen flex flex-col bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] overflow-hidden shrink-0 z-20"
    >
      {/* ── Brand ── */}
      <div
        className={`flex items-center gap-2 min-h-[54px] border-b border-[var(--sidebar-border)] cursor-pointer shrink-0 ${collapsed ? "px-[14px]" : "pl-4 pr-[14px]"}`}
        onClick={() => navigate.push("/")}
      >
        <div className="w-[26px] h-[26px] shrink-0 flex items-center justify-center">
          <LogoMark size={26} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 overflow-hidden min-w-0">
              <div className="text-[13px] font-bold text-[var(--sidebar-foreground)] tracking-[-0.025em] whitespace-nowrap leading-[1.2]">AutoTube</div>
              <div className="text-[9px] text-[var(--text-dim)] font-medium tracking-[0.03em] mt-[1px]">Creator Platform</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={e => { e.stopPropagation(); setCollapsed(!collapsed); }}
          className={`w-[22px] h-[22px] flex items-center justify-center bg-transparent border-none rounded-sm text-[var(--text-dim)] cursor-pointer shrink-0 hover:bg-[var(--hover-overlay-md)] hover:text-muted-foreground transition-colors ${collapsed ? "ml-auto" : ""}`}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </div>

      {/* ── Search ── */}
      <div className={`shrink-0 ${collapsed ? "px-[10px] py-2" : "px-2 pt-2 pb-1"}`}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              <div className="flex items-center gap-[7px] px-[10px] h-[30px] rounded-sm bg-[var(--subtle-overlay)] border border-border cursor-text hover:border-[var(--surface-4)] transition-colors">
                <Search size={10} color="var(--text-dim)" />
                <span className="text-[11px] text-[var(--text-dim)] flex-1">Search…</span>
                <kbd className="font-mono text-[9px] px-1 py-[1px] rounded-[3px] bg-[var(--hover-overlay-md)] text-[var(--text-dim)] border border-border">⌘K</kbd>
              </div>
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              <div className="flex justify-center">
                <button className="w-9 h-[30px] flex items-center justify-center bg-transparent border-none rounded-sm text-[var(--text-dim)] cursor-pointer">
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
            <div className="px-4 pt-2 pb-[2px] text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--text-dim)]">
              Menu
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ── */}
      <div className={`flex-1 flex flex-col gap-[1px] overflow-y-auto ${collapsed ? "px-2 py-1" : "px-[6px] py-1"}`}>
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
      <div className={`flex flex-col gap-[1px] border-t border-[var(--sidebar-border)] shrink-0 ${collapsed ? "px-2 pt-2 pb-3" : "px-[6px] pt-2 pb-3"}`}>

        {/* Upgrade banner */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="mx-[2px] mb-2 px-3 py-[10px] rounded-lg bg-[var(--sidebar-accent)] border border-[var(--border-active)] cursor-pointer hover:opacity-90 transition-opacity">
                <div className="flex items-center gap-[6px] mb-[3px]">
                  <Crown size={11} color="var(--neon-amber)" />
                  <span className="text-[11px] font-semibold text-foreground">Upgrade to Pro</span>
                </div>
                <div className="text-[10px] text-[var(--text-dim)] leading-[1.4]">Unlock 500 analyses/mo</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavButton label="Settings" icon={Settings} active={isActive("/dashboard/settings")} collapsed={collapsed} onClick={() => navigate.push("/dashboard/settings")} />

        {/* User */}
        <div
          className={`flex items-center gap-2 rounded-sm cursor-pointer mt-[2px] hover:bg-[var(--hover-overlay)] transition-colors ${collapsed ? "justify-center py-[6px] px-0" : "justify-start py-[6px] px-[10px]"}`}
        >
          <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--neon-purple)] flex items-center justify-center shrink-0 shadow-[0_0_0_2px_color-mix(in_srgb,var(--primary)_25%,transparent)]">
            <span className="text-[9px] font-extrabold text-white">AT</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} className="flex-1 overflow-hidden min-w-0">
                <div className="text-[11px] font-semibold text-[var(--sidebar-foreground)] overflow-hidden text-ellipsis whitespace-nowrap leading-[1.3]">Alex Turner</div>
                <div className="flex items-center gap-1 mt-[1px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[var(--neon-emerald)]" />
                  <span className="text-[9px] text-[var(--text-dim)]">Pro Plan</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              className="bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-[2px] flex items-center shrink-0 hover:text-destructive transition-colors"
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
      className={[
        "flex items-center h-8 w-full rounded-sm border-none cursor-pointer relative overflow-hidden transition-colors duration-100",
        collapsed ? "justify-center p-0" : "justify-start px-[10px] gap-[9px]",
        active ? "bg-[var(--sidebar-accent)]" : hov ? "bg-[var(--hover-overlay)]" : "bg-transparent",
      ].join(" ")}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute bottom-0 left-0 w-full h-[2px] rounded-t-[2px] bg-[var(--sidebar-primary)] shadow-[0_0_12px_var(--sidebar-primary)]"
          transition={{ type: "spring", stiffness: 440, damping: 32 }}
        />
      )}
      <Icon
        size={13}
        className="shrink-0"
        color={active ? "var(--sidebar-accent-foreground)" : hov ? "var(--muted-foreground)" : "var(--text-dim)"}
      />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.14 }}
            className={`text-sm flex-1 text-left whitespace-nowrap ${active ? "font-medium text-[var(--sidebar-foreground)]" : hov ? "font-normal text-[var(--secondary-foreground)]" : "font-normal text-muted-foreground"}`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}