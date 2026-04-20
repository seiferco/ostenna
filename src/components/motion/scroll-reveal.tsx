"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
  amount?: number;
};

const directionOffsets = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" as const }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
