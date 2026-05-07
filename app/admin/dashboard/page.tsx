"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalField } from "@/components/Modal";
import { LogoMark } from "@/components/LogoMark";
import {
  Users, DollarSign, TrendingUp, Crown, Search, Edit3, Eye, Trash2,
  ArrowUpRight, ArrowDownRight, Shield, LogOut, X, Check, BarChart3, Zap, Settings
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

type Plan = "Starter" | "Pro" | "Enterprise";

interface UserData {
  id: number; name: string; email: string; plan: Plan; status: "active" | "inactive";
  joined: string; analyses: number; videos: number; revenue: number;
  performance: { month: string; views: number }[];
}

const mockUsers: UserData[] = [
  { id: 1, name: "Alex Turner", email: "alex@gmail.com", plan: "Pro", status: "active", joined: "Jan 2025", analyses: 312, videos: 94, revenue: 29, performance: [{ month: "Jan", views: 120 },{ month: "Feb", views: 180 },{ month: "Mar", views: 250 },{ month: "Apr", views: 310 },{ month: "May", views: 420 },{ month: "Jun", views: 380 },{ month: "Jul", views: 510 }] },
  { id: 2, name: "Sarah Chen", email: "sarah@outlook.com", plan: "Enterprise", status: "active", joined: "Mar 2025", analyses: 847, videos: 234, revenue: 99, performance: [{ month: "Jan", views: 340 },{ month: "Feb", views: 420 },{ month: "Mar", views: 580 },{ month: "Apr", views: 620 },{ month: "May", views: 710 },{ month: "Jun", views: 800 },{ month: "Jul", views: 950 }] },
  { id: 3, name: "James Rodriguez", email: "james.r@yahoo.com", plan: "Starter", status: "active", joined: "May 2025", analyses: 28, videos: 5, revenue: 0, performance: [{ month: "Jan", views: 10 },{ month: "Feb", views: 25 },{ month: "Mar", views: 40 },{ month: "Apr", views: 35 },{ month: "May", views: 55 },{ month: "Jun", views: 70 },{ month: "Jul", views: 90 }] },
  { id: 4, name: "Emily Watson", email: "emily.w@gmail.com", plan: "Pro", status: "inactive", joined: "Nov 2024", analyses: 156, videos: 42, revenue: 29, performance: [{ month: "Jan", views: 200 },{ month: "Feb", views: 180 },{ month: "Mar", views: 160 },{ month: "Apr", views: 140 },{ month: "May", views: 100 },{ month: "Jun", views: 80 },{ month: "Jul", views: 60 }] },
  { id: 5, name: "Mike Johnson", email: "mike.j@hotmail.com", plan: "Pro", status: "active", joined: "Feb 2025", analyses: 489, videos: 128, revenue: 29, performance: [{ month: "Jan", views: 180 },{ month: "Feb", views: 220 },{ month: "Mar", views: 300 },{ month: "Apr", views: 350 },{ month: "May", views: 400 },{ month: "Jun", views: 450 },{ month: "Jul", views: 520 }] },
  { id: 6, name: "Lisa Park", email: "lisa.p@gmail.com", plan: "Enterprise", status: "active", joined: "Dec 2024", analyses: 1024, videos: 312, revenue: 99, performance: [{ month: "Jan", views: 500 },{ month: "Feb", views: 620 },{ month: "Mar", views: 750 },{ month: "Apr", views: 810 },{ month: "May", views: 900 },{ month: "Jun", views: 980 },{ month: "Jul", views: 1100 }] },
];

const planColors: Record<Plan, string> = { Starter: "#34D399", Pro: "#7C5CFC", Enterprise: "#FBBF24" };

const ttStyle = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11, padding: "8px 12px", color: "var(--foreground)", boxShadow: "var(--elevation-md)" };

