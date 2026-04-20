import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

type AvatarProps = {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: keyof typeof sizeStyles;
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClass = sizeStyles[size];

  if (src) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full",
          sizeClass,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-patina-verdigris-100 font-medium text-patina-verdigris-700",
        sizeClass,
        className,
      )}
      aria-label={name || "Avatar"}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
