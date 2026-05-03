"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Eye, Clock, Target, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { TopBar } from "./TopBar";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart,
} from "recharts";

const D = motion.create("div" as any);

const viewsData = [
  { name: "Mon", views: 12400, subs: 85  },
  { name: "Tue", views: 15200, subs: 120 },
  { name: "Wed", views: 18900, subs: 95  },
  { name: "Thu", views: 22100, subs: 140 },
  { name: "Fri", views: 28300, subs: 180 },
  { name: "Sat", views: 34200, subs: 210 },
  { name: "Sun", views: 31800, subs: 195 },
];

const catData = [
  { name: "Programming", value: 42, color: "#6366F1" },
  { name: "AI & ML",     value: 28, color: "#8B5CF6" },
  { name: "Web Dev",     value: 18, color: "#EC4899" },
  { name: "Design",      value: 12, color: "#F59E0B" },
];

const perfData = [
  { m: "Jan", ctr: 4.2, ret: 42 },
  { m: "Feb", ctr: 5.1, ret: 45 },
  { m: "Mar", ctr: 5.8, ret: 48 },
  { m: "Apr", ctr: 6.4, ret: 52 },
  { m: "May", ctr: 7.2, ret: 56 },
  { m: "Jun", ctr: 7.8, ret: 58 },
  { m: "Jul", ctr: 8.1, ret: 61 },
];

const topVids = [
  { title: "Python Automation for Beginners", views: "120K", ctr: "9.2%", up: true  },
  { title: "7 Hidden AI Tools in 2026",       views: "89K",  ctr: "8.7%", up: true  },
  { title: "Figma to Code Workflow",           views: "65K",  ctr: "7.4%", up: true  },
  { title: "Learn Rust in 30 Days",            views: "42K",  ctr: "6.8%", up: false },
  { title: "No-Code App Development",          views: "38K",  ctr: "5.9%", up: true  },
];

const periods = ["7D", "30D", "90D", "1Y"];

const ttStyle = {
  backgroundColor: "var(--popover)", border: "1px solid var(--border)",
  borderRadius: "var(--radius)", fontSize: "11px",
  color: "var(--foreground)", fontFamily: "var(--font-sans)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
};

