"use client";

import { motion } from "framer-motion";
import { AvatarUpload } from "@/components/avatar-upload";
import { Button } from "@/components/ui/button";

type Props = {
  avatarUrl: string | null;
  name: string;
  onUploaded: (url: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepPhoto({
  avatarUrl,
  name,
  onUploaded,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="font-heading text-2xl text-patina-espresso"
      >
        Add a profile photo
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-2 text-sm text-patina-walnut"
      >
        Profiles with photos get more responses from buyers and sellers.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8"
      >
        <AvatarUpload
          currentUrl={avatarUrl}
          name={name}
          size="xl"
          onUploaded={onUploaded}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-8 flex gap-3"
      >
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="secondary" onClick={onNext}>
          {avatarUrl ? "Continue" : "Skip for now"}
        </Button>
      </motion.div>
    </div>
  );
}
