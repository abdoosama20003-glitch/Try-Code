"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Eye, Clock, Target, Users, ArrowUpRight, ArrowDownRight, Search, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "@/context/SidebarContext";
import {
  Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart,
} from "recharts";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const viewsData = [
  { name: "Mon", views: 12400, subs: 85 },
  { name: "Tue", views: 15200, subs: 120 },
  { name: "Wed", views: 18900, subs: 95 },
  { name: "Thu", views: 22100, subs: 140 },
  { name: "Fri", views: 28300, subs: 180 },
  { name: "Sat", views: 34200, subs: 210 },
  { name: "Sun", views: 31800, subs: 195 },
];

const catData = [
  { name: "Programming", value: 42, color: "#7C5CFC" },
  { name: "AI & ML", value: 28, color: "#A855F7" },
  { name: "Web Dev", value: 18, color: "#F472B6" },
  { name: "Design", value: 12, color: "#FBBF24" },
];

const perfData = [
  { m: "Jan", ctr: 4.2, ret: 42 }, { m: "Feb", ctr: 5.1, ret: 45 },
  { m: "Mar", ctr: 5.8, ret: 48 }, { m: "Apr", ctr: 6.4, ret: 52 },
  { m: "May", ctr: 7.2, ret: 56 }, { m: "Jun", ctr: 7.8, ret: 58 },
  { m: "Jul", ctr: 8.1, ret: 61 },
];

const topVids = [
  { title: "Python Automation for Beginners", views: "120K", ctr: "9.2%", up: true },
  { title: "7 Hidden AI Tools in 2026", views: "89K", ctr: "8.7%", up: true },
  { title: "Figma to Code Workflow", views: "65K", ctr: "7.4%", up: true },
  { title: "Learn Rust in 30 Days", views: "42K", ctr: "6.8%", up: false },
  { title: "No-Code App Development", views: "38K", ctr: "5.9%", up: true },
];

const ttStyle = {
  backgroundColor: "var(--popover)", border: "1px solid var(--border)",
  borderRadius: 12, fontSize: 11, padding: "8px 12px",
  color: "var(--foreground)", fontFamily: "var(--font-sans)",
  boxShadow: "var(--elevation-md)",
};

