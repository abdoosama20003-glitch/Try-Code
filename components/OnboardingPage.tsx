"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Youtube, Github, Globe,
  Sparkles, Crosshair, PenTool, Image, BarChart3, Target, Loader2,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

const MotionDiv = motion.create("div" as any);

const niches = [
  { id: "prog",   label: "Programming",    icon: "💻" },
  { id: "ai",     label: "AI & ML",        icon: "🤖" },
  { id: "web",    label: "Web Dev",        icon: "🌐" },
  { id: "design", label: "UI/UX Design",  icon: "🎨" },
  { id: "biz",    label: "Business",       icon: "💼" },
  { id: "game",   label: "Gaming",         icon: "🎮" },
  { id: "fin",    label: "Finance",        icon: "📈" },
  { id: "health", label: "Health",         icon: "💪" },
  { id: "edu",    label: "Education",      icon: "📚" },
  { id: "life",   label: "Lifestyle",      icon: "✨" },
  { id: "music",  label: "Music",          icon: "🎵" },
  { id: "cook",   label: "Cooking",        icon: "🍳" },
];

const goals = [
  { id: "grow",    label: "Grow subscribers faster",   icon: Target    },
  { id: "content", label: "Find content ideas faster", icon: Sparkles  },
  { id: "scripts", label: "Write better scripts",      icon: PenTool   },
  { id: "seo",     label: "Improve SEO & rankings",    icon: BarChart3 },
  { id: "thumbs",  label: "Better thumbnails",         icon: Image     },
  { id: "gaps",    label: "Discover content gaps",     icon: Crosshair },
];

const stepLabels = [
  { n: 1, l: "Account" },
  { n: 2, l: "Niche"   },
  { n: 3, l: "Goals"   },
  { n: 4, l: "Launch"  },
];

const authProviders = [
  { l: "Continue with Google",  icon: Globe,   },
  { l: "Continue with YouTube", icon: Youtube, },
  { l: "Continue with GitHub",  icon: Github,  },
];

