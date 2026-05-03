"use client";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@chakra-ui/react";

interface ScoreBarProps {
  score: number;
  color: string;
  delay?: number;
}

export function ScoreBar({ score, color, delay = 0 }: ScoreBarProps) {
  return (
    <Flex align="center" gap={2.5} minW="120px">
      <Box
        flex={1} h="5px" borderRadius="full"
        bg="rgba(255,255,255,0.05)"
        overflow="hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            borderRadius: "9999px",
            backgroundColor: color,
          }}
        />
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        <Text
          fontSize="var(--text-xs)"
          fontFamily="var(--font-mono)"
          fontWeight="var(--font-weight-bold)"
          color={color}
          minW="28px"
          textAlign="right"
        >
          {score}
        </Text>
      </motion.div>
    </Flex>
  );
}