export function AnalyticsPage() {
  const [period, setPeriod] = useState("7D");
  const { setIsMobileOpen } = useSidebar();

  const kpis = [
    { label: "Total Views", val: "1.2M", change: "18.3%", up: true, icon: Eye, color: "#7C5CFC" },
    { label: "Subscribers", val: "24.8K", change: "12.7%", up: true, icon: Users, color: "#A855F7" },
    { label: "Watch Time", val: "48.2K hrs", change: "22.1%", up: true, icon: Clock, color: "#34D399" },
    { label: "Avg CTR", val: "8.1%", change: "0.3%", up: false, icon: Target, color: "#FBBF24" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Insights</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Analytics</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors"><Bell size={15} /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <BarChart3 size={11} /> Export Report
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {kpis.map((k, i) => (
            <D key={k.label} {...fade(0.04 + i * 0.06)}>
              <div className="group bg-card border border-border rounded-2xl p-5 hover:border-[var(--surface-4)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 100% 0%, ${k.color}10 0%, transparent 70%)` }} />
                <div className="flex justify-between items-start mb-4 relative">
                  <span className="text-[11px] font-medium text-[var(--text-dim)]">{k.label}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}12`, border: `1px solid ${k.color}20` }}>
                    <k.icon size={17} color={k.color} />
                  </div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter leading-none mb-2 relative">{k.val}</div>
                <div className="flex items-center gap-1.5 relative">
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: k.up ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)" }}>
                    {k.up ? <ArrowUpRight size={9} color="#34D399" /> : <ArrowDownRight size={9} color="#EF4444" />}
                    <span className="text-[10px] font-bold" style={{ color: k.up ? "#34D399" : "#EF4444" }}>{k.change}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-dim)]">vs last period</span>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* Views + Categories */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3">
          <D {...fade(0.3)}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                <div>
                  <div className="text-sm font-bold text-foreground mb-0.5">Views & Subscribers</div>
                  <div className="text-[11px] text-[var(--text-dim)]">Performance over time</div>
                </div>
                <div className="flex bg-[var(--surface-1)] rounded-lg border border-border overflow-hidden">
                  {["7D", "30D", "90D", "1Y"].map(p => (
                    <button key={p} onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 text-[10px] font-medium border-none cursor-pointer transition-all ${period === p ? "bg-primary text-white" : "bg-transparent text-[var(--text-dim)] hover:text-foreground"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 mb-4">
                {[{ l: "Views", c: "#7C5CFC" }, { l: "Subs", c: "#A855F7" }].map(l => (
                  <div key={l.l} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} />
                    <span className="text-[11px] text-[var(--text-dim)]">{l.l}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={viewsData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ap-g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip contentStyle={ttStyle} cursor={{ stroke: "var(--border)", strokeDasharray: "3 3" }} />
                  <Area type="monotone" dataKey="views" stroke="#7C5CFC" fill="url(#ap-g1)" strokeWidth={2} dot={{ r: 3, fill: "#7C5CFC", stroke: "var(--card)", strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="subs" stroke="#A855F7" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          <D {...fade(0.36)}>
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <div className="text-sm font-bold text-foreground mb-5">Content Categories</div>
              <div className="flex justify-center mb-5">
                <PieChart width={140} height={140}>
                  <Pie data={catData} cx={70} cy={70} innerRadius={40} outerRadius={64} paddingAngle={3} dataKey="value">
                    {catData.map(e => <Cell key={e.name} fill={e.color} stroke="transparent" />)}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-0">
                {catData.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between py-3" style={{ borderBottom: i < catData.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[12px] text-muted-foreground">{c.name}</span>
                    </div>
                    <span className="font-mono text-[12px] font-extrabold text-foreground">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </D>
        </div>

        {/* CTR/Retention + Top Videos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <D {...fade(0.42)}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                <div>
                  <div className="text-sm font-bold text-foreground mb-0.5">CTR & Retention</div>
                  <div className="text-[11px] text-[var(--text-dim)]">Engagement metrics</div>
                </div>
                <div className="flex gap-4">
                  {[{ l: "CTR %", c: "#FBBF24" }, { l: "Retention %", c: "#F472B6" }].map(l => (
                    <div key={l.l} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} />
                      <span className="text-[10px] text-[var(--text-dim)]">{l.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={perfData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} width={34} />
                  <Tooltip contentStyle={ttStyle} cursor={{ stroke: "var(--border)", strokeDasharray: "3 3" }} />
                  <Area type="monotone" dataKey="ctr" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.06} strokeWidth={2} dot={{ fill: "#FBBF24", r: 3, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="ret" stroke="#F472B6" strokeWidth={2} dot={{ fill: "#F472B6", r: 3, strokeWidth: 0 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          <D {...fade(0.48)}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-sm font-bold text-foreground mb-5">Top Videos</div>
              {topVids.map((v, i) => (
                <div key={v.title} className="flex items-center gap-3 py-3 hover:bg-[var(--hover-overlay)] rounded-xl px-3 -mx-3 cursor-pointer transition-colors"
                  style={{ borderBottom: i < topVids.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="w-8 h-8 rounded-lg bg-[var(--surface-1)] border border-border flex items-center justify-center shrink-0">
                    <span className="font-mono text-[10px] font-bold text-[var(--text-dim)]">0{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-foreground truncate">{v.title}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[12px] font-bold text-foreground">{v.views}</span>
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ background: v.up ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)" }}>
                      {v.up ? <ArrowUpRight size={9} color="#34D399" /> : <ArrowDownRight size={9} color="#EF4444" />}
                      <span className="text-[10px] font-bold" style={{ color: v.up ? "#34D399" : "#EF4444" }}>{v.ctr}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </D>
        </div>
      </div>
    </div>
  );
}