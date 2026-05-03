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
export function Card({ children, style, pad = 24, hover = false, active = false, onClick }: CardProps) {
  const base: CSSProperties = {
    background: "var(--card)",
    border: `1px solid ${active ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
    borderRadius: "var(--radius-card)",
    padding: typeof pad === "number" ? `${pad}px` : pad,
    boxShadow: "0 1px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)",
    transition: "border-color 0.18s, box-shadow 0.18s",
    cursor: onClick ? "pointer" : undefined,
    ...(active && { background: "var(--surface-2)", boxShadow: "0 2px 8px rgba(99,102,241,0.12), 0 1px 3px rgba(0,0,0,0.35)" }),
    ...style,
  };

  if (hover) {
    return (
      <div
        style={base}
        onClick={onClick}
        onMouseEnter={(e: React.MouseEvent<any>) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e: React.MouseEvent<any>) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = active ? "rgba(99,102,241,0.35)" : "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = active ? "0 2px 8px rgba(99,102,241,0.12), 0 1px 3px rgba(0,0,0,0.35)" : "0 1px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)";
        }}
      >
        {children}
      </div>
    );
  }
  return <div style={base} onClick={onClick}>{children}</div>;
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
    <div style={{ display: "flex", alignItems: compact ? "center" : "flex-start", justifyContent: "space-between", gap: 12, marginBottom: compact ? 16 : 20 }}>
      <div>
        {label && (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>
            {label}
          </div>
        )}
        <div style={{ fontFamily: "var(--font-sans)", fontSize: compact ? "var(--text-sm)" : "var(--text-base)", fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {title}
        </div>
        {description && (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dim)", marginTop: 3, lineHeight: 1.5 }}>
            {description}
          </div>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.04em" }}>
            {label}
          </div>
          {Icon && (
            <div style={{ width: 30, height: 30, borderRadius: "var(--radius)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={13} color={iconColor} />
            </div>
          )}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 10 }}>
          {value}
        </div>
        {change && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: changeUp ? "var(--neon-emerald)" : "var(--neon-red)" }}>
              {changeUp ? "↑" : "↓"} {change}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-dim)" }}>vs last month</span>
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
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      {prefix && <div style={{ position: "absolute", left: 11, zIndex: 1, pointerEvents: "none", color: "var(--text-dim)", display: "flex", alignItems: "center" }}>{prefix}</div>}
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          height: 38,
          paddingLeft: prefix ? 34 : 12,
          paddingRight: suffix ? 34 : 12,
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-button)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          ...style,
        }}
        onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 2px var(--ring)"; }}
        onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
      />
      {suffix && <div style={{ position: "absolute", right: 11, zIndex: 1, pointerEvents: "none", color: "var(--text-dim)", display: "flex", alignItems: "center" }}>{suffix}</div>}
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
      style={{
        width: "100%",
        padding: "10px 12px",
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-button)",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        outline: "none",
        resize: "vertical",
        lineHeight: 1.6,
        transition: "border-color 0.15s, box-shadow 0.15s",
        ...style,
      }}
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
      style={{
        width: "100%",
        height: 38,
        padding: "0 12px",
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-button)",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        outline: "none",
        cursor: "pointer",
        transition: "border-color 0.15s",
        ...style,
      }}
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
export function Button({ children, variant = "secondary", size = "md", onClick, disabled, icon: Icon, iconRight: IconRight, style, type = "button" }: ButtonProps) {
  const variants: Record<BtnVariant, CSSProperties> = {
    primary:   { background: "var(--foreground)", color: "var(--background)", border: "1px solid transparent" },
    secondary: { background: "var(--surface-2)", color: "var(--muted-foreground)", border: "1px solid var(--border)" },
    ghost:     { background: "transparent", color: "var(--muted-foreground)", border: "1px solid transparent" },
    danger:    { background: "rgba(239,68,68,0.08)", color: "var(--neon-red)", border: "1px solid rgba(239,68,68,0.20)" },
  };
  const sizes: Record<"sm"|"md"|"lg", CSSProperties> = {
    sm: { height: 30, padding: "0 12px", fontSize: "11px", borderRadius: "var(--radius)" },
    md: { height: 36, padding: "0 16px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-button)" },
    lg: { height: 44, padding: "0 24px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-button)" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center",
        fontFamily: "var(--font-sans)", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "opacity 0.15s, background 0.15s, border-color 0.15s, transform 0.1s",
        whiteSpace: "nowrap",
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseEnter={(e: React.MouseEvent<any>) => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
      onMouseLeave={(e: React.MouseEvent<any>) => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      onMouseDown={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
      onMouseUp={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
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
  success: { bg: "rgba(16,185,129,0.10)", color: "var(--neon-emerald)", dot: "var(--neon-emerald)" },
  warning: { bg: "rgba(245,158,11,0.10)", color: "var(--neon-amber)", dot: "var(--neon-amber)" },
  danger:  { bg: "rgba(239,68,68,0.10)", color: "var(--neon-red)", dot: "var(--neon-red)" },
  info:    { bg: "rgba(6,182,212,0.10)", color: "var(--neon-cyan)", dot: "var(--neon-cyan)" },
  purple:  { bg: "rgba(139,92,246,0.10)", color: "var(--neon-purple)", dot: "var(--neon-purple)" },
};
export function Badge({ children, variant = "default", dot = false }: BadgeProps) {
  const c = badgeColors[variant];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: "var(--radius)", background: c.bg, color: c.color, fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {dot && c.dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

// ─── Label ──────────────────────────────────────────────────────
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 6 }}>
      {children}
    </div>
  );
}

// ─── Divider ────────────────────────────────────────────────────
export function Divider({ style }: { style?: CSSProperties }) {
  return <div style={{ height: 1, background: "var(--border)", ...style }} />;
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center", gap: 12 }}>
      {Icon && (
        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-card)", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
          <Icon size={20} color="var(--text-dim)" />
        </div>
      )}
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)" }}>{title}</div>
      {description && <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--text-dim)", maxWidth: 280, lineHeight: 1.6 }}>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

// ─── Row divider with label ──────────────────────────────────────
export function DividerLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.05em" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
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
      style={{
        width: 36, height: 20,
        borderRadius: 10,
        background: checked ? "var(--primary)" : "var(--surface-3)",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: 2,
        left: checked ? 18 : 2,
        width: 16, height: 16,
        borderRadius: "50%",
        background: "white",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}

// ─── Score Bar ──────────────────────────────────────────────────
export function MiniBar({ value, color = "var(--primary)", height = 3 }: { value: number; color?: string; height?: number }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height, background: "var(--surface-3)", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: height, transition: "width 0.6s ease" }} />
    </div>
  );
}
