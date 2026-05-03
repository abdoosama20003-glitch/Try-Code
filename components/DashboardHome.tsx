"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye, Crosshair, Sparkles, Zap, Clock, ArrowRight,
  FileText, Image, Target, ArrowUpRight, Play, TrendingUp,
} from "lucide-react";
import { TopBar } from "./TopBar";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ComposedChart,
} from "recharts";

const D = motion.create("div" as any);

/* ── Data ── */
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
  { id: 1, action: "Video pack generated",   topic: "Python Automation",  time: "2m",   icon: Sparkles,  dot: "var(--neon-purple)"  },
  { id: 2, action: "Gap analysis done",      topic: "AI Tools Hidden",    time: "15m",  icon: Crosshair, dot: "var(--neon-indigo)"  },
  { id: 3, action: "Script written",         topic: "Learn Rust 30 Days", time: "1h",   icon: FileText,  dot: "var(--neon-pink)"    },
  { id: 4, action: "Thumbnails generated",   topic: "Figma to Code",      time: "2h",   icon: Image,     dot: "var(--neon-amber)"   },
  { id: 5, action: "Topic saved",            topic: "No-Code Dev",        time: "3h",   icon: Target,    dot: "var(--neon-emerald)" },
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
  { label: "Analyses Run",     value: "2,847",   icon: Crosshair,  color: "var(--neon-indigo)",  change: "12%" },
  { label: "Videos Generated", value: "94",      icon: Play,       color: "var(--neon-purple)",  change: "31%" },
  { label: "Content Views",    value: "1.2M",    icon: Eye,        color: "var(--neon-pink)",    change: "18%" },
  { label: "Time Saved",       value: "342 hrs", icon: Clock,      color: "var(--neon-emerald)", change: "45%" },
];

const ttStyle = {
  backgroundColor: "var(--popover)", border: "1px solid var(--border)",
  borderRadius: "var(--radius)", fontSize: "11px",
  color: "var(--foreground)", fontFamily: "var(--font-sans)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
};

export function DashboardHome() {
  const navigate   = useRouter();
  const [range, setRange] = useState("7M");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <>
      <TopBar label="Overview" title="Dashboard" subtitle={`${today} — Welcome back, Alex`} actionLabel="Quick Analysis" actionIcon={Zap} onAction={() => navigate.push("/dashboard/gap-analyzer")} />

      <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">

        {/* ── KPI Strip ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {kpis.map((k, i) => (
            <D key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.03em" }}>{k.label}</span>
                  <div style={{ width: 30, height: 30, borderRadius: "var(--radius)", background: "var(--subtle-overlay)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <k.icon size={13} color={k.color} />
                  </div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter">{k.value}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                  <ArrowUpRight size={10} color="var(--neon-emerald)" />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--neon-emerald)" }}>{k.change}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>vs last month</span>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* ── Chart + Activity ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 10 }}>
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>Performance</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>Analyses &amp; Video Generation</div>
                </div>
                <div style={{ display: "flex", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden" }}>
                  {["1M", "3M", "7M"].map(t => (
                    <button key={t} onClick={() => setRange(t)} style={{ padding: "4px 10px", fontSize: "10px", fontWeight: range === t ? 700 : 400, background: range === t ? "var(--active-overlay)" : "transparent", color: range === t ? "var(--foreground)" : "var(--text-dim)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                {[{ l: "Analyses", c: "#6366F1" }, { l: "Videos", c: "#8B5CF6" }].map(l => (
                  <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 3, borderRadius: 2, background: l.c }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{l.l}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={196}>
                {/* ComposedChart avoids recharts v2 duplicate-key issue with same-type siblings */}
                <ComposedChart data={chartData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <CartesianGrid key="grid"   stroke="var(--border)" vertical={false} />
                  <XAxis         key="xaxis"  dataKey="name" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                  <YAxis         key="yaxis"  tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip       key="tip"    contentStyle={ttStyle} cursor={{ stroke: "var(--border)" }} />
                  <Area  key="analyses" type="monotone" dataKey="analyses" stroke="#6366F1" fill="#6366F1" fillOpacity={0.10} strokeWidth={1.5} />
                  <Line  key="videos"   type="monotone" dataKey="videos"   stroke="#8B5CF6" strokeWidth={1.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          {/* Activity */}
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>Activity</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLSpanElement).style.color = "var(--foreground)"}
                  onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLSpanElement).style.color = "var(--text-dim)"}
                >
                  View all
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {activities.map((a, i) => (
                  <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "var(--radius)", background: `color-mix(in srgb, ${a.dot} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${a.dot} 20%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <a.icon size={11} color={a.dot} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", marginBottom: 2 }}>{a.action}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.topic}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", flexShrink: 0, marginTop: 1 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </D>
        </div>

        {/* ── Quick Actions + Opportunities ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: 16 }}>Quick Actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {quickActions.map(qa => (
                  <button key={qa.label} onClick={() => navigate.push(qa.path)} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, padding: "14px", borderRadius: "var(--radius-card)", background: "var(--surface-1)", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left", transition: "all 0.15s", minHeight: 90 }}
                    onMouseEnter={(e: React.MouseEvent<any>) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--surface-4)"; b.style.background = "var(--surface-2)"; b.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e: React.MouseEvent<any>) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--border)"; b.style.background = "var(--surface-1)"; b.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `color-mix(in srgb, ${qa.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${qa.color} 22%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <qa.icon size={13} color={qa.color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>{qa.label}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{qa.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </D>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.41 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>Top Opportunities</span>
                <button onClick={() => navigate.push("/dashboard/gap-analyzer")} style={{ display: "flex", alignItems: "center", gap: 3, fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s", padding: 0 }}
                  onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"}
                  onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"}
                >
                  View all <ArrowRight size={10} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {topOpps.map((opp, i) => (
                  <div key={opp.keyword} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < topOpps.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "opacity 0.12s" }}
                    onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.opacity = "0.72"}
                    onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLDivElement).style.opacity = "1"}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: "var(--radius)", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800, color: "var(--primary-hover)", letterSpacing: "-0.03em" }}>{opp.score}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>{opp.keyword}</div>
                      <div className="at-progress"><div className="at-progress-fill" style={{ width: `${opp.score}%` }} /></div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "var(--neon-emerald)" }}>{opp.trend}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-dim)" }}>{opp.vol}</span>
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