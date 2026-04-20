"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ListingCard } from "@/components/marketplace/listing-card";
import { DEMO_LISTINGS } from "@/lib/constants";

export function FeaturedListings() {
  const listings = DEMO_LISTINGS.slice(0, 8);

  return (
    <section className="bg-patina-linen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-heading text-3xl text-patina-espresso">
            Recently Listed
          </h2>
          <Link
            href="/marketplace"
            className="text-sm text-patina-verdigris-500 hover:text-patina-verdigris-600 transition-colors"
          >
            View all &rarr;
          </Link>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
