"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  displayName: string;
  onNext: () => void;
};

export function StepWelcome({ displayName, onNext }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-patina-verdigris-100"
      >
        <Sparkles className="h-8 w-8 text-patina-verdigris-500" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="font-heading text-3xl text-patina-espresso"
      >
        Welcome, {displayName}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-3 max-w-sm text-patina-walnut"
      >
        Let&apos;s set up your profile so you can start buying and selling
        quality kitchen and espresso equipment.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-8"
      >
        <Button size="lg" onClick={onNext}>
          Let&apos;s get started
        </Button>
      </motion.div>
    </div>
  );
}
