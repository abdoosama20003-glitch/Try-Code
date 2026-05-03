"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useSpring, useTransform, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
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
  { label: "Blog",         href: "#blog" },
];

const SCROLL_THRESHOLD = 60;

export function Navbar() {
  const navigate = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 9,
              flex: 1,
              overflow: "hidden",
            }}
          >
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
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--muted-foreground)",
                padding: "6px 10px",
                borderRadius: "var(--radius-button)",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"; }}
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 36,
                borderRadius: 12,
                background: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-bold)",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Get started →
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
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