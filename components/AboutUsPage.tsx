"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUp, Users, Target, Zap, Heart,
  Globe, Award, Rocket, Star, TrendingUp, Shield,
  Sparkles, BarChart3, Lightbulb, Code,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const D = motion.create("div" as any);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

/* ── Data ── */
const milestones = [
  { year: "2023", title: "The Spark", desc: "Two creators frustrated by guesswork started building the tool they wished existed.", icon: Lightbulb, color: "#FBBF24" },
  { year: "2024", title: "Launch Day", desc: "AutoTube launched publicly. 5,000 creators signed up in the first week.", icon: Rocket, color: "#7C5CFC" },
  { year: "2024", title: "10K Milestone", desc: "Hit 10,000 active users. Added Script Writer and Thumbnail Concepts.", icon: TrendingUp, color: "#A855F7" },
  { year: "2025", title: "Series A", desc: "Raised $8M to expand our AI capabilities and hire world-class engineers.", icon: Award, color: "#34D399" },
  { year: "2025", title: "50K Creators", desc: "50,000+ creators trust AutoTube. Launched Agency plans and API access.", icon: Users, color: "#F472B6" },
  { year: "2026", title: "Gap Analyzer v2", desc: "Next-gen AI with 3x accuracy. Real-time trend detection across 140+ countries.", icon: Sparkles, color: "#22D3EE" },
];

const values = [
  { icon: Target, color: "#7C5CFC", title: "Creator-First", desc: "Every feature we build starts with one question: will this help creators grow faster?" },
  { icon: Zap, color: "#A855F7", title: "Speed Matters", desc: "We ship fast, iterate faster. Weekly releases ensure you always have cutting-edge tools." },
  { icon: Heart, color: "#F472B6", title: "Radical Transparency", desc: "Open roadmap, public changelog, honest pricing. No dark patterns, no hidden fees." },
  { icon: Shield, color: "#34D399", title: "Trust & Privacy", desc: "Your data is yours. SOC 2 compliant, GDPR ready, and we never sell your information." },
  { icon: Globe, color: "#FBBF24", title: "Global by Default", desc: "Supporting creators in 140+ countries with multi-language AI and localised insights." },
  { icon: Code, color: "#22D3EE", title: "Built in the Open", desc: "Our community shapes our product. Feature requests, bug reports, and feedback drive everything." },
];

const teamMembers = [
  { name: "Alex Rivera", role: "Co-Founder & CEO", avatar: "AR", color: "#7C5CFC", bio: "Ex-YouTube creator (1.2M subs). Built AutoTube to solve his own content strategy pain points." },
  { name: "Mia Chen", role: "Co-Founder & CTO", avatar: "MC", color: "#A855F7", bio: "Former Google AI researcher. Led ML teams at DeepMind before co-founding AutoTube." },
  { name: "Jordan Kim", role: "Head of Product", avatar: "JK", color: "#F472B6", bio: "Previously Product Lead at Figma. Obsessed with creator experience and design systems." },
  { name: "Sam Okonkwo", role: "Head of AI", avatar: "SO", color: "#34D399", bio: "PhD in NLP from Stanford. Architected AutoTube's gap detection and content generation models." },
  { name: "Priya Sharma", role: "Head of Growth", avatar: "PS", color: "#FBBF24", bio: "Scaled 3 startups from 0 to 100K users. Leads creator acquisition and community building." },
  { name: "Leo Martinez", role: "Lead Engineer", avatar: "LM", color: "#22D3EE", bio: "Full-stack polyglot. Previously at Vercel — built the infrastructure that powers AutoTube." },
];

const impactStats = [
  { value: "50K+", label: "Active Creators", icon: Users, color: "#7C5CFC" },
  { value: "2.4M", label: "Analyses Run", icon: BarChart3, color: "#A855F7" },
  { value: "140+", label: "Countries", icon: Globe, color: "#34D399" },
  { value: "4.9/5", label: "Average Rating", icon: Star, color: "#FBBF24" },
];

