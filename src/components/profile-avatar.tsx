"use client";

import { useState } from "react";
import { AvatarUpload } from "@/components/avatar-upload";

type Props = {
  isOwner: boolean;
  avatarUrl: string | null;
  name: string;
  initials: string;
};

export function ProfileAvatar({ isOwner, avatarUrl, name, initials }: Props) {
  const [currentUrl, setCurrentUrl] = useState(avatarUrl);

  if (isOwner) {
    return (
      <div className="-mt-12 flex justify-center sm:justify-start">
        <AvatarUpload
          currentUrl={currentUrl}
          name={name}
          size="lg"
          onUploaded={setCurrentUrl}
        />
      </div>
    );
  }

  return (
    <div className="-mt-12 flex justify-center sm:justify-start">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-patina-verdigris-100 shadow-md">
        {currentUrl ? (
          <img
            src={currentUrl}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="font-heading text-2xl text-patina-verdigris-600">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
