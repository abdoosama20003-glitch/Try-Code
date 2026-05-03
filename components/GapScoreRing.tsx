"use client";
import { motion } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";

function getColor(score: number) {
  if (score >= 80) return "var(--neon-emerald)";
  if (score >= 60) return "var(--primary)";
  if (score >= 40) return "var(--neon-amber)";
  return "var(--neon-red)";
}

function getRawColor(score: number) {
  if (score >= 80) return "#10B981";
  if (score >= 60) return "#6366F1";
  if (score >= 40) return "#F59E0B";
  return "#EF4444";
}

export function GapScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const sw     = 3;
  const r      = (size - sw * 2) / 2;
  const circ   = 2 * Math.PI * r;
  const progress = (score / 100) * circ;
  const color    = getColor(score);
  const rawColor = getRawColor(score);

  return (
    <Box
      position="relative"
      w={`${size}px`} h={`${size}px`}
      display="flex" alignItems="center" justifyContent="center"
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={sw}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={rawColor}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - progress }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        style={{ position: "absolute" }}
      >
        <Text
          fontSize="var(--text-xs)"
          fontFamily="var(--font-mono)"
          fontWeight="var(--font-weight-extrabold)"
          color={color}
        >
          {score}
        </Text>
      </motion.div>
    </Box>
  );
}