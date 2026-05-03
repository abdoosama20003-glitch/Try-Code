"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import svgPaths from "./imports/NewFooterMain/svg-gp5vq1tb83";

const MotionDiv = motion.create("div" as any);

/* ── Social icon circle button ── */
function SocialBtn({ label }: { label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.09)" }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "relative",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-label={label}
    >
      {/* SVG circle border */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 25 25"
        fill="none"
      >
        <path d={svgPaths.p284edbc0} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10,
          fontWeight: "var(--font-weight-bold)",
          color: "#555562",
          position: "relative",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

/* ── Link column ── */
function LinkCol({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--foreground)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {heading}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l) => (
          <FooterLink key={l.label} href={l.href ?? "#"}>
            {l.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: "var(--muted-foreground)" } as any}
      transition={{ duration: 0.12 }}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "12.5px",
        fontWeight: "var(--font-weight-normal)",
        color: "#555562",
        textDecoration: "none",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.a>
  );
}

const mainPagesCol1 = [
  { label: "Home",         href: "/" },
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog",         href: "#blog" },
  { label: "About",        href: "#about" },
];

const mainPagesCol2 = [
  { label: "Gap Analyzer", href: "/dashboard/gap-analyzer" },
  { label: "Script Writer", href: "/dashboard/scripts" },
  { label: "Thumbnails",    href: "/dashboard/thumbnails" },
  { label: "Analytics",     href: "/dashboard/analytics" },
  { label: "Integrations",  href: "#" },
  { label: "Changelog",     href: "#" },
];

const utilityPages = [
  { label: "Get started",        href: "/onboarding" },
  { label: "Style guide",        href: "#" },
  { label: "Password protected", href: "#" },
  { label: "Privacy policy",     href: "#" },
  { label: "Terms of service",   href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function Footer() {
  const navigate = useRouter();

  return (
    <MotionDiv
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      style={{
        padding: "0 24px 24px",
        background: "var(--background)",
      }}
    >
      {/* Outer card */}
      <motion.div
        variants={fadeUp}
        style={{
          background: "var(--card)",
          borderRadius: "var(--radius-card)",
          border: "1px solid #2a2a2e",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* ── CTA Section ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
            padding: "48px 56px 44px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: headline + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Ready to find your
              <br />
              next viral video?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14.5px",
                  fontWeight: "var(--font-weight-normal)",
                  color: "var(--muted-foreground)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Join 50,000+ creators already growing with AutoTube.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14.5px",
                  fontWeight: "var(--font-weight-normal)",
                  color: "var(--muted-foreground)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Generate complete video packages in seconds.
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <motion.button
            onClick={() => navigate.push("/onboarding")}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.10)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 52,
              padding: "0 28px",
              borderRadius: 26,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--foreground)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
            Get started →
          </motion.button>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 32px" }} />

        {/* ── Link Columns ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, auto)",
            gap: "40px 48px",
            padding: "40px 56px 36px",
            flexWrap: "wrap",
          }}
        >
          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
              }}
            >
              AutoTube
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "#555562" }}>
                Find what YouTube is missing.
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "#555562" }}>
                One workspace for creators.
              </span>
            </div>
          </div>

          {/* Main Pages col 1 + col 2 grouped */}
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--foreground)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Main Pages
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                {[...mainPagesCol1, ...mainPagesCol2].map((l) => (
                  <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>
                ))}
              </div>
            </div>
          </div>

          {/* Utility Pages */}
          <LinkCol heading="Utility Pages" links={utilityPages} />
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 32px" }} />

        {/* ── Bottom bar: copyright + socials ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 56px 22px",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: "var(--font-weight-normal)",
              color: "#333340",
              lineHeight: 1,
            }}
          >
            Copyright © AutoTube | Designed for creators · Powered by AutoTube
          </span>

          {/* Social icon row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SocialBtn label="f" />
            <SocialBtn label="𝕏" />
            <SocialBtn label="▶" />
            <SocialBtn label="in" />
          </div>
        </div>
      </motion.div>
    </MotionDiv>
  );
}
