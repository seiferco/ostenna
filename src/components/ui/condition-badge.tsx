import { cn } from "@/lib/utils";
import type { ListingCondition } from "@/lib/constants";

const conditionConfig: Record<ListingCondition, { label: string; className: string }> = {
  new: { label: "New", className: "bg-patina-success/10 text-patina-success" },
  like_new: { label: "Like New", className: "bg-patina-success/10 text-patina-success" },
  excellent: { label: "Excellent", className: "bg-patina-verdigris-100 text-patina-verdigris-700" },
  good: { label: "Good", className: "bg-patina-sand/50 text-patina-walnut" },
  fair: { label: "Fair", className: "bg-patina-warning/10 text-patina-warning" },
  parts: { label: "For Parts", className: "bg-patina-error/10 text-patina-error" },
};

export function ConditionBadge({
  condition,
  className,
}: {
  condition: ListingCondition;
  className?: string;
}) {
  const config = conditionConfig[condition];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
