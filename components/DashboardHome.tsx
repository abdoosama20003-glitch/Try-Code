"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye, Crosshair, Sparkles, Zap, Clock, ArrowRight,
  FileText, Image, ArrowUpRight, Play, Bell, Search,
  TrendingUp, Menu, ChevronRight, Star, Flame,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "@/context/SidebarContext";
import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart } from "recharts";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const chartData = [
  { d: "Mon", v: 320 }, { d: "Tue", v: 480 }, { d: "Wed", v: 410 },
  { d: "Thu", v: 620 }, { d: "Fri", v: 540 }, { d: "Sat", v: 710 }, { d: "Sun", v: 680 },
];

const kpis = [
  { label: "Total Analyses", value: "2,847", icon: Crosshair, color: "#7C5CFC", delta: "+12%", sparkData: [30, 40, 35, 50, 45, 60, 55] },
  { label: "Videos Created", value: "94", icon: Play, color: "#A855F7", delta: "+31%", sparkData: [10, 15, 12, 20, 18, 25, 30] },
  { label: "Content Views", value: "1.2M", icon: Eye, color: "#F472B6", delta: "+18%", sparkData: [60, 55, 70, 65, 80, 75, 90] },
  { label: "Hours Saved", value: "342", icon: Clock, color: "#34D399", delta: "+45%", sparkData: [20, 30, 25, 40, 35, 50, 48] },
];

const tools = [
  { icon: Crosshair, label: "Gap Analyzer", desc: "Find untapped topics", path: "/dashboard/gap-analyzer", color: "#7C5CFC", hot: true },
  { icon: Sparkles, label: "All-in-One", desc: "Complete video pack", path: "/dashboard/content-generator", color: "#A855F7", hot: false },
  { icon: FileText, label: "Script Writer", desc: "AI-powered scripts", path: "/dashboard/script-writer", color: "#F472B6", hot: false },
  { icon: Image, label: "Thumbnails", desc: "Eye-catching designs", path: "/dashboard/thumbnails", color: "#FBBF24", hot: false },
];

const feed = [
  { action: "Video pack generated", topic: "Python Automation Tips", time: "2m", icon: Sparkles, color: "#A855F7" },
  { action: "Gap analysis completed", topic: "Hidden AI Tools 2024", time: "15m", icon: Crosshair, color: "#7C5CFC" },
  { action: "Script written", topic: "Learn Rust in 30 Days", time: "1h", icon: FileText, color: "#F472B6" },
  { action: "Thumbnails created", topic: "Figma to Code Guide", time: "2h", icon: Image, color: "#FBBF24" },
];

const opportunities = [
  { title: "Python Automation for Beginners", score: 94, vol: "74K/mo", trend: "+18%" },
  { title: "AI Tools No One Talks About", score: 91, vol: "45K/mo", trend: "+24%" },
  { title: "Figma to Code Workflow", score: 92, vol: "22K/mo", trend: "+15%" },
];

