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

      <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">

        {/* ── Search bar ── */}
        <D initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="bg-card border border-border rounded-lg shadow-sm p-4" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={12} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none" }} />
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && setIsGen(true)} placeholder="Enter your video topic…" className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring" style={{ paddingLeft: 32 }} />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2000); }}
                className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4"
                style={{ fontFamily: "var(--font-sans)", opacity: isGen ? 0.7 : 1 }}
              >
                {isGen ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={13} /></motion.div> : <Sparkles size={13} />}
                {isGen ? "Generating…" : "Generate Concepts"}
              </motion.button>
            </div>
          </div>
        </D>

        {/* ── Grid + Detail ── */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px" : "1fr", gap: 12 }}>

          {/* Concept cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, alignContent: "start" }}>
            {concepts.map((c, i) => (
              <D key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                style={{
                  borderRadius: "var(--radius-card)",
                  border: `1px solid ${selected?.id === c.id ? "var(--primary)" : "var(--border)"}`,
                  background: selected?.id === c.id ? "rgba(99,102,241,0.04)" : "var(--card)",
                  boxShadow: selected?.id === c.id ? "0 2px 12px rgba(99,102,241,0.15)" : "0 1px 3px rgba(0,0,0,0.25)",
                  cursor: "pointer", overflow: "hidden", transition: "all 0.18s",
                }}
                onMouseEnter={(e: React.MouseEvent<any>) => { if (selected?.id !== c.id) { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--surface-4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; } }}
                onMouseLeave={(e: React.MouseEvent<any>) => { if (selected?.id !== c.id) { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; } }}
              >
                {/* Color banner */}
                <div style={{ height: 60, display: "flex", overflow: "hidden" }}>
                  {c.colors.map((col, ci) => (
                    <div key={ci} style={{ flex: 1, background: col, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {ci === 0 && <span style={{ fontFamily: "var(--font-sans)", fontSize: "7px", fontWeight: 800, color: "rgba(255,255,255,0.6)", transform: "rotate(-20deg)" }}>A</span>}
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}>{c.title}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.style}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setLiked(p => { const n = new Set(p); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; }); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0, color: liked.has(c.id) ? "var(--neon-red)" : "var(--text-dim)", transition: "color 0.15s" }}>
                      <Heart size={12} fill={liked.has(c.id) ? "var(--neon-red)" : "none"} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/12 text-emerald-500">CTR {c.ctr}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>{c.emotion}</span>
                  </div>
                </div>
              </D>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bg-card border border-border rounded-lg shadow-sm p-6" style={{ position: "sticky", top: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 16 }}>{selected.title}</div>
                <div style={{ height: 1, background: "var(--border)", marginBottom: 18 }} />

                {/* Color palette */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8 }}>Color Palette</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {selected.colors.map((col, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                        <div style={{ width: "100%", height: 34, borderRadius: "var(--radius)", background: col, border: "1px solid var(--border)" }} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "8.5px", color: "var(--text-dim)" }}>{col}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headline */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>Headline Text</div>
                  <div style={{ padding: "9px 12px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--foreground)" }}>{selected.text}</div>
                </div>

                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
                  <div style={{ padding: "9px 11px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 3 }}>CTR Est.</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xl)", fontWeight: 800, color: ctrColor(selected.ctr) }}>{selected.ctr}</div>
                  </div>
                  <div style={{ padding: "9px 11px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 3 }}>Style</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--foreground)" }}>{selected.style}</div>
                  </div>
                </div>

                {/* Emotional hook */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 7 }}>Emotional Hook</div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap at-badge-purple">{selected.emotion}</span>
                </div>

                {/* Layout brief */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>Layout Brief</div>
                  <div style={{ padding: "10px 12px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)", fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--secondary-foreground)", lineHeight: 1.6 }}>{selected.layout}</div>
                </div>

                <div style={{ display: "flex", gap: 7 }}>
                  <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-9 px-4" style={{ flex: 1, fontFamily: "var(--font-sans)" }}>
                    <Download size={12} /> Export Brief
                  </button>
                  <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-foreground text-background shadow-xs hover:opacity-90 h-9 px-4"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
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