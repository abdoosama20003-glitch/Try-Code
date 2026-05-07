"use client";
import { useState } from "react";
import { User, CreditCard, Save, Check, Trash2, Crown, Menu, Shield, Link2, Crosshair, Sparkles, PenTool, Image, Upload, CreditCard as CardIcon, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Modal, ModalField } from "./Modal";
import { useSidebar } from "@/context/SidebarContext";
import { motion, AnimatePresence } from "framer-motion";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "billing", label: "Billing & Usage", icon: CreditCard },
];

function Field({ label, value, type = "text" }: { label: string; value?: string; type?: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">{label}</div>
      <input type={type} defaultValue={value} className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const { setIsMobileOpen } = useSidebar();
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  // Modals
  const [showPhoto, setShowPhoto] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showManagePlan, setShowManagePlan] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [connectedAccts, setConnectedAccts] = useState({ YouTube: true, "Google Analytics": true, TikTok: false });
  const [pwdSaved, setPwdSaved] = useState(false);

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
                    <button onClick={() => setShowPhoto(true)} className="h-9 px-4 rounded-xl text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all">Change photo</button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-5">Personal Information</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" value="Alex Turner" />
                    <Field label="Email" value="alex@autotube.io" type="email" />
                    <Field label="YouTube Channel" value="@AlexTurnerTech" />
                    <Field label="Timezone" value="UTC-5 (Eastern)" />
                  </div>
                </div>

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

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-1">Password</div>
                  <div className="text-[11px] text-[var(--text-dim)] mb-4">Update your account password.</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Field label="Current Password" type="password" value="••••••••" />
                    <Field label="New Password" type="password" />
                  </div>
                  <button onClick={() => { setPwdSaved(true); setTimeout(() => setPwdSaved(false), 2000); }} className="h-9 px-5 rounded-xl text-[11px] font-bold text-white border-none cursor-pointer flex items-center gap-1.5" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>{pwdSaved ? <><Check size={10} /> Updated!</> : "Update Password"}</button>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-sm font-bold text-foreground mb-4">Connected Accounts</div>
                  {[
                    { name: "YouTube", color: "#EF4444" },
                    { name: "Google Analytics", color: "#FBBF24" },
                    { name: "TikTok", color: "#A855F7" },
                  ].map((a, i, arr) => {
                    const connected = connectedAccts[a.name as keyof typeof connectedAccts];
                    return (
                    <div key={a.name} className="flex items-center justify-between py-3" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
                          <Link2 size={14} color={a.color} />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-foreground">{a.name}</div>
                          <div className="text-[10px] text-[var(--text-dim)]">{connected ? "Connected" : "Not connected"}</div>
                        </div>
                      </div>
                      <button onClick={() => setConnectedAccts(prev => ({ ...prev, [a.name]: !prev[a.name as keyof typeof prev] }))} className={`h-8 px-3 rounded-lg text-[11px] font-medium cursor-pointer transition-all border ${connected ? "text-[var(--text-dim)] border-border bg-transparent hover:text-foreground" : "text-primary border-primary/20 bg-primary/5 hover:bg-primary/10"}`}>
                        {connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                    );
                  })}
                </div>

                <div className="p-5 rounded-2xl border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.03)] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] flex items-center justify-center shrink-0"><Trash2 size={15} color="#EF4444" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#EF4444]">Delete Account</div>
                    <div className="text-[11px] text-[var(--text-dim)] mt-0.5">Permanently delete your account and all data.</div>
                  </div>
                  <button onClick={() => setShowDelete(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[#EF4444] border border-[rgba(239,68,68,0.2)] bg-transparent cursor-pointer hover:bg-[rgba(239,68,68,0.08)] transition-all">Delete</button>
                </div>
              </div>
            )}

            {/* ═══ BILLING ═══ */}
            {tab === "billing" && (
              <div className="space-y-4">
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
                    <button onClick={() => setShowManagePlan(true)} className="h-9 px-4 rounded-xl text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all">Manage Plan</button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-bold text-foreground">Payment Method</div>
                    <button onClick={() => setShowPayment(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-primary border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all">Update Card</button>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-1)] border border-border">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(124,92,252,0.1)] border border-[rgba(124,92,252,0.18)] flex items-center justify-center"><CardIcon size={16} color="#7C5CFC" /></div>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-foreground">•••• •••• •••• 4242</div>
                      <div className="text-[10px] text-[var(--text-dim)]">Expires 12/2027</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]">Default</span>
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
                  <button onClick={() => { setPwdSaved(true); setTimeout(() => setPwdSaved(false), 2000); }} className="h-9 px-5 rounded-xl text-[11px] font-bold text-white border-none cursor-pointer flex items-center gap-1.5" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>{pwdSaved ? <><Check size={10} /> Updated!</> : "Update Password"}</button>
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
                    <button onClick={() => setShowReconfigure(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Reconfigure</button>
                  </div>
                </div>
              </div>
            )}
          </D>
        </AnimatePresence>
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Change Photo */}
      <Modal open={showPhoto} onClose={() => { setShowPhoto(false); setPhotoUploaded(false); }} title="Change Profile Photo">
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#A855F7] flex items-center justify-center shadow-lg">
            <span className="text-3xl font-extrabold text-white">AT</span>
          </div>
          <div className="w-full p-6 border-2 border-dashed border-border rounded-2xl text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all" onClick={() => setPhotoUploaded(true)}>
            <Upload size={20} className="mx-auto mb-2 text-[var(--text-dim)]" />
            <div className="text-[12px] font-medium text-foreground">{photoUploaded ? "photo_profile.jpg selected" : "Click to upload or drag and drop"}</div>
            <div className="text-[10px] text-[var(--text-dim)] mt-1">PNG, JPG up to 5MB</div>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => setShowPhoto(false)} className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Cancel</button>
            <button onClick={() => { setShowPhoto(false); save(); }} className="flex-1 h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>Upload</button>
          </div>
        </div>
      </Modal>

      {/* Delete Account */}
      <Modal open={showDelete} onClose={() => { setShowDelete(false); setDeleteConfirm(""); }} title="Delete Account" subtitle="This action cannot be undone.">
        <div className="pt-2 space-y-4">
          <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] flex gap-3">
            <AlertTriangle size={18} color="#EF4444" className="shrink-0 mt-0.5" />
            <div className="text-[12px] text-[var(--text-dim)] leading-relaxed">All your data including analyses, scripts, video packs, and billing history will be <strong className="text-[#EF4444]">permanently deleted</strong>.</div>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Type "DELETE" to confirm</div>
            <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE" className="w-full h-10 px-3 bg-[var(--surface-1)] border border-[rgba(239,68,68,0.2)] rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground focus:border-[#EF4444] focus:ring-2 focus:ring-[rgba(239,68,68,0.2)]" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowDelete(false); setDeleteConfirm(""); }} className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Cancel</button>
            <button disabled={deleteConfirm !== "DELETE"} className="flex-1 h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer bg-[#EF4444] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">Delete Forever</button>
          </div>
        </div>
      </Modal>

      {/* Payment Method */}
      <Modal open={showPayment} onClose={() => { setShowPayment(false); setPaymentSaved(false); }} title="Update Payment Method" subtitle="Your card details are encrypted and secure.">
        <div className="pt-2 space-y-4">
          <ModalField label="Cardholder Name" placeholder="Alex Turner" />
          <ModalField label="Card Number" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Expiry Date" placeholder="MM/YY" />
            <ModalField label="CVC" placeholder="•••" />
          </div>
          <ModalField label="Billing Address" placeholder="123 Main St, New York, NY" />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setShowPayment(false)} className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Cancel</button>
            <button onClick={() => { setPaymentSaved(true); setTimeout(() => { setShowPayment(false); setPaymentSaved(false); }, 1000); }}
              className="flex-1 h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-1.5"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
              {paymentSaved ? <><Check size={13} /> Saved!</> : "Save Card"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Manage Plan */}
      <Modal open={showManagePlan} onClose={() => setShowManagePlan(false)} title="Manage Your Plan" subtitle="Choose the plan that fits your needs." width="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {[
            { name: "Starter", price: "$0", desc: "For hobbyists", features: ["50 analyses/mo", "10 video packs", "Basic scripts"], current: false },
            { name: "Pro", price: "$29", desc: "For creators", features: ["500 analyses/mo", "200 video packs", "Advanced scripts", "Priority support"], current: true },
            { name: "Enterprise", price: "$99", desc: "For teams", features: ["Unlimited analyses", "Unlimited packs", "Team access", "Custom integrations", "Dedicated support"], current: false },
          ].map(plan => (
            <div key={plan.name} className={`p-5 rounded-2xl border transition-all ${plan.current ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(124,92,252,0.1)]" : "border-border bg-card hover:border-[var(--surface-4)]"}`}>
              {plan.current && <div className="text-[9px] font-bold tracking-widest uppercase text-primary mb-2">Current Plan</div>}
              <div className="text-sm font-bold text-foreground">{plan.name}</div>
              <div className="text-[11px] text-[var(--text-dim)] mb-3">{plan.desc}</div>
              <div className="font-mono text-2xl font-extrabold text-foreground tracking-tighter mb-4">{plan.price}<span className="text-xs font-normal text-[var(--text-dim)]">/mo</span></div>
              <div className="space-y-2 mb-4">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground"><Check size={10} color="#34D399" /> {f}</div>
                ))}
              </div>
              <button className={`w-full h-9 rounded-xl text-[11px] font-bold cursor-pointer border-none ${plan.current ? "bg-[var(--surface-2)] text-[var(--text-dim)]" : "text-white"}`}
                style={plan.current ? {} : { background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}
                disabled={plan.current}>{plan.current ? "Current" : "Upgrade"}</button>
            </div>
          ))}
        </div>
      </Modal>

    </div>
  );
}