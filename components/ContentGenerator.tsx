"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Search, Copy, Check, FileText, Tag, AlignLeft,
  Image, Wand2, RefreshCw, Download, Bookmark, Film, Menu, Bell,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ExportModal, NotificationPanel } from "./Overlays";
import { useSidebar } from "@/hooks/useSidebar";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const samplePacks = [
  {
    id: 1, keyword: "Python Automation for Beginners", seoScore: 94,
    title: "I Automated My Entire Life with Python (Beginner Guide)",
    description: "In this video, I'll show you how to automate boring daily tasks using Python — from email sorting to web scraping to auto-generating reports. No prior coding experience needed...",
    tags: ["python automation", "python tutorial", "automate with python", "python scripting", "learn python", "python for beginners", "python projects", "automation tutorial"],
    hooks: ["What if Python could save you 10 hours every week?", "I used to spend 4 hours on this. Now Python does it in 30 seconds.", "Stop doing repetitive tasks. Let Python do them for you."],
    thumbnails: ["I AUTOMATED EVERYTHING", "Python = 10 HRS SAVED/WEEK", "5 Scripts That Changed My Life"],
  },
  {
    id: 2, keyword: "AI Tools No One Talks About", seoScore: 91,
    title: "7 Hidden AI Tools That Will 10x Your Productivity in 2026",
    description: "Everyone knows ChatGPT and Midjourney, but incredible AI tools are flying under the radar. In this video, I reveal 7 hidden gems top creators secretly use...",
    tags: ["ai tools", "best ai tools 2026", "hidden ai tools", "productivity tools", "ai apps", "artificial intelligence", "ai workflow"],
    hooks: ["Forget ChatGPT — these 7 AI tools change everything.", "I've tested 200+ AI tools. These 7 nobody talks about.", "These AI tools will be mainstream in 6 months. Get ahead now."],
    thumbnails: ["7 SECRET AI TOOLS", "These AI Tools Are INSANE", "Nobody Talks About These"],
  },
];

const contentTabs = [
  { key: "title", label: "SEO Title", icon: FileText },
  { key: "description", label: "Description", icon: AlignLeft },
  { key: "tags", label: "Tags", icon: Tag },
  { key: "hooks", label: "Hooks", icon: Wand2 },
  { key: "thumbnails", label: "Thumbnails", icon: Image },
  { key: "video", label: "Video Gen", icon: Film },
] as const;

