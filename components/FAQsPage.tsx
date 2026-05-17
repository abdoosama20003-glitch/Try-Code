"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowRight, ArrowUp, Search, Zap,
  HelpCircle, CreditCard, Rocket, Shield, Users, Settings,
  MessageCircle,
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

/* ── FAQ Categories ── */
const categories = [
  { id: "general", label: "General", icon: HelpCircle, color: "#7C5CFC" },
  { id: "pricing", label: "Pricing & Plans", icon: CreditCard, color: "#A855F7" },
  { id: "features", label: "Features", icon: Rocket, color: "#F472B6" },
  { id: "security", label: "Security & Privacy", icon: Shield, color: "#34D399" },
  { id: "account", label: "Account", icon: Settings, color: "#FBBF24" },
  { id: "support", label: "Support", icon: MessageCircle, color: "#22D3EE" },
];

/* ── FAQ Data ── */
const faqData: Record<string, { q: string; a: string }[]> = {
  general: [
    {
      q: "What is AutoTube?",
      a: "AutoTube is an AI-powered YouTube growth platform that helps creators find untapped content gaps, generate complete video packages (titles, descriptions, tags, scripts, and thumbnail concepts), and track analytics — all from one workspace. Think of it as your personal AI content strategist.",
    },
    {
      q: "Who is AutoTube for?",
      a: "AutoTube is designed for YouTube creators at every stage — from beginners looking for their first viral topic to established channels managing multiple uploads per week. Content agencies and teams also use our Agency plan for multi-channel management.",
    },
    {
      q: "How does the Gap Analyzer work?",
      a: "Our AI scans millions of YouTube data points in real-time, analyzing search volume, trend velocity, competition density, and monetisation potential. It then surfaces high-demand, low-competition topics scored from 0-100, so you can instantly see the best opportunities in your niche.",
    },
    {
      q: "Do I need a YouTube channel to use AutoTube?",
      a: "No! You can start using AutoTube even before launching your channel. Many creators use AutoTube to research niches and plan their content strategy before publishing their first video.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes — our Starter plan is completely free forever. It includes 5 gap analyses per month, 3 video packs, and basic script generation. No credit card required to get started.",
    },
  ],
  pricing: [
    {
      q: "What plans are available?",
      a: "We offer three plans: Starter (free forever), Pro ($29/month), and Agency ($99/month). Each plan scales with your needs — from hobbyist creators to full production teams. All paid plans include a 14-day money-back guarantee.",
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Absolutely. There are no contracts or commitments. You can cancel your subscription at any time from your account settings, and you'll retain access until the end of your billing period.",
    },
    {
      q: "Do you offer annual pricing?",
      a: "Yes! Annual plans save you 20% compared to monthly billing. That's $278/year for Pro (vs $348 monthly) and $950/year for Agency (vs $1,188 monthly).",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Agency plans. All payments are processed securely through Stripe.",
    },
    {
      q: "Is there a refund policy?",
      a: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied within the first 14 days, contact support and we'll process a full refund — no questions asked.",
    },
  ],
  features: [
    {
      q: "What does the Video Pack Generator include?",
      a: "Each video pack includes an SEO-optimised title, a full description with timestamps, relevant tags, a retention-focused script, and a detailed thumbnail brief with color psychology insights. Everything is tailored to your niche and audience.",
    },
    {
      q: "How accurate is the Script Writer?",
      a: "Our Script Writer is trained on patterns from top-performing YouTube content across dozens of niches. It generates retention-optimised scripts with hooks, pattern interrupts, and strategic CTAs. You can choose tone, length, and format to match your style.",
    },
    {
      q: "Can I export my content?",
      a: "Yes! All generated content — scripts, titles, descriptions, tags, and thumbnail concepts — can be exported as text files, PDFs, or copied directly to your clipboard. Pro and Agency users can also use our API for automated workflows.",
    },
    {
      q: "Does AutoTube integrate with YouTube Studio?",
      a: "We offer a Chrome extension that lets you pre-fill your YouTube upload with AutoTube-generated metadata (title, description, tags). Full API integration with YouTube Studio is available on Agency plans.",
    },
    {
      q: "How often is the data updated?",
      a: "Our Gap Analyzer data is refreshed every 6 hours to ensure you're always working with the latest trends and search patterns. Analytics dashboards update in real-time for connected channels.",
    },
  ],
  security: [
    {
      q: "Is my data safe with AutoTube?",
      a: "Absolutely. We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on AWS with SOC 2 Type II compliance. We never share your data with third parties.",
    },
    {
      q: "Do you store my YouTube credentials?",
      a: "No. We use OAuth 2.0 for YouTube authentication, which means we never see or store your password. You can revoke AutoTube's access to your YouTube account at any time from your Google account settings.",
    },
    {
      q: "Who can see my content strategies?",
      a: "Only you. Your gap analyses, generated content, and analytics are private to your account. On Agency plans, team workspaces allow controlled sharing with role-based permissions.",
    },
    {
      q: "Are you GDPR compliant?",
      a: "Yes, AutoTube is fully GDPR compliant. You can request a full export of your data or permanent deletion at any time from your account settings. We also maintain a transparent privacy policy detailing exactly how we handle your information.",
    },
  ],
  account: [
    {
      q: "How do I upgrade my plan?",
      a: "Go to Settings → Billing in your dashboard and click 'Upgrade'. The change takes effect immediately, and we'll pro-rate the difference for your current billing period.",
    },
    {
      q: "Can I change my email address?",
      a: "Yes, navigate to Settings → Account and update your email. You'll receive a verification link at your new address to confirm the change.",
    },
    {
      q: "How do I delete my account?",
      a: "Go to Settings → Account → Delete Account. This will permanently remove all your data, analyses, and generated content. This action cannot be undone, so please export anything you need first.",
    },
    {
      q: "Can I have multiple team members on one account?",
      a: "Team workspaces are available on the Agency plan ($99/month). You can invite unlimited team members with customisable roles and permissions — perfect for content agencies managing multiple channels.",
    },
  ],
  support: [
    {
      q: "How can I contact support?",
      a: "Starter users have access to community support via our Discord. Pro users get priority email support with <4 hour response times. Agency users receive a dedicated account manager and 24/7 live chat support.",
    },
    {
      q: "Do you have documentation or tutorials?",
      a: "Yes! We maintain a comprehensive knowledge base at docs.autotube.io with step-by-step guides, video tutorials, and best practices. We also publish weekly tips on our YouTube channel and blog.",
    },
    {
      q: "I found a bug. How do I report it?",
      a: "You can report bugs via the in-app feedback widget (click the '?' icon in the bottom-right corner), email support@autotube.io, or post in our #bug-reports Discord channel. We typically acknowledge bug reports within 2 hours.",
    },
    {
      q: "Can I request a new feature?",
      a: "We love hearing from our users! Submit feature requests via the in-app widget or our public roadmap at roadmap.autotube.io. You can also vote on existing requests — the most popular features get prioritised in our development cycle.",
    },
  ],
};

