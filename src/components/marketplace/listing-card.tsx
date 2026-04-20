"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ConditionBadge } from "@/components/ui/condition-badge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { DemoListing } from "@/lib/constants";

export function ListingCard({
  listing,
  href,
}: {
  listing: DemoListing;
  href?: string;
}) {
  const linkHref = href ?? "/register";

  return (
    <Link href={linkHref} className="group block">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-patina-linen">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Condition badge */}
        <div className="absolute top-3 left-3">
          <ConditionBadge
            condition={listing.condition}
            className="backdrop-blur-sm bg-white/80"
          />
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-patina-clay opacity-0 backdrop-blur-sm transition-all duration-200 hover:text-patina-error group-hover:opacity-100"
          onClick={(e) => e.preventDefault()}
          aria-label="Save to favorites"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        {/* Seller row */}
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-patina-verdigris-100 text-[9px] font-medium text-patina-verdigris-700">
            {listing.seller.displayName.charAt(0)}
          </div>
          <span className="text-xs text-patina-clay">{listing.seller.username}</span>
          {listing.seller.sales >= 10 && (
            <span className="text-xs text-patina-verdigris-500" title="Trusted seller">
              ✓
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium leading-tight text-patina-espresso line-clamp-2">
          {listing.title}
        </h3>

        {/* Price */}
        <p className="font-heading text-lg text-patina-verdigris-500">
          {formatCurrency(listing.price)}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-patina-clay">
          <span className="inline-flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-patina-warning text-patina-warning" />
            {listing.seller.rating}
          </span>
          <span>·</span>
          <span>{formatRelativeTime(listing.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
