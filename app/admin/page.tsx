"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "admin@autotube.io" && password === "AutoTube@2026") {
        localStorage.setItem("at-admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(124,92,252,0.08) 0%, transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite" }}>
              <Shield size={24} color="white" />
            </div>
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">Admin Access</h1>
          <p className="text-[12px] text-[var(--text-dim)] mt-1">AutoTube Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Admin Email</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@autotube.io" required
              className="w-full h-10 px-3 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">Password</div>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" required
                className="w-full h-10 px-3 pr-10 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)]" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-foreground">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          {error && <div className="text-[11px] text-[#EF4444] font-medium">{error}</div>}
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
            className="w-full h-10 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
            {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Lock size={14} /></motion.div> : <Lock size={14} />}
            {loading ? "Verifying…" : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