/* ── Accordion Item ── */
function FAQItem({ q, a, isOpen, onClick, index }: {
  q: string; a: string; isOpen: boolean; onClick: () => void; index: number;
}) {
  return (
    <D {...fadeUp(index * 0.04)}>
      <motion.div
        layout
        className="border border-border rounded-[var(--radius-card)] overflow-hidden transition-all duration-300"
        style={{
          background: isOpen ? "var(--surface-1)" : "var(--card)",
          borderColor: isOpen ? "var(--border-active)" : undefined,
        }}
      >
        <button
          onClick={onClick}
          id={`faq-item-${index}`}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left bg-transparent border-none cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span
            className="font-heading text-sm md:text-base font-semibold transition-colors"
            style={{ color: isOpen ? "var(--foreground)" : "var(--secondary-foreground)" }}
          >
            {q}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: isOpen ? "var(--accent)" : "var(--hover-overlay)",
              color: isOpen ? "var(--accent-foreground)" : "var(--text-dim)",
            }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                <div className="h-px bg-border mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed m-0">
                  {a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </D>
  );
}

export function FAQsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFaqs = faqData[activeCategory] || [];

  /* Search across all categories */
  const filteredFaqs = searchQuery.trim()
    ? Object.entries(faqData).flatMap(([, items]) =>
        items.filter(
          (f) =>
            f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : currentFaqs;

  return (
    <div className="bg-background font-sans overflow-x-hidden min-h-screen relative">
      {/* Aurora orbs */}
      <div className="at-aurora-orb" style={{ width: 500, height: 500, top: -150, right: -150, background: "rgba(124,92,252,0.08)" }} />
      <div className="at-aurora-orb" style={{ width: 400, height: 400, top: 500, left: -150, background: "rgba(168,85,247,0.05)", animationDelay: "-4s" }} />
      <div className="at-aurora-orb" style={{ width: 350, height: 350, bottom: 300, right: -80, background: "rgba(244,114,182,0.04)", animationDelay: "-8s" }} />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="pt-36 md:pt-44 pb-16 relative overflow-hidden">
        <div className="at-hero-grid absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative">
          <D {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-[var(--accent)] border border-[var(--border-active)] mb-8">
              <HelpCircle size={10} className="text-primary" />
              <span className="text-[11px] font-semibold text-accent-foreground">Help Center</span>
            </div>
          </D>

          <D {...fadeUp(0.05)}>
            <h1
              className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Frequently Asked{" "}
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: "var(--gradient-aurora)",
                  backgroundSize: "200% 200%",
                  animation: "at-gradient-shift 4s ease infinite",
                  WebkitBackgroundClip: "text",
                }}
              >
                Questions
              </span>
            </h1>
          </D>

          <D {...fadeUp(0.1)}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Everything you need to know about AutoTube. Can&apos;t find what you&apos;re looking for? Reach out to our team.
            </p>
          </D>

          {/* Search Bar */}
          <D {...fadeUp(0.15)}>
            <div className="max-w-lg mx-auto relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)]">
                <Search size={16} />
              </div>
              <input
                id="faq-search"
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-5 rounded-xl bg-[var(--surface-1)] border border-border text-foreground text-sm font-sans placeholder:text-[var(--text-dim)] outline-none transition-all focus:border-[var(--border-active)] focus:shadow-glow-primary-sm"
              />
            </div>
          </D>
        </div>
      </section>

      {/* ═══ CATEGORY TABS + FAQ LIST ═══ */}
      <section className="pb-20 md:pb-28 max-w-4xl mx-auto px-5 md:px-10">
        {/* Category Pills */}
        {!searchQuery.trim() && (
          <D {...fadeUp(0)} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                id={`faq-category-${cat.id}`}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(0); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer border transition-all duration-200"
                style={{
                  background: activeCategory === cat.id ? `${cat.color}15` : "var(--card)",
                  borderColor: activeCategory === cat.id ? `${cat.color}40` : "var(--border)",
                  color: activeCategory === cat.id ? cat.color : "var(--muted-foreground)",
                }}
              >
                <cat.icon size={14} />
                {cat.label}
              </motion.button>
            ))}
          </D>
        )}

        {/* Search results label */}
        {searchQuery.trim() && (
          <D {...fadeUp(0)} className="mb-8 text-center">
            <span className="text-sm text-muted-foreground">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </span>
          </D>
        )}

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <FAQItem
              key={`${activeCategory}-${i}-${faq.q}`}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}

          {filteredFaqs.length === 0 && (
            <D {...fadeUp(0)} className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-accent-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No questions found. Try a different search term.</p>
            </D>
          )}
        </div>
      </section>

      {/* Scroll to top */}
      <div className="flex justify-center pb-8">
        <button
          id="faq-back-to-top"
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
