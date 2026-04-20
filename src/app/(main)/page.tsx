"use client";

import Link from "next/link";
import { ArrowRight, DollarSign, Users, Shield, ShoppingBag } from "lucide-react";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsBar } from "@/components/landing/stats-bar";
import { CategoryGrid } from "@/components/landing/category-grid";
import { FeaturedListings } from "@/components/landing/featured-listings";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SITE_NAME } from "@/lib/constants";

const features = [
  {
    icon: DollarSign,
    title: "Zero Fees",
    description:
      "No transaction fees, no listing fees. Keep every dollar from your sale.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description:
      "Public feedback system with verified trade history. Know who you're dealing with.",
  },
  {
    icon: Shield,
    title: "No Middleman",
    description:
      "Arrange payment and shipping directly. Your transaction, your terms.",
  },
  {
    icon: ShoppingBag,
    title: "Free to Browse",
    description:
      "Anyone can view listings and connect with sellers. No account needed to shop.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create an Account",
    description:
      "Sign up in seconds. Your profile builds trust with every trade.",
  },
  {
    step: "02",
    title: "List Your Gear",
    description:
      "Upload photos, set your price, and describe your item. It's live in minutes.",
  },
  {
    step: "03",
    title: "Connect & Trade",
    description:
      "Buyers contact you directly. Arrange payment and shipping on your terms.",
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <CategoryGrid />
      <FeaturedListings />

      {/* Why Ostenna */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <h2 className="text-center font-heading text-3xl text-patina-espresso sm:text-4xl">
              Why {SITE_NAME}?
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-patina-verdigris-100">
                    <feature.icon className="h-6 w-6 text-patina-verdigris-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-patina-espresso">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-patina-clay">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* How It Works */}
      <section className="bg-patina-linen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <h2 className="text-center font-heading text-3xl text-patina-espresso sm:text-4xl">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-3">
            {howItWorks.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="text-center">
                  <span className="font-heading text-4xl text-patina-verdigris-300">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-heading text-lg text-patina-espresso">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-patina-clay">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-patina-espresso py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl text-patina-cream sm:text-4xl">
              Ready to trade?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-patina-clay">
              Join a growing community of baristas, chefs, and kitchen
              enthusiasts buying and selling quality gear with zero fees.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-patina-verdigris-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-patina-verdigris-400"
              >
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center rounded-xl border border-patina-walnut px-8 py-4 text-lg font-medium text-patina-cream transition-colors hover:border-patina-clay hover:text-patina-sand"
              >
                Browse Listings
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
