"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool, Search, Copy, Check, ChevronDown,
  Download, Sparkles, Volume2, Target, Lightbulb, RefreshCw, MessageSquare, Menu, Bell,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ExportModal, NotificationPanel } from "./Overlays";
import { useSidebar } from "@/hooks/useSidebar";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const scriptSections = [
  { id: "hook", label: "Hook", timing: "0:00 — 0:30", icon: Target, color: "#EF4444",
    content: `What if I told you Python could save you 10 hours every single week?\n\nI know that sounds crazy, but in the next 15 minutes, I'm going to show you 5 simple automation scripts that completely changed how I work.\n\n[VISUAL CUE: Split screen — left: manual work, right: Python running]` },
  { id: "intro", label: "Introduction", timing: "0:30 — 2:00", icon: MessageSquare, color: "#7C5CFC",
    content: `I used to spend 4 hours every Monday just organizing emails, updating spreadsheets, and generating reports.\n\nThen a friend showed me a 10-line Python script that did my entire Monday routine in 30 seconds. My jaw literally dropped.\n\n[VISUAL CUE: Show "difficulty meter" graphic]` },
  { id: "body", label: "Main Content", timing: "2:00 — 13:00", icon: Lightbulb, color: "#A855F7",
    content: `Script Number 1: The Email Organizer\n\nThis automatically sorts your inbox by priority, flags important emails, and drafts replies for routine messages.\n\nStep 1: Install two Python libraries\nStep 2: Connect via secure API key\nStep 3: Write a simple rule set\n\n[SCREEN RECORDING: VS Code with script running]` },
  { id: "cta", label: "CTA & Outro", timing: "13:00 — 15:00", icon: Volume2, color: "#FBBF24",
    content: `5 Python automation scripts that will save you hours every week.\n\nSmash that like button — it tells YouTube to show this to more people.\n\nSource code linked in the description — totally free.\n\nDrop a comment: which script will you try first?\n\nSubscribe & hit the bell — next week: building a complete AI assistant with Python.` },
];

const stats = [
  { label: "Total Words", value: "2,847", color: "#7C5CFC" },
  { label: "Duration", value: "14:23", color: "#A855F7" },
  { label: "Readability", value: "Grade 7", color: "#34D399" },
];

export function ScriptWriter() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["hook", "intro"]));
  const [copied, setCopied] = useState<string | null>(null);
  const [isGen, setIsGen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  const toggle = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const copy = (text: string, id: string) => {
    try { const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;top:-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); setCopied(id); setTimeout(() => setCopied(null), 2000); } catch (_) {}
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Creation</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Script Writer</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={() => setShowNotifs(!showNotifs)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors relative"><Bell size={15} /><div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <PenTool size={11} /> Write Script
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-4">
        {/* Config */}
        <D {...fade(0.05)}>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px] gap-3">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Topic</div>
                <div className="relative">
                  <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                  <input defaultValue="Python Automation for Beginners" className="w-full h-10 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-10 pr-3" />
                </div>
              </div>
              {[
                { label: "Tone", opts: ["Conversational", "Professional", "Energetic", "Educational"] },
                { label: "Length", opts: ["2-10 sec", "10-20 sec", "20-30 sec"] },
              ].map(f => (
                <div key={f.label}>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">{f.label}</div>
                  <select defaultValue={f.opts[0]} className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer">
                    {f.opts.map(o => <option key={o} value={o} style={{ background: "var(--popover)" }}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </D>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <D key={s.label} {...fade(0.1 + i * 0.05)}>
              <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between hover:border-[var(--surface-4)] transition-all">
                <span className="text-[11px] text-[var(--text-dim)]">{s.label}</span>
                <span className="font-mono text-lg font-extrabold tracking-tight" style={{ color: s.color }}>{s.value}</span>
              </div>
            </D>
          ))}
        </div>

        {/* Sections */}
        <D {...fade(0.25)}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex flex-wrap justify-between items-center px-5 py-4 border-b border-border gap-3">
              <div>
                <div className="text-sm font-bold text-foreground">Script Sections</div>
                <div className="text-[10px] text-[var(--text-dim)] mt-0.5">Python Automation for Beginners · 14:23</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowExport(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all flex items-center gap-1.5">
                  <Download size={11} /> Export
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2500); }}
                  className="h-8 px-3 rounded-lg text-[11px] font-medium text-primary border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all flex items-center gap-1.5">
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
                    className="w-full flex items-center gap-3 px-5 py-4 border-none cursor-pointer text-left transition-colors hover:bg-[var(--hover-overlay)]"
                    style={{ background: open ? "var(--subtle-overlay)" : "transparent" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${section.color}12`, border: `1px solid ${section.color}20` }}>
                      <Icon size={14} color={section.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{section.label}</span>
                        <span className="text-[10px] font-medium text-[var(--text-dim)] bg-[var(--surface-1)] px-2 py-0.5 rounded-full">{section.timing}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {open && (
                        <button onClick={e => { e.stopPropagation(); copy(section.content, section.id); }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-transparent text-[var(--text-dim)] border border-border cursor-pointer text-[10px] hover:text-foreground hover:border-[var(--surface-4)] transition-all">
                          {copied === section.id ? <Check size={10} /> : <Copy size={10} />}
                          {copied === section.id ? "Copied" : "Copy"}
                        </button>
                      )}
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} color="var(--text-dim)" />
                      </motion.div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1">
                          <div className="pl-4" style={{ borderLeft: `2px solid ${section.color}40` }}>
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
        </D>
      </div>
      <ExportModal open={showExport} onClose={() => setShowExport(false)} title="Export Script" />
      <NotificationPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
    </div>
  );
}