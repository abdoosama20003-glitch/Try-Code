"use client";
import { motion } from "framer-motion";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TestimonialCard {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  stars: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  floatDuration: number;
  floatDistance: number;
}

const testimonials: Omit<TestimonialCard, "x" | "y" | "rotation" | "scale" | "delay" | "floatDuration" | "floatDistance">[] = [
  { id: 1, name: "Sarah Chen",    role: "450K subs", quote: "Found a gap nobody saw. 200K views in a week.",      avatar: "https://images.unsplash.com/photo-1573497620166-aef748c8c792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRlY2glMjBlbnRyZXByZW5ldXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2NjEwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 2, name: "Marcus Rivera", role: "180K subs", quote: "Script writer saves me 6 hours per video.",           avatar: "https://images.unsplash.com/photo-1649320821271-5da1b19bb8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwc21pbGluZ3xlbnwxfHx8fDE3NzM2NjEwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 3, name: "Priya Patel",   role: "320K subs", quote: "Went from 2 to 8 videos/month. Insane ROI.",           avatar: "https://images.unsplash.com/photo-1758873268238-0b93e41fdcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzczNjYxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 4, name: "James Okafor",  role: "620K subs", quote: "The gap analyzer is pure gold. Game changer.",         avatar: "https://images.unsplash.com/photo-1761198629717-42de7b04f9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMGNvbnRlbnQlMjBjcmVhdG9yJTIwc3R1ZGlvfGVufDF8fHx8MTc3MzY2MTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 5, name: "Camila Torres", role: "95K subs",  quote: "Thumbnails + SEO titles = unstoppable combo.",         avatar: "https://images.unsplash.com/photo-1752982527498-214487bd9540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjB3b21hbiUyMGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MXx8fHwxNzczNjYxMDI3fDA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 6, name: "Alex Kim",      role: "210K subs", quote: "Best investment for my YouTube channel. Period.",       avatar: "https://images.unsplash.com/photo-1649320821271-5da1b19bb8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwc21pbGluZ3xlbnwxfHx8fDE3NzM2NjEwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 7, name: "Emma Watson",   role: "540K subs", quote: "AI scripts are incredible. Feels like magic.",          avatar: "https://images.unsplash.com/photo-1573497620166-aef748c8c792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRlY2glMjBlbnRyZXByZW5ldXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2NjEwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", stars: 5 },
  { id: 8, name: "Daniel Park",   role: "380K subs", quote: "Tripled my upload frequency with AutoTube.",            avatar: "https://images.unsplash.com/photo-1758873268238-0b93e41fdcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzczNjYxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080", stars: 4 },
];

const positions = [
  { x: -42, y: 5,  rotation: -6, scale: 0.90 },
  { x:  38, y: 12, rotation:  4, scale: 0.95 },
  { x: -35, y: 55, rotation:  3, scale: 0.85 },
  { x:  42, y: 50, rotation: -5, scale: 0.88 },
  { x: -20, y: 80, rotation:  6, scale: 0.82 },
  { x:  20, y: 78, rotation: -3, scale: 0.92 },
  { x: -45, y: 35, rotation: -4, scale: 0.86 },
  { x:  45, y: 32, rotation:  5, scale: 0.90 },
];

export function BallpitHero() {
  const cards: TestimonialCard[] = testimonials.map((t, i) => ({
    ...t,
    x:             positions[i % positions.length].x,
    y:             positions[i % positions.length].y,
    rotation:      positions[i % positions.length].rotation,
    scale:         positions[i % positions.length].scale,
    delay:         i * 0.3,
    floatDuration: 4 + Math.random() * 4,
    floatDistance: 8 + Math.random() * 16,
  }));

  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      minH={{ base: "500px", md: "560px" }}
      overflow="hidden"
    >
      {/* Subtle ambient light */}
      <Box
        position="absolute" top="40%" left="50%" transform="translateX(-50%)"
        w="400px" h="400px" borderRadius="full"
        bg="radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)"
        filter="blur(60px)" pointerEvents="none"
      />

      {/* Floating testimonial cards */}
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.3, y: 100 }}
          animate={{ opacity: [0, 1, 1], scale: card.scale, y: [100, 0, 0] }}
          transition={{ duration: 1.2, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: `${50 + card.x / 2.2}%`,
            top: `${card.y}%`,
            transform: `translate(-50%, -50%) rotate(${card.rotation}deg)`,
            zIndex: Math.round(card.scale * 10),
          }}
        >
          <motion.div
            animate={{
              y: [-card.floatDistance / 2, card.floatDistance / 2, -card.floatDistance / 2],
              rotate: [card.rotation - 1, card.rotation + 1, card.rotation - 1],
            }}
            transition={{ duration: card.floatDuration, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.08, zIndex: 50, rotate: 0,
              transition: { duration: 0.3, type: "spring", stiffness: 300 },
            }}
          >
            <Box
              bg="rgba(24, 24, 27, 0.88)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.08)"
              borderRadius="var(--radius-card)"
              p={4}
              w={{ base: "200px", md: "240px" }}
              cursor="default"
              boxShadow="0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
              transition="box-shadow 0.3s ease"
              _hover={{
                boxShadow: "0 16px 48px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.20), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              <Flex align="center" gap={2} mb={2}>
                <Box
                  w="28px" h="28px" borderRadius="full" overflow="hidden"
                  border="2px solid" borderColor="var(--primary)"
                  flexShrink={0}
                >
                  <ImageWithFallback
                    src={card.avatar}
                    alt={card.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box flex={1} minW={0}>
                  <Text
                    fontSize="11px"
                    fontWeight="var(--font-weight-semibold)"
                    color="var(--text-primary)"
                    noOfLines={1}
                    fontFamily="var(--font-sans)"
                  >
                    {card.name}
                  </Text>
                  <Text fontSize="9px" color="var(--muted-foreground)" fontFamily="var(--font-sans)">{card.role}</Text>
                </Box>
              </Flex>
              <Flex gap="2px" mb={1.5}>
                {Array.from({ length: card.stars }).map((_, si) => (
                  <Icon key={si} as={Star} w="10px" h="10px" color="var(--neon-amber)" fill="#F59E0B" />
                ))}
              </Flex>
              <Text
                fontSize="11px"
                color="var(--secondary-foreground)"
                lineHeight="1.5"
                noOfLines={2}
                fontFamily="var(--font-sans)"
              >
                "{card.quote}"
              </Text>
            </Box>
          </motion.div>
        </motion.div>
      ))}
    </Box>
  );
}