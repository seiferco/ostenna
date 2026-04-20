import { cn } from "@/lib/utils";

const variantStyles = {
  text: "h-4 w-full rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg",
} as const;

type SkeletonProps = {
  variant?: keyof typeof variantStyles;
  className?: string;
};

export function Skeleton({ variant = "text", className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-patina-sand/60",
        variantStyles[variant],
        className,
      )}
      aria-hidden="true"
    />
  );
}