function CopyBtn({ text, id, copied, onCopy }: { text: string; id: string; copied: string | null; onCopy: (t: string, id: string) => void }) {
  return (
    <button onClick={() => onCopy(text, id)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent text-[var(--text-dim)] border border-border cursor-pointer text-[10px] shrink-0 transition-all hover:border-[var(--surface-4)] hover:text-foreground font-medium">
      {copied === id ? <Check size={10} /> : <Copy size={10} />}
      {copied === id ? "Copied" : "Copy"}
    </button>
  );
}

export function ContentGenerator() {
  const [input, setInput] = useState("");
  const [isGen, setIsGen] = useState(false);
  const [pack, setPack] = useState(samplePacks[0]);
  const [tab, setTab] = useState<string>("title");
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showExport, setShowExport] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000); };
  const generate = () => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); };
  const toggleSave = (id: number) => setSaved(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border shrink-0">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Creation</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">All-in-One Pack</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={() => setShowNotifs(!showNotifs)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors relative"><Bell size={15} /><div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={generate}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <Sparkles size={11} /> Generate All Now!
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 md:px-8 pt-5 pb-6 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Left sidebar */}
        <div className="w-full md:w-[260px] shrink-0 flex flex-col gap-3 overflow-y-auto">
          <D {...fade(0.05)}>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)]">New Pack</div>
              <div className="relative">
                <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="Python Automation…"
                  className="w-full h-10 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-10 pr-3" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={isGen}
                className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                {isGen ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={12} /></motion.div>Generating…</> : <><Sparkles size={12} />Generate All Now!</>}
              </motion.button>
            </div>
          </D>

          {/* History */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-medium text-muted-foreground">Generated Packs</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-lg bg-[var(--surface-1)] border border-border text-[var(--text-dim)]">{samplePacks.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {samplePacks.map((p, i) => (
                <D key={p.id} {...fade(0.1 + i * 0.06)} onClick={() => setPack(p)}
                  className="px-4 py-3 rounded-2xl cursor-pointer transition-all"
                  style={{ border: `1px solid ${pack.id === p.id ? "rgba(124,92,252,0.3)" : "var(--border)"}`, background: pack.id === p.id ? "rgba(124,92,252,0.05)" : "var(--card)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-foreground truncate mb-1">{p.keyword}</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]">Score {p.seoScore}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleSave(p.id); }}
                      className="bg-transparent border-none cursor-pointer p-0.5 transition-colors"
                      style={{ color: saved.has(p.id) ? "#FBBF24" : "var(--text-dim)" }}>
                      <Bookmark size={12} fill={saved.has(p.id) ? "#FBBF24" : "none"} />
                    </button>
                  </div>
                </D>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <D {...fade(0.15)} className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="bg-card border border-border rounded-2xl flex flex-col flex-1 overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-foreground truncate">{pack.keyword}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]">SEO {pack.seoScore}</span>
                </div>
                <span className="text-[10px] text-[var(--text-dim)]">5 elements generated · Ready to use</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowExport(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all flex items-center gap-1.5">
                  <Download size={11} /> Export
                </button>
                <button onClick={generate} className="h-8 px-3 rounded-lg text-[11px] font-medium text-primary border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all flex items-center gap-1.5">
                  <RefreshCw size={10} /> Refresh
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border shrink-0 px-2 overflow-x-auto">
              {contentTabs.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-[11px] bg-transparent border-none cursor-pointer whitespace-nowrap transition-all -mb-px font-medium ${active ? "text-foreground border-b-2 border-b-primary" : "text-[var(--text-dim)] border-b-2 border-b-transparent hover:text-foreground"}`}>
                    <Icon size={11} /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <D key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>

                  {tab === "title" && (
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="text-xl font-bold text-foreground leading-relaxed flex-1 tracking-tight">{pack.title}</div>
                        <CopyBtn text={pack.title} id="title" copied={copied} onCopy={copy} />
                      </div>
                      <div className="h-px bg-border mb-4" />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[{ l: "Characters", v: `${pack.title.length}/100` }, { l: "Keyword Match", v: "Strong" }, { l: "Click Score", v: "94/100" }].map(s => (
                          <div key={s.l} className="px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-border">
                            <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">{s.l}</div>
                            <div className="font-mono text-sm font-bold text-foreground">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "description" && (
                    <div>
                      <div className="flex justify-end mb-3"><CopyBtn text={pack.description} id="desc" copied={copied} onCopy={copy} /></div>
                      <div className="px-5 py-4 rounded-2xl bg-[var(--surface-1)] border border-border text-sm text-[var(--secondary-foreground)] leading-[1.75]">{pack.description}</div>
                    </div>
                  )}

                  {tab === "tags" && (
                    <div>
                      <div className="flex justify-end mb-3"><CopyBtn text={pack.tags.join(", ")} id="tags" copied={copied} onCopy={copy} /></div>
                      <div className="flex flex-wrap gap-2">
                        {pack.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-xl bg-[var(--surface-1)] border border-border text-[11px] text-muted-foreground font-medium">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "hooks" && (
                    <div className="flex flex-col gap-2">
                      {pack.hooks.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-4 rounded-2xl bg-[var(--surface-1)] border border-border">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <span className="font-mono text-[10px] font-extrabold text-primary">{i + 1}</span>
                          </div>
                          <p className="text-sm text-[var(--secondary-foreground)] leading-relaxed flex-1 m-0">{h}</p>
                          <button onClick={() => copy(h, `hook${i}`)} className="bg-transparent border-none cursor-pointer p-1 shrink-0 transition-colors text-[var(--text-dim)] hover:text-foreground">
                            {copied === `hook${i}` ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "thumbnails" && (
                    <div className="flex flex-col gap-2">
                      {pack.thumbnails.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-[var(--surface-1)] border border-border">
                          <div className="w-20 h-11 rounded-xl border border-border flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ background: `linear-gradient(135deg, hsl(${i * 55 + 220}, 55%, 22%), hsl(${i * 55 + 250}, 55%, 15%))` }}>
                            <span className="text-[7px] font-extrabold text-white/80 px-1 text-center leading-tight">{t}</span>
                          </div>
                          <span className="text-sm font-semibold text-foreground flex-1">{t}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: i === 0 ? "rgba(251,191,36,0.1)" : "var(--surface-2)", border: `1px solid ${i === 0 ? "rgba(251,191,36,0.2)" : "var(--border)"}`, color: i === 0 ? "#FBBF24" : "var(--text-dim)" }}>
                            {i === 0 ? "Top Pick" : `Option ${i + 1}`}
                          </span>
                          <button onClick={() => copy(t, `th${i}`)} className="bg-transparent border-none cursor-pointer p-1 text-[var(--text-dim)] hover:text-foreground transition-colors">
                            {copied === `th${i}` ? <Check size={13} /> : <Copy size={13} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "video" && (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center max-w-[420px] mx-auto">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(124,92,252,0.1)", border: "1px solid rgba(124,92,252,0.2)" }}>
                        <Film size={24} color="#7C5CFC" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">Transform to Video</h3>
                      <p className="text-sm text-[var(--text-dim)] mb-6 leading-relaxed">Use our AI engine to convert this pack into a ready-to-publish video.</p>
                      <div className="w-full text-left mb-4">
                        <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Voiceover (Max 30s)</div>
                        <select className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer">
                          <option>Marcus (Energetic)</option><option>Sarah (Professional)</option><option>James (Narrator)</option>
                        </select>
                      </div>
                      <div className="w-full text-left mb-6">
                        <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Video Description</div>
                        <textarea placeholder="Describe how you want the video…" className="w-full min-h-[100px] p-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] resize-none" />
                      </div>
                      <button className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2"
                        style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                        <Sparkles size={14} /> Generate AI Video
                      </button>
                    </div>
                  )}

                </D>
              </AnimatePresence>
            </div>
          </div>
        </D>
      </div>
      <ExportModal open={showExport} onClose={() => setShowExport(false)} title="Export Content Pack" />
      <NotificationPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
    </div>
  );
}