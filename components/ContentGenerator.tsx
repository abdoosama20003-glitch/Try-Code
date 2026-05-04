"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Search, Copy, Check, FileText, Tag, AlignLeft,
  Image, Wand2, RefreshCw, Download, Bookmark,
} from "lucide-react";
import { TopBar } from "./TopBar";

const D = motion.create("div" as any);

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
  { key: "title",       label: "SEO Title",   icon: FileText  },
  { key: "description", label: "Description", icon: AlignLeft },
  { key: "tags",        label: "Tags",        icon: Tag       },
  { key: "hooks",       label: "Hooks",       icon: Wand2     },
  { key: "thumbnails",  label: "Thumbnails",  icon: Image     },
] as const;

function CopyBtn({ text, id, copied, onCopy }: { text: string; id: string; copied: string | null; onCopy: (t: string, id: string) => void }) {
  return (
    <button onClick={() => onCopy(text, id)}
      className="flex items-center gap-[5px] px-[10px] py-1 rounded-sm bg-transparent text-[var(--text-dim)] border border-border cursor-pointer text-[10px] shrink-0 transition-all hover:border-[var(--surface-4)] hover:text-foreground">
      {copied === id ? <Check size={10} /> : <Copy size={10} />}
      {copied === id ? "Copied" : "Copy"}
    </button>
  );
}

