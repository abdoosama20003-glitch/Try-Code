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

/* ── Reusable pieces using CSS vars ── */
function Field({ label, value, type = "text", placeholder }: { label: string; value?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>{label}</div>
      <input type={type} defaultValue={value} placeholder={placeholder} className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring" style={{ height: 40, boxSizing: "border-box" }} />
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "13px 0" }}>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--foreground)", marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>{desc}</div>
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

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "var(--background)" }}>
        <div style={{ maxWidth: 820, display: "flex", gap: 20 }}>

          {/* Left nav */}
          <div style={{ width: 190, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: "var(--radius)", background: tab === t.key ? "var(--active-overlay)" : "transparent", color: tab === t.key ? "var(--foreground)" : "var(--muted-foreground)", border: tab === t.key ? "1px solid var(--surface-3)" : "1px solid transparent", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: tab === t.key ? 500 : 400, textAlign: "left" }}
                onMouseEnter={(e: React.MouseEvent<any>) => { if (tab !== t.key) (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"; }}
                onMouseLeave={(e: React.MouseEvent<any>) => { if (tab !== t.key) (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)"; }}
              >
                <t.icon size={13} style={{ flexShrink: 0 }} /> {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <D key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}>

                {/* ── Profile ── */}
                {tab === "profile" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 16, letterSpacing: "-0.01em" }}>Profile Information</div>
                      <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "var(--radius-card)", background: "linear-gradient(135deg, var(--primary), var(--neon-purple))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: 800, color: "white" }}>AT</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>Alex Turner</div>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>alex@autotube.io</div>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-7.5 px-3 text-[11px]" style={{ fontFamily: "var(--font-sans)" }}>Change photo</button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <Field label="Full Name" value="Alex Turner" />
                        <Field label="Email" value="alex@autotube.io" type="email" />
                        <Field label="YouTube Channel" value="@AlexTurnerTech" />
                        <Field label="Timezone" value="UTC-5 (Eastern)" />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 10, letterSpacing: "-0.01em" }}>Niche Preferences</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginBottom: 14 }}>Select your content niches to personalize recommendations.</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {["Programming", "AI & ML", "Web Dev", "Design", "Tech Reviews", "Business", "Finance", "Gaming"].map(n => {
                          const active = ["Programming", "AI & ML", "Web Dev"].includes(n);
                          return (
                            <button key={n} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px", borderRadius: "var(--radius)", fontSize: "11px", fontWeight: 500, background: active ? "var(--accent)" : "var(--hover-overlay)", color: active ? "var(--primary-hover)" : "var(--text-dim)", border: `1px solid ${active ? "var(--border-active)" : "var(--border)"}`, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s" }}>
                              {active && <Check size={9} />} {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ padding: "14px 18px", borderRadius: "var(--radius-card)", border: "1px solid rgba(239,68,68,0.18)", background: "rgba(239,68,68,0.02)", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "var(--radius)", background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Trash2 size={13} color="var(--neon-red)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--neon-red)" }}>Danger Zone</div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginTop: 2 }}>Permanently delete your account and all associated data.</div>
                      </div>
                      <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 h-7.5 px-3 text-[11px]" style={{ fontFamily: "var(--font-sans)" }}>Delete account</button>
                    </div>
                  </div>
                )}

                {/* ── Notifications ── */}
                {tab === "notif" && (
                  <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 16, letterSpacing: "-0.01em" }}>Notification Preferences</div>
                    <div style={{ height: 1, background: "var(--border)", marginBottom: 4 }} />
                    {[
                      { key: "analysis",  label: "Analysis Complete",  desc: "Get notified when gap analysis finishes" },
                      { key: "opps",      label: "New Opportunities",  desc: "High-score gaps detected in your niche" },
                      { key: "digest",    label: "Weekly Digest",      desc: "Performance metrics summary every Monday" },
                      { key: "scripts",   label: "Script Generation",  desc: "AI finishes writing a script for you" },
                      { key: "marketing", label: "Product Updates",    desc: "News about features and improvements" },
                    ].map((n, i, arr) => (
                      <div key={n.key}>
                        <ToggleRow label={n.label} desc={n.desc} checked={notifs[n.key as keyof typeof notifs]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
                        {i < arr.length - 1 && <div style={{ height: 1, background: "var(--border)" }} />}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── API ── */}
                {tab === "api" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.01em" }}>Your API Key</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginBottom: 16 }}>Use this key to access the AutoTube API programmatically.</div>
                      <div style={{ height: 1, background: "var(--border)", marginBottom: 18 }} />
                      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        <div style={{ flex: 1, position: "relative" }}>
                          <input type={showKey ? "text" : "password"} readOnly defaultValue="at_prod_sk_9f2x8kL3nQ7mPvR1wYbD5cH4jA0tE6iU"
                            style={{ width: "100%", height: 40, paddingLeft: 12, paddingRight: 42, background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", color: "var(--foreground)", fontFamily: "var(--font-mono)", fontSize: "11px", outline: "none", boxSizing: "border-box" }}
                          />
                          <button onClick={() => setShowKey(!showKey)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)" }}>
                            {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-9 px-4" style={{ fontFamily: "var(--font-sans)" }}>
                          <Check size={12} /> Copy
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/12 text-emerald-500">● Active</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>Created Jan 15, 2026 · Last used 2 hours ago</span>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.01em" }}>Integrations</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginBottom: 14 }}>Connect external services to AutoTube.</div>
                      <div style={{ height: 1, background: "var(--border)", marginBottom: 6 }} />
                      {[
                        { name: "YouTube Data API", status: "connected",    c: "var(--neon-red)"     },
                        { name: "OpenAI GPT-4o",    status: "connected",    c: "var(--neon-emerald)" },
                        { name: "Ahrefs",           status: "disconnected", c: "var(--text-dim)"     },
                        { name: "Semrush",          status: "disconnected", c: "var(--text-dim)"     },
                      ].map((int, i, arr) => (
                        <div key={int.name}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 30, height: 30, borderRadius: "var(--radius)", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Key size={12} color={int.c} />
                              </div>
                              <div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--foreground)", marginBottom: 3 }}>{int.name}</div>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap ${int.status === "connected" ? "at-badge-success" : "at-badge-default"}`}>● {int.status}</span>
                              </div>
                            </div>
                            <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-7.5 px-3 text-[11px]" style={{ fontFamily: "var(--font-sans)" }}>{int.status === "connected" ? "Manage" : "Connect"}</button>
                          </div>
                          {i < arr.length - 1 && <div style={{ height: 1, background: "var(--border)" }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Billing ── */}
                {tab === "billing" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <Crown size={15} color="var(--neon-amber)" />
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--foreground)" }}>Pro Plan</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-amber-500/12 text-amber-500">Active</span>
                          </div>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.6 }}>500 analyses/month · 200 video packs · Advanced scripts · Priority support</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.04em", marginTop: 14, lineHeight: 1 }}>
                            $29<span style={{ fontSize: "var(--text-sm)", fontWeight: 400, color: "var(--text-dim)" }}>/month</span>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-9 px-4" style={{ fontFamily: "var(--font-sans)" }}>Manage Plan</button>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.01em" }}>Usage This Month</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginBottom: 16 }}>Resets on June 1, 2026</div>
                      <div style={{ height: 1, background: "var(--border)", marginBottom: 18 }} />
                      {[
                        { label: "Gap Analyses",    used: 312, limit: 500, color: "var(--primary)"      },
                        { label: "Video Packs",     used: 94,  limit: 200, color: "var(--neon-purple)"  },
                        { label: "Script Writes",   used: 28,  limit: 100, color: "var(--neon-pink)"    },
                        { label: "Thumbnail Ideas", used: 47,  limit: 200, color: "var(--neon-amber)"   },
                      ].map(u => (
                        <div key={u.label} style={{ marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{u.label}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--foreground)" }}>{u.used} <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>/ {u.limit}</span></span>
                          </div>
                          <div className="at-progress">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(u.used / u.limit) * 100}%` }} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} className="at-progress-fill" style={{ background: u.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Appearance ── */}
                {tab === "look" && (
                  <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.01em" }}>Appearance</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginBottom: 18 }}>Customize the look and feel of the interface.</div>
                    <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>Theme</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginBottom: 22 }}>
                      {[
                        { key: "dark",   label: "Dark",   bg: "#09090B" },
                        { key: "light",  label: "Light",  bg: "#F8F9FA" },
                        { key: "system", label: "System", bg: "linear-gradient(135deg, #09090B 50%, #F8F9FA 50%)" },
                      ].map(t => (
                        <button key={t.key} onClick={() => setAppearance(t.key)} style={{ borderRadius: "var(--radius-card)", border: `1px solid ${appearance === t.key ? "var(--primary)" : "var(--border)"}`, cursor: "pointer", padding: 0, overflow: "hidden", background: "var(--surface-1)", transition: "border-color 0.15s", textAlign: "left" }}>
                          <div style={{ height: 48, background: t.bg, borderBottom: "1px solid var(--border)" }} />
                          <div style={{ padding: "7px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                            {appearance === t.key && <div style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={6} color="white" /></div>}
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, color: "var(--foreground)" }}>{t.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>Sidebar density</div>
                    <div style={{ display: "flex", gap: 7 }}>
                      {["Compact", "Default", "Comfortable"].map(d => (
                        <button key={d} style={{ padding: "5px 13px", borderRadius: "var(--radius)", fontSize: "11px", fontWeight: 500, background: d === "Default" ? "var(--active-overlay)" : "transparent", color: d === "Default" ? "var(--foreground)" : "var(--text-dim)", border: `1px solid ${d === "Default" ? "var(--surface-3)" : "var(--border)"}`, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s" }}>{d}</button>
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