"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Rates", href: "#testimonials" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "py-0" : "py-3 px-4"}`}>
          <nav
            className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? "max-w-full rounded-none px-8 py-3 border-b border-border bg-background/90"
                : "max-w-6xl rounded-2xl px-5 py-2.5 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            }`}
            style={{
              backdropFilter: "blur(24px) saturate(1.8)",
              WebkitBackdropFilter: "blur(24px) saturate(1.8)",
            }}
          >
            {/* Logo */}
            <motion.a
              href="/"
              onClick={(e) => { e.preventDefault(); router.push("/"); }}
              className="flex items-center gap-2.5 cursor-pointer shrink-0 no-underline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                animate={{ rotate: scrolled ? 0 : 0 }}
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <LogoMark size={28} />
              </motion.div>
              <span className="font-heading font-bold text-foreground text-[15px] tracking-tight">
                AutoTube
              </span>
            </motion.a>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors cursor-pointer"
                  style={{
                    color: hoveredLink === link.label ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Hover pill background */}
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-lg bg-[var(--hover-overlay-md)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <motion.button
                onClick={() => router.push("/login")}
                className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer px-3 py-1.5 rounded-lg transition-colors"
                whileHover={{ y: -1 }}
              >
                Log in
              </motion.button>

              <motion.button
                onClick={() => router.push("/signup")}
                className="hidden md:inline-flex items-center gap-1.5 h-9 px-5 rounded-[100px] text-[13px] font-semibold text-white border-none cursor-pointer"
                style={{
                  background: "var(--gradient-aurora)",
                  backgroundSize: "200% 200%",
                  animation: "at-gradient-shift 4s ease infinite",
                  boxShadow: "var(--glow-primary-sm)",
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(124,92,252,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                Get started <ArrowRight size={13} />
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground bg-transparent border border-border cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-[210] bg-[var(--surface-0)] border-l border-border p-7 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2.5">
                  <LogoMark size={24} />
                  <span className="font-heading font-bold text-sm text-foreground">AutoTube</span>
                </div>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent border-none text-muted-foreground cursor-pointer hover:bg-[var(--hover-overlay-md)]"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-lg hover:bg-[var(--hover-overlay)] no-underline"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full text-foreground text-sm font-medium h-12 rounded-xl border border-border hover:bg-[var(--hover-overlay)] transition-colors cursor-pointer bg-transparent"
                >
                  Log in
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="w-full text-sm font-bold h-12 rounded-xl border-none cursor-pointer text-white transition-all hover:scale-[0.98]"
                  style={{
                    background: "var(--gradient-aurora)",
                    backgroundSize: "200% 200%",
                    animation: "at-gradient-shift 4s ease infinite",
                    boxShadow: "var(--glow-primary-sm)",
                  }}
                >
                  Get started →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}