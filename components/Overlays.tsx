"use client";
import { useState } from "react";
import { Modal } from "./Modal";
import { Download, FileText, FileSpreadsheet, FileImage, Check, X, Bell, Clock, Sparkles, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   EXPORT MODAL
   ═══════════════════════════════════════════════ */
const formats = [
  { key: "pdf", label: "PDF Document", desc: "Best for sharing", icon: FileText, color: "#EF4444" },
  { key: "csv", label: "CSV Spreadsheet", desc: "For data analysis", icon: FileSpreadsheet, color: "#34D399" },
  { key: "png", label: "PNG Image", desc: "Visual snapshot", icon: FileImage, color: "#7C5CFC" },
];

export function ExportModal({ open, onClose, title = "Export Data" }: { open: boolean; onClose: () => void; title?: string }) {
  const [selected, setSelected] = useState("pdf");
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); setDone(true); setTimeout(() => { setDone(false); onClose(); }, 1200); }, 1500);
  };

  return (
    <Modal open={open} onClose={() => { onClose(); setDone(false); setExporting(false); }} title={title} subtitle="Choose your preferred format.">
      <div className="space-y-3 pt-2">
        {formats.map(f => (
          <button key={f.key} onClick={() => setSelected(f.key)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all text-left ${selected === f.key ? "border-primary bg-primary/5" : "border-border bg-transparent hover:bg-[var(--hover-overlay)]"}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}>
              <f.icon size={16} color={f.color} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-foreground">{f.label}</div>
              <div className="text-[10px] text-[var(--text-dim)]">{f.desc}</div>
            </div>
            {selected === f.key && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><Check size={10} color="white" /></div>}
          </button>
        ))}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 h-10 rounded-xl text-sm font-medium text-[var(--text-dim)] border border-border bg-transparent cursor-pointer hover:text-foreground transition-all">Cancel</button>
          <button onClick={handleExport} disabled={exporting || done}
            className="flex-1 h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
            style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
            {done ? <><Check size={13} /> Downloaded!</> : exporting ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Download size={13} /></motion.div> Exporting…</> : <><Download size={13} /> Export</>}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════
   NOTIFICATION PANEL
   ═══════════════════════════════════════════════ */
const notifications = [
  { id: 1, title: "Analysis Complete", desc: "Python Automation gap analysis finished — 12 opportunities found.", time: "2 min ago", icon: Target, color: "#7C5CFC", unread: true },
  { id: 2, title: "Script Generated", desc: "Your AI script for '7 Hidden AI Tools' is ready to review.", time: "15 min ago", icon: Sparkles, color: "#A855F7", unread: true },
  { id: 3, title: "New Opportunity", desc: "High-score gap detected: 'Rust for Web Dev' (Score 92).", time: "1 hr ago", icon: Zap, color: "#34D399", unread: true },
  { id: 4, title: "Weekly Digest", desc: "Your channel grew 18% this week. Check your analytics.", time: "5 hrs ago", icon: Clock, color: "#FBBF24", unread: false },
  { id: 5, title: "Video Rendered", desc: "Your video pack 'Python Automation' is ready to download.", time: "Yesterday", icon: Download, color: "#F472B6", unread: false },
];

export function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState(notifications);
  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const dismiss = (id: number) => setItems(prev => prev.filter(n => n.id !== id));
  const unreadCount = items.filter(n => n.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90]" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-14 right-5 z-[91] w-[380px] max-h-[480px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">Notifications</span>
                {unreadCount > 0 && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white">{unreadCount}</span>}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] font-medium text-primary bg-transparent border-none cursor-pointer hover:underline">Mark all read</button>
                )}
                <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-colors ml-1"><X size={14} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell size={24} color="var(--text-dim)" className="mb-3" />
                  <div className="text-sm font-medium text-foreground">All clear!</div>
                  <div className="text-[11px] text-[var(--text-dim)]">No notifications right now.</div>
                </div>
              ) : (
                items.map(n => (
                  <div key={n.id} className="flex gap-3 px-5 py-3.5 border-b border-border hover:bg-[var(--hover-overlay)] transition-colors relative"
                    style={{ background: n.unread ? "rgba(124,92,252,0.03)" : "transparent" }}>
                    {n.unread && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${n.color}12`, border: `1px solid ${n.color}20` }}>
                      <n.icon size={13} color={n.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium text-foreground">{n.title}</div>
                      <div className="text-[10px] text-[var(--text-dim)] leading-relaxed mt-0.5">{n.desc}</div>
                      <div className="text-[9px] text-[var(--text-dim)] mt-1">{n.time}</div>
                    </div>
                    <button onClick={() => dismiss(n.id)} className="w-6 h-6 rounded-md flex items-center justify-center bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                      style={{ opacity: 1 }}>
                      <X size={10} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
