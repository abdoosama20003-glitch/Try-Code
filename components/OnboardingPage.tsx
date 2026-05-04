"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Youtube, Github, Globe,
  Sparkles, Crosshair, PenTool, Image, BarChart3, Target, Loader2,
  Terminal, Bot, Palette, Briefcase, Gamepad2, TrendingUp, HeartPulse, BookOpen, Music, Utensils
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

const MotionDiv = motion.create("div" as any);

const niches = [
  { id: "prog",   label: "Programming",    icon: Terminal },
  { id: "ai",     label: "AI & ML",        icon: Bot },
  { id: "web",    label: "Web Dev",        icon: Globe },
  { id: "design", label: "UI/UX Design",   icon: Palette },
  { id: "biz",    label: "Business",       icon: Briefcase },
  { id: "game",   label: "Gaming",         icon: Gamepad2 },
  { id: "fin",    label: "Finance",        icon: TrendingUp },
  { id: "health", label: "Health",         icon: HeartPulse },
  { id: "edu",    label: "Education",      icon: BookOpen },
  { id: "life",   label: "Lifestyle",      icon: Sparkles },
  { id: "music",  label: "Music",          icon: Music },
  { id: "cook",   label: "Cooking",        icon: Utensils },
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
  { l: "Continue with Google",  icon: Globe   },
  { l: "Continue with YouTube", icon: Youtube },
  { l: "Continue with GitHub",  icon: Github  },
];

