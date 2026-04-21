"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Profile } from "@/types/database";
import { StepWelcome } from "./step-welcome";
import { StepPhoto } from "./step-photo";
import { StepIntent } from "./step-intent";
import { StepInterests } from "./step-interests";
import { StepComplete } from "./step-complete";

const STEPS = ["welcome", "photo", "intent", "interests", "complete"] as const;
type Step = (typeof STEPS)[number];

function inferStartStep(profile: Profile): number {
  if (!profile.avatar_url) return 0;
  if (!profile.intent) return 2;
  if (!profile.interests || profile.interests.length === 0) return 3;
  return 0;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

type Props = {
  profile: Profile;
};

export function OnboardingWizard({ profile }: Props) {
  const [stepIndex, setStepIndex] = useState(() => inferStartStep(profile));
  const [direction, setDirection] = useState(1);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
  const [intent, setIntent] = useState(profile.intent);
  const [interests, setInterests] = useState<string[]>(
    profile.interests ?? [],
  );

  const currentStep = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goNext = useCallback(() => {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  return (
    <div className="w-full max-w-lg">
      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-patina-sand/50">
        <motion.div
          className="h-full rounded-full bg-patina-verdigris-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentStep === "welcome" && (
              <StepWelcome
                displayName={profile.display_name ?? profile.username}
                onNext={goNext}
              />
            )}
            {currentStep === "photo" && (
              <StepPhoto
                avatarUrl={avatarUrl}
                name={profile.display_name ?? profile.username}
                onUploaded={setAvatarUrl}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {currentStep === "intent" && (
              <StepIntent
                value={intent}
                onChange={setIntent}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {currentStep === "interests" && (
              <StepInterests
                value={interests}
                onChange={setInterests}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {currentStep === "complete" && (
              <StepComplete
                displayName={profile.display_name ?? profile.username}
                intent={intent}
                interests={interests}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