export function ContentGenerator() {
  const [input, setInput]   = useState("");
  const [isGen, setIsGen]   = useState(false);
  const [pack, setPack]     = useState(samplePacks[0]);
  const [tab, setTab]       = useState<string>("title");
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved]   = useState<Set<number>>(new Set());

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000); };
  const generate = () => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); };
  const toggleSave = (id: number) => setSaved(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <>
      <TopBar label="Creation" title="Content Generator" subtitle="Complete video packages: titles, descriptions, tags, hooks, and thumbnail text" actionLabel="Generate Pack" actionIcon={Sparkles} onAction={generate} />

      <div className="flex-1 overflow-auto md:overflow-hidden px-4 md:px-7 pt-5 pb-4 md:pb-0 flex flex-col md:flex-row gap-[14px] bg-background min-h-0">

        {/* Left panel */}
        <div className="w-full md:w-[248px] shrink-0 flex flex-col gap-[10px] overflow-y-auto md:pb-6">

          {/* Input */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-4">
            <div className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)] mb-[10px]">New Pack</div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Search size={11} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="Python Automation…"
                  className="w-full h-[38px] bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-7 pr-3" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={isGen}
                className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-primary text-primary-foreground shadow-[var(--glow-primary-sm)] hover:opacity-90 hover:shadow-[var(--glow-primary)] h-9 px-4 w-full disabled:opacity-40 disabled:pointer-events-none">
                {isGen ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={11} /></motion.div>Generating…</> : <><Sparkles size={11} />Generate Pack</>}
              </motion.button>
              <div>
                <div className="text-[9px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-[5px]">Quick ideas</div>
                <div className="flex flex-wrap gap-1">
                  {["Python Automation", "AI Tools 2026", "React vs Next.js"].map(s => (
                    <button key={s} onClick={() => setInput(s)}
                      className="px-[7px] py-[2px] rounded-sm bg-[var(--hover-overlay)] text-[var(--text-dim)] text-[10px] border border-border cursor-pointer transition-all hover:bg-[var(--accent)] hover:text-[var(--primary-hover)] hover:border-[var(--border-active)]">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[11px] font-semibold text-muted-foreground">Generated Packs</span>
              <span className="font-mono text-[9px] px-1.5 py-px rounded-sm bg-[var(--surface-2)] border border-border text-[var(--text-dim)]">{samplePacks.length}</span>
            </div>
            <div className="flex flex-col gap-[5px]">
              {samplePacks.map((p, i) => (
                <D key={p.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => setPack(p)}
                  className="px-[13px] py-[11px] rounded-[var(--radius-card)] cursor-pointer transition-all shadow-sm"
                  style={{ border: `1px solid ${pack.id === p.id ? "rgba(99,102,241,0.35)" : "var(--border)"}`, background: pack.id === p.id ? "rgba(99,102,241,0.06)" : "var(--card)" }}>
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-foreground overflow-hidden text-ellipsis whitespace-nowrap mb-[5px]">{p.keyword}</div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/10 text-emerald-500">Score {p.seoScore}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleSave(p.id); }}
                      className="bg-transparent border-none cursor-pointer p-0.5 transition-colors"
                      style={{ color: saved.has(p.id) ? "var(--neon-amber)" : "var(--text-dim)" }}>
                      <Bookmark size={11} fill={saved.has(p.id) ? "var(--neon-amber)" : "none"} />
                    </button>
                  </div>
                </D>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 flex flex-col pb-6 overflow-hidden">
          <div className="bg-card border border-border rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-[14px] border-b border-border flex items-center justify-between gap-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">{pack.keyword}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/10 text-emerald-500">SEO {pack.seoScore}</span>
                </div>
                <span className="text-[10px] text-[var(--text-dim)]">5 elements generated · Ready to use</span>
              </div>
              <div className="flex gap-1.5">
                <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-[28px] px-[10px] text-[11px]">
                  <Download size={10} /> Export
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={generate}
                  className="flex items-center gap-[5px] h-7 px-[10px] rounded-sm text-[var(--primary-hover)] border border-[var(--border-active)] cursor-pointer text-[10px] font-semibold"
                  style={{ background: "var(--accent)" }}>
                  <RefreshCw size={9} /> Refresh
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border shrink-0 px-1">
              {contentTabs.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className="flex items-center gap-[5px] px-[13px] py-[9px] text-[11px] bg-transparent border-none cursor-pointer whitespace-nowrap transition-all -mb-px"
                    style={{ fontWeight: active ? 600 : 400, color: active ? "var(--foreground)" : "var(--text-dim)", borderBottom: `2px solid ${active ? "var(--primary)" : "transparent"}` }}>
                    <Icon size={10} /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-[22px]">
              <AnimatePresence mode="wait">
                <D key={tab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }}>

                  {tab === "title" && (
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="text-xl font-bold text-foreground leading-[1.35] flex-1 tracking-[-0.02em]">{pack.title}</div>
                        <CopyBtn text={pack.title} id="title" copied={copied} onCopy={copy} />
                      </div>
                      <div className="h-px bg-border mb-4" />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                        {[{ l: "Characters", v: `${pack.title.length}/100` }, { l: "Keyword Match", v: "Strong" }, { l: "Click Score", v: "94/100" }].map(s => (
                          <div key={s.l} className="px-3 py-[10px] rounded-sm bg-[var(--surface-1)] border border-border">
                            <div className="text-[9px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-1">{s.l}</div>
                            <div className="font-mono text-sm font-bold text-foreground">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "description" && (
                    <div>
                      <div className="flex justify-end mb-[10px]">
                        <CopyBtn text={pack.description} id="desc" copied={copied} onCopy={copy} />
                      </div>
                      <div className="px-[18px] py-4 rounded-[var(--radius-card)] bg-[var(--surface-1)] border border-border text-sm text-[var(--secondary-foreground)] leading-[1.75]">
                        {pack.description}
                      </div>
                    </div>
                  )}

                  {tab === "tags" && (
                    <div>
                      <div className="flex justify-end mb-[10px]">
                        <CopyBtn text={pack.tags.join(", ")} id="tags" copied={copied} onCopy={copy} />
                      </div>
                      <div className="flex flex-wrap gap-[7px]">
                        {pack.tags.map(tag => (
                          <span key={tag} className="px-[11px] py-1 rounded-sm bg-[var(--surface-2)] border border-border text-[11px] text-muted-foreground">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "hooks" && (
                    <div className="flex flex-col gap-2">
                      {pack.hooks.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-[14px] rounded-[var(--radius-card)] bg-[var(--surface-1)] border border-border">
                          <div className="w-[22px] h-[22px] rounded-sm bg-[var(--accent)] border border-[var(--border-active)] flex items-center justify-center shrink-0">
                            <span className="font-mono text-[10px] font-extrabold text-[var(--primary-hover)]">{i + 1}</span>
                          </div>
                          <p className="text-sm text-[var(--secondary-foreground)] leading-[1.65] flex-1 m-0">{h}</p>
                          <button onClick={() => copy(h, `hook${i}`)}
                            className="bg-transparent border-none cursor-pointer p-0.5 shrink-0 transition-colors text-[var(--text-dim)] hover:text-foreground">
                            {copied === `hook${i}` ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "thumbnails" && (
                    <div className="flex flex-col gap-2">
                      {pack.thumbnails.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-[14px] rounded-[var(--radius-card)] bg-[var(--surface-1)] border border-border">
                          <div className="w-[76px] h-[42px] rounded-sm border border-border flex items-center justify-center shrink-0"
                            style={{ background: `hsl(${i * 55 + 220}, 55%, 18%)` }}>
                            <span className="text-[7.5px] font-extrabold text-white/80 px-1 text-center leading-[1.3]">{t}</span>
                          </div>
                          <span className="text-sm font-semibold text-foreground flex-1">{t}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap ${i === 0 ? "at-badge-warning" : "at-badge-default"}`}>{i === 0 ? "Top Pick" : `Option ${i + 1}`}</span>
                          <button onClick={() => copy(t, `th${i}`)}
                            className="bg-transparent border-none cursor-pointer p-0.5 transition-colors text-[var(--text-dim)] hover:text-foreground">
                            {copied === `th${i}` ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </D>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}