export function DashboardHome() {
  const router = useRouter();
  const { setIsMobileOpen } = useSidebar();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex-1 overflow-y-auto">
      {/* ── Header bar ── */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer hover:text-foreground">
              <Menu size={16} />
            </button>
            <div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Dashboard</h1>
            </div>
            <span className="hidden sm:block text-[11px] text-[var(--text-dim)] border-l border-border pl-3">{today}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] hover:text-foreground transition-colors"><Search size={15} /></button>
            <ThemeToggle />
            <div className="relative">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] hover:text-foreground transition-colors">
                <Bell size={15} />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => router.push("/dashboard/gap-analyzer")}
              className="hidden md:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <Zap size={11} /> Quick Analysis
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 md:p-8 space-y-5">

        {/* ── Welcome + KPIs in a bento row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-3">
          {kpis.map((k, i) => (
            <D key={k.label} {...fade(0.05 + i * 0.06)}>
              <div className="group bg-card border border-border rounded-2xl p-5 hover:border-[var(--surface-4)] transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 100% 0%, ${k.color}10 0%, transparent 70%)` }} />
                <div className="flex items-center justify-between mb-4 relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}12`, border: `1px solid ${k.color}20` }}>
                    <k.icon size={17} color={k.color} />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.1)" }}>
                    <ArrowUpRight size={9} color="#34D399" />
                    <span className="text-[10px] font-bold text-[#34D399]">{k.delta}</span>
                  </div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter leading-none mb-1 relative">{k.value}</div>
                <div className="text-[11px] text-[var(--text-dim)] relative">{k.label}</div>
                {/* Mini sparkline */}
                <div className="flex items-end gap-[3px] mt-3 h-5 relative">
                  {k.sparkData.map((v, si) => (
                    <motion.div key={si} initial={{ height: 0 }} animate={{ height: `${(v / Math.max(...k.sparkData)) * 100}%` }}
                      transition={{ delay: 0.3 + si * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-sm min-h-[2px]" style={{ background: si === k.sparkData.length - 1 ? k.color : `${k.color}40` }} />
                  ))}
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* ── Main bento: Chart (big) + Tools (side) ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-3">
          {/* Chart */}
          <D {...fade(0.3)}>
            <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <div className="text-sm font-bold text-foreground mb-0.5">Growth Overview</div>
                  <div className="text-[11px] text-[var(--text-dim)]">Weekly content performance</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] text-[var(--text-dim)]">Performance</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11, color: "var(--foreground)", boxShadow: "var(--elevation-md)" }} />
                  <Area type="monotone" dataKey="v" stroke="#7C5CFC" fill="url(#areaGrad)" strokeWidth={2.5} dot={{ r: 3, fill: "#7C5CFC", stroke: "var(--card)", strokeWidth: 2 }} activeDot={{ r: 5, fill: "#7C5CFC", stroke: "var(--card)", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </D>

          {/* Tools grid */}
          <D {...fade(0.36)}>
            <div className="bg-card border border-border rounded-2xl p-5 h-full flex flex-col">
              <div className="text-sm font-bold text-foreground mb-4">Tools</div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {tools.map((t) => (
                  <motion.button key={t.label} onClick={() => router.push(t.path)}
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                    className="group relative flex flex-col items-start gap-3 p-4 rounded-xl border border-border bg-[var(--surface-1)] cursor-pointer text-left transition-all hover:border-[var(--surface-4)] overflow-hidden">
                    {t.hot && (
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(251,191,36,0.12)] border border-[rgba(251,191,36,0.2)]">
                        <Flame size={8} color="#FBBF24" />
                        <span className="text-[8px] font-bold text-[#FBBF24]">HOT</span>
                      </div>
                    )}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${t.color}12`, border: `1px solid ${t.color}20` }}>
                      <t.icon size={15} color={t.color} />
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-foreground mb-0.5">{t.label}</div>
                      <div className="text-[10px] text-[var(--text-dim)] leading-relaxed">{t.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </D>
        </div>

        {/* ── Bottom: Opportunities + Feed ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Opportunities */}
          <D {...fade(0.42)}>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(124,92,252,0.1)] border border-[rgba(124,92,252,0.18)]">
                    <TrendingUp size={13} color="#7C5CFC" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Top Opportunities</span>
                </div>
                <button onClick={() => router.push("/dashboard/gap-analyzer")} className="flex items-center gap-1 text-[10px] text-primary bg-transparent border-none cursor-pointer hover:text-primary-hover font-medium">
                  See all <ChevronRight size={10} />
                </button>
              </div>
              {opportunities.map((o, i) => (
                <div key={o.title} className="flex items-center gap-3 py-3 hover:bg-[var(--hover-overlay)] rounded-xl px-3 -mx-3 cursor-pointer transition-colors"
                  style={{ borderBottom: i < opportunities.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(124,92,252,0.08)] border border-[rgba(124,92,252,0.15)]">
                    <span className="font-mono text-sm font-extrabold text-primary">{o.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-foreground truncate mb-1.5">{o.title}</div>
                    <div className="h-1 rounded-full bg-[var(--surface-2)] overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${o.score}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full" style={{ background: "var(--gradient-aurora)" }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-bold text-[#34D399]">{o.trend}</div>
                    <div className="text-[9px] font-mono text-[var(--text-dim)]">{o.vol}</div>
                  </div>
                </div>
              ))}
            </div>
          </D>

          {/* Activity feed */}
          <D {...fade(0.48)}>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.18)]">
                    <Sparkles size={13} color="#A855F7" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Recent Activity</span>
                </div>
                <span className="text-[10px] text-primary cursor-pointer hover:text-primary-hover font-medium">View all</span>
              </div>
              {feed.map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-3 hover:bg-[var(--hover-overlay)] rounded-xl px-3 -mx-3 cursor-pointer transition-colors"
                  style={{ borderBottom: i < feed.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${f.color}10`, border: `1px solid ${f.color}18` }}>
                    <f.icon size={15} color={f.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-foreground truncate">{f.topic}</div>
                    <div className="text-[10px] text-[var(--text-dim)]">{f.action}</div>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-dim)] shrink-0">{f.time}</span>
                </div>
              ))}
            </div>
          </D>
        </div>
      </div>
    </div>
  );
}