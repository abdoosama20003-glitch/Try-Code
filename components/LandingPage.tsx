"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair, Sparkles, PenTool, Image as ImageIcon, BarChart3,
  ArrowRight, Play, Star, Check, Zap, TrendingUp, Shield,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const D = motion.create("div" as any);
const H  = motion.create("h1" as any);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

/* ── Data ── */
const tools = [
  { icon: Crosshair,  color: "var(--neon-indigo)",  title: "Gap Analyzer",          desc: "Surface high-demand, low-competition topics with precise scoring." },
  { icon: Sparkles,   color: "var(--neon-purple)",  title: "Video Pack Generator",  desc: "One click creates a complete, ready-to-upload content package." },
  { icon: PenTool,    color: "var(--neon-pink)",    title: "Script Writer",         desc: "Full scripts with hooks, transitions, and CTAs built for watch time." },
  { icon: ImageIcon,  color: "var(--neon-amber)",   title: "Thumbnail Concepts",    desc: "Visual briefs with color psychology and CTR probability estimates." },
  { icon: BarChart3,  color: "var(--neon-emerald)", title: "Analytics Dashboard",   desc: "Real-time views, retention, CTR, and subscriber growth tracking." },
  { icon: Shield,     color: "var(--neon-cyan)",    title: "Competitor Intel",       desc: "Find the blind spots your competitors consistently miss." },
];

const testimonials = [
  { name: "Sarah Chen",    sub: "450K",  init: "SC", c: "#6366F1", quote: "Found a gap nobody saw. 200K views in one week." },
  { name: "Marcus Rivera", sub: "180K",  init: "MR", c: "#8B5CF6", quote: "Script writer saves me 6 hours per video. Unreal." },
  { name: "Priya Patel",   sub: "320K",  init: "PP", c: "#EC4899", quote: "Went from 2 to 8 videos a month. Insane ROI." },
  { name: "James Okafor",  sub: "620K",  init: "JO", c: "#10B981", quote: "The gap analyzer is pure gold. Total game changer." },
];

const pricing = [
  {
    name: "Starter", price: "$0",  period: "forever", highlight: false,
    desc: "For creators just getting started",
    features: ["5 gap analyses / month", "3 video packs", "Basic scripts", "Community support"],
  },
  {
    name: "Pro",     price: "$29", period: "/month",  highlight: true,
    desc: "For creators serious about growth",
    features: ["500 analyses / month", "200 video packs", "Advanced scripts", "Thumbnail concepts", "Priority support", "Full analytics"],
  },
  {
    name: "Agency",  price: "$99", period: "/month",  highlight: false,
    desc: "For teams and content agencies",
    features: ["Unlimited everything", "Custom AI models", "Team workspace", "API access", "Dedicated manager", "White-label"],
  },
];

/* ── Reusable ── */
function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 14 }}>
      {children}
    </div>
  );
}

