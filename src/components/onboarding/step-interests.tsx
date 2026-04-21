"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Disc3,
  Thermometer,
  Wrench,
  Sword,
  CookingPot,
  CakeSlice,
  UtensilsCrossed,
  MoreHorizontal,
} from "lucide-react";
import { LISTING_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { updateInterests } from "@/app/(onboarding)/onboarding/actions";

const categoryIcons: Record<string, React.ElementType> = {
  espresso_machines: Coffee,
  grinders: Disc3,
  kettles: Thermometer,
  accessories: Wrench,
  knives: Sword,
  cookware: CookingPot,
  bakeware: CakeSlice,
  kitchen_tools: UtensilsCrossed,
  other: MoreHorizontal,
};

type Props = {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepInterests({ value, onChange, onNext, onBack }: Props) {
  const [saving, setSaving] = useState(false);

  function toggle(cat: string) {
    const next = value.includes(cat)
      ? value.filter((v) => v !== cat)
      : [...value, cat];
    onChange(next);
  }

  async function handleContinue() {
    if (value.length === 0) return;
    setSaving(true);
    try {
      await updateInterests(value);
      onNext();
    } catch {
      // non-blocking
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
        What are you into?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-2 text-sm text-patina-walnut"
      >
        Select at least one category to get personalized recommendations.
      </motion.p>

      <div className="mt-8 grid w-full grid-cols-3 gap-3">
        {LISTING_CATEGORIES.map((cat, i) => {
          const Icon = categoryIcons[cat.value] ?? MoreHorizontal;
          const selected = value.includes(cat.value);
          return (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggle(cat.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 transition-colors ${
                selected
                  ? "border-patina-verdigris-400 bg-patina-verdigris-50"
                  : "border-patina-sand/60 bg-white hover:border-patina-verdigris-200"
              }`}
            >
              <Icon
                className={`h-6 w-6 ${
                  selected
                    ? "text-patina-verdigris-500"
                    : "text-patina-clay"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  selected ? "text-patina-verdigris-700" : "text-patina-walnut"
                }`}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {value.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-patina-clay"
        >
          Pick at least one to continue
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-8 flex gap-3"
      >
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={value.length === 0 || saving}
          isLoading={saving}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
