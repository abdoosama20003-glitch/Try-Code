"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film, Sparkles, Search, Copy, Check, Play, RefreshCw, Download, MonitorPlay, Video, Clapperboard
} from "lucide-react";
import { TopBar } from "./TopBar";

const D = motion.create("div" as any);

export function VideoGenerator() {
  const [input, setInput] = useState("");
  const [isGen, setIsGen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const generate = () => { setIsGen(true); setTimeout(() => { setIsGen(false); setActiveVideo("rendered"); }, 2500); };

  return (
    <>
      <TopBar label="Creation" title="Video Generator" subtitle="Transform content packs into ready-to-publish videos with AI avatars and voiceovers" actionLabel="Generate Video" actionIcon={Film} onAction={generate} />

      <div className="flex-1 overflow-auto md:overflow-hidden px-4 md:px-7 pt-5 pb-4 md:pb-0 flex flex-col md:flex-row gap-[14px] bg-background min-h-0">
        
        {/* Left panel */}
        <div className="w-full md:w-[280px] shrink-0 flex flex-col gap-[10px] overflow-y-auto md:pb-6">
          <div className="bg-card border border-border rounded-lg shadow-sm p-4">
            <div className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)] mb-[10px]">Select Content Pack</div>
            <div className="flex flex-col gap-3">
              <div>
                <select className="w-full h-[38px] px-3 bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] appearance-none cursor-pointer">
                  <option>Python Automation for Beginners</option>
                  <option>7 Hidden AI Tools</option>
                </select>
              </div>

              <div className="h-px bg-border my-1" />

              <div className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)] mb-[2px]">Avatar Style</div>
              <div className="grid grid-cols-2 gap-2">
                {["Realistic", "Anime", "3D Render", "Faceless"].map((s, i) => (
                  <button key={s} className="px-[10px] py-[8px] rounded-sm text-[11px] font-medium cursor-pointer transition-all border border-border bg-[var(--surface-1)] text-[var(--text-dim)] hover:bg-[var(--hover-overlay)] hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-bold tracking-[0.10em] uppercase text-[var(--text-dim)] mb-[2px] mt-1">Video Description</div>
              <textarea placeholder="Describe how you want the video to look and feel..." className="w-full min-h-[80px] p-3 bg-[var(--surface-1)] border border-border rounded-md text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] resize-none" />

              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={isGen}
                className="mt-2 inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-primary text-primary-foreground shadow-[var(--glow-primary-sm)] hover:opacity-90 hover:shadow-[var(--glow-primary)] h-10 w-full disabled:opacity-40 disabled:pointer-events-none">
                {isGen ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw size={12} /></motion.div>Rendering…</> : <><Sparkles size={12} />Generate Video</>}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 flex flex-col pb-6 overflow-hidden">
          <div className="bg-card border border-border rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="px-5 py-[14px] border-b border-border flex items-center justify-between gap-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">Python Automation for Beginners</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider whitespace-nowrap bg-emerald-500/10 text-emerald-500">Ready</span>
                </div>
                <span className="text-[10px] text-[var(--text-dim)]">14:23 duration · 1080p60</span>
              </div>
              <div className="flex gap-1.5">
                <button className="inline-flex items-center justify-center gap-1.5 font-semibold text-sm rounded-md transition-all bg-secondary text-muted-foreground border border-border hover:bg-[var(--surface-3)] hover:text-foreground hover:border-[var(--surface-4)] h-[28px] px-[10px] text-[11px]">
                  <Download size={10} /> Download MP4
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[var(--surface-0)] relative">
              {activeVideo ? (
                <div className="w-full max-w-3xl aspect-video rounded-xl border border-border bg-black relative overflow-hidden flex items-center justify-center shadow-lg group">
                  <MonitorPlay size={48} color="rgba(255,255,255,0.2)" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-[var(--glow-primary)] transition-transform hover:scale-105">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] flex items-center justify-center mb-4 border border-border">
                    <Clapperboard size={24} color="var(--text-dim)" />
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">No Video Rendered</div>
                  <div className="text-[11px] text-[var(--text-dim)] max-w-[260px]">Configure your settings on the left and click Generate Video to start rendering.</div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
