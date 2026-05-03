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
    <button onClick={() => onCopy(text, id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: "var(--radius)", background: "transparent", color: "var(--text-dim)", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "10px", flexShrink: 0 }}
      onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--surface-4)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"; }}
      onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"; }}
    >
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

      <div style={{ flex: 1, overflow: "hidden", padding: "20px 28px 0", display: "flex", gap: 14, background: "var(--background)", minHeight: 0 }}>

        {/* ── Left panel ── */}
        <div style={{ width: 248, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", paddingBottom: 24 }}>

          {/* Input */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-4" style={{ padding: "16px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>New Pack</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <Search size={11} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none" }} />
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} placeholder="Python Automation…" className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring" style={{ paddingLeft: 28 }} />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={isGen}
                className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-primary text-primary-foreground shadow-glow-primary-sm hover:opacity-90 hover:shadow-glow-primary h-9 px-4"
                style={{ width: "100%", fontFamily: "var(--font-sans)" }}
              >
                {isGen ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={11} /></motion.div>Generating…</> : <><Sparkles size={11} />Generate Pack</>}
              </motion.button>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 5 }}>Quick ideas</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {["Python Automation", "AI Tools 2026", "React vs Next.js"].map(s => (
                    <button key={s} onClick={() => setInput(s)} style={{ padding: "2px 7px", borderRadius: "var(--radius)", background: "var(--hover-overlay)", color: "var(--text-dim)", fontSize: "10px", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s" }}
                      onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--primary-hover)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-active)"; }}
                      onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--hover-overlay)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, padding: "0 2px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--muted-foreground)" }}>Generated Packs</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "1px 6px", borderRadius: "var(--radius)", background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-dim)" }}>{samplePacks.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {samplePacks.map((p, i) => (
                <D key={p.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => setPack(p)}
                  style={{ padding: "11px 13px", borderRadius: "var(--radius-card)", border: `1px solid ${pack.id === p.id ? "rgba(99,102,241,0.35)" : "var(--border)"}`, background: pack.id === p.id ? "rgba(99,102,241,0.06)" : "var(--card)", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
                  onMouseEnter={(e: React.MouseEvent<any>) => { if (pack.id !== p.id) (e.currentTarget as HTMLDivElement).style.borderColor = "var(--surface-4)"; }}
                  onMouseLeave={(e: React.MouseEvent<any>) => { if (pack.id !== p.id) (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>{p.keyword}</div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/12 text-emerald-500">Score {p.seoScore}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleSave(p.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: saved.has(p.id) ? "var(--neon-amber)" : "var(--text-dim)", padding: 2, transition: "color 0.15s" }}>
                      <Bookmark size={11} fill={saved.has(p.id) ? "var(--neon-amber)" : "none"} />
                    </button>
                  </div>
                </D>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", paddingBottom: 24, overflow: "hidden" }}>
          <div className="bg-card border border-border rounded-lg shadow-sm" style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pack.keyword}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/12 text-emerald-500">SEO {pack.seoScore}</span>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>5 elements generated · Ready to use</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-7.5 px-3 text-[11px]" style={{ fontFamily: "var(--font-sans)" }}>
                  <Download size={10} /> Export
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={generate} style={{ display: "flex", alignItems: "center", gap: 5, height: 28, padding: "0 10px", borderRadius: "var(--radius)", background: "var(--accent)", color: "var(--primary-hover)", border: "1px solid var(--border-active)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600 }}>
                  <RefreshCw size={9} /> Refresh
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid var(--border)", flexShrink: 0, padding: "0 4px" }}>
              {contentTabs.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button key={t.key} onClick={() => setTab(t.key)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 13px", fontSize: "11px", fontWeight: active ? 600 : 400, color: active ? "var(--foreground)" : "var(--text-dim)", background: "transparent", border: "none", borderBottom: `2px solid ${active ? "var(--primary)" : "transparent"}`, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.12s", whiteSpace: "nowrap", marginBottom: -1 }}>
                    <Icon size={10} /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "22px" }}>
              <AnimatePresence mode="wait">
                <D key={tab} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }}>

                  {tab === "title" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.35, flex: 1, letterSpacing: "-0.02em" }}>{pack.title}</div>
                        <CopyBtn text={pack.title} id="title" copied={copied} onCopy={copy} />
                      </div>
                      <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                        {[{ l: "Characters", v: `${pack.title.length}/100` }, { l: "Keyword Match", v: "Strong" }, { l: "Click Score", v: "94/100" }].map(s => (
                          <div key={s.l} style={{ padding: "10px 12px", borderRadius: "var(--radius)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                            <div style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.09em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 4 }}>{s.l}</div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--foreground)" }}>{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "description" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                        <CopyBtn text={pack.description} id="desc" copied={copied} onCopy={copy} />
                      </div>
                      <div style={{ padding: "16px 18px", borderRadius: "var(--radius-card)", background: "var(--surface-1)", border: "1px solid var(--border)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--secondary-foreground)", lineHeight: 1.75 }}>
                        {pack.description}
                      </div>
                    </div>
                  )}

                  {tab === "tags" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                        <CopyBtn text={pack.tags.join(", ")} id="tags" copied={copied} onCopy={copy} />
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {pack.tags.map(tag => (
                          <span key={tag} style={{ padding: "4px 11px", borderRadius: "var(--radius)", background: "var(--surface-2)", border: "1px solid var(--border)", fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--muted-foreground)" }}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "hooks" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {pack.hooks.map((h, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: "var(--radius-card)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                          <div style={{ width: 22, height: 22, borderRadius: "var(--radius)", background: "var(--accent)", border: "1px solid var(--border-active)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 800, color: "var(--primary-hover)" }}>{i + 1}</span>
                          </div>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--secondary-foreground)", lineHeight: 1.65, flex: 1, margin: 0 }}>{h}</p>
                          <button onClick={() => copy(h, `hook${i}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 2, flexShrink: 0, transition: "color 0.15s" }}
                            onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"}
                            onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"}
                          >
                            {copied === `hook${i}` ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === "thumbnails" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {pack.thumbnails.map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: "var(--radius-card)", background: "var(--surface-1)", border: "1px solid var(--border)" }}>
                          <div style={{ width: 76, height: 42, borderRadius: "var(--radius)", background: `hsl(${i * 55 + 220}, 55%, 18%)`, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "7.5px", fontWeight: 800, color: "rgba(255,255,255,0.8)", padding: "0 4px", textAlign: "center", lineHeight: 1.3 }}>{t}</span>
                          </div>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", flex: 1 }}>{t}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap ${i === 0 ? "at-badge-warning" : "at-badge-default"}`}>{i === 0 ? "Top Pick" : `Option ${i + 1}`}</span>
                          <button onClick={() => copy(t, `th${i}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 2, transition: "color 0.15s" }}
                            onMouseEnter={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"}
                            onMouseLeave={(e: React.MouseEvent<any>) => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"}
                          >
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