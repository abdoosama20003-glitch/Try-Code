"use client";
/**
 * AutoTube Design Primitives
 * Shared, reusable building blocks that enforce the design system.
 */
import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

// ─── motion wrappers ────────────────────────────────────────────
export const Div = motion.create("div" as any);

// ─── Card ───────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  pad?: number | string;
  hover?: boolean;
  active?: boolean;
  onClick?: () => void;
}
export function Card({ children, style, className = "", pad = 24, hover = false, active = false, onClick }: CardProps) {
  const base = [
    "bg-card rounded-lg shadow-elevation-sm transition-[border-color,box-shadow] duration-[180ms]",
    active
      ? "border border-[rgba(99,102,241,0.35)] bg-[var(--surface-2)] shadow-[0_2px_8px_rgba(99,102,241,0.12),0_1px_3px_rgba(0,0,0,0.35)]"
      : "border border-border",
    onClick ? "cursor-pointer" : "",
    className,
  ].join(" ");

  const paddingStyle: CSSProperties = { padding: typeof pad === "number" ? `${pad}px` : pad, ...style };

  if (hover) {
    return (
      <div
        className={base}
        style={paddingStyle}
        onClick={onClick}
        onMouseEnter={(e: React.MouseEvent<any>) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e: React.MouseEvent<any>) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = active ? "rgba(99,102,241,0.35)" : "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = active
            ? "0 2px 8px rgba(99,102,241,0.12), 0 1px 3px rgba(0,0,0,0.35)"
            : "0 1px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)";
        }}
      >
        {children}
      </div>
    );
  }
  return <div className={base} style={paddingStyle} onClick={onClick}>{children}</div>;
}

// ─── Section Header ─────────────────────────────────────────────
interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}
export function SectionHeader({ label, title, description, action, compact = false }: SectionHeaderProps) {
  return (
    <div className={`flex ${compact ? "items-center" : "items-start"} justify-between gap-3 ${compact ? "mb-4" : "mb-5"}`}>
      <div>
        {label && (
          <div className="text-[10px] font-bold tracking-[0.11em] uppercase text-[var(--text-dim)] mb-1">
            {label}
          </div>
        )}
        <div className={`font-semibold text-foreground tracking-[-0.01em] leading-[1.3] ${compact ? "text-sm" : "text-base"}`}>
          {title}
        </div>
        {description && (
          <div className="text-[11px] text-[var(--text-dim)] mt-[3px] leading-[1.5]">
            {description}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  icon?: React.ElementType;
  iconColor?: string;
  delay?: number;
}
export function StatCard({ label, value, change, changeUp = true, icon: Icon, iconColor = "var(--primary)", delay = 0 }: StatCardProps) {
  return (
    <Div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
    >
      <Card hover>
        <div className="flex justify-between items-start mb-4">
          <div className="text-[11px] font-semibold text-[var(--text-dim)] tracking-[0.04em]">
            {label}
          </div>
          {Icon && (
            <div className="w-[30px] h-[30px] rounded-sm bg-[rgba(255,255,255,0.03)] border border-border flex items-center justify-center">
              <Icon size={13} color={iconColor} />
            </div>
          )}
        </div>
        <div className="font-mono text-2xl font-extrabold text-foreground tracking-[-0.04em] leading-none mb-[10px]">
          {value}
        </div>
        {change && (
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold" style={{ color: changeUp ? "var(--neon-emerald)" : "var(--neon-red)" }}>
              {changeUp ? "↑" : "↓"} {change}
            </span>
            <span className="text-[10px] text-[var(--text-dim)]">vs last month</span>
          </div>
        )}
      </Card>
    </Div>
  );
}

// ─── Input ──────────────────────────────────────────────────────
interface InputProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  style?: CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  type?: string;
  defaultValue?: string;
}
export function Input({ value, onChange, placeholder, prefix, suffix, style, onKeyDown, type = "text", defaultValue }: InputProps) {
  return (
    <div className="relative flex items-center">
      {prefix && (
        <div className="absolute left-[11px] z-[1] pointer-events-none text-[var(--text-dim)] flex items-center">
          {prefix}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        className="w-full h-[38px] bg-[var(--surface-1)] border border-border rounded-md text-foreground font-sans text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_var(--ring)]"
        style={{
          paddingLeft: prefix ? 34 : 12,
          paddingRight: suffix ? 34 : 12,
          ...style,
        }}
        onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 2px var(--ring)"; }}
        onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
      />
      {suffix && (
        <div className="absolute right-[11px] z-[1] pointer-events-none text-[var(--text-dim)] flex items-center">
          {suffix}
        </div>
      )}
    </div>
  );
}

// ─── Textarea ───────────────────────────────────────────────────
interface TextareaProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  style?: CSSProperties;
}
export function Textarea({ value, onChange, placeholder, rows = 4, style }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-[10px] bg-[var(--surface-1)] border border-border rounded-md text-foreground font-sans text-sm outline-none resize-y leading-[1.6] transition-[border-color,box-shadow] duration-150"
      style={style}
      onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 2px var(--ring)"; }}
      onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
    />
  );
}

// ─── Select ─────────────────────────────────────────────────────
interface SelectProps {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  style?: CSSProperties;
  defaultValue?: string;
}
export function Select({ options, value, onChange, style, defaultValue }: SelectProps) {
  return (
    <select
      value={value}
      defaultValue={defaultValue}
      onChange={e => onChange?.(e.target.value)}
      className="w-full h-[38px] px-3 bg-[var(--surface-1)] border border-border rounded-md text-foreground font-sans text-sm outline-none cursor-pointer transition-[border-color] duration-150"
      style={style}
      onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 2px var(--ring)"; }}
      onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o} value={o} style={{ background: "var(--popover)" }}>{o}</option>)}
    </select>
  );
}

