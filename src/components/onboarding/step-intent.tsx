"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateIntent } from "@/app/(onboarding)/onboarding/actions";

const options = [
  {
    value: "buy" as const,
    label: "Buy",
    description: "Find quality used gear",
    icon: ShoppingBag,
  },
  {
    value: "sell" as const,
    label: "Sell",
    description: "List your equipment",
    icon: Tag,
  },
  {
    value: "both" as const,
    label: "Both",
    description: "Buy and sell gear",
    icon: ArrowLeftRight,
  },
];

type Props = {
  value: "buy" | "sell" | "both" | null;
  onChange: (v: "buy" | "sell" | "both") => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepIntent({ value, onChange, onNext, onBack }: Props) {
  const [saving, setSaving] = useState(false);

  async function handleSelect(intent: "buy" | "sell" | "both") {
    onChange(intent);
    setSaving(true);
    try {
      await updateIntent(intent);
    } catch {
      // toast would be nice, but non-blocking
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="font-heading text-2xl text-patina-espresso"
      >
        What brings you to Ostenna?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-2 text-sm text-patina-walnut"
      >
        This helps us personalize your experience.
      </motion.p>

      <div className="mt-8 grid w-full grid-cols-3 gap-3">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          const selected = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(opt.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-colors ${
                selected
                  ? "border-patina-verdigris-400 bg-patina-verdigris-50"
                  : "border-patina-sand/60 bg-white hover:border-patina-verdigris-200"
              }`}
            >
              <Icon
                className={`h-7 w-7 ${
                  selected
                    ? "text-patina-verdigris-500"
                    : "text-patina-clay"
                }`}
              />
              <span className="font-medium text-patina-espresso">
                {opt.label}
              </span>
              <span className="text-xs text-patina-clay">
                {opt.description}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="mt-8 flex gap-3"
      >
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!value || saving} isLoading={saving}>
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