export default function AdminDashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState<UserData | null>(null);
  const [prices, setPrices] = useState({ Starter: 0, Pro: 29, Enterprise: 99 });
  const [priceSaved, setPriceSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("at-admin") !== "true") {
      router.push("/admin");
    }
  }, [router]);

  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const totalRevenue = mockUsers.reduce((a, u) => a + u.revenue, 0);
  const activeUsers = mockUsers.filter(u => u.status === "active").length;

  const kpis = [
    { label: "Total Users", value: mockUsers.length.toString(), change: "+12%", up: true, icon: Users, color: "#7C5CFC" },
    { label: "Active Users", value: activeUsers.toString(), change: "+8%", up: true, icon: Zap, color: "#34D399" },
    { label: "Monthly Revenue", value: `$${totalRevenue}`, change: "+18%", up: true, icon: DollarSign, color: "#FBBF24" },
    { label: "Avg Analyses/User", value: Math.round(mockUsers.reduce((a, u) => a + u.analyses, 0) / mockUsers.length).toString(), change: "+5%", up: true, icon: TrendingUp, color: "#A855F7" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <LogoMark size={22} />
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[#EF4444]">Admin Panel</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPricing(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all flex items-center gap-1.5">
              <Settings size={12} /> Pricing
            </button>
            <button onClick={() => { localStorage.removeItem("at-admin"); router.push("/admin"); }} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[#EF4444] border border-[rgba(239,68,68,0.2)] bg-transparent cursor-pointer hover:bg-[rgba(239,68,68,0.08)] transition-all flex items-center gap-1.5">
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {kpis.map((k, i) => (
            <D key={k.label} {...fade(0.04 + i * 0.05)}>
              <div className="group bg-card border border-border rounded-2xl p-5 hover:border-[var(--surface-4)] transition-all relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] text-[var(--text-dim)]">{k.label}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}12`, border: `1px solid ${k.color}20` }}><k.icon size={15} color={k.color} /></div>
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter mb-1">{k.value}</div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)]">
                    <ArrowUpRight size={9} color="#34D399" />
                    <span className="text-[10px] font-bold text-[#34D399]">{k.change}</span>
                  </div>
                </div>
              </div>
            </D>
          ))}
        </div>

        {/* Search + User Table */}
        <D {...fade(0.25)}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
              <div className="text-sm font-bold text-foreground">User Management</div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…"
                  className="h-9 pl-9 pr-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground w-[220px] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border bg-[var(--surface-1)]">
                    {["User", "Plan", "Status", "Analyses", "Videos", "Revenue", "Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} className="border-b border-border hover:bg-[var(--hover-overlay)] transition-colors cursor-pointer" onClick={() => setSelectedUser(u)}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#A855F7] flex items-center justify-center shrink-0"><span className="text-[10px] font-bold text-white">{u.name.split(" ").map(n => n[0]).join("")}</span></div>
                          <div>
                            <div className="text-[12px] font-medium text-foreground">{u.name}</div>
                            <div className="text-[10px] text-[var(--text-dim)]">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${planColors[u.plan]}15`, border: `1px solid ${planColors[u.plan]}30`, color: planColors[u.plan] }}>{u.plan}</span></td>
                      <td className="px-5 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]" : "bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[#EF4444]"}`}>{u.status}</span></td>
                      <td className="px-5 py-3 font-mono text-[12px] text-foreground">{u.analyses}</td>
                      <td className="px-5 py-3 font-mono text-[12px] text-foreground">{u.videos}</td>
                      <td className="px-5 py-3 font-mono text-[12px] font-bold text-foreground">${u.revenue}/mo</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button onClick={e => { e.stopPropagation(); setSelectedUser(u); }} className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border border-border text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all"><Eye size={12} /></button>
                          <button onClick={e => { e.stopPropagation(); setShowChangePlan(u); }} className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border border-border text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all"><Edit3 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </D>
      </div>

      {/* ═══ USER DETAIL MODAL ═══ */}
      <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title={selectedUser?.name} subtitle={selectedUser?.email} width="max-w-2xl">
        {selectedUser && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { l: "Plan", v: selectedUser.plan, c: planColors[selectedUser.plan] },
                { l: "Status", v: selectedUser.status, c: selectedUser.status === "active" ? "#34D399" : "#EF4444" },
                { l: "Joined", v: selectedUser.joined, c: "#7C5CFC" },
                { l: "Revenue", v: `$${selectedUser.revenue}/mo`, c: "#FBBF24" },
              ].map(s => (
                <div key={s.l} className="p-3 rounded-xl bg-[var(--surface-1)] border border-border">
                  <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">{s.l}</div>
                  <div className="text-sm font-bold" style={{ color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-[var(--surface-1)] border border-border">
                <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">Total Analyses</div>
                <div className="font-mono text-lg font-extrabold text-foreground">{selectedUser.analyses}</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-1)] border border-border">
                <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">Videos Created</div>
                <div className="font-mono text-lg font-extrabold text-foreground">{selectedUser.videos}</div>
              </div>
            </div>
            <div className="bg-[var(--surface-1)] border border-border rounded-xl p-4">
              <div className="text-[11px] font-bold text-foreground mb-3">Performance (Views)</div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={selectedUser.performance}>
                  <defs><linearGradient id="adm-g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.15} /><stop offset="95%" stopColor="#7C5CFC" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-dim)" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={ttStyle} />
                  <Area type="monotone" dataKey="views" stroke="#7C5CFC" fill="url(#adm-g)" strokeWidth={2} dot={{ r: 3, fill: "#7C5CFC", stroke: "var(--card)", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setSelectedUser(null); setShowChangePlan(selectedUser); }} className="flex-1 h-9 rounded-xl text-[11px] font-bold text-white border-none cursor-pointer" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>Change Plan</button>
              <button onClick={() => setSelectedUser(null)} className="flex-1 h-9 rounded-xl text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ CHANGE PLAN MODAL ═══ */}
      <Modal open={!!showChangePlan} onClose={() => setShowChangePlan(null)} title={`Change Plan — ${showChangePlan?.name}`} subtitle="Select a new plan for this user.">
        {showChangePlan && (
          <div className="space-y-3 pt-2">
            {(["Starter", "Pro", "Enterprise"] as Plan[]).map(p => (
              <button key={p} onClick={() => setShowChangePlan(null)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${showChangePlan.plan === p ? "border-primary bg-primary/5" : "border-border bg-transparent hover:bg-[var(--hover-overlay)]"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${planColors[p]}12`, border: `1px solid ${planColors[p]}20` }}>
                    <Crown size={14} color={planColors[p]} />
                  </div>
                  <div className="text-left">
                    <div className="text-[13px] font-medium text-foreground">{p}</div>
                    <div className="text-[10px] text-[var(--text-dim)]">${prices[p]}/mo</div>
                  </div>
                </div>
                {showChangePlan.plan === p && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Current</span>}
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* ═══ PRICING MODAL ═══ */}
      <Modal open={showPricing} onClose={() => { setShowPricing(false); setPriceSaved(false); }} title="Manage Pricing" subtitle="Update plan prices for all users.">
        <div className="space-y-4 pt-2">
          {(["Starter", "Pro", "Enterprise"] as Plan[]).map(p => (
            <div key={p} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${planColors[p]}12`, border: `1px solid ${planColors[p]}20` }}>
                <Crown size={14} color={planColors[p]} />
              </div>
              <span className="text-[13px] font-medium text-foreground w-24">{p}</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] text-sm">$</span>
                <input type="number" value={prices[p]} onChange={e => setPrices(prev => ({ ...prev, [p]: Number(e.target.value) }))}
                  className="w-full h-10 pl-7 pr-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
              </div>
              <span className="text-[11px] text-[var(--text-dim)]">/mo</span>
            </div>
          ))}
          <button onClick={() => { setPriceSaved(true); setTimeout(() => { setShowPricing(false); setPriceSaved(false); }, 1000); }}
            className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-1.5"
            style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
            {priceSaved ? <><Check size={13} /> Saved!</> : "Update Prices"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