export function OnboardingPage() {
  const navigate   = useRouter();
  const [step, setStep]         = useState(1);
  const [selNiches, setSelNiches] = useState<Set<string>>(new Set());
  const [selGoals, setSelGoals]   = useState<Set<string>>(new Set());
  const [loading, setLoading]     = useState(false);

  const toggleSet = (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => {
    const n = new Set(set);
    n.has(id) ? n.delete(id) : n.add(id);
    setFn(n);
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => navigate.push("/dashboard"), 1800);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--background)", fontFamily: "var(--font-sans)", overflow: "hidden", position: "relative" }}>

      {/* ── Theme toggle — fixed top-right corner ── */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 50 }}>
        <ThemeToggle />
      </div>

      {/* ── Left Rail ── */}
      <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", background: "var(--surface-0)", borderRight: "1px solid var(--border)", padding: "40px 32px", position: "relative" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 52, cursor: "pointer" }} onClick={() => navigate.push("/")}>
          <LogoMark size={26} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>AutoTube</span>
        </div>

        {/* Label + Title */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>
            Setup
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", lineHeight: 1.1, margin: 0 }}>
            Let's get<br />you set up.
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {stepLabels.map((s, i) => {
            const done   = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} style={{ display: "flex", alignItems: "stretch", gap: 14 }}>
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div
                    initial={{ background: "rgba(0,0,0,0)", borderColor: "var(--border)" }}
                    animate={{
                      background: done ? "var(--foreground)" : active ? "rgba(99,102,241,0.12)" : "rgba(0,0,0,0)",
                      borderColor: done ? "var(--foreground)" : active ? "rgba(99,102,241,0.4)" : "var(--border)"
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid", flexShrink: 0 }}
                  >
                    {done ? (
                      <Check size={12} color="var(--background)" />
                    ) : (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: active ? "var(--primary-hover)" : "var(--text-dim)" }}>{s.n}</span>
                    )}
                  </motion.div>
                  {i < stepLabels.length - 1 && (
                    <motion.div
                      initial={{ background: "rgba(0,0,0,0)" }}
                      animate={{ background: done ? "var(--foreground)" : "var(--border)" }}
                      transition={{ duration: 0.3 }}
                      style={{ width: 1, flex: 1, margin: "4px 0", minHeight: 28 }}
                    />
                  )}
                </div>
                <div style={{ paddingTop: 6, paddingBottom: i < stepLabels.length - 1 ? 24 : 0 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: active ? 500 : 400, color: step >= s.n ? "var(--foreground)" : "var(--text-dim)", transition: "color 0.3s" }}>
                    {s.l}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom testimonial */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />
          <blockquote style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 12px" }}>
            "Setting up took 2 minutes. Found my first golden gap 5 minutes later."
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--neon-purple))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", fontWeight: 800, color: "white" }}>SC</span>
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>Sarah Chen · 450K subscribers</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 40px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <AnimatePresence mode="wait">

            {/* ── Step 1: Account ── */}
            {step === 1 && (
              <MotionDiv key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 8px", lineHeight: 1.2 }}>
                    Create your account
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)", margin: 0 }}>Get started in seconds. No credit card required.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {authProviders.map(p => (
                    <button key={p.l} onClick={() => setStep(2)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", height: 46, padding: "0 18px", borderRadius: "var(--radius-button)", background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, transition: "all 0.15s" }}
                      onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--surface-4)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-overlay)"; }}
                      onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <p.icon size={16} />
                      {p.l}
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)" }}>or continue with email</span>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {["Full Name", "Email address", "Password"].map(f => (
                    <div key={f}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>{f}</div>
                      <input
                        type={f === "Password" ? "password" : f === "Email address" ? "email" : "text"}
                        placeholder={f === "Email address" ? "you@example.com" : f === "Password" ? "Min. 8 characters" : "Alex Turner"}
                        style={{ width: "100%", height: 42, padding: "0 14px", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", color: "var(--foreground)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s" }}
                        onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 2px var(--ring)"; }}
                        onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep(2)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: 46, borderRadius: "var(--radius-button)", background: "var(--foreground)", color: "var(--background)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, transition: "opacity 0.15s" }}
                  onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.86"}
                  onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
                >
                  Create account <ArrowRight size={14} />
                </button>
              </MotionDiv>
            )}

            {/* ── Step 2: Niche ── */}
            {step === 2 && (
              <MotionDiv key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 8px", lineHeight: 1.2 }}>
                    What's your niche?
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)", margin: 0 }}>Select all that apply. We'll personalize your experience.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 32 }}>
                  {niches.map(n => {
                    const sel = selNiches.has(n.id);
                    return (
                      <motion.button
                        key={n.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleSet(selNiches, setSelNiches, n.id)}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
                          padding: "12px 12px",
                          borderRadius: "var(--radius-card)",
                          border: `1px solid ${sel ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                          background: sel ? "rgba(99,102,241,0.08)" : "var(--surface-1)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s",
                          boxShadow: sel ? "0 2px 8px rgba(99,102,241,0.12)" : "none",
                        }}
                        onMouseEnter={(e: React.MouseEvent<any>) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--surface-4)"; }}
                        onMouseLeave={(e: React.MouseEvent<any>) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
                      >
                        <span style={{ fontSize: 18 }}>{n.icon}</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: sel ? 600 : 400, color: sel ? "var(--primary-hover)" : "var(--muted-foreground)", lineHeight: 1.2 }}>{n.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ display: "flex", alignItems: "center", gap: 6, height: 46, padding: "0 18px", borderRadius: "var(--radius-button)", background: "transparent", border: "1px solid var(--border)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, transition: "all 0.15s" }}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button onClick={() => setStep(3)} disabled={selNiches.size === 0} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 46, borderRadius: "var(--radius-button)", background: "var(--foreground)", color: "var(--background)", border: "none", cursor: selNiches.size === 0 ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, opacity: selNiches.size === 0 ? 0.4 : 1, transition: "opacity 0.15s" }}>
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </MotionDiv>
            )}

            {/* ── Step 3: Goals ── */}
            {step === 3 && (
              <MotionDiv key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 8px", lineHeight: 1.2 }}>
                    What are your goals?
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)", margin: 0 }}>Select everything you want to achieve with AutoTube.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
                  {goals.map(g => {
                    const sel = selGoals.has(g.id);
                    const Icon = g.icon;
                    return (
                      <motion.button
                        key={g.id}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleSet(selGoals, setSelGoals, g.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, width: "100%",
                          padding: "13px 16px",
                          borderRadius: "var(--radius-button)",
                          border: `1px solid ${sel ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                          background: sel ? "rgba(99,102,241,0.06)" : "var(--surface-1)",
                          cursor: "pointer", textAlign: "left",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e: React.MouseEvent<any>) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--surface-4)"; }}
                        onMouseLeave={(e: React.MouseEvent<any>) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
                      >
                        <div style={{ width: 32, height: 32, borderRadius: "var(--radius)", background: sel ? "var(--accent)" : "var(--hover-overlay)", border: `1px solid ${sel ? "var(--border-active)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                          <Icon size={13} color={sel ? "var(--primary-hover)" : "var(--text-dim)"} />
                        </div>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: sel ? 500 : 400, color: sel ? "var(--foreground)" : "var(--muted-foreground)", flex: 1 }}>{g.label}</span>
                        {sel && (
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Check size={10} color="white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(2)} style={{ display: "flex", alignItems: "center", gap: 6, height: 46, padding: "0 18px", borderRadius: "var(--radius-button)", background: "transparent", border: "1px solid var(--border)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, transition: "all 0.15s" }}>
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button onClick={() => setStep(4)} disabled={selGoals.size === 0} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 46, borderRadius: "var(--radius-button)", background: "var(--foreground)", color: "var(--background)", border: "none", cursor: selGoals.size === 0 ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, opacity: selGoals.size === 0 ? 0.4 : 1, transition: "opacity 0.15s" }}>
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </MotionDiv>
            )}

            {/* ── Step 4: Launch ── */}
            {step === 4 && (
              <MotionDiv key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                {loading ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0" }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Loader2 size={32} color="var(--primary)" />
                    </motion.div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)" }}>
                      Setting up your workspace…
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)" }}>
                      This will only take a moment.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Summary card */}
                    <div style={{ marginBottom: 28 }}>
                      <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 8px", lineHeight: 1.2 }}>
                        You're all set!
                      </h2>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)", margin: 0 }}>Review your setup below and launch your workspace.</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                      <div style={{ padding: "16px 18px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--surface-1)" }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>Selected Niches</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {[...selNiches].map(id => {
                            const n = niches.find(x => x.id === id);
                            return n ? <span key={id} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: "var(--radius)", background: "var(--accent)", color: "var(--primary-hover)", border: "1px solid var(--border-active)", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500 }}>{n.icon} {n.label}</span> : null;
                          })}
                        </div>
                      </div>
                      <div style={{ padding: "16px 18px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--surface-1)" }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>Your Goals</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {[...selGoals].map(id => {
                            const g = goals.find(x => x.id === id);
                            return g ? <span key={id} style={{ padding: "3px 10px", borderRadius: "var(--radius)", background: "var(--hover-overlay-md)", color: "var(--muted-foreground)", border: "1px solid var(--border)", fontFamily: "var(--font-sans)", fontSize: "11px" }}>{g.label}</span> : null;
                          })}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => setStep(3)} style={{ display: "flex", alignItems: "center", gap: 6, height: 46, padding: "0 18px", borderRadius: "var(--radius-button)", background: "transparent", border: "1px solid var(--border)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
                        <ArrowLeft size={13} /> Back
                      </button>
                      <button onClick={handleFinish} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 46, borderRadius: "var(--radius-button)", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, transition: "opacity 0.15s", boxShadow: "var(--glow-primary-sm)" }}
                        onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.86"}
                        onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
                      >
                        <Sparkles size={14} />
                        Launch AutoTube
                      </button>
                    </div>
                  </>
                )}
              </MotionDiv>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}