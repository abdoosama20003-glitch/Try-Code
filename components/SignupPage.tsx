"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, Youtube, Globe, Loader2, Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

const MotionDiv = motion.create("div" as any);

const authProviders = [
  { l: "Continue with Google",  icon: Globe   },
  { l: "Continue with YouTube", icon: Youtube },
];

export function SignupPage() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const canSubmit = formData.name && formData.email && formData.password;

  const handleSignup = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => navigate.push("/onboarding"), 1200);
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
          <div className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-[var(--text-dim)] mb-[10px]">Get Started</div>
          <h2 className="font-heading font-extrabold tracking-[-0.03em] text-foreground leading-[1.1] m-0"
            style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
            Create your<br />free account.
          </h2>
        </div>

        {/* Feature highlights */}
        <div className="hidden md:flex flex-col gap-3 flex-1">
          {[
            { icon: Sparkles, text: "AI-powered gap analysis" },
            { icon: Globe, text: "Complete video packages" },
            { icon: ArrowRight, text: "Real-time analytics" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[12px] text-[var(--text-dim)]">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <item.icon size={11} className="text-primary" />
              </div>
              {item.text}
            </div>
          ))}
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
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>

            <div className="mb-8">
              <h2 className="font-heading font-extrabold tracking-[-0.03em] text-foreground m-0 mb-2 leading-[1.2]"
                style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                Create your account
              </h2>
              <p className="text-sm text-[var(--text-dim)] m-0">
                Get started in seconds. No credit card required.
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {authProviders.map(p => (
                <button key={p.l} onClick={() => navigate.push("/onboarding")}
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
              {["Full Name", "Email address", "Password"].map(f => {
                const fieldKey = f === "Password" ? "password" : f === "Email address" ? "email" : "name";
                return (
                  <div key={f}>
                    <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--text-dim)] mb-1.5">{f}</div>
                    <input
                      type={f === "Password" ? "password" : f === "Email address" ? "email" : "text"}
                      placeholder={f === "Email address" ? "you@example.com" : f === "Password" ? "Min. 8 characters" : "Alex Turner"}
                      value={formData[fieldKey as keyof typeof formData]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [fieldKey]: e.target.value }))}
                      className="w-full h-[42px] px-[14px] bg-[var(--surface-1)] border border-border rounded-[var(--radius-button)] text-foreground text-sm outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSignup}
              disabled={!canSubmit || loading}
              className="flex items-center justify-center gap-2 w-full h-[46px] rounded-[var(--radius-button)] bg-foreground text-background border-none cursor-pointer text-sm font-bold transition-opacity hover:opacity-[0.86] mb-4 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Loader2 size={16} />
                </motion.div>
              ) : (
                <>Create account <ArrowRight size={14} /></>
              )}
            </button>

            <div className="text-center text-sm text-[var(--text-dim)]">
              Already have an account?{" "}
              <button onClick={() => navigate.push("/login")} className="bg-transparent border-none p-0 cursor-pointer text-[var(--foreground)] font-semibold hover:underline">
                Sign in
              </button>
            </div>
            <div className="text-center text-[12px] text-[var(--text-dim)] mt-3">
              Admin? <button onClick={() => navigate.push("/admin")} className="bg-transparent border-none p-0 cursor-pointer text-primary font-semibold hover:underline text-[12px]">Login here</button>
            </div>

          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
