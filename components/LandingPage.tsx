"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair, Sparkles, PenTool, Image as ImageIcon, BarChart3,
  ArrowRight, ArrowUp, Play, Star, Check, Zap, Shield,
  ChevronRight, Users, TrendingUp, Clock, Eye, X,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Modal } from "./Modal";

const D = motion.create("div" as any);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

/* ── Data ── */
const tools = [
  { icon: Crosshair, color: "#7C5CFC", title: "Gap Analyzer", desc: "Surface high-demand, low-competition topics with AI-powered scoring.", detail: "Scan millions of YouTube data points to uncover untapped topics with massive demand and minimal competition. Our AI scores every opportunity from 0-100, factoring in search volume, trend velocity, competition density, and monetisation potential. Filter by niche, language, or audience size to find your next viral hit." },
  { icon: Sparkles,  color: "#A855F7", title: "Video Pack Generator", desc: "One click creates a complete, ready-to-upload content package.", detail: "Generate optimised titles, descriptions, tags, scripts, and thumbnail briefs in one click. Each element is fine-tuned for YouTube's algorithm — SEO-packed, hook-driven, and audience-tested. Export everything as a ready-to-upload content pack." },
  { icon: PenTool,   color: "#F472B6", title: "Script Writer", desc: "Full scripts with hooks, transitions, and CTAs built for watch time.", detail: "Our AI writes retention-optimised scripts with pattern interrupts, open loops, and strategic CTAs. Choose from multiple tones, lengths, and formats — from short-form hooks to long-form deep dives. Every script is structured to maximise average view duration." },
  { icon: ImageIcon,  color: "#FBBF24", title: "Thumbnail Concepts", desc: "Visual briefs with color psychology and CTR probability estimates.", detail: "Get detailed visual briefs with layout suggestions, colour psychology insights, text overlay recommendations, and predicted CTR scores. Each concept is based on top-performing thumbnails in your niche, giving you a competitive visual edge." },
  { icon: BarChart3,  color: "#34D399", title: "Analytics Dashboard", desc: "Real-time views, retention, CTR, and subscriber growth tracking.", detail: "Track every metric that matters — views, watch time, CTR, retention curves, subscriber velocity, and revenue estimates. Compare performance across videos, spot trends early, and get AI-powered recommendations for improvement." },
  { icon: Shield,     color: "#22D3EE", title: "Competitor Intel", desc: "Find the blind spots your competitors consistently miss.", detail: "Monitor competitor channels, track their upload patterns, identify their top-performing content, and discover the gaps they're ignoring. Get alerts when opportunities emerge in your niche and stay one step ahead." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Tech Creator · 450K subs", quote: "Found a gap nobody saw. 200K views in one week.", avatar: "SC", color: "#7C5CFC" },
  { name: "Marcus Rivera", role: "Finance · 180K subs", quote: "Script writer saves me 6 hours per video. Unreal.", avatar: "MR", color: "#A855F7" },
  { name: "Priya Patel", role: "Lifestyle · 320K subs", quote: "Went from 2 to 8 videos a month. Insane ROI.", avatar: "PP", color: "#F472B6" },
  { name: "James Okafor", role: "Gaming · 620K subs", quote: "The gap analyzer is pure gold. Total game changer.", avatar: "JO", color: "#34D399" },
  { name: "Luna Park", role: "Education · 290K subs", quote: "My subscriber growth tripled in the first month.", avatar: "LP", color: "#FBBF24" },
  { name: "Dev Singh", role: "AI/ML · 510K subs", quote: "Best investment I've made for my YouTube channel.", avatar: "DS", color: "#22D3EE" },
];

const pricing = [
  { name: "Starter", price: "$0", period: "forever", highlight: false, desc: "For creators just getting started", features: ["5 gap analyses / month", "3 video packs", "Basic scripts", "Community support"] },
  { name: "Pro", price: "$29", period: "/month", highlight: true, desc: "For creators serious about growth", features: ["500 analyses / month", "200 video packs", "Advanced scripts", "Thumbnail concepts", "Priority support", "Full analytics"] },
  { name: "Agency", price: "$99", period: "/month", highlight: false, desc: "For teams and content agencies", features: ["Unlimited everything", "Custom AI models", "Team workspace", "Dedicated manager", "White-label", "API access"] },
];

const stats = [
  { icon: Users, value: "50K+", label: "Active creators", color: "#7C5CFC" },
  { icon: Eye, value: "2.4M", label: "Analyses run", color: "#A855F7" },
  { icon: TrendingUp, value: "340K", label: "Videos made", color: "#34D399" },
  { icon: Clock, value: "1.2M hrs", label: "Time saved", color: "#F472B6" },
];

const steps = [
  { n: "01", title: "Discover Gaps", desc: "Enter your niche. AutoTube scans millions of data points to find topics your audience craves.", icon: Crosshair, color: "#7C5CFC" },
  { n: "02", title: "Generate Content", desc: "One click builds titles, descriptions, tags, scripts, and thumbnail concepts.", icon: Sparkles, color: "#A855F7" },
  { n: "03", title: "Publish & Grow", desc: "Upload with metadata pre-filled. Track CTR, views, and subscribers in real-time.", icon: BarChart3, color: "#34D399" },
];

export function LandingPage() {
  const router = useRouter();
  const go = (path: string) => router.push(path);
  const [showDemo, setShowDemo] = useState(false);
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);
  const [flippingIdx, setFlippingIdx] = useState<number | null>(null);

  const handleCardClick = (tool: typeof tools[0], idx: number) => {
    setFlippingIdx(idx);
    setTimeout(() => { setSelectedTool(tool); setFlippingIdx(null); }, 600);
  };

  return (
    <div className="bg-background font-sans overflow-x-hidden min-h-screen relative">
      {/* Aurora orbs */}
      <div className="at-aurora-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "rgba(124,92,252,0.10)" }} />
      <div className="at-aurora-orb" style={{ width: 500, height: 500, top: 400, left: -200, background: "rgba(168,85,247,0.06)", animationDelay: "-4s" }} />
      <div className="at-aurora-orb" style={{ width: 400, height: 400, bottom: 200, right: -100, background: "rgba(244,114,182,0.05)", animationDelay: "-8s" }} />

      <Navbar />

      {/* ═══ HERO — Split Layout ═══ */}
      <section className="min-h-screen pt-36 md:pt-44 pb-24 relative overflow-hidden">
        <div className="at-hero-grid absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left — Text */}
            <div>
              <D {...fadeUp(0)}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-8">
                  <Zap size={10} className="text-primary" />
                  <span className="text-[11px] font-semibold text-accent-foreground">Gap Analyzer v2 is live</span>
                  <ChevronRight size={12} className="text-accent-foreground" />
                </div>
              </D>

              <D {...fadeUp(0.05)}>
                <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground mb-6" style={{ fontSize: "clamp(44px, 6vw, 76px)" }}>
                  Find what{" "}
                  <span className="bg-clip-text text-transparent inline-block pr-2" style={{ backgroundImage: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", WebkitBackgroundClip: "text", paddingBottom: 4 }}>
                    YouTube
                  </span>
                  <br />is missing.
                </h1>
              </D>

              <D {...fadeUp(0.1)}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  AutoTube finds untapped content gaps, generates complete video packages, and grows your channel — all from one AI-powered workspace.
                </p>
              </D>

              <D {...fadeUp(0.15)} className="flex flex-wrap gap-4 mb-12">
                <button onClick={() => go("/onboarding")} className="inline-flex items-center gap-2.5 h-12 px-8 py-3 rounded-pill text-white text-sm font-bold cursor-pointer border-none shadow-glow-primary transition-all hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98]" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
                  Start for free <ArrowRight size={15} />
                </button>
                <button onClick={() => setShowDemo(true)} className="inline-flex items-center gap-2.5 h-12 px-7 py-3 rounded-pill bg-transparent border border-border text-muted-foreground hover:text-foreground hover:bg-[var(--hover-overlay-md)] text-sm font-medium cursor-pointer transition-all">
                  <Play size={13} fill="currentColor" /> Watch demo
                </button>
              </D>

              {/* Stats row */}
              <D {...fadeUp(0.2)} className="flex flex-wrap gap-6">
                {stats.map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                      <s.icon size={15} color={s.color} />
                    </div>
                    <div>
                      <div className="font-mono text-base font-bold text-foreground tracking-tight">{s.value}</div>
                      <div className="text-[10px] text-[var(--text-dim)]">{s.label}</div>
                    </div>
                  </div>
                ))}
              </D>
            </div>

            {/* Right — Bento Preview */}
            <D {...fadeUp(0.1)} className="relative">
              <div className="at-glass-card p-1 shadow-elevation-lg">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 h-5 rounded ml-2 bg-[var(--hover-overlay)] flex items-center px-2">
                    <span className="font-mono text-[9px] text-[var(--text-dim)]">app.autotube.io/dashboard</span>
                  </div>
                </div>
                {/* Dashboard mock */}
                <div className="p-4 space-y-3">
                  {/* KPI cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[{ v: "2.8K", l: "Analyses", c: "#7C5CFC" }, { v: "94", l: "Videos", c: "#A855F7" }, { v: "1.2M", l: "Views", c: "#34D399" }].map(k => (
                      <div key={k.l} className="rounded-lg p-3 border border-border bg-[var(--surface-1)]">
                        <div className="text-[9px] text-[var(--text-dim)] mb-1">{k.l}</div>
                        <div className="font-mono text-sm font-bold tracking-tight" style={{ color: k.c }}>{k.v}</div>
                      </div>
                    ))}
                  </div>
                  {/* Chart area */}
                  <div className="rounded-lg border border-border bg-[var(--surface-1)] p-3 h-32 flex items-end gap-1">
                    {[40, 55, 35, 70, 60, 85, 75, 95, 80, 65, 90, 100].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex-1 rounded-sm" style={{ background: `linear-gradient(to top, ${i % 2 === 0 ? '#7C5CFC' : '#A855F7'}40, ${i % 2 === 0 ? '#7C5CFC' : '#A855F7'})` }} />
                    ))}
                  </div>
                  {/* Table rows */}
                  <div className="rounded-lg border border-border bg-[var(--surface-1)] overflow-hidden">
                    {[94, 91, 89].map((score, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                        <div className="flex-1 space-y-1">
                          <div className="h-1.5 rounded-full bg-[var(--surface-3)]" style={{ width: `${60 + i * 12}%` }} />
                          <div className="h-1 rounded-full bg-[var(--surface-3)]" style={{ width: "30%" }} />
                        </div>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-mono font-bold" style={{ background: "#7C5CFC18", border: "1px solid #7C5CFC30", color: "#9B80FF" }}>{score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating glow behind */}
              <div className="absolute -inset-8 -z-10 rounded-3xl" style={{ background: "radial-gradient(ellipse at center, rgba(124,92,252,0.08) 0%, transparent 70%)" }} />
            </D>
          </div>
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ FEATURES — Bento Grid ═══ */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-10" id="features">
        <D {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Features</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Six tools. One unfair edge.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Everything you need to dominate YouTube — research, create, publish, and grow.</p>
        </D>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((t, i) => {
            const isLg = i === 0 || i === 4;
            return (
              <D key={t.title} {...fadeUp(i * 0.06)}
                onClick={() => handleCardClick(t, i)}
                style={{ perspective: "800px" }}
                className={isLg ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <motion.div
                  animate={flippingIdx === i ? { rotateY: [0, 360, 720] } : { rotateY: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`group relative p-6 rounded-[var(--radius-card)] border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden h-full ${isLg ? "flex flex-col justify-between min-h-[220px]" : ""}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 20%, ${t.color}08 0%, transparent 60%)` }} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${t.color}12`, border: `1px solid ${t.color}25` }}>
                      <t.icon size={18} color={t.color} />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-foreground mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              </D>
            );
          })}
        </div>

        {/* Explore All button */}
        <D {...fadeUp(0.3)} className="flex justify-center mt-10">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => go("/onboarding")}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-sm font-bold text-white border-none cursor-pointer"
            style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
            Explore All Features <ArrowRight size={14} />
          </motion.button>
        </D>
      </section>

      {/* Feature Detail Overlay */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTool(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, ${selectedTool.color}, ${selectedTool.color}80)` }} />
              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${selectedTool.color}15`, border: `1px solid ${selectedTool.color}30` }}>
                      <selectedTool.icon size={22} color={selectedTool.color} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{selectedTool.title}</h3>
                      <p className="text-[11px] text-[var(--text-dim)]">{selectedTool.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTool(null)} className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-colors"><X size={15} /></button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{selectedTool.detail}</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => { setSelectedTool(null); go("/onboarding"); }}
                  className="w-full h-11 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${selectedTool.color}, ${selectedTool.color}cc)`, boxShadow: `0 0 20px ${selectedTool.color}30` }}>
                  Try {selectedTool.title} <ArrowRight size={13} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="at-section-divider" />

      {/* ═══ PROCESS — Vertical Timeline ═══ */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-10">
        <D {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">How it works</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Three steps to viral.
          </h2>
        </D>

        <div className="max-w-2xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <D key={s.n} {...fadeUp(i * 0.1)} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Vertical line */}
              {i < steps.length - 1 && <div className="absolute left-[22px] top-12 bottom-0 w-px bg-border" />}
              {/* Circle */}
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2" style={{ background: `${s.color}15`, borderColor: `${s.color}40` }}>
                <s.icon size={16} color={s.color} />
              </div>
              {/* Content */}
              <div className="pt-1">
                <span className="font-mono text-xs text-[var(--text-dim)] mb-1 block">Step {s.n}</span>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ TESTIMONIALS — Marquee Cards ═══ */}
      <section className="py-20 md:py-28 overflow-hidden" id="testimonials">
        <D {...fadeUp(0)} className="text-center mb-14 px-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Our Rates</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Loved by 50,000+ creators.
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />)}
          </div>
          <p className="text-sm text-[var(--text-dim)]">4.9/5 from 2,400+ reviews</p>
        </D>

        {/* Scrolling row */}
        <div className="relative">
          <div className="flex gap-4 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[320px] shrink-0 p-5 rounded-[var(--radius-card)] border border-border bg-card hover:border-[var(--surface-4)] transition-all duration-200">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, si) => <Star key={si} size={11} fill="#FBBF24" color="#FBBF24" />)}</div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{t.name}</div>
                    <div className="text-[10px] text-[var(--text-dim)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ PRICING ═══ */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-10" id="pricing">
        <D {...fadeUp(0)} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Pricing</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-3" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Simple, transparent pricing.
          </h2>
          <p className="text-muted-foreground">No hidden fees. Cancel anytime.</p>
        </D>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {pricing.map((plan, i) => (
            <D key={plan.name} {...fadeUp(i * 0.08)} className={`relative p-7 rounded-[var(--radius-card)] border bg-card transition-all duration-300 hover:-translate-y-1 overflow-hidden ${plan.highlight ? "border-[var(--border-active)] shadow-glow-primary-sm" : "border-border hover:shadow-elevation-md"}`}>
              {plan.highlight && <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: "var(--gradient-aurora)" }} />}
              {plan.highlight && <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-subtle)" }} />}
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)]">{plan.name}</span>
                  {plan.highlight && <span className="px-2 py-0.5 rounded-pill bg-[var(--accent)] text-accent-foreground text-[9px] font-bold tracking-wide uppercase">Popular</span>}
                </div>
                <p className="text-[11px] text-[var(--text-dim)] mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="font-mono font-extrabold text-foreground tracking-tighter" style={{ fontSize: "clamp(36px, 4vw, 44px)" }}>{plan.price}</span>
                  <span className="text-sm text-[var(--text-dim)]">{plan.period}</span>
                </div>
                <button onClick={() => go("/payment")} className={`w-full h-10 rounded-md text-sm font-bold cursor-pointer transition-all active:scale-[0.98] mb-5 border-none ${plan.highlight ? "text-white shadow-glow-primary-sm" : "bg-secondary text-secondary-foreground hover:opacity-80"}`} style={plan.highlight ? { background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" } : {}}>
                  {plan.name === "Agency" ? "Contact sales" : "Get started"} →
                </button>
                <div className="h-px bg-border mb-4" />
                <div className="space-y-2.5">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-primary" : "bg-[var(--hover-overlay-md)]"}`}>
                        <Check size={8} color={plan.highlight ? "white" : "var(--muted-foreground)"} />
                      </div>
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ FINAL CTA — Full-width gradient ═══ */}
      <section className="py-24 md:py-32 px-5 md:px-10">
        <D {...fadeUp(0)} className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-border p-12 md:p-20 text-center" style={{ background: "var(--gradient-subtle)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,92,252,0.12) 0%, transparent 60%)" }} />
          <div className="relative">
            <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Ready to grow your channel?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join 50,000+ creators already using AutoTube to find their next viral video.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => go("/onboarding")} className="inline-flex items-center gap-2.5 h-12 px-8 py-3 rounded-pill text-white text-sm font-bold cursor-pointer border-none shadow-glow-primary transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
                Start for free <ArrowRight size={15} />
              </button>
              <button onClick={() => setShowDemo(true)} className="inline-flex items-center gap-2.5 h-12 px-7 py-3 rounded-pill bg-transparent border border-border text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-all hover:bg-[var(--hover-overlay-md)]">
                <Play size={13} fill="currentColor" /> Watch demo
              </button>
            </div>
          </div>
        </D>
      </section>

      {/* Scroll to top */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-pill text-xs font-medium text-[var(--text-dim)] hover:text-foreground bg-transparent border border-border hover:border-[var(--surface-4)] hover:bg-[var(--hover-overlay)] transition-all cursor-pointer"
        >
          <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          Back to top
        </button>
      </div>

      <Footer />

      {/* Demo Video Modal */}
      <Modal open={showDemo} onClose={() => setShowDemo(false)} title="AutoTube in Action" subtitle="See how creators grow 3x faster." width="max-w-3xl">
        <div className="pt-2">
          <div className="w-full aspect-video rounded-2xl bg-black border border-border overflow-hidden flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(124,92,252,0.15) 0%, rgba(168,85,247,0.1) 50%, rgba(244,114,182,0.08) 100%)" }} />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-aurora)", boxShadow: "var(--glow-primary)" }}>
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
              <div className="text-white/60 text-sm font-medium">Click to play demo</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Gap Analysis", time: "0:00 - 1:30" },
              { label: "Content Generation", time: "1:30 - 3:00" },
              { label: "Analytics Dashboard", time: "3:00 - 4:15" },
            ].map(ch => (
              <div key={ch.label} className="p-3 rounded-xl bg-[var(--surface-1)] border border-border text-center cursor-pointer hover:bg-[var(--hover-overlay)] transition-all">
                <div className="text-[11px] font-medium text-foreground">{ch.label}</div>
                <div className="text-[9px] text-[var(--text-dim)] mt-0.5">{ch.time}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}