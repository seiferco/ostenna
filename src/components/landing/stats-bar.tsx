"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function AnimatedNumber({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <motion.span ref={ref}>
      {prefix}0{suffix}
    </motion.span>
  );
}

const stats: { target: number; prefix?: string; suffix?: string; label: string }[] = [
  { target: 2400, suffix: "+", label: "Members" },
  { target: 12000, suffix: "+", label: "Items Listed" },
  { target: 0, prefix: "$", suffix: "", label: "Transaction Fees" },
];

export function StatsBar() {
  return (
    <section className="bg-white py-12 sm:py-16 shadow-sm">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 px-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl sm:text-4xl font-heading text-patina-espresso">
              <AnimatedNumber
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </p>
            <p className="text-sm text-patina-clay mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