export function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="bg-background font-sans overflow-x-hidden min-h-screen relative">
      {/* Aurora orbs */}
      <div className="at-aurora-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "rgba(124,92,252,0.08)" }} />
      <div className="at-aurora-orb" style={{ width: 500, height: 500, top: 600, left: -200, background: "rgba(168,85,247,0.05)", animationDelay: "-4s" }} />
      <div className="at-aurora-orb" style={{ width: 400, height: 400, bottom: 400, right: -100, background: "rgba(244,114,182,0.04)", animationDelay: "-8s" }} />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="pt-36 md:pt-44 pb-20 relative overflow-hidden">
        <div className="at-hero-grid absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative">
          <D {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-8">
              <Heart size={10} className="text-primary" />
              <span className="text-[11px] font-semibold text-accent-foreground">Our Story</span>
            </div>
          </D>

          <D {...fadeUp(0.05)}>
            <h1
              className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Built by creators,{" "}
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: "var(--gradient-aurora)",
                  backgroundSize: "200% 200%",
                  animation: "at-gradient-shift 4s ease infinite",
                  WebkitBackgroundClip: "text",
                }}
              >
                for creators.
              </span>
            </h1>
          </D>

          <D {...fadeUp(0.1)}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              AutoTube was born from a simple frustration: finding great video topics shouldn&apos;t take longer than making the video itself. We&apos;re on a mission to democratise YouTube growth with AI.
            </p>
          </D>

          <D {...fadeUp(0.15)} className="flex flex-wrap gap-4 justify-center">
            <button
              id="about-join-creators"
              onClick={() => router.push("/signup")}
              className="inline-flex items-center gap-2.5 h-12 px-8 py-3 rounded-pill text-white text-sm font-bold cursor-pointer border-none shadow-glow-primary transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}
            >
              Join 50K+ Creators <ArrowRight size={15} />
            </button>
          </D>
        </div>
      </section>

      {/* ═══ IMPACT STATS ═══ */}
      <section className="pb-20 md:pb-28 max-w-5xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((s, i) => (
            <D key={s.label} {...fadeUp(i * 0.06)}>
              <div className="p-6 rounded-[var(--radius-card)] border border-border bg-card text-center hover:border-[var(--surface-4)] transition-all duration-300 group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                >
                  <s.icon size={18} color={s.color} />
                </div>
                <div className="font-mono text-2xl font-extrabold text-foreground tracking-tight mb-1">{s.value}</div>
                <div className="text-xs text-[var(--text-dim)]">{s.label}</div>
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ OUR STORY / TIMELINE ═══ */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-5 md:px-10">
        <D {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Our Journey</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            From side project to platform.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every milestone is a testament to the creators who believed in us.
          </p>
        </D>

        <div className="max-w-2xl mx-auto space-y-0">
          {milestones.map((m, i) => (
            <D key={`${m.year}-${m.title}`} {...fadeUp(i * 0.08)} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Vertical line */}
              {i < milestones.length - 1 && <div className="absolute left-[22px] top-12 bottom-0 w-px bg-border" />}
              {/* Circle */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2 transition-transform duration-300 hover:scale-110"
                style={{ background: `${m.color}15`, borderColor: `${m.color}40` }}
              >
                <m.icon size={16} color={m.color} />
              </div>
              {/* Content */}
              <div className="pt-1">
                <span className="font-mono text-xs text-[var(--text-dim)] mb-1 block">{m.year}</span>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ OUR VALUES ═══ */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-10">
        <D {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Our Values</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            What drives us every day.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            These aren&apos;t just words on a wall — they&apos;re the principles that shape every decision we make.
          </p>
        </D>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {values.map((v, i) => (
            <D key={v.title} {...fadeUp(i * 0.06)}>
              <div className="group relative p-6 rounded-[var(--radius-card)] border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-default overflow-hidden h-full">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${v.color}08 0%, transparent 60%)` }}
                />
                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${v.color}12`, border: `1px solid ${v.color}25` }}
                  >
                    <v.icon size={18} color={v.color} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </D>
          ))}
        </div>
      </section>

      <div className="at-section-divider" />

      {/* ═══ TEAM ═══ */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-10">
        <D {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">The Team</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-foreground mb-4" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
            Meet the humans behind AutoTube.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A small, focused team of creators, engineers, and AI researchers obsessed with YouTube growth.
          </p>
        </D>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, i) => (
            <D key={member.name} {...fadeUp(i * 0.06)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 rounded-[var(--radius-card)] border border-border bg-card hover:border-[var(--surface-4)] transition-all duration-300 overflow-hidden relative"
              >
                {/* Subtle gradient accent on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${member.color}06 0%, transparent 60%)` }}
                />

                <div className="relative flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-base font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)`,
                      boxShadow: `0 4px 20px ${member.color}30`,
                    }}
                  >
                    {member.avatar}
                  </div>

                  <h3 className="font-heading text-base font-semibold text-foreground mb-0.5">{member.name}</h3>
                  <span
                    className="text-xs font-medium mb-3"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            </D>
          ))}
        </div>
      </section>

      {/* Scroll to top */}
      <div className="flex justify-center pb-8">
        <button
          id="about-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-pill text-xs font-medium text-[var(--text-dim)] hover:text-foreground bg-transparent border border-border hover:border-[var(--surface-4)] hover:bg-[var(--hover-overlay)] transition-all cursor-pointer"
        >
          <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          Back to top
        </button>
      </div>

      <Footer />
    </div>
  );
}