export function AnalyticsPage() {
  const [period, setPeriod] = useState("7D");

  const kpis = [
    { label: "Total Views",  val: "1.2M",      change: "18.3%", up: true,  icon: Eye,    color: "var(--neon-indigo)"  },
    { label: "Subscribers",  val: "24.8K",     change: "12.7%", up: true,  icon: Users,  color: "var(--neon-purple)"  },
    { label: "Watch Time",   val: "48.2K hrs", change: "22.1%", up: true,  icon: Clock,  color: "var(--neon-emerald)" },
    { label: "Avg CTR",      val: "8.1%",      change: "0.3%",  up: false, icon: Target, color: "var(--neon-amber)"   },
  ];

  return (
    <>
      <TopBar label="Insights" title="Analytics" subtitle="Track content performance and audience growth in real time" actionLabel="Export Report" actionIcon={BarChart3} />

      <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">

        {/* ── KPIs ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {kpis.map((s, i) => (
            <D key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.03em" }}>{s.label}</span>
                  <div style={{ width: 30, height: 30, borderRadius: "var(--radius)", background: "var(--subtle-overlay)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={13} color={s.color} />
                  </div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter">{s.val}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                  {s.up ? <ArrowUpRight size={10} color="var(--neon-emerald)" /> : <ArrowDownRight size={10} color="var(--neon-red)" />}
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: s.up ? "var(--neon-emerald)" : "var(--neon-red)" }}>{s.change}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>vs last period</span>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* ── Views + Categories ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 10 }}>
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>Performance</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>Views &amp; Subscribers</div>
                </div>
                <div style={{ display: "flex", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden" }}>
                  {periods.map(p => (
                    <button key={p} onClick={() => setPeriod(p)} style={{ padding: "4px 9px", fontSize: "10px", fontWeight: period === p ? 700 : 400, background: period === p ? "var(--active-overlay)" : "transparent", color: period === p ? "var(--foreground)" : "var(--text-dim)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                {[{ l: "Views", c: "#6366F1" }, { l: "Subs", c: "#8B5CF6" }].map(l => (
                  <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 3, borderRadius: 2, background: l.c }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{l.l}</span>
                  </div>
                ))}
              </div>
              {/* Gradient def hoisted outside recharts — avoids internal duplicate-key flattening */}
              <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <defs>
                  <linearGradient id="ap-g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
              <ResponsiveContainer width="100%" height={230}>
                {/* ComposedChart avoids recharts v2 duplicate-key issue with same-type siblings */}
                <ComposedChart data={viewsData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <CartesianGrid key="grid"  strokeDasharray="2 6" stroke="var(--border)" vertical={false} />
                  <XAxis         key="xaxis" dataKey="name" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                  <YAxis         key="yaxis" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip       key="tip"   contentStyle={ttStyle} cursor={{ stroke: "var(--border)" }} />
                  <Area key="views" type="monotone" dataKey="views" stroke="#6366F1" fill="url(#ap-g1)" strokeWidth={1.5} />
                  <Line key="subs"  type="monotone" dataKey="subs"  stroke="#8B5CF6" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: 18 }}>Content Categories</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                {/* Fixed-size PieChart — no ResponsiveContainer needed for known pixel dimensions */}
                <PieChart width={130} height={130}>
                  <Pie data={catData} cx={65} cy={65} innerRadius={36} outerRadius={60} paddingAngle={3} dataKey="value">
                    {catData.map(e => <Cell key={e.name} fill={e.color} stroke="transparent" />)}
                  </Pie>
                </PieChart>
              </div>
              <div>
                {catData.map((c, i) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < catData.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--muted-foreground)" }}>{c.name}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800, color: "var(--foreground)" }}>{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </D>
        </div>

        {/* ── CTR/Retention + Top Videos ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>Engagement</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>CTR &amp; Retention</div>
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  {[{ l: "CTR %", c: "var(--neon-amber)" }, { l: "Retention %", c: "var(--neon-pink)" }].map(l => (
                    <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 12, height: 3, borderRadius: 2, background: l.c }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{l.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                {/* ComposedChart avoids recharts v2 duplicate-key issue with same-type siblings */}
                <ComposedChart data={perfData} margin={{ top: 0, right: 0, left: -22, bottom: 0 }}>
                  <CartesianGrid key="grid"  strokeDasharray="2 6" stroke="var(--border)" vertical={false} />
                  <XAxis         key="xaxis" dataKey="m" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                  <YAxis         key="yaxis" tick={{ fontSize: 10, fill: "var(--text-dim)", fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={34} />
                  <Tooltip       key="tip"   contentStyle={ttStyle} cursor={{ stroke: "var(--border)" }} />
                  <Area key="ctr" type="monotone" dataKey="ctr" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.08} strokeWidth={1.5} dot={{ fill: "#F59E0B", r: 3, strokeWidth: 0 }} />
                  <Line key="ret" type="monotone" dataKey="ret" stroke="#EC4899" strokeWidth={1.5} dot={{ fill: "#EC4899", r: 3, strokeWidth: 0 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </D>

          <D initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.43 }}>
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: 18 }}>Top Videos</div>
              <div>
                {topVids.map((v, i) => (
                  <div key={v.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: i < topVids.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", width: 18, flexShrink: 0 }}>0{i + 1}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.title}</span>
                    </div>
                    <div style={{ display: "flex", gap: 14, flexShrink: 0, marginLeft: 12, alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--foreground)" }}>{v.views}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        {v.up ? <ArrowUpRight size={10} color="var(--neon-emerald)" /> : <ArrowDownRight size={10} color="var(--neon-red)" />}
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: v.up ? "var(--neon-emerald)" : "var(--neon-red)" }}>{v.ctr}</span>
                      </div>
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