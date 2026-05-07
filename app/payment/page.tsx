"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Lock, ArrowLeft, Check, Shield, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoMark } from "@/components/LogoMark";

const D = motion.create("div" as any);
const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] } });

function Field({ label, placeholder, type = "text", half = false }: { label: string; placeholder: string; type?: string; half?: boolean }) {
  return (
    <div className={half ? "flex-1" : ""}>
      <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1.5">{label}</div>
      <input type={type} placeholder={placeholder}
        className="w-full h-11 px-4 bg-[var(--surface-1)] border border-border rounded-xl text-foreground text-sm outline-none placeholder:text-muted-foreground hover:border-[var(--surface-4)] focus:border-primary focus:ring-2 focus:ring-[var(--ring)] transition-all" />
    </div>
  );
}

const plans = [
  { name: "Starter", price: "$0", period: "forever", features: ["5 gap analyses / month", "3 video packs", "Basic scripts"] },
  { name: "Pro", price: "$29", period: "/month", features: ["500 analyses / month", "200 video packs", "Advanced scripts", "Priority support"], popular: true },
  { name: "Agency", price: "$99", period: "/month", features: ["Unlimited everything", "Custom AI models", "Team workspace", "Dedicated manager"] },
];

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const currentPlan = plans.find(p => p.name === selectedPlan)!;

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setDone(true); setTimeout(() => router.push("/dashboard"), 1500); }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Aurora orbs */}
      <div className="at-aurora-orb" style={{ width: 500, height: 500, top: -150, right: -150, background: "rgba(124,92,252,0.08)" }} />
      <div className="at-aurora-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: "rgba(168,85,247,0.05)", animationDelay: "-4s" }} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between h-16 px-6 md:px-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-foreground bg-transparent border-none cursor-pointer transition-colors">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-2.5">
          <LogoMark size={22} />
          <span className="font-heading font-bold text-foreground text-sm tracking-tight">AutoTube</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 py-10 md:py-16">
        <D {...fade(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)] border border-[var(--border-active)] mb-4">
            <Lock size={10} className="text-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">Secure Checkout</span>
          </div>
          <h1 className="font-heading font-extrabold text-foreground tracking-tight mb-2" style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
            Complete your subscription
          </h1>
          <p className="text-sm text-[var(--text-dim)]">Your payment is encrypted and secure.</p>
        </D>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT — Payment Form */}
          <D {...fade(0.1)} className="lg:col-span-3 space-y-5">
            {/* Plan selector */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-sm font-bold text-foreground mb-4">Select Plan</div>
              <div className="grid grid-cols-3 gap-3">
                {plans.map(p => (
                  <button key={p.name} onClick={() => setSelectedPlan(p.name)}
                    className={`relative p-4 rounded-xl text-left cursor-pointer transition-all border ${selectedPlan === p.name ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]" : "border-border bg-transparent hover:border-[var(--surface-4)]"}`}>
                    {p.popular && <span className="absolute -top-2 right-3 text-[8px] font-bold px-2 py-0.5 rounded-full bg-primary text-white">POPULAR</span>}
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-dim)] mb-1">{p.name}</div>
                    <div className="font-mono font-extrabold text-foreground text-lg">{p.price}</div>
                    <div className="text-[10px] text-[var(--text-dim)]">{p.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card details */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={15} className="text-primary" />
                <div className="text-sm font-bold text-foreground">Card Details</div>
              </div>
              <div className="space-y-4">
                <Field label="Cardholder Name" placeholder="John Doe" />
                <Field label="Card Number" placeholder="4242 4242 4242 4242" />
                <div className="flex gap-3">
                  <Field label="Expiry Date" placeholder="MM / YY" half />
                  <Field label="CVC" placeholder="123" half />
                </div>
              </div>
            </div>

            {/* Billing address */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-sm font-bold text-foreground mb-5">Billing Address</div>
              <div className="space-y-4">
                <Field label="Address Line 1" placeholder="123 Creator St" />
                <div className="flex gap-3">
                  <Field label="City" placeholder="San Francisco" half />
                  <Field label="ZIP / Postal" placeholder="94102" half />
                </div>
                <Field label="Country" placeholder="United States" />
              </div>
            </div>
          </D>

          {/* RIGHT — Order Summary */}
          <D {...fade(0.2)} className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="text-sm font-bold text-foreground mb-5">Order Summary</div>

              <div className="space-y-3 pb-4 border-b border-border mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--text-dim)]">AutoTube {currentPlan.name}</span>
                  <span className="text-sm font-bold text-foreground">{currentPlan.price}{currentPlan.period !== "forever" ? currentPlan.period : ""}</span>
                </div>
                {currentPlan.name !== "Starter" && (
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-dim)]">Billed monthly</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.2)] text-[#34D399]">Save 20% yearly</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-5">
                {currentPlan.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0"><Check size={8} color="white" /></div>
                    <span className="text-[12px] text-[var(--text-dim)]">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline py-3 border-t border-border mb-5">
                <span className="text-sm font-bold text-foreground">Total today</span>
                <span className="font-mono font-extrabold text-foreground text-xl">{currentPlan.price}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={processing || done}
                className="w-full h-12 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--gradient-aurora)", backgroundSize: "200% 200%", animation: "at-gradient-shift 4s ease infinite", boxShadow: "var(--glow-primary-sm)" }}>
                {done ? <><Check size={14} /> Payment Successful!</> : processing ? <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Processing...</> : <><Lock size={13} /> Subscribe Now</>}
              </motion.button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-[var(--text-dim)]">
                <Shield size={10} /> 256-bit SSL · Stripe Secure
              </div>
            </div>
          </D>
        </div>
      </div>
    </div>
  );
}