// ─── Button ─────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "ghost" | "danger";
interface ButtonProps {
  children: ReactNode;
  variant?: BtnVariant;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ElementType;
  iconRight?: React.ElementType;
  style?: CSSProperties;
  type?: "button" | "submit";
}

const variantClasses: Record<BtnVariant, string> = {
  primary:   "bg-foreground text-background border border-transparent",
  secondary: "bg-[var(--surface-2)] text-muted-foreground border border-border",
  ghost:     "bg-transparent text-muted-foreground border border-transparent",
  danger:    "bg-[rgba(239,68,68,0.08)] text-[var(--neon-red)] border border-[rgba(239,68,68,0.20)]",
};

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[30px] px-3 text-[11px] rounded-sm",
  md: "h-9 px-4 text-sm rounded-md",
  lg: "h-11 px-6 text-sm rounded-md",
};

export function Button({ children, variant = "secondary", size = "md", onClick, disabled, icon: Icon, iconRight: IconRight, style, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center gap-1.5 justify-center font-semibold font-sans whitespace-nowrap transition-[opacity,background,border-color,transform] duration-150",
        variantClasses[variant],
        sizeClasses[size],
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:opacity-85 active:scale-[0.98]",
      ].join(" ")}
      style={style}
    >
      {Icon && <Icon size={size === "sm" ? 11 : 13} />}
      {children}
      {IconRight && <IconRight size={size === "sm" ? 11 : 13} />}
    </button>
  );
}

// ─── Badge ──────────────────────────────────────────────────────
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple";
interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
}
const badgeColors: Record<BadgeVariant, { bg: string; color: string; dot?: string }> = {
  default: { bg: "rgba(255,255,255,0.06)", color: "var(--muted-foreground)" },
  success: { bg: "rgba(16,185,129,0.10)",  color: "var(--neon-emerald)", dot: "var(--neon-emerald)" },
  warning: { bg: "rgba(245,158,11,0.10)",  color: "var(--neon-amber)",   dot: "var(--neon-amber)"   },
  danger:  { bg: "rgba(239,68,68,0.10)",   color: "var(--neon-red)",     dot: "var(--neon-red)"     },
  info:    { bg: "rgba(6,182,212,0.10)",   color: "var(--neon-cyan)",    dot: "var(--neon-cyan)"    },
  purple:  { bg: "rgba(139,92,246,0.10)",  color: "var(--neon-purple)",  dot: "var(--neon-purple)"  },
};
export function Badge({ children, variant = "default", dot = false }: BadgeProps) {
  const c = badgeColors[variant];
  return (
    <span
      className="inline-flex items-center gap-[5px] px-2 py-[2px] rounded-sm text-[10px] font-semibold tracking-[0.02em] whitespace-nowrap"
      style={{ background: c.bg, color: c.color }}
    >
      {dot && c.dot && <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: c.dot }} />}
      {children}
    </span>
  );
}

// ─── Label ──────────────────────────────────────────────────────
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold tracking-[0.09em] uppercase text-[var(--text-dim)] mb-1.5">
      {children}
    </div>
  );
}

// ─── Divider ────────────────────────────────────────────────────
export function Divider({ style }: { style?: CSSProperties }) {
  return <div className="h-px bg-border" style={style} />;
}

// ─── Empty State ────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: ReactNode;
}
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-[60px] text-center gap-3">
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-[var(--surface-2)] border border-border flex items-center justify-center mb-1">
          <Icon size={20} color="var(--text-dim)" />
        </div>
      )}
      <div className="text-sm font-semibold text-foreground">{title}</div>
      {description && (
        <div className="text-xs text-[var(--text-dim)] max-w-[280px] leading-[1.6]">{description}</div>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ─── Row divider with label ──────────────────────────────────────
export function DividerLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <span className="text-[10px] font-semibold text-[var(--text-dim)] tracking-[0.05em]">{children}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Toggle Switch ──────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}
export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative w-9 h-5 rounded-[10px] border-none cursor-pointer shrink-0 p-0 transition-colors duration-200"
      style={{ background: checked ? "var(--primary)" : "var(--surface-3)" }}
    >
      <div
        className="absolute top-[2px] w-4 h-4 rounded-full bg-white transition-[left] duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
        style={{ left: checked ? 18 : 2 }}
      />
    </button>
  );
}

// ─── Score Bar ──────────────────────────────────────────────────
export function MiniBar({ value, color = "var(--primary)", height = 3 }: { value: number; color?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden" style={{ height, borderRadius: height, background: "var(--surface-3)" }}>
      <div
        className="h-full transition-[width] duration-[600ms] ease-out"
        style={{ width: `${value}%`, background: color, borderRadius: height }}
      />
    </div>
  );
}
