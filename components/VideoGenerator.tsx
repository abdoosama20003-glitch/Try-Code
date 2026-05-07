"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Film, Sparkles, Copy, Check, Play, RefreshCw, Download, MonitorPlay, Clapperboard, Menu, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ExportModal, NotificationPanel } from "./Overlays";
import { useSidebar } from "@/context/SidebarContext";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16, 1, 0.3, 1] } });

export function VideoGenerator() {
  const [isGen, setIsGen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  const generate = () => { setIsGen(true); setTimeout(() => { setIsGen(false); setActiveVideo("rendered"); }, 2500); };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-14 px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-transparent text-[var(--text-dim)] cursor-pointer"><Menu size={16} /></button>
            <div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-0.5">Creation</div>
              <h1 className="font-heading font-bold text-base text-foreground tracking-tight m-0">Video Generator</h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button onClick={() => setShowNotifs(!showNotifs)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:bg-[var(--hover-overlay)] transition-colors relative"><Bell size={15} /><div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={generate}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[11px] font-bold text-white border-none cursor-pointer ml-1"
              style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
              <Film size={11} /> Generate Video
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 md:px-8 pt-5 pb-6 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Left panel */}
        <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-3">
          <D {...fade(0.05)}>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2">Avatar Style</div>
                <div className="grid grid-cols-2 gap-2">
                  {["Realistic", "Anime", "3D Render", "Faceless"].map(s => (
                    <button key={s} className="px-3 py-2 rounded-xl text-[11px] font-medium cursor-pointer transition-all border border-border bg-[var(--surface-1)] text-[var(--text-dim)] hover:bg-[var(--hover-overlay)] hover:text-foreground hover:border-[var(--surface-4)]">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2">Voiceover (Max 30s)</div>
                <select className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer">
                  <option>Marcus (Energetic)</option>
                  <option>Sarah (Professional)</option>
                  <option>James (Narrator)</option>
                </select>
              </div>

              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2">Video Description</div>
                <textarea placeholder="Describe how you want the video to look and feel..." className="w-full min-h-[80px] p-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] resize-none" />
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={isGen}
                className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
                style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                {isGen ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={13} /></motion.div>Rendering…</> : <><Sparkles size={13} />Generate Video</>}
              </motion.button>
            </div>
          </D>
        </div>

        {/* Right panel */}
        <D {...fade(0.12)} className="flex-1 min-w-0 flex flex-col">
          <div className="bg-card border border-border rounded-2xl flex flex-col flex-1 overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-foreground truncate">Python Automation for Beginners</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]">Ready</span>
                </div>
                <span className="text-[10px] text-[var(--text-dim)]">14:23 duration · 1080p60</span>
              </div>
              <button onClick={() => setShowExport(true)} className="h-8 px-3 rounded-lg text-[11px] font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-all flex items-center gap-1.5">
                <Download size={11} /> Download MP4
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[var(--surface-0)] relative">
              {activeVideo ? (
                <div className="w-full max-w-3xl aspect-video rounded-2xl border border-border bg-black relative overflow-hidden flex items-center justify-center shadow-lg group">
                  <MonitorPlay size={48} color="rgba(255,255,255,0.2)" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105"
                      style={{ background: "var(--gradient-aurora)", boxShadow: "var(--glow-primary)" }}>
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center mb-4 border border-border">
                    <Clapperboard size={24} color="var(--text-dim)" />
                  </div>
                  <div className="text-sm font-bold text-foreground mb-1">No Video Rendered</div>
                  <div className="text-[11px] text-[var(--text-dim)] max-w-[260px]">Configure your settings and click Generate Video to start rendering.</div>
                </div>
              )}
            </div>
          </div>
        </D>
      </div>
      <ExportModal open={showExport} onClose={() => setShowExport(false)} title="Download Video" />
      <NotificationPanel open={showNotifs} onClose={() => setShowNotifs(false)} />
    </div>
  );
}
