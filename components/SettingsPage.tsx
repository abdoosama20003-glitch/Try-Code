"use client";
import { useState } from "react";
import { User, Bell, CreditCard, Save, Check, Trash2, Crown, Menu, Shield, Link2, Globe, Zap, Crosshair, Sparkles, PenTool, Image } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "@/context/SidebarContext";
import { motion, AnimatePresence } from "framer-motion";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "notif", label: "Notifications", icon: Bell },
  { key: "billing", label: "Billing & Usage", icon: CreditCard },
  { key: "security", label: "Security", icon: Shield },
];

function Field({ label, value, type = "text" }: { label: string; value?: string; type?: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">{label}</div>
      <input type={type} defaultValue={value} className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative w-10 h-[22px] rounded-full cursor-pointer border-none transition-colors shrink-0" style={{ background: on ? "#7C5CFC" : "var(--surface-3)" }}>
      <motion.div animate={{ x: on ? 18 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm" />
    </button>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [notifs, setNotifs] = useState({ analysis: true, opps: true, digest: true, scripts: false, marketing: false });
  const { setIsMobileOpen } = useSidebar();
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Settings</h1>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={save}
              className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              {saved ? <Check size={11} /> : <Save size={11} />} {saved ? "Saved!" : "Save Changes"}
            </motion.button>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex px-5 md:px-8 gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] bg-transparent border-none cursor-pointer whitespace-nowrap transition-all -mb-px font-medium ${tab === t.key ? "text-foreground border-b-2 border-b-primary" : "text-[var(--text-dim)] border-b-2 border-b-transparent hover:text-foreground"}`}>
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-8 max-w-[900px]">
        <AnimatePresence mode="wait">
          <D key={tab} {...fade(0)}>

            {/* ═══ PROFILE ═══ */}
            {tab === "profile" && (
              <div className="space-y-4">
                {/* Avatar card */}
                <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(124,92,252,0.06) 0%, transparent 60%)" }} />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#A855F7] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(124,92,252,0.15)]">
                      <span className="text-xl font-extrabold text-white">AT</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-foreground">Alex Turner</div>
                      <div className="text-[12px] text-[var(--text-dim)] mt-0.5">alex@autotube.io · @AlexTurnerTech</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] text-[#FBBF24]">Pro Plan</span>
                        <span className="text-[10px] text-[var(--text-dim)]">Member since Jan 2025</span>
                      </div>
                    </div>
                    <button className="h-9 px-4 rounded-xl text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all">Change photo</button>
                  </div>
                </div>

                {/* Fields */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-5">Personal Information</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" value="Alex Turner" />
                    <Field label="Email" value="alex@autotube.io" type="email" />
                    <Field label="YouTube Channel" value="@AlexTurnerTech" />
                    <Field label="Timezone" value="UTC-5 (Eastern)" />
                  </div>
                </div>

                {/* Niches */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-1">Content Niches</div>
                  <div className="text-[11px] text-[var(--text-dim)] mb-4">Personalize your recommendations.</div>
                  <div className="flex flex-wrap gap-2">
                    {["Programming", "AI & ML", "Web Dev", "Design", "Tech Reviews", "Business", "Finance", "Gaming"].map(n => {
                      const active = ["Programming", "AI & ML", "Web Dev"].includes(n);
                      return (
                        <button key={n} className={`h-8 px-3 rounded-xl text-[11px] font-medium cursor-pointer transition-all border flex items-center gap-1.5 ${active ? "bg-primary text-white border-primary" : "bg-transparent text-[var(--text-dim)] border-border hover:text-foreground hover:bg-[var(--hover-overlay)]"}`}>
                          {active && <Check size={10} />} {n}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Connected */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-4">Connected Accounts</div>
                  {[
                    { name: "YouTube", status: "Connected", color: "#EF4444", connected: true },
                    { name: "Google Analytics", status: "Connected", color: "#FBBF24", connected: true },
                    { name: "TikTok", status: "Not connected", color: "#A855F7", connected: false },
                  ].map((a, i, arr) => (
                    <div key={a.name} className="flex items-center justify-between py-3" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
                          <Link2 size={14} color={a.color} />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-foreground">{a.name}</div>
                          <div className="text-[10px] text-[var(--text-dim)]">{a.status}</div>
                        </div>
                      </div>
                      <button className={`h-8 px-3 rounded-lg text-[11px] font-medium cursor-pointer transition-all border ${a.connected ? "text-[var(--text-dim)] border-border bg-transparent hover:text-foreground" : "text-primary border-primary/20 bg-primary/5 hover:bg-primary/10"}`}>
                        {a.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Danger */}
                <div className="p-5 rounded-2xl border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.03)] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] flex items-center justify-center shrink-0"><Trash2 size={15} color="#EF4444" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#EF4444]">Delete Account</div>
                    <div className="text-[11px] text-[var(--text-dim)] mt-0.5">Permanently delete your account and all data.</div>
                  </div>
                  <button className="h-8 px-3 rounded-lg text-[11px] font-medium text-[#EF4444] border border-[rgba(239,68,68,0.2)] bg-transparent cursor-pointer hover:bg-[rgba(239,68,68,0.08)] transition-all">Delete</button>
                </div>
              </div>
            )}

            {/* ═══ NOTIFICATIONS ═══ */}
            {tab === "notif" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-1">Email Notifications</div>
                  <div className="text-[11px] text-[var(--text-dim)] mb-5">Choose what updates you receive.</div>
                  {[
                    { key: "analysis", label: "Analysis Complete", desc: "When gap analysis finishes", icon: Crosshair, color: "#7C5CFC" },
                    { key: "opps", label: "New Opportunities", desc: "High-score gaps in your niche", icon: Zap, color: "#34D399" },
                    { key: "digest", label: "Weekly Digest", desc: "Performance summary every Monday", icon: Globe, color: "#A855F7" },
                    { key: "scripts", label: "Script Generation", desc: "AI finishes writing a script", icon: PenTool, color: "#F472B6" },
                    { key: "marketing", label: "Product Updates", desc: "News about features", icon: Sparkles, color: "#FBBF24" },
                  ].map((n, i, arr) => (
                    <div key={n.key} className="flex items-center gap-4 py-4" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${n.color}12`, border: `1px solid ${n.color}20` }}>
                        <n.icon size={14} color={n.color} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-medium text-foreground">{n.label}</div>
                        <div className="text-[10px] text-[var(--text-dim)]">{n.desc}</div>
                      </div>
                      <Toggle on={notifs[n.key as keyof typeof notifs]} onToggle={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ BILLING ═══ */}
            {tab === "billing" && (
              <div className="space-y-4">
                {/* Plan */}
                <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(251,191,36,0.06) 0%, transparent 60%)" }} />
                  <div className="flex items-start justify-between gap-4 relative">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Crown size={18} color="#FBBF24" />
                        <span className="text-lg font-bold text-foreground">Pro Plan</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] text-[#FBBF24]">Active</span>
                      </div>
                      <div className="text-[12px] text-muted-foreground leading-relaxed mb-4">500 analyses · 200 video packs · Advanced scripts · Priority support</div>
                      <div className="font-mono text-4xl font-extrabold text-foreground tracking-tighter leading-none">$29<span className="text-sm font-normal text-[var(--text-dim)]">/mo</span></div>
                    </div>
                    <button className="h-9 px-4 rounded-xl text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all">Manage Plan</button>
                  </div>
                </div>

                {/* Usage */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <div className="text-sm font-bold text-foreground">Usage This Month</div>
                      <div className="text-[11px] text-[var(--text-dim)]">Resets June 1, 2026</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Gap Analyses", used: 312, limit: 500, color: "#7C5CFC", icon: Crosshair },
                      { label: "Video Packs", used: 94, limit: 200, color: "#A855F7", icon: Sparkles },
                      { label: "Script Writes", used: 28, limit: 100, color: "#F472B6", icon: PenTool },
                      { label: "Thumbnail Ideas", used: 47, limit: 200, color: "#FBBF24", icon: Image },
                    ].map(u => (
                      <div key={u.label} className="p-4 rounded-xl bg-[var(--surface-1)] border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${u.color}12`, border: `1px solid ${u.color}20` }}>
                            <u.icon size={12} color={u.color} />
                          </div>
                          <span className="text-[12px] font-medium text-foreground">{u.label}</span>
                          <span className="ml-auto font-mono text-[11px] font-bold text-foreground">{u.used}<span className="text-[var(--text-dim)] font-normal">/{u.limit}</span></span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(u.used / u.limit) * 100}%` }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full" style={{ background: u.color }} />
                        </div>
                        <div className="text-[10px] text-[var(--text-dim)] mt-1.5">{Math.round((u.used / u.limit) * 100)}% used</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ SECURITY ═══ */}
            {tab === "security" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-5">Password</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Field label="Current Password" type="password" value="••••••••" />
                    <Field label="New Password" type="password" />
                  </div>
                  <button className="h-9 px-5 rounded-xl text-[11px] font-bold text-white border-none cursor-pointer" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>Update Password</button>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-1">Two-Factor Authentication</div>
                  <div className="text-[11px] text-[var(--text-dim)] mb-4">Add an extra layer of security.</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.18)]"><Shield size={14} color="#34D399" /></div>
                      <div>
                        <div className="text-[13px] font-medium text-foreground">2FA Enabled</div>
                        <div className="text-[10px] text-[var(--text-dim)]">Authenticator app configured</div>
                      </div>
                    </div>
                    <button className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Reconfigure</button>
                  </div>
                </div>
              </div>
            )}

          </D>
        </AnimatePresence>
      </div>
    </div>
  );
}