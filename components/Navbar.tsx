"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useSpring, useTransform, useMotionValue, animate, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

/** Gradient separator line — from the Figma design */
function GradientLine() {
  return (
    <div style={{ height: "1.5px", width: "100%", position: "relative", flexShrink: 0 }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 960 1.50263"
      >
        <path d="M960 0H0V1.50263H960V0Z" fill="url(#navbar-gradient-line)" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="navbar-gradient-line" x1="0" x2="960" y1="0" y2="0">
            <stop stopColor="#7C60FF" stopOpacity="0" />
            <stop offset="0.3" stopColor="#7C60FF" />
            <stop offset="0.7" stopColor="#9B80FF" />
            <stop offset="1" stopColor="#9B80FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const navLinks = [
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

const SCROLL_THRESHOLD = 60;

export function Navbar() {
  const navigate = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Spring config — snappy but smooth */
  const spring = { type: "spring", stiffness: 320, damping: 32, mass: 0.8 };

  return (
    /* Fixed full-viewport-width slot */
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Animated outer wrapper — drives horizontal expansion */}
      <motion.div
        initial={false}
        animate={scrolled
          ? { paddingTop: 0, paddingLeft: 0, paddingRight: 0 }
          : { paddingTop: 12, paddingLeft: 16, paddingRight: 16 }
        }
        transition={spring}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* Animated inner bar */}
        <motion.div
          initial={false}
          animate={scrolled
            ? {
                maxWidth: "100%",
                borderRadius: 0,
                background: "color-mix(in srgb, var(--background) 96%, transparent)",
                boxShadow: "0 1px 0 var(--border), var(--elevation-md)",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 32,
                paddingRight: 32,
              }
            : {
                maxWidth: 1100,
                borderRadius: 12,
                background: "color-mix(in srgb, var(--surface-1) 78%, transparent)",
                boxShadow: "var(--elevation-md)",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
              }
          }
          transition={spring}
          style={{
            pointerEvents: "auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            backdropFilter: "blur(20px) saturate(1.6)",
            WebkitBackdropFilter: "blur(20px) saturate(1.6)",
            border: scrolled ? "none" : "1px solid var(--border)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Animated bottom border accent that fades in when scrolled */}
          <motion.div
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: 1,
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />

          {/* Logo + wordmark */}
          <motion.button
            onClick={() => navigate.push("/")}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={{ scale: scrolled ? 0.88 : 1 }}
              transition={spring}
            >
              <LogoMark size={30} />
            </motion.div>
            <motion.span
              animate={{
                fontSize: scrolled ? "13px" : "14px",
                letterSpacing: scrolled ? "-0.03em" : "-0.02em",
              }}
              transition={spring}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
              }}
            >
              AutoTube
            </motion.span>
          </motion.button>

          {/* Center nav — gradient separator + links */}
          <div className="hidden md:flex flex-col items-center gap-[9px] flex-1 overflow-hidden">
            {/* Gradient line fades out when scrolled */}
            <motion.div
              style={{ width: "100%" }}
              animate={{ opacity: scrolled ? 0 : 1, height: scrolled ? 0 : "auto", marginBottom: scrolled ? -9 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <GradientLine />
            </motion.div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "center",
                flexWrap: "nowrap",
              }}
            >
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href} scrolled={scrolled}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right — Login + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <ThemeToggle />

            <button
              onClick={() => navigate.push("/onboarding")}
              className="hidden sm:block hover:text-[var(--foreground)] text-[var(--muted-foreground)] bg-transparent border-none cursor-pointer font-sans text-sm font-medium px-2.5 py-1.5 rounded-[var(--radius-button)] transition-colors whitespace-nowrap"
            >
              Log in
            </button>

            <motion.button
              onClick={() => navigate.push("/onboarding")}
              whileHover={{ scale: 1.03, opacity: 0.92 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                paddingLeft: scrolled ? 20 : 18,
                paddingRight: scrolled ? 20 : 18,
              }}
              transition={spring}
              className="hidden md:flex items-center justify-center h-9 rounded-xl bg-[var(--foreground)] text-[var(--background)] border-none cursor-pointer font-sans text-sm font-bold tracking-[-0.01em] whitespace-nowrap"
            >
              Get started →
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-[var(--foreground)] hover:bg-[var(--hover-overlay)] transition-colors ml-1"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--surface-0)] z-[120] border-l border-[var(--border)] p-6 shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <LogoMark size={24} />
                  <span className="font-sans font-bold text-sm text-[var(--foreground)]">AutoTube</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--hover-overlay)] text-[var(--muted-foreground)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-base font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => navigate.push("/onboarding")}
                  className="w-full text-[var(--foreground)] font-sans text-sm font-medium h-11 rounded-md border border-[var(--border)] hover:bg-[var(--hover-overlay)] transition-colors cursor-pointer"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate.push("/onboarding")}
                  className="w-full bg-[var(--foreground)] text-[var(--background)] font-sans text-sm font-bold h-11 rounded-md transition-all hover:scale-[0.98] cursor-pointer"
                >
                  Get started →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sub-component: individual nav link ── */
function NavLink({
  href,
  children,
  scrolled,
}: {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-normal)" as any,
        textDecoration: "none",
        padding: "4px 11px",
        borderRadius: "var(--radius)",
        whiteSpace: "nowrap",
        color: hovered ? "var(--foreground)" : "var(--muted-foreground)",
        background: hovered ? "var(--hover-overlay)" : "transparent",
        transition: "color 0.15s, background 0.15s",
      }}
    >
      {children}
    </a>
  );
}