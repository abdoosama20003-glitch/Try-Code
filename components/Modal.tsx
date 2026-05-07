"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export function Modal({ open, onClose, title, subtitle, children, width = "max-w-lg" }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative bg-card border border-border rounded-2xl shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
            {(title || subtitle) && (
              <div className="flex items-start justify-between p-6 pb-0">
                <div>
                  {title && <div className="text-base font-bold text-foreground">{title}</div>}
                  {subtitle && <div className="text-[11px] text-[var(--text-dim)] mt-0.5">{subtitle}</div>}
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-foreground hover:bg-[var(--hover-overlay)] transition-colors">
                  <X size={15} />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalField({ label, type = "text", placeholder, value, onChange, disabled }: { label: string; type?: string; placeholder?: string; value?: string; onChange?: (v: string) => void; disabled?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">{label}</div>
      <input type={type} placeholder={placeholder} defaultValue={value} disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50" />
    </div>
  );
}
