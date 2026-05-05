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
];

export function ScriptWriter() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["hook", "intro"]));
  const [copied, setCopied]     = useState<string | null>(null);
  const [isGen, setIsGen]       = useState(false);

  const toggle = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const copy   = (text: string, id: string) => {
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
    } catch (_) {}
  };

  return (
    <>
      <TopBar label="Creation" title="Script Writer" subtitle="Full scripts with hooks and CTAs tuned for maximum watch time" actionLabel="Write Script" actionIcon={PenTool} onAction={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }} />

      <div className="p-4 md:p-7 xl:p-8 flex flex-col gap-5 flex-1">

        {/* Config row */}
        <D initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px] gap-[14px]">
              <div>
                <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1.5">Topic</div>
                <div className="relative">
                  <Search size={12} className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                  <input defaultValue="Python Automation for Beginners" className="w-full h-[38px] bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-8 pr-3" />
                </div>
              </div>
              {[
                { label: "Tone",   opts: ["Conversational", "Professional", "Energetic", "Educational"] },
                { label: "Length", opts: ["2-10 sec", "10-20 sec", "20-30 sec"] },
              ].map(f => (
                <div key={f.label}>
                  <div className="text-[9.5px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1.5">{f.label}</div>
                  <select defaultValue={f.opts[0]} className="w-full h-[38px] px-3 bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer">
                    {f.opts.map(o => <option key={o} value={o} style={{ background: "var(--popover)" }}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </D>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px]">
          {stats.map((s, i) => (
            <D key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
              <div className="bg-card border border-border rounded-lg shadow-sm hover:border-[var(--surface-4)] hover:shadow-md transition-all flex items-center justify-between px-5 py-4">
                <span className="text-[11px] text-[var(--text-dim)] font-medium">{s.label}</span>
                <span className="font-mono text-lg font-extrabold tracking-[-0.03em]" style={{ color: s.color }}>{s.value}</span>
              </div>
            </D>
          ))}
        </div>

        {/* Script Sections */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-[14px] border-b border-border gap-3">
            <div>
              <div className="text-sm font-semibold text-foreground tracking-[-0.01em]">Script Sections</div>
              <div className="text-[10px] text-[var(--text-dim)] mt-0.5">Python Automation for Beginners · 14:23</div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-[30px] px-3 text-[11px]">
                <Download size={11} /> Export
              </button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }}
                className="inline-flex items-center gap-[5px] h-[30px] px-3 rounded-sm text-[var(--primary-hover)] border border-[var(--border-active)] cursor-pointer text-[11px] font-semibold transition-all hover:bg-[var(--accent)]"
                style={{ background: "var(--accent)" }}>
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
                <div role="button" tabIndex={0} onClick={() => toggle(section.id)}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggle(section.id)}
                  className="w-full flex items-center gap-3 px-5 py-[13px] border-none cursor-pointer text-left transition-colors hover:bg-[var(--hover-overlay)]"
                  style={{ background: open ? "var(--subtle-overlay)" : "transparent" }}>
                  {/* color-mix() bg stays inline */}
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: `color-mix(in srgb, ${section.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${section.color} 20%, transparent)` }}>
                    <Icon size={13} color={section.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{section.label}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-white/5 text-muted-foreground">{section.timing}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {open && (
                      <button onClick={e => { e.stopPropagation(); copy(section.content, section.id); }}
                        className="flex items-center gap-1 px-2 py-[3px] rounded-sm bg-transparent text-[var(--text-dim)] border border-border cursor-pointer text-[10px] transition-all hover:text-foreground hover:border-[var(--surface-4)]">
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
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1">
                        {/* color-mix() border stays inline */}
                        <div className="pl-4" style={{ borderLeft: `2px solid color-mix(in srgb, ${section.color} 30%, transparent)` }}>
                          <pre className="text-sm text-[var(--secondary-foreground)] leading-[1.75] m-0 whitespace-pre-wrap break-words font-sans">{section.content}</pre>
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