function PrimaryBtn({ children, onClick, large }: { children: React.ReactNode; onClick?: () => void; large?: boolean }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 ${large ? "at-btn-xl" : "at-btn-lg"}`}
      style={{ fontFamily: "var(--font-sans)" }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-transparent text-muted-foreground hover:bg-hover-overlay hover:text-foreground h-11 px-6"
      style={{ fontFamily: "var(--font-sans)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
      onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--surface-4)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"; }}
      onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)"; }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT PREVIEW MOCKUP  (pure CSS, no image)
───────────────────────────────────────────────*/
function ProductPreview() {
  return (
    <div style={{ width: "100%", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--surface-1)", overflow: "hidden", boxShadow: "var(--elevation-lg)" }}>
      {/* Titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-0)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", opacity: 0.7 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", opacity: 0.7 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", opacity: 0.7 }} />
        <div style={{ flex: 1, height: 22, borderRadius: 4, background: "var(--hover-overlay)", marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-dim)" }}>app.autotube.io/dashboard/gap-analyzer</span>
        </div>
      </div>
      {/* Sidebar */}
      <div style={{ display: "flex", height: 380 }}>
        <div style={{ width: 48, borderRight: "1px solid var(--border)", background: "var(--surface-0)", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 14 }}>
          {["#6366F1","#10B981","#8B5CF6","#EC4899","#F59E0B","#06B6D4"].map((c, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: i === 0 ? `${c}22` : "var(--hover-overlay)", border: `1px solid ${i === 0 ? c + "44" : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: i === 0 ? c : "var(--surface-4)" }} />
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: "20px", overflowY: "hidden", background: "var(--surface-0)" }}>
          {/* Search row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 34, borderRadius: 8, background: "var(--surface-1)", border: "1px solid var(--border)", display: "flex", alignItems: "center", paddingLeft: 10, gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid var(--text-dim)" }} />
              <div style={{ width: 140, height: 6, borderRadius: 4, background: "var(--surface-3)" }} />
            </div>
            <div style={{ width: 90, height: 34, borderRadius: 8, background: "var(--foreground)", opacity: 0.9 }} />
          </div>
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
            {["var(--neon-indigo)","var(--neon-purple)","var(--neon-emerald)","var(--neon-pink)"].map((c, i) => (
              <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ width: "60%", height: 5, borderRadius: 3, background: "var(--surface-3)", marginBottom: 8 }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 800, color: `var(--neon-${["indigo","purple","emerald","pink"][i]})`, letterSpacing: "-0.04em" }}>
                  {["2.8K","94","1.2M","342"][i]}
                </div>
              </div>
            ))}
          </div>
          {/* Table */}
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8 }}>
              {["40%","15%","15%","15%","15%"].map((w, i) => (
                <div key={i} style={{ width: w, height: 5, borderRadius: 3, background: "var(--surface-3)" }} />
              ))}
            </div>
            {[94, 91, 89, 76].map((score, i) => (
              <div key={i} style={{ padding: "9px 14px", borderBottom: i < 3 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ height: 5, borderRadius: 3, background: "var(--surface-3)", width: `${60 + i * 8}%` }} />
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ height: 4, width: 36, borderRadius: 3, background: i < 2 ? "rgba(16,185,129,0.2)" : i < 3 ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.15)" }} />
                    <div style={{ height: 4, width: 48, borderRadius: 3, background: "var(--surface-3)" }} />
                  </div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 800, color: "var(--primary-hover)" }}>{score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════��════════════
   PAGE
══════════════════════════════════════════════════ */
export function LandingPage() {
  const navigate = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div style={{ background: "var(--background)", fontFamily: "var(--font-sans)", overflowX: "hidden", minHeight: "100vh" }}>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", paddingTop: 80, position: "relative", overflow: "hidden" }}>
        {/* Grid bg */}
        <div className="at-hero-grid" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)", pointerEvents: "none" }} />

        {/* Subtle radial glow */}
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          {/* Top tag */}
          <D {...fadeUp(0)} style={{ display: "flex", justifyContent: "center", marginBottom: 40, paddingTop: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 8px", borderRadius: 100, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: "var(--primary)", color: "white" }}>
                <Zap size={9} fill="white" />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em" }}>NEW</span>
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--primary-hover)", fontWeight: 500 }}>Gap Analyzer v2 is now live</span>
              <ChevronRight size={12} color="var(--primary-hover)" />
            </div>
          </D>

          {/* Headline */}
          <H {...fadeUp(0.06)} style={{ fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.95, color: "var(--foreground)", textAlign: "center", fontSize: "clamp(48px, 8vw, 100px)", margin: "0 auto 28px", maxWidth: 900 }}>
            Find what<br />
            <span style={{ color: "var(--primary)" }}>YouTube</span> is<br />
            missing.
          </H>

          <D {...fadeUp(0.12)} style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 40px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--muted-foreground)", lineHeight: 1.65, margin: 0 }}>
              AutoTube finds untapped content gaps, generates complete video packages, and grows your channel — from one workspace.
            </p>
          </D>

          {/* CTAs */}
          <D {...fadeUp(0.18)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 56 }}>
            <PrimaryBtn onClick={() => navigate.push("/onboarding")} large>
              Start for free <ArrowRight size={16} />
            </PrimaryBtn>
            <GhostBtn>
              <Play size={13} fill="currentColor" /> Watch demo
            </GhostBtn>
          </D>

          {/* Stats strip */}
          <D {...fadeIn(0.3)} style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 72 }}>
            {[
              { v: "50K+",  l: "Active creators" },
              { v: "2.4M",  l: "Analyses run" },
              { v: "340K",  l: "Videos made" },
              { v: "4.9★",  l: "Average rating" },
            ].map((s, i) => (
              <div key={s.l} style={{ padding: "0 32px", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </D>

          {/* Product preview */}
          <D {...fadeIn(0.24)} style={{ maxWidth: 900, margin: "0 auto" }}>
            <ProductPreview />
          </D>
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ══════════════════════════════════════
          TOOLS / FEATURES
      ═══════════════════════════════════════ */}
      <section style={{ padding: "100px 0", maxWidth: 1280, margin: "0 auto", paddingLeft: 40, paddingRight: 40 }} id="features">
        <D {...fadeUp(0)} style={{ marginBottom: 60 }}>
          <SectionLabel>Features</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--foreground)", margin: 0, maxWidth: 560 }}>
            Six tools. <br />One unfair edge.
          </h2>
        </D>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {tools.map((t, i) => (
            <D key={t.title} {...fadeUp(i * 0.07)} className="at-tool-card">
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `color-mix(in srgb, ${t.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${t.color} 25%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <t.icon size={17} color={t.color} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)", marginBottom: 6, letterSpacing: "-0.01em" }}>{t.title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{t.desc}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: t.color, fontWeight: 600 }}>Explore</span>
                <ChevronRight size={10} color={t.color} />
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <D {...fadeUp(0)} style={{ marginBottom: 64 }}>
          <SectionLabel>Process</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--foreground)", margin: 0 }}>
            From zero to<br />viral in 3 steps.
          </h2>
        </D>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {[
            { n: "01", title: "Discover Gaps",    desc: "Enter your niche. AutoTube scans millions of data points to surface topics your audience is actively searching for — and creators are ignoring.", icon: Crosshair,  color: "var(--neon-indigo)"  },
            { n: "02", title: "Generate Content", desc: "One click builds a complete package: optimized title, full description, 15+ tags, complete script with hooks, and 4 thumbnail concepts.", icon: Sparkles,   color: "var(--neon-purple)"  },
            { n: "03", title: "Publish & Grow",   desc: "Upload with all metadata pre-filled. Track your CTR, views, and subscriber count climbing in real-time through the analytics dashboard.", icon: BarChart3,  color: "var(--neon-emerald)" },
          ].map((s, i) => (
            <D key={s.n} {...fadeUp(i * 0.1)} style={{ padding: "32px 28px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--card)", position: "relative", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }}>
              {/* Number */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.06em", marginBottom: 20 }}>{s.n}</div>
              {/* Icon */}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `color-mix(in srgb, ${s.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${s.color} 20%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <s.icon size={18} color={s.color} />
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.7 }}>{s.desc}</div>
              {/* Connector arrow */}
              {i < 2 && (
                <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                  <ChevronRight size={12} color="var(--text-dim)" />
                </div>
              )}
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }} id="testimonials">
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <D {...fadeUp(0)}>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--foreground)", margin: "0 0 24px" }}>
              Creators who<br />trust AutoTube.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: 32 }}>
              Thousands of YouTubers use AutoTube to find their next viral idea, write their next script, and grow faster — every single week.
            </p>
            <div style={{ display: "flex", gap: 1, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--neon-amber)" color="var(--neon-amber)" />)}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1 }}>4.9 / 5</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginTop: 4 }}>2,400+ verified reviews</div>
          </D>

          {/* Testimonials grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {testimonials.map((t, i) => (
              <D key={t.name} {...fadeUp(i * 0.08)} style={{ padding: "24px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", background: "var(--card)", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
                onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--surface-4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", gap: 1 }}>
                  {[...Array(5)].map((_, si) => <Star key={si} size={11} fill="var(--neon-amber)" color="var(--neon-amber)" />)}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--secondary-foreground)", lineHeight: 1.65, margin: 0, flex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: t.c, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 800, color: "white" }}>{t.init}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--foreground)" }}>{t.name}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{t.sub} subscribers</div>
                  </div>
                </div>
              </D>
            ))}
          </div>
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══════════════════════════════════════
          PRICING
      ═══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }} id="pricing">
        <D {...fadeUp(0)} style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--foreground)", margin: "0 auto 16px", maxWidth: 480 }}>
            Simple,<br />transparent pricing.
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--muted-foreground)", margin: 0 }}>No hidden fees. No lock-in. Cancel anytime.</p>
        </D>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {pricing.map((plan, i) => (
            <D key={plan.name} {...fadeUp(i * 0.08)} className={`at-pricing-card ${plan.highlight ? "at-pricing-card-featured" : ""}`} style={{ position: "relative", overflow: "hidden" }}>
              {plan.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--primary), var(--neon-purple))" }} />}
              <div style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-dim)" }}>{plan.name}</span>
                  {plan.highlight && <span style={{ padding: "1px 6px", borderRadius: "var(--radius)", background: "var(--accent)", color: "var(--primary-hover)", fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Popular</span>}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", margin: 0 }}>{plan.desc}</p>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, margin: "20px 0 6px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.05em", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--text-dim)" }}>{plan.period}</span>
              </div>
              <button
                onClick={() => navigate.push("/onboarding")}
                className={`inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none h-9 px-4 ${plan.highlight ? "at-btn-primary" : "at-btn-secondary"}`}
                style={{ width: "100%", marginBottom: 24, fontFamily: "var(--font-sans)" }}
              >
                {plan.name === "Agency" ? "Contact sales" : "Get started"} <ArrowRight size={13} />
              </button>
              <div style={{ height: 1, background: "var(--border)", marginBottom: 20 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: plan.highlight ? "var(--primary)" : "var(--hover-overlay-md)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={8} color={plan.highlight ? "white" : "var(--muted-foreground)"} />
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <D {...fadeUp(0)} style={{ background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", padding: "72px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
          {/* Background accent */}
          <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>Get started today</div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--foreground)", margin: "0 0 16px", maxWidth: 500 }}>
              Grow your channel.<br />Start for free.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--muted-foreground)", margin: 0 }}>
              Join 50,000+ creators already using AutoTube to find their next viral video.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", flexShrink: 0, position: "relative" }}>
            <PrimaryBtn onClick={() => navigate.push("/onboarding")} large>
              Start for free <ArrowRight size={16} />
            </PrimaryBtn>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", textAlign: "center", width: "100%" }}>No credit card required</span>
          </div>
        </D>
      </section>

      <Footer />
    </div>
  );
}