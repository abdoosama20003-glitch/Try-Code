"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Sparkles, Heart, Download, Search, Check, Menu, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationPanel } from "./Overlays";
import { useSidebar } from "@/hooks/useSidebar";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

const concepts = [
  { id: 1, title: "Split Screen Shock", text: "I AUTOMATED EVERYTHING", colors: ["#EF4444", "#FFD60A", "#0A0A0A"], style: "High Contrast", emotion: "Surprise + Curiosity", ctr: "8.2%", layout: "Face left (shocked) | Code terminal right | Bold text top center" },
  { id: 2, title: "Before/After Reveal", text: "10 HRS → 30 SECONDS", colors: ["#6366F1", "#0F172A", "#FFFFFF"], style: "Minimal Tech", emotion: "FOMO + Aspiration", ctr: "7.8%", layout: "Split diagonal | Left: messy desk | Right: clean screen | Arrow center" },
  { id: 3, title: "Code Explosion", text: "5 SCRIPTS = FREE TIME", colors: ["#8B5CF6", "#F59E0B", "#111827"], style: "Dynamic Dark", emotion: "Excitement + Value", ctr: "7.4%", layout: "Dark bg | Code floating | Number 5 oversized | Face bottom right" },
  { id: 4, title: "Money Shot", text: "Python Saved Me $10K", colors: ["#10B981", "#065F46", "#ECFDF5"], style: "Clean Pro", emotion: "Greed + Proof", ctr: "9.1%", layout: "Green gradient | Dollar pattern | Screenshot proof | Pointing gesture" },
];

const ctrColor = (ctr: string) => parseFloat(ctr) >= 9 ? "#34D399" : parseFloat(ctr) >= 8 ? "#FBBF24" : "var(--text-dim)";

export function ThumbnailIdeas() {
  const [selected, setSelected] = useState<typeof concepts[0] | null>(concepts[0]);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [isGen, setIsGen] = useState(false);
  const [query, setQuery] = useState("Python Automation for Beginners");
  const [downloaded, setDownloaded] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Visual</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Thumbnail Ideas</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={() => setShowNotifs(!showNotifs)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors relative"><Bell size={15} /><div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2000); }}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <Image size={11} /> Generate Ideas
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-4">
        {/* Search */}
        <D {...fade(0.05)}>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
                <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && setIsGen(true)} placeholder="Enter your video topic…"
                  className="w-full h-10 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] pl-10 pr-3" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setIsGen(true); setTimeout(() => setIsGen(false), 2000); }}
                className="h-10 px-5 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center gap-2"
                style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)", opacity: isGen ? 0.7 : 1 }}>
                {isGen ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles size={13} /></motion.div> : <Sparkles size={13} />}
                {isGen ? "Generating…" : "Generate"}
              </motion.button>
            </div>
          </div>
        </D>

        {/* Grid + Detail */}
        <div className="flex flex-col xl:grid gap-3" style={{ gridTemplateColumns: selected ? "1fr 340px" : "1fr" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {concepts.map((c, i) => (
              <D key={c.id} {...fade(0.1 + i * 0.06)} onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className="bg-card border rounded-2xl cursor-pointer overflow-hidden transition-all hover:border-[var(--surface-4)]"
                style={{ borderColor: selected?.id === c.id ? "var(--primary)" : "var(--border)", background: selected?.id === c.id ? "rgba(124,92,252,0.04)" : "var(--card)" }}>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-sm font-bold text-foreground mb-0.5">{c.title}</div>
                      <div className="text-[9px] font-bold text-[var(--text-dim)] tracking-widest uppercase">{c.style}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={e => { e.stopPropagation(); }}
                        className="bg-transparent border-none cursor-pointer p-1 transition-colors hover:scale-110 text-[var(--text-dim)] hover:text-primary">
                        <Download size={14} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); setLiked(p => { const n = new Set(p); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; }); }}
                        className="bg-transparent border-none cursor-pointer p-1 transition-colors hover:scale-110"
                        style={{ color: liked.has(c.id) ? "#EF4444" : "var(--text-dim)" }}>
                        <Heart size={14} fill={liked.has(c.id) ? "#EF4444" : "none"} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: ctrColor(c.ctr) }}>CTR {c.ctr}</span>
                    <span className="text-[10px] text-[var(--text-dim)]">{c.emotion}</span>
                  </div>
                </div>
              </D>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-20">
                <div className="text-sm font-bold text-foreground mb-4">{selected.title}</div>
                <div className="h-px bg-border mb-5" />

                <div className="mb-4">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Headline Text</div>
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-border text-sm font-bold text-foreground">{selected.text}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-border">
                    <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">CTR Est.</div>
                    <div className="font-mono text-xl font-extrabold" style={{ color: ctrColor(selected.ctr) }}>{selected.ctr}</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-border">
                    <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">Style</div>
                    <div className="text-[12px] font-semibold text-foreground">{selected.style}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2">Emotional Hook</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)", color: "#A855F7" }}>{selected.emotion}</span>
                </div>

                <div className="mb-5">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Layout Brief</div>
                  <div className="px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-border text-[12px] text-[var(--secondary-foreground)] leading-relaxed">{selected.layout}</div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => { setDownloaded(true); setTimeout(() => setDownloaded(false), 2000); }}
                    className="h-10 px-5 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center gap-2"
                    style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                    {downloaded ? <Check size={13} /> : <Download size={13} />}
                    {downloaded ? "Downloaded!" : "Download Brief"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <NotificationPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
    </div>
  );
}