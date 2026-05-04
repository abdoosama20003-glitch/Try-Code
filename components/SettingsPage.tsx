"use client";
import { useState } from "react";
import { User, Bell, Key, CreditCard, Palette, Save, Check, Trash2, Crown, Eye, EyeOff } from "lucide-react";
import { TopBar } from "./TopBar";
import { motion, AnimatePresence } from "framer-motion";

const D = motion.create("div" as any);

const tabs = [
  { key: "profile",  label: "Profile",       icon: User       },
  { key: "notif",    label: "Notifications", icon: Bell       },
  { key: "api",      label: "API Keys",      icon: Key        },
  { key: "billing",  label: "Billing",       icon: CreditCard },
  { key: "look",     label: "Appearance",    icon: Palette    },
];

function Field({ label, value, type = "text", placeholder }: { label: string; value?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1.5">{label}</div>
      <input type={type} defaultValue={value} placeholder={placeholder}
        className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`at-toggle ${checked ? "on" : "off"}`}>
      <div className="at-toggle-thumb" />
    </button>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-[13px]">
      <div>
        <div className="text-sm font-medium text-foreground mb-0.5">{label}</div>
        <div className="text-[11px] text-[var(--text-dim)]">{desc}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab]     = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [notifs, setNotifs] = useState({ analysis: true, opps: true, digest: true, scripts: false, marketing: false });
  const [appearance, setAppearance] = useState("dark");
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <>
      <TopBar label="Account" title="Settings" subtitle="Manage preferences, integrations, and billing" actionLabel={saved ? "Saved!" : "Save Changes"} actionIcon={saved ? Check : Save} onAction={save} />

      <div className="flex-1 overflow-y-auto px-4 md:px-7 py-6 bg-background min-w-0">
        <div className="max-w-[820px] flex flex-col md:flex-row gap-5">

          {/* Left nav */}
          <div className="w-full md:w-[190px] shrink-0 flex md:flex-col gap-1 md:gap-0.5 overflow-x-auto md:pb-0 pb-2 custom-scrollbar">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex items-center gap-[9px] px-3 py-[9px] rounded-sm cursor-pointer text-sm text-left transition-colors"
                style={{
                  background: tab === t.key ? "var(--active-overlay)" : "transparent",
                  color: tab === t.key ? "var(--foreground)" : "var(--muted-foreground)",
                  border: tab === t.key ? "1px solid var(--surface-3)" : "1px solid transparent",
                  fontWeight: tab === t.key ? 500 : 400,
                }}>
                <t.icon size={13} className="shrink-0" /> {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <D key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}>

                {/* Profile */}
                {tab === "profile" && (
                  <div className="flex flex-col gap-[14px]">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-4">Profile Information</div>
                      <div className="h-px bg-border mb-5" />
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[14px] mb-[22px] pb-5 border-b border-border">
                        <div className="w-[52px] h-[52px] rounded-[var(--radius-card)] bg-gradient-to-br from-primary to-[var(--neon-purple)] flex items-center justify-center shrink-0 shadow-[0_0_0_3px_rgba(99,102,241,0.2)]">
                          <span className="text-lg font-extrabold text-white">AT</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-foreground mb-0.5">Alex Turner</div>
                          <div className="text-[11px] text-[var(--text-dim)]">alex@autotube.io</div>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-[30px] px-3 text-[11px]">Change photo</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="Full Name" value="Alex Turner" />
                        <Field label="Email" value="alex@autotube.io" type="email" />
                        <Field label="YouTube Channel" value="@AlexTurnerTech" />
                        <Field label="Timezone" value="UTC-5 (Eastern)" />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-[10px]">Niche Preferences</div>
                      <div className="text-[11px] text-[var(--text-dim)] mb-[14px]">Select your content niches to personalize recommendations.</div>
                      <div className="flex flex-wrap gap-[7px]">
                        {["Programming", "AI & ML", "Web Dev", "Design", "Tech Reviews", "Business", "Finance", "Gaming"].map(n => {
                          const active = ["Programming", "AI & ML", "Web Dev"].includes(n);
                          return (
                            <button key={n}
                              className="inline-flex items-center gap-[5px] px-[11px] py-1 rounded-sm text-[11px] font-medium cursor-pointer transition-all"
                              style={{ background: active ? "var(--accent)" : "var(--hover-overlay)", color: active ? "var(--primary-hover)" : "var(--text-dim)", border: `1px solid ${active ? "var(--border-active)" : "var(--border)"}` }}>
                              {active && <Check size={9} />} {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="px-[18px] py-[14px] rounded-[var(--radius-card)] border border-[rgba(239,68,68,0.18)] bg-[rgba(239,68,68,0.02)] flex items-center gap-3">
                      <div className="w-[34px] h-[34px] rounded-sm bg-[rgba(239,68,68,0.08)] flex items-center justify-center shrink-0">
                        <Trash2 size={13} color="var(--neon-red)" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[var(--neon-red)]">Danger Zone</div>
                        <div className="text-[11px] text-[var(--text-dim)] mt-0.5">Permanently delete your account and all associated data.</div>
                      </div>
                      <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 h-[30px] px-3 text-[11px]">Delete account</button>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {tab === "notif" && (
                  <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                    <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-4">Notification Preferences</div>
                    <div className="h-px bg-border mb-1" />
                    {[
                      { key: "analysis",  label: "Analysis Complete",  desc: "Get notified when gap analysis finishes" },
                      { key: "opps",      label: "New Opportunities",  desc: "High-score gaps detected in your niche" },
                      { key: "digest",    label: "Weekly Digest",      desc: "Performance metrics summary every Monday" },
                      { key: "scripts",   label: "Script Generation",  desc: "AI finishes writing a script for you" },
                      { key: "marketing", label: "Product Updates",    desc: "News about features and improvements" },
                    ].map((n, i, arr) => (
                      <div key={n.key}>
                        <ToggleRow label={n.label} desc={n.desc} checked={notifs[n.key as keyof typeof notifs]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
                        {i < arr.length - 1 && <div className="h-px bg-border" />}
                      </div>
                    ))}
                  </div>
                )}

                {/* API */}
                {tab === "api" && (
                  <div className="flex flex-col gap-[14px]">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-1">Your API Key</div>
                      <div className="text-[11px] text-[var(--text-dim)] mb-4">Use this key to access the AutoTube API programmatically.</div>
                      <div className="h-px bg-border mb-[18px]" />
                      <div className="flex gap-2 mb-[14px]">
                        <div className="flex-1 relative">
                          <input type={showKey ? "text" : "password"} readOnly defaultValue="at_prod_sk_9f2x8kL3nQ7mPvR1wYbD5cH4jA0tE6iU"
                            className="w-full h-10 pl-3 pr-10 bg-[var(--surface-1)] border border-border rounded-[var(--radius-button)] text-foreground font-mono text-[11px] outline-none" />
                          <button onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-dim)]">
                            {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-9 px-4">
                          <Check size={12} /> Copy
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/10 text-emerald-500">● Active</span>
                        <span className="text-[11px] text-[var(--text-dim)]">Created Jan 15, 2026 · Last used 2 hours ago</span>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-1">Integrations</div>
                      <div className="text-[11px] text-[var(--text-dim)] mb-[14px]">Connect external services to AutoTube.</div>
                      <div className="h-px bg-border mb-1.5" />
                      {[
                        { name: "YouTube Data API", status: "connected",    c: "var(--neon-red)"     },
                        { name: "OpenAI GPT-4o",    status: "connected",    c: "var(--neon-emerald)" },
                        { name: "Ahrefs",           status: "disconnected", c: "var(--text-dim)"     },
                        { name: "Semrush",          status: "disconnected", c: "var(--text-dim)"     },
                      ].map((int, i, arr) => (
                        <div key={int.name}>
                          <div className="flex items-center justify-between py-[11px]">
                            <div className="flex items-center gap-[10px]">
                              <div className="w-[30px] h-[30px] rounded-sm bg-[var(--surface-2)] border border-border flex items-center justify-center">
                                <Key size={12} color={int.c} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground mb-[3px]">{int.name}</div>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap ${int.status === "connected" ? "at-badge-success" : "at-badge-default"}`}>● {int.status}</span>
                              </div>
                            </div>
                            <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-[30px] px-3 text-[11px]">{int.status === "connected" ? "Manage" : "Connect"}</button>
                          </div>
                          {i < arr.length - 1 && <div className="h-px bg-border" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Billing */}
                {tab === "billing" && (
                  <div className="flex flex-col gap-[14px]">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Crown size={15} color="var(--neon-amber)" />
                            <span className="text-base font-bold text-foreground">Pro Plan</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-amber-500/10 text-amber-500">Active</span>
                          </div>
                          <div className="text-sm text-muted-foreground leading-[1.6]">500 analyses/month · 200 video packs · Advanced scripts · Priority support</div>
                          <div className="font-mono text-2xl font-extrabold text-foreground tracking-[-0.04em] mt-[14px] leading-none">
                            $29<span className="text-sm font-normal text-[var(--text-dim)]">/month</span>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-9 px-4">Manage Plan</button>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-1">Usage This Month</div>
                      <div className="text-[11px] text-[var(--text-dim)] mb-4">Resets on June 1, 2026</div>
                      <div className="h-px bg-border mb-[18px]" />
                      {[
                        { label: "Gap Analyses",    used: 312, limit: 500, color: "var(--primary)"     },
                        { label: "Video Packs",     used: 94,  limit: 200, color: "var(--neon-purple)" },
                        { label: "Script Writes",   used: 28,  limit: 100, color: "var(--neon-pink)"   },
                        { label: "Thumbnail Ideas", used: 47,  limit: 200, color: "var(--neon-amber)"  },
                      ].map(u => (
                        <div key={u.label} className="mb-[14px]">
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-muted-foreground">{u.label}</span>
                            <span className="font-mono text-xs font-bold text-foreground">{u.used} <span className="text-[var(--text-dim)] font-normal">/ {u.limit}</span></span>
                          </div>
                          <div className="at-progress">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(u.used / u.limit) * 100}%` }} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                              className="at-progress-fill" style={{ background: u.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {tab === "look" && (
                  <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                    <div className="text-sm font-semibold text-foreground tracking-[-0.01em] mb-1">Appearance</div>
                    <div className="text-[11px] text-[var(--text-dim)] mb-[18px]">Customize the look and feel of the interface.</div>
                    <div className="h-px bg-border mb-5" />
                    <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-[10px]">Theme</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[9px] mb-[22px]">
                      {[
                        { key: "dark",   label: "Dark",   bg: "#09090B" },
                        { key: "light",  label: "Light",  bg: "#F8F9FA" },
                        { key: "system", label: "System", bg: "linear-gradient(135deg, #09090B 50%, #F8F9FA 50%)" },
                      ].map(t => (
                        <button key={t.key} onClick={() => setAppearance(t.key)}
                          className="rounded-[var(--radius-card)] cursor-pointer p-0 overflow-hidden bg-[var(--surface-1)] transition-[border-color] text-left"
                          style={{ border: `1px solid ${appearance === t.key ? "var(--primary)" : "var(--border)"}` }}>
                          <div className="h-12 border-b border-border" style={{ background: t.bg }} />
                          <div className="px-[10px] py-[7px] flex items-center gap-[5px]">
                            {appearance === t.key && (
                              <div className="w-[11px] h-[11px] rounded-full bg-primary flex items-center justify-center">
                                <Check size={6} color="white" />
                              </div>
                            )}
                            <span className="text-[11px] font-medium text-foreground">{t.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-[10px]">Sidebar density</div>
                    <div className="flex gap-[7px]">
                      {["Compact", "Default", "Comfortable"].map(d => (
                        <button key={d}
                          className="px-[13px] py-[5px] rounded-sm text-[11px] font-medium cursor-pointer transition-all"
                          style={{ background: d === "Default" ? "var(--active-overlay)" : "transparent", color: d === "Default" ? "var(--foreground)" : "var(--text-dim)", border: `1px solid ${d === "Default" ? "var(--surface-3)" : "var(--border)"}` }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </D>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
}