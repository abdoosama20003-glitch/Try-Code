"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye, Crosshair, Sparkles, Zap, Clock, ArrowRight,
  FileText, Image, Target, ArrowUpRight, Play,
} from "lucide-react";
import { TopBar } from "./TopBar";
import { Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";

const D = motion.create("div" as any);

const chartData = [
  { name: "Jan", analyses: 120, videos: 45 },
  { name: "Feb", analyses: 180, videos: 62 },
  { name: "Mar", analyses: 240, videos: 78 },
  { name: "Apr", analyses: 310, videos: 95 },
  { name: "May", analyses: 420, videos: 120 },
  { name: "Jun", analyses: 380, videos: 140 },
  { name: "Jul", analyses: 520, videos: 168 },
];

const activities = [
  { id: 1, action: "Video pack generated",   topic: "Python Automation",  time: "2m",  icon: Sparkles,  dot: "var(--neon-purple)"  },
  { id: 2, action: "Gap analysis done",      topic: "AI Tools Hidden",    time: "15m", icon: Crosshair, dot: "var(--neon-indigo)"  },
  { id: 3, action: "Script written",         topic: "Learn Rust 30 Days", time: "1h",  icon: FileText,  dot: "var(--neon-pink)"    },
  { id: 4, action: "Thumbnails generated",   topic: "Figma to Code",      time: "2h",  icon: Image,     dot: "var(--neon-amber)"   },
  { id: 5, action: "Topic saved",            topic: "No-Code Dev",        time: "3h",  icon: Target,    dot: "var(--neon-emerald)" },
];

const quickActions = [
  { label: "Analyze Gaps",     desc: "Find opportunities",  icon: Crosshair, path: "/dashboard/gap-analyzer",      color: "var(--neon-indigo)"  },
  { label: "Generate Content", desc: "Create video packs",  icon: Sparkles,  path: "/dashboard/content-generator", color: "var(--neon-purple)"  },
  { label: "Write Script",     desc: "Craft full scripts",  icon: FileText,  path: "/dashboard/script-writer",     color: "var(--neon-pink)"    },
  { label: "Thumbnail Ideas",  desc: "Design eye-catchers", icon: Image,     path: "/dashboard/thumbnails",        color: "var(--neon-amber)"   },
];

const topOpps = [
  { keyword: "Python Automation for Beginners", score: 94, trend: "+18%", vol: "74K/mo" },
  { keyword: "AI Tools No One Talks About",     score: 91, trend: "+24%", vol: "45K/mo" },
  { keyword: "Figma to Code Workflow",          score: 92, trend: "+15%", vol: "22K/mo" },
  { keyword: "Learn Rust in 30 Days",           score: 89, trend: "+31%", vol: "28K/mo" },
];

const kpis = [
  { label: "Analyses Run",     value: "2,847",   icon: Crosshair, color: "var(--neon-indigo)",  change: "12%" },
  { label: "Videos Generated", value: "94",      icon: Play,      color: "var(--neon-purple)",  change: "31%" },
  { label: "Content Views",    value: "1.2M",    icon: Eye,       color: "var(--neon-pink)",    change: "18%" },
  { label: "Time Saved",       value: "342 hrs", icon: Clock,     color: "var(--neon-emerald)", change: "45%" },
];

const ttStyle = {
  backgroundColor: "var(--popover)", border: "1px solid var(--border)",
  borderRadius: "var(--radius)", fontSize: "11px",
  color: "var(--foreground)", fontFamily: "var(--font-sans)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
};

export function DashboardHome() {
  const navigate = useRouter();
  const [range, setRange] = useState("7M");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <>
      <TopBar label="Overview" title="Dashboard" subtitle={`${today} — Welcome back, Alex`} actionLabel="Quick Analysis" actionIcon={Zap} onAction={() => navigate.push("/dashboard/gap-analyzer")} />

      <div className="p-4 md:p-7 xl:p-8 flex flex-col gap-5 flex-1">

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[10px]">
          {kpis.map((k, i) => (
            <D key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-semibold text-[var(--text-dim)] tracking-[0.03em]">{k.label}</span>
                  <div className="w-[30px] h-[30px] rounded-sm bg-[var(--subtle-overlay)] border border-border flex items-center justify-center">
                    <k.icon size={13} color={k.color} />
                  </div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter">{k.value}</div>
                <div className="flex items-center gap-1 mt-[10px]">
                  <ArrowUpRight size={10} color="var(--neon-emerald)" />
                  <span className="text-[11px] font-semibold text-[var(--neon-emerald)]">{k.change}</span>
                  <span className="text-[10px] text-[var(--text-dim)]">vs last month</span>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-[10px]">
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1">Performance</div>
                  <div className="text-base font-semibold text-foreground tracking-[-0.01em]">Analyses &amp; Video Generation</div>
                </div>
                <div className="flex bg-[var(--surface-2)] rounded-sm border border-border overflow-hidden">
                  {["1M", "3M", "7M"].map(t => (
                    <button key={t} onClick={() => setRange(t)}
                      className="px-[10px] py-1 text-[10px] border-none cursor-pointer transition-all duration-[120ms]"
                      style={{ fontWeight: range === t ? 700 : 400, background: range === t ? "var(--active-overlay)" : "transparent", color: range === t ? "var(--foreground)" : "var(--text-dim)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 mb-[14px]">
                {[{ l: "Analyses", c: "#6366F1" }, { l: "Videos", c: "#8B5CF6" }].map(l => (
                  <div key={l.l} className="flex items-center gap-1.5">
                    <div className="w-3 h-[3px] rounded-[2px]" style={{ background: l.c }} />
                    <span className="text-[10px] text-[var(--text-dim)]">{l.l}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={196}>
                <ComposedChart data={chartData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip contentStyle={ttStyle} cursor={{ stroke: "var(--border)" }} />
                  <Area type="monotone" dataKey="analyses" stroke="#6366F1" fill="#6366F1" fillOpacity={0.10} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="videos" stroke="#8B5CF6" strokeWidth={1.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-[18px]">
                <span className="text-sm font-semibold text-foreground tracking-[-0.01em]">Activity</span>
                <span className="text-[10px] text-[var(--text-dim)] cursor-pointer hover:text-foreground transition-colors">View all</span>
              </div>
              <div className="flex flex-col flex-1">
                {activities.map((a, i) => (
                  <div key={a.id} className="flex items-start gap-[10px] py-[10px]"
                    style={{ borderBottom: i < activities.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
                      style={{ background: `color-mix(in srgb, ${a.dot} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${a.dot} 20%, transparent)` }}>
                      <a.icon size={11} color={a.dot} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[var(--text-dim)] mb-0.5">{a.action}</div>
                      <div className="text-[11px] font-semibold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{a.topic}</div>
                    </div>
                    <span className="text-[10px] text-[var(--text-dim)] shrink-0 mt-0.5">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </D>
        </div>

        {/* Quick Actions + Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-4">Quick Actions</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map(qa => (
                  <button key={qa.label} onClick={() => navigate.push(qa.path)}
                    className="flex flex-col items-start gap-[10px] p-[14px] rounded-[var(--radius-card)] bg-[var(--surface-1)] border border-border cursor-pointer text-left transition-all min-h-[90px] hover:border-[var(--surface-4)] hover:bg-[var(--surface-2)] hover:-translate-y-px">
                    <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${qa.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${qa.color} 22%, transparent)` }}>
                      <qa.icon size={13} color={qa.color} />
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-foreground mb-0.5">{qa.label}</div>
                      <div className="text-[10px] text-[var(--text-dim)]">{qa.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </D>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.41 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-foreground tracking-[-0.01em]">Top Opportunities</span>
                <button onClick={() => navigate.push("/dashboard/gap-analyzer")}
                  className="flex items-center gap-[3px] text-[10px] text-[var(--text-dim)] bg-transparent border-none cursor-pointer hover:text-foreground transition-colors p-0">
                  View all <ArrowRight size={10} />
                </button>
              </div>
              <div className="flex flex-col">
                {topOpps.map((opp, i) => (
                  <div key={opp.keyword} className="flex items-center gap-3 py-[11px] cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ borderBottom: i < topOpps.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div className="w-[34px] h-[34px] rounded-sm bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.16)] flex items-center justify-center shrink-0">
                      <span className="font-mono text-[11px] font-extrabold text-[var(--primary-hover)] tracking-[-0.03em]">{opp.score}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap mb-[5px]">{opp.keyword}</div>
                      <div className="at-progress"><div className="at-progress-fill" style={{ width: `${opp.score}%` }} /></div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span className="text-[10px] font-semibold text-[var(--neon-emerald)]">{opp.trend}</span>
                      <span className="font-mono text-[9px] text-[var(--text-dim)]">{opp.vol}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </D>
        </div>

      </div>
    </>
  );
}