"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { LISTING_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/app/(onboarding)/onboarding/actions";

type Props = {
  displayName: string;
  intent: "buy" | "sell" | "both" | null;
  interests: string[];
};

const intentLabels = {
  buy: "Buying",
  sell: "Selling",
  both: "Buying & Selling",
};

export function StepComplete({ displayName, intent, interests }: Props) {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    completeOnboarding().then(() => setCompleted(true));
  }, []);

  const interestLabels = interests
    .map((v) => LISTING_CATEGORIES.find((c) => c.value === v)?.label)
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-patina-verdigris-400"
      >
        <Check className="h-8 w-8 text-white" strokeWidth={3} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="font-heading text-3xl text-patina-espresso"
      >
        You&apos;re all set, {displayName}!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-3 text-patina-walnut"
      >
        Your profile is ready. Time to explore the marketplace.
      </motion.p>

      {/* Summary badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {intent && (
          <span className="rounded-full bg-patina-verdigris-100 px-3 py-1 text-xs font-medium text-patina-verdigris-700">
            {intentLabels[intent]}
          </span>
        )}
        {interestLabels.map((label) => (
          <span
            key={label}
            className="rounded-full bg-patina-linen px-3 py-1 text-xs font-medium text-patina-walnut"
          >
            {label}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.4 }}
        className="mt-8 flex gap-3"
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => router.push("/marketplace")}
          disabled={!completed}
        >
          Browse marketplace
        </Button>
        <Button
          size="lg"
          onClick={() => router.push("/marketplace")}
          disabled={!completed}
        >
          List your first item
        </Button>
      </motion.div>
    </div>
  );
}
