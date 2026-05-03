"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool, Search, Copy, Check, ChevronDown,
  Download, Sparkles, Volume2, Target, Lightbulb, RefreshCw, MessageSquare,
} from "lucide-react";
import { TopBar } from "./TopBar";

const D = motion.create("div" as any);

const scriptSections = [
  { id: "hook",  label: "Hook",         timing: "0:00 — 0:30",  icon: Target,       color: "var(--neon-red)",
    content: `What if I told you Python could save you 10 hours every single week?\n\nI know that sounds crazy, but in the next 15 minutes, I'm going to show you 5 simple automation scripts that completely changed how I work.\n\n[VISUAL CUE: Split screen — left: manual work, right: Python running]`,
  },
  { id: "intro", label: "Introduction", timing: "0:30 — 2:00",  icon: MessageSquare,color: "var(--neon-indigo)",
    content: `I used to spend 4 hours every Monday just organizing emails, updating spreadsheets, and generating reports.\n\nThen a friend showed me a 10-line Python script that did my entire Monday routine in 30 seconds. My jaw literally dropped.\n\n[VISUAL CUE: Show "difficulty meter" graphic]`,
  },
  { id: "body",  label: "Main Content", timing: "2:00 — 13:00", icon: Lightbulb,    color: "var(--neon-purple)",
    content: `Script Number 1: The Email Organizer\n\nThis automatically sorts your inbox by priority, flags important emails, and drafts replies for routine messages.\n\nStep 1: Install two Python libraries\nStep 2: Connect via secure API key\nStep 3: Write a simple rule set\n\n[SCREEN RECORDING: VS Code with script running]`,
  },
  { id: "cta",   label: "CTA & Outro",  timing: "13:00 — 15:00",icon: Volume2,      color: "var(--neon-amber)",
    content: `5 Python automation scripts that will save you hours every week.\n\nSmash that like button — it tells YouTube to show this to more people.\n\nSource code linked in the description — totally free.\n\nDrop a comment: which script will you try first?\n\nSubscribe & hit the bell — next week: building a complete AI assistant with Python.`,
  },
];

const stats = [
  { label: "Total Words",   value: "2,847",   color: "var(--neon-indigo)"  },
  { label: "Duration",      value: "14:23",   color: "var(--neon-purple)"  },
  { label: "Readability",   value: "Grade 7", color: "var(--neon-emerald)" },
  { label: "Hook Strength", value: "94/100",  color: "var(--neon-amber)"   },
];

export function ScriptWriter() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["hook", "intro"]));
  const [copied, setCopied]     = useState<string | null>(null);
  const [isGen, setIsGen]       = useState(false);

  const toggle = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const copy   = (text: string, id: string) => {
    // Skip navigator.clipboard entirely — Permissions-Policy blocks it in sandboxed
    // iframes and logs a NotAllowedError at the browser level even with .catch().
    // execCommand('copy') works without any permissions policy.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (_) { /* clipboard unavailable in this context — silently no-op */ }
  };

  return (
    <>
      <TopBar label="Creation" title="Script Writer" subtitle="Full scripts with hooks and CTAs tuned for maximum watch time" actionLabel="Write Script" actionIcon={PenTool} onAction={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }} />

      <div className="p-7 md:p-8 flex flex-col gap-5 flex-1">

        {/* ── Config row ── */}
        <D initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", gap: 14 }}>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>Topic</div>
                <div style={{ position: "relative" }}>
                  <Search size={12} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none" }} />
                  <input defaultValue="Python Automation for Beginners" className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring" style={{ paddingLeft: 32 }} />
                </div>
              </div>
              {[
                { label: "Tone",   opts: ["Conversational", "Professional", "Energetic", "Educational"] },
                { label: "Length", opts: ["Short (5-8m)", "Medium (10-15m)", "Long (20-30m)"] },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>{f.label}</div>
                  <select defaultValue={f.opts[0]} className="w-full h-9.5 px-3 bg-surface-1 border border-border rounded-md text-foreground text-sm outline-none hover:border-surface-4 focus:border-primary focus:ring-3 focus:ring-ring appearance-none cursor-pointer">
                    {f.opts.map(o => <option key={o} value={o} style={{ background: "var(--popover)" }}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </D>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {stats.map((s, i) => (
            <D key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
              <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:border-surface-4 hover:shadow-md transition-all" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)", fontWeight: 800, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</span>
              </div>
            </D>
          ))}
        </div>

        {/* ── Script Sections ── */}
        <div className="bg-card border border-border rounded-lg shadow-sm" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em" }}>Script Sections</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)", marginTop: 2 }}>Python Automation for Beginners · 14:23</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none bg-secondary text-muted-foreground border border-border hover:bg-surface-3 hover:text-foreground hover:border-surface-4 h-7.5 px-3 text-[11px]" style={{ fontFamily: "var(--font-sans)" }}>
                <Download size={11} /> Export
              </button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }}
                style={{ display: "flex", alignItems: "center", gap: 5, height: 30, padding: "0 12px", borderRadius: "var(--radius)", background: "var(--accent)", color: "var(--primary-hover)", border: "1px solid var(--border-active)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, transition: "all 0.15s" }}
              >
                {isGen ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={10} /></motion.div> : <Sparkles size={10} />}
                {isGen ? "Regenerating…" : "Regenerate"}
              </motion.button>
            </div>
          </div>

          {scriptSections.map((section, idx) => {
            const open = expanded.has(section.id);
            const Icon = section.icon;
            return (
              <div key={section.id} style={{ borderBottom: idx < scriptSections.length - 1 ? "1px solid var(--border)" : "none" }}>
                {/* div[role=button] instead of <button> to allow the inner Copy <button> without nesting violation */}
                <div role="button" tabIndex={0} onClick={() => toggle(section.id)}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggle(section.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 20px", background: open ? "var(--subtle-overlay)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                  onMouseEnter={(e: React.MouseEvent<any>) => { if (!open) (e.currentTarget as HTMLDivElement).style.background = "var(--hover-overlay)"; }}
                  onMouseLeave={(e: React.MouseEvent<any>) => { if (!open) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: "var(--radius)", background: `color-mix(in srgb, ${section.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${section.color} 20%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={13} color={section.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)" }}>{section.label}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-white/5 text-muted-foreground">{section.timing}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {open && (
                      <button onClick={e => { e.stopPropagation(); copy(section.content, section.id); }} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: "var(--radius)", background: "transparent", color: "var(--text-dim)", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "10px", transition: "all 0.12s" }}
                        onMouseEnter={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)"; }}
                        onMouseLeave={(e: React.MouseEvent<any>) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"; }}
                      >
                        {copied === section.id ? <Check size={10} /> : <Copy size={10} />}
                        {copied === section.id ? "Copied" : "Copy"}
                      </button>
                    )}
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={13} color="var(--text-dim)" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                      <div style={{ padding: "4px 20px 20px" }}>
                        <div style={{ borderLeft: `2px solid color-mix(in srgb, ${section.color} 30%, transparent)`, paddingLeft: 16 }}>
                          <pre style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--secondary-foreground)", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{section.content}</pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}