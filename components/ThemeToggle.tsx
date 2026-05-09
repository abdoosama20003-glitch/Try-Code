"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // To prevent hydration errors, we wait until the component has mounted on the client
  // before rendering the theme-dependent icon.
  if (!mounted) {
    return (
      <button
        className="at-theme-toggle"
        style={{
          position: "relative",
          overflow: "hidden",
          width: 30, // Approximate width
          height: 30, // Approximate height
          background: "transparent",
          border: "none",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="at-theme-toggle"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Sun size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Moon size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
