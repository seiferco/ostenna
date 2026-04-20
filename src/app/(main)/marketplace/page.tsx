"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Info } from "lucide-react";
import { ListingCard } from "@/components/marketplace/listing-card";
import { DEMO_LISTINGS, LISTING_CATEGORIES, LISTING_SORT_OPTIONS } from "@/lib/constants";
import type { ListingCategory, ListingSortOption } from "@/lib/constants";

const categoryFilters = [
  { value: "", label: "All" },
  ...LISTING_CATEGORIES,
] as const;

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<ListingCategory | "">("");
  const [sortBy, setSortBy] = useState<ListingSortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let results = [...DEMO_LISTINGS];

    if (activeCategory) {
      results = results.filter((l) => l.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.seller.username.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "oldest":
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "price_asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl text-patina-espresso">
            Marketplace
          </h1>
          <p className="mt-1 text-patina-clay">
            Browse quality used kitchen and espresso equipment
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-xl bg-patina-verdigris-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-600"
        >
          + Post a Listing
        </Link>
      </div>

      {/* Sample data banner */}
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-patina-verdigris-50 px-4 py-3 text-sm text-patina-verdigris-700">
        <Info className="h-4 w-4 shrink-0" />
        Showing sample listings. Real listings will appear once sellers start posting.
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-patina-clay" />
          <input
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-none bg-white py-3 pl-11 pr-4 text-sm text-patina-espresso shadow-sm placeholder:text-patina-clay focus:ring-2 focus:ring-patina-verdigris-200 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Category pills + sort */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categoryFilters.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as ListingCategory | "")}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-patina-verdigris-500 text-white"
                  : "bg-white text-patina-walnut hover:bg-patina-linen"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as ListingSortOption)}
          className="shrink-0 rounded-xl border-none bg-white px-4 py-2 text-sm text-patina-walnut shadow-sm focus:ring-2 focus:ring-patina-verdigris-200 focus:outline-none"
        >
          {LISTING_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Listings grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-patina-linen">
            <Search className="h-8 w-8 text-patina-clay" />
          </div>
          <h2 className="mt-6 font-heading text-xl text-patina-espresso">
            No listings found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-patina-clay">
            Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setActiveCategory("");
              setSearchQuery("");
            }}
            className="mt-4 text-sm font-medium text-patina-verdigris-500 hover:text-patina-verdigris-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