export function OnboardingPage() {
  const navigate     = useRouter();
  const [step, setStep]           = useState(1);
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
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden relative">

      {/* Theme toggle */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left Rail */}
      <div className="w-full md:w-[300px] shrink-0 flex flex-col bg-[var(--surface-0)] border-b md:border-b-0 md:border-r border-border px-6 py-6 md:px-8 md:py-10 relative z-10">

        {/* Logo */}
        <div className="flex items-center justify-between md:justify-start gap-[10px] mb-6 md:mb-[52px]">
          <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => navigate.push("/")}>
            <LogoMark size={26} />
            <span className="text-sm font-bold text-foreground tracking-[-0.02em]">AutoTube</span>
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Label + Title */}
        <div className="hidden md:block mb-11">
          <div className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[var(--text-dim)] mb-[10px]">Setup</div>
          {/* clamp() font-size must stay inline */}
          <h2 className="font-extrabold tracking-[-0.03em] text-foreground leading-[1.1] m-0"
            style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
            Let&apos;s get<br />you set up.
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-row md:flex-col justify-between md:justify-start gap-0">
          {stepLabels.map((s, i) => {
            const done   = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} className="flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-[14px] flex-1 md:flex-none">
                <div className="flex flex-row md:flex-col items-center w-full md:w-auto">
                  <div className={`flex-1 md:hidden h-px ${i === 0 ? "bg-transparent" : done || active ? "bg-foreground" : "bg-border"}`} />
                  <motion.div
                    initial={{ background: "rgba(0,0,0,0)", borderColor: "var(--border)" }}
                    animate={{
                      background: done ? "var(--foreground)" : active ? "rgba(99,102,241,0.12)" : "rgba(0,0,0,0)",
                      borderColor: done ? "var(--foreground)" : active ? "rgba(99,102,241,0.4)" : "var(--border)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-7 rounded-full flex items-center justify-center border shrink-0 mx-2 md:mx-0">
                    {done ? (
                      <Check size={12} color="var(--background)" />
                    ) : (
                      <span className="font-mono text-[10px] font-bold" style={{ color: active ? "var(--primary-hover)" : "var(--text-dim)" }}>{s.n}</span>
                    )}
                  </motion.div>
                  <div className={`flex-1 md:hidden h-px ${i === stepLabels.length - 1 ? "bg-transparent" : step > s.n ? "bg-foreground" : "bg-border"}`} />
                  {i < stepLabels.length - 1 && (
                    <motion.div
                      initial={{ background: "rgba(0,0,0,0)" }}
                      animate={{ background: done ? "var(--foreground)" : "var(--border)" }}
                      transition={{ duration: 0.3 }}
                      className="hidden md:block w-px flex-1 my-1 min-h-[28px]" />
                  )}
                </div>
                <div className={`md:pt-[6px] ${i < stepLabels.length - 1 ? "md:pb-6" : ""}`}>
                  <span className="text-[10px] md:text-sm transition-colors duration-300 text-center md:text-left block" style={{ fontWeight: active ? 500 : 400, color: step >= s.n ? "var(--foreground)" : "var(--text-dim)" }}>
                    {s.l}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom testimonial */}
        <div className="hidden md:block mt-auto">
          <div className="h-px bg-border mb-5" />
          <blockquote className="text-sm text-muted-foreground leading-[1.7] italic m-0 mb-3">
            &quot;Setting up took 2 minutes. Found my first golden gap 5 minutes later.&quot;
          </blockquote>
          <div className="flex items-center gap-2">
            <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-primary to-[var(--neon-purple)] flex items-center justify-center">
              <span className="text-[8px] font-extrabold text-white">SC</span>
            </div>
            <span className="text-[11px] text-[var(--text-dim)]">Sarah Chen · 450K subscribers</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start md:items-center justify-center px-6 md:px-10 py-8 md:py-12 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">

            {/* Step 1: Account */}
            {step === 1 && (
              <MotionDiv key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mb-8">
                  <h2 className="font-extrabold tracking-[-0.03em] text-foreground m-0 mb-2 leading-[1.2]"
                    style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                    Create your account
                  </h2>
                  <p className="text-sm text-[var(--text-dim)] m-0">Get started in seconds. No credit card required.</p>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  {authProviders.map(p => (
                    <button key={p.l} onClick={() => setStep(2)}
                      className="flex items-center gap-3 w-full h-[46px] px-[18px] rounded-[var(--radius-button)] bg-transparent border border-border text-foreground cursor-pointer text-sm font-medium transition-all hover:border-[var(--surface-4)] hover:bg-[var(--hover-overlay)]">
                      <p.icon size={16} />
                      {p.l}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] text-[var(--text-dim)]">or continue with email</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {["Full Name", "Email address", "Password"].map(f => (
                    <div key={f}>
                      <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--text-dim)] mb-1.5">{f}</div>
                      <input
                        type={f === "Password" ? "password" : f === "Email address" ? "email" : "text"}
                        placeholder={f === "Email address" ? "you@example.com" : f === "Password" ? "Min. 8 characters" : "Alex Turner"}
                        className="w-full h-[42px] px-[14px] bg-[var(--surface-1)] border border-border rounded-[var(--radius-button)] text-foreground text-sm outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
                      />
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep(2)}
                  className="flex items-center justify-center gap-2 w-full h-[46px] rounded-[var(--radius-button)] bg-foreground text-background border-none cursor-pointer text-sm font-bold transition-opacity hover:opacity-[0.86]">
                  Create account <ArrowRight size={14} />
                </button>
              </MotionDiv>
            )}

            {/* Step 2: Niche */}
            {step === 2 && (
              <MotionDiv key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mb-7">
                  <h2 className="font-extrabold tracking-[-0.03em] text-foreground m-0 mb-2 leading-[1.2]"
                    style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                    What&apos;s your niche?
                  </h2>
                  <p className="text-sm text-[var(--text-dim)] m-0">Select all that apply. We&apos;ll personalize your experience.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {niches.map(n => {
                    const sel = selNiches.has(n.id);
                    return (
                      <motion.button key={n.id} whileTap={{ scale: 0.97 }}
                        onClick={() => toggleSet(selNiches, setSelNiches, n.id)}
                        className="flex flex-col items-start gap-1.5 p-3 rounded-[var(--radius-card)] cursor-pointer text-left transition-all"
                        style={{
                          border: `1px solid ${sel ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                          background: sel ? "rgba(99,102,241,0.08)" : "var(--surface-1)",
                          boxShadow: sel ? "0 2px 8px rgba(99,102,241,0.12)" : "none",
                        }}>
                        <span className="text-[18px]"><n.icon size={18} /></span>
                        <span className="text-[11px] leading-[1.2]" style={{ fontWeight: sel ? 600 : 400, color: sel ? "var(--primary-hover)" : "var(--muted-foreground)" }}>{n.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-[10px]">
                  <button onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 h-[46px] px-[18px] rounded-[var(--radius-button)] bg-transparent border border-border text-muted-foreground cursor-pointer text-sm font-medium transition-all hover:border-[var(--surface-4)]">
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button onClick={() => setStep(3)} disabled={selNiches.size === 0}
                    className="flex-1 flex items-center justify-center gap-2 h-[46px] rounded-[var(--radius-button)] bg-foreground text-background border-none cursor-pointer text-sm font-bold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </MotionDiv>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <MotionDiv key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mb-7">
                  <h2 className="font-extrabold tracking-[-0.03em] text-foreground m-0 mb-2 leading-[1.2]"
                    style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                    What are your goals?
                  </h2>
                  <p className="text-sm text-[var(--text-dim)] m-0">Select everything you want to achieve with AutoTube.</p>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  {goals.map(g => {
                    const sel = selGoals.has(g.id);
                    const Icon = g.icon;
                    return (
                      <motion.button key={g.id} whileTap={{ scale: 0.99 }}
                        onClick={() => toggleSet(selGoals, setSelGoals, g.id)}
                        className="flex items-center gap-3 w-full px-4 py-[13px] rounded-[var(--radius-button)] cursor-pointer text-left transition-all"
                        style={{
                          border: `1px solid ${sel ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                          background: sel ? "rgba(99,102,241,0.06)" : "var(--surface-1)",
                        }}>
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-all"
                          style={{ background: sel ? "var(--accent)" : "var(--hover-overlay)", border: `1px solid ${sel ? "var(--border-active)" : "var(--border)"}` }}>
                          <Icon size={13} color={sel ? "var(--primary-hover)" : "var(--text-dim)"} />
                        </div>
                        <span className="text-sm flex-1" style={{ fontWeight: sel ? 500 : 400, color: sel ? "var(--foreground)" : "var(--muted-foreground)" }}>{g.label}</span>
                        {sel && (
                          <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center shrink-0">
                            <Check size={10} color="white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-[10px]">
                  <button onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 h-[46px] px-[18px] rounded-[var(--radius-button)] bg-transparent border border-border text-muted-foreground cursor-pointer text-sm font-medium transition-all hover:border-[var(--surface-4)]">
                    <ArrowLeft size={13} /> Back
                  </button>
                  <button onClick={() => setStep(4)} disabled={selGoals.size === 0}
                    className="flex-1 flex items-center justify-center gap-2 h-[46px] rounded-[var(--radius-button)] bg-foreground text-background border-none cursor-pointer text-sm font-bold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </MotionDiv>
            )}

            {/* Step 4: Launch */}
            {step === 4 && (
              <MotionDiv key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                {loading ? (
                  <div className="flex flex-col items-center gap-4 py-10">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Loader2 size={32} color="var(--primary)" />
                    </motion.div>
                    <div className="text-base font-semibold text-foreground">Setting up your workspace…</div>
                    <div className="text-sm text-[var(--text-dim)]">This will only take a moment.</div>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h2 className="font-extrabold tracking-[-0.03em] text-foreground m-0 mb-2 leading-[1.2]"
                        style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                        You&apos;re all set!
                      </h2>
                      <p className="text-sm text-[var(--text-dim)] m-0">Review your setup below and launch your workspace.</p>
                    </div>

                    <div className="flex flex-col gap-[10px] mb-8">
                      <div className="px-[18px] py-4 rounded-[var(--radius-card)] border border-border bg-[var(--surface-1)]">
                        <div className="text-[10px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-[10px]">Selected Niches</div>
                        <div className="flex flex-wrap gap-1.5">
                          {[...selNiches].map(id => {
                            const n = niches.find(x => x.id === id);
                            return n ? (
                              <span key={id} className="inline-flex items-center gap-1 px-[10px] py-[3px] rounded-sm bg-[var(--accent)] text-[var(--primary-hover)] border border-[var(--border-active)] text-[11px] font-medium">
                                <n.icon size={11} /> {n.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div className="px-[18px] py-4 rounded-[var(--radius-card)] border border-border bg-[var(--surface-1)]">
                        <div className="text-[10px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-[10px]">Your Goals</div>
                        <div className="flex flex-wrap gap-1.5">
                          {[...selGoals].map(id => {
                            const g = goals.find(x => x.id === id);
                            return g ? (
                              <span key={id} className="px-[10px] py-[3px] rounded-sm bg-[var(--hover-overlay-md)] text-muted-foreground border border-border text-[11px]">
                                {g.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-[10px]">
                      <button onClick={() => setStep(3)}
                        className="flex items-center gap-1.5 h-[46px] px-[18px] rounded-[var(--radius-button)] bg-transparent border border-border text-muted-foreground cursor-pointer text-sm font-medium">
                        <ArrowLeft size={13} /> Back
                      </button>
                      <button onClick={handleFinish}
                        className="flex-1 flex items-center justify-center gap-2 h-[46px] rounded-[var(--radius-button)] bg-primary text-white border-none cursor-pointer text-sm font-bold transition-opacity hover:opacity-[0.86] shadow-[var(--glow-primary-sm)]">
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