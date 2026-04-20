"use client";

import { Children } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type StaggerChildrenProps = {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  triggerOnScroll?: boolean;
};

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.05,
  className,
  triggerOnScroll = false,
}: StaggerChildrenProps) {
  const animationProps = triggerOnScroll
    ? { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.2 } }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        {...animationProps}
        custom={staggerDelay}
        className={cn(className)}
      >
        {Children.map(children, (child) => (
          <motion.div variants={childVariants}>{child}</motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
