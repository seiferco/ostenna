"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { HERO_IMAGES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background image with Ken Burns */}
      <Image
        src={HERO_IMAGES.main}
        alt="Kitchen workspace with quality equipment"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-ken-burns"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-patina-espresso/70 via-patina-espresso/50 to-patina-espresso/80" />

      {/* Content */}
      <div className="relative flex min-h-[85vh] items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn delay={0}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading text-white tracking-tight leading-[1.1] text-balance">
              Where quality kitchen gear finds its next home
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
              The trusted marketplace for used espresso machines, knives, cookware, and more.
              Zero fees, zero hassle.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-xl bg-patina-verdigris-500 text-white font-medium transition-colors hover:bg-patina-verdigris-600"
              >
                Browse Marketplace
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-xl border border-white/50 text-white font-medium transition-colors hover:bg-white/10"
              >
                Start Selling — It&apos;s Free
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex items-center justify-center gap-3 text-white/70 text-sm">
              <span>2,400+ Members</span>
              <span className="text-white/40">·</span>
              <span>12,000+ Listings</span>
              <span className="text-white/40">·</span>
              <span>$0 Fees</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
