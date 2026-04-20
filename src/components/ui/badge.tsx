import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-patina-verdigris-100 text-patina-verdigris-700",
  success: "bg-patina-success/15 text-patina-success",
  warning: "bg-patina-warning/15 text-patina-warning",
  error: "bg-patina-error/15 text-patina-error",
  neutral: "bg-patina-sand text-patina-walnut",
} as const;

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
} as const;

type BadgeProps = {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
  children: ReactNode;
};

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
