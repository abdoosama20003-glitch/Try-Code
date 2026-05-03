"use client";
import { motion } from "framer-motion";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { Zap, TrendingUp, Shield, Flame } from "lucide-react";

type BadgeType = "easy-win" | "competitive" | "emerging" | "golden";

const config: Record<BadgeType, { label: string; color: string; icon: typeof Zap }> = {
  "easy-win":    { label: "Easy Win",    color: "var(--neon-emerald)", icon: Zap       },
  "competitive": { label: "Competitive", color: "var(--neon-red)",     icon: Shield    },
  "emerging":    { label: "Emerging",    color: "var(--neon-amber)",   icon: TrendingUp },
  "golden":      { label: "Golden Gap",  color: "var(--neon-purple)",  icon: Flame     },
};

export function GapBadge({ type }: { type: BadgeType }) {
  const c = config[type];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
    >
      <Flex
        align="center" gap={1.5}
        px={2.5} py={1}
        borderRadius="var(--radius)"
        bg={`${c.color}12`}
        border="1px solid"
        borderColor={`${c.color}30`}
        cursor="default"
        display="inline-flex"
      >
        <Icon as={c.icon} w="10px" h="10px" color={c.color} />
        <Text
          fontSize="10px"
          fontWeight="var(--font-weight-bold)"
          color={c.color}
          letterSpacing="0.02em"
          fontFamily="var(--font-sans)"
        >
          {c.label}
        </Text>
      </Flex>
    </motion.div>
  );
}