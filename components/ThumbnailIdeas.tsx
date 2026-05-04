"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Sparkles, Heart, Download, Search, Copy, Check } from "lucide-react";
import { TopBar } from "./TopBar";

const D = motion.create("div" as any);

const concepts = [
  { id: 1, title: "Split Screen Shock",  text: "I AUTOMATED EVERYTHING",  colors: ["#EF4444", "#FFD60A", "#0A0A0A"], style: "High Contrast", emotion: "Surprise + Curiosity", ctr: "8.2%", layout: "Face left (shocked) | Code terminal right | Bold text top center" },
  { id: 2, title: "Before/After Reveal", text: "10 HRS → 30 SECONDS",     colors: ["#6366F1", "#0F172A", "#FFFFFF"], style: "Minimal Tech",   emotion: "FOMO + Aspiration",   ctr: "7.8%", layout: "Split diagonal | Left: messy desk | Right: clean screen | Arrow center" },
  { id: 3, title: "Code Explosion",      text: "5 SCRIPTS = FREE TIME",   colors: ["#8B5CF6", "#F59E0B", "#111827"], style: "Dynamic Dark",  emotion: "Excitement + Value",  ctr: "7.4%", layout: "Dark bg | Code floating | Number 5 oversized | Face bottom right" },
  { id: 4, title: "Money Shot",          text: "Python Saved Me $10K",    colors: ["#10B981", "#065F46", "#ECFDF5"], style: "Clean Pro",     emotion: "Greed + Proof",       ctr: "9.1%", layout: "Green gradient | Dollar pattern | Screenshot proof | Pointing gesture" },
];

const ctrColor = (ctr: string) => parseFloat(ctr) >= 9 ? "var(--neon-emerald)" : parseFloat(ctr) >= 8 ? "var(--neon-amber)" : "var(--muted-foreground)";

export function ThumbnailIdeas() {
  const [selected, setSelected] = useState<typeof concepts[0] | null>(concepts[0]);
  const [liked, setLiked]       = useState<Set<number>>(new Set());
  const [isGen, setIsGen]       = useState(false);
  const [query, setQuery]       = useState("Python Automation for Beginners");
  const [copied, setCopied]     = useState(false);

  return (
    <>
      <TopBar label="Visual" title="Thumbnail Ideas" subtitle="Concepts with color psychology, CTR scoring, and layout briefs" actionLabel="Generate Ideas" actionIcon={Image} onAction={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2000); }} />

      <div className="p-4 md:p-7 xl:p-8 flex flex-col gap-5 flex-1">

        {/* Search bar */}
        <D initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="bg-card border border-border rounded-lg shadow-sm px-[18px] py-4">
            <div className="flex gap-[10px]">
              <div className="flex-1 relative">
                <Search size={12} className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && setIsGen(true)} placeholder="Enter your video topic…"
                  className="w-full h-[38px] bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-8 pr-3" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2000); }}
                className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4"
                style={{ opacity: isGen ? 0.7 : 1 }}>
                {isGen ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={13} /></motion.div> : <Sparkles size={13} />}
                {isGen ? "Generating…" : "Generate Concepts"}
              </motion.button>
            </div>
          </div>
        </D>

        {/* Grid + Detail */}
        <div className="flex flex-col xl:grid gap-3" style={{ gridTemplateColumns: selected ? "1fr 320px" : "1fr" }}>

          {/* Concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] content-start">
            {concepts.map((c, i) => (
              <D key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className="rounded-[var(--radius-card)] cursor-pointer overflow-hidden transition-all"
                style={{
                  border: `1px solid ${selected?.id === c.id ? "var(--primary)" : "var(--border)"}`,
                  background: selected?.id === c.id ? "rgba(99,102,241,0.04)" : "var(--card)",
                  boxShadow: selected?.id === c.id ? "0 2px 12px rgba(99,102,241,0.15)" : "0 1px 3px rgba(0,0,0,0.25)",
                }}>
                {/* Color banner */}
                <div className="h-[60px] flex overflow-hidden">
                  {c.colors.map((col, ci) => (
                    <div key={ci} className="flex-1 flex items-center justify-center" style={{ background: col }}>
                      {ci === 0 && <span className="text-[7px] font-extrabold text-white/60 -rotate-[20deg]">A</span>}
                    </div>
                  ))}
                </div>
                <div className="px-[14px] py-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5">{c.title}</div>
                      <div className="font-mono text-[9px] font-bold text-[var(--text-dim)] tracking-[0.04em] uppercase">{c.style}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setLiked(p => { const n = new Set(p); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; }); }}
                      className="bg-transparent border-none cursor-pointer p-0.5 shrink-0 transition-colors"
                      style={{ color: liked.has(c.id) ? "var(--neon-red)" : "var(--text-dim)" }}>
                      <Heart size={12} fill={liked.has(c.id) ? "var(--neon-red)" : "none"} />
                    </button>
                  </div>
                  <div className="flex items-center gap-[7px]">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/10 text-emerald-500">CTR {c.ctr}</span>
                    <span className="text-[10px] text-[var(--text-dim)]">{c.emotion}</span>
                  </div>
                </div>
              </D>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-0">
                <div className="text-sm font-semibold text-foreground mb-4">{selected.title}</div>
                <div className="h-px bg-border mb-[18px]" />

                {/* Color palette */}
                <div className="mb-4">
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-2">Color Palette</div>
                  <div className="flex gap-1.5">
                    {selected.colors.map((col, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                        <div className="w-full h-[34px] rounded-sm border border-border" style={{ background: col }} />
                        <span className="font-mono text-[8.5px] text-[var(--text-dim)]">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headline */}
                <div className="mb-[14px]">
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1.5">Headline Text</div>
                  <div className="px-3 py-[9px] rounded-sm bg-[var(--surface-1)] border border-border text-sm font-bold text-foreground">{selected.text}</div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-[7px] mb-[14px]">
                  <div className="px-[11px] py-[9px] rounded-sm bg-[var(--surface-1)] border border-border">
                    <div className="text-[9px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-[3px]">CTR Est.</div>
                    <div className="font-mono text-xl font-extrabold" style={{ color: ctrColor(selected.ctr) }}>{selected.ctr}</div>
                  </div>
                  <div className="px-[11px] py-[9px] rounded-sm bg-[var(--surface-1)] border border-border">
                    <div className="text-[9px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-[3px]">Style</div>
                    <div className="text-[11px] font-semibold text-foreground">{selected.style}</div>
                  </div>
                </div>

                {/* Emotional hook */}
                <div className="mb-[14px]">
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-[7px]">Emotional Hook</div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap at-badge-purple">{selected.emotion}</span>
                </div>

                {/* Layout brief */}
                <div className="mb-[18px]">
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1.5">Layout Brief</div>
                  <div className="px-3 py-[10px] rounded-sm bg-[var(--surface-1)] border border-border text-[11px] text-[var(--secondary-foreground)] leading-[1.6]">{selected.layout}</div>
                </div>

                <div className="flex gap-[7px]">
                  <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-9 px-4 flex-1">
                    <Download size={12} /> Export Brief
                  </button>
                  <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4">
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </>
  );
}