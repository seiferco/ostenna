"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: keyof typeof sizeStyles;
  readonly?: boolean;
  className?: string;
};

export function StarRating({
  value,
  onChange,
  size = "md",
  readonly = false,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const interactive = !readonly && !!onChange;
  const displayValue = hovered || value;

  return (
    <div
      className={cn("inline-flex gap-0.5", className)}
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={cn(
            "transition-colors disabled:cursor-default",
            interactive && "cursor-pointer hover:scale-110 transition-transform",
          )}
          onClick={() => interactive && onChange(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              sizeStyles[size],
              star <= displayValue
                ? "fill-patina-warning text-patina-warning"
                : "fill-none text-patina-sand",
            )}
          />
        </button>
      ))}
    </div>
  );
}
