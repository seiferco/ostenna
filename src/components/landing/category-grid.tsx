"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { HERO_IMAGES } from "@/lib/constants";

const categories = [
  { name: "Espresso Machines", image: HERO_IMAGES.espresso },
  { name: "Grinders", image: HERO_IMAGES.grinders },
  { name: "Knives", image: HERO_IMAGES.knives },
  { name: "Cookware", image: HERO_IMAGES.cookware },
] as const;

export function CategoryGrid() {
  return (
    <section className="bg-patina-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl text-patina-espresso">
            Shop by Category
          </h2>
          <p className="mt-3 text-patina-clay max-w-xl mx-auto">
            Browse curated collections of quality kitchen and espresso equipment.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, i) => (
            <ScrollReveal key={category.name} delay={i * 0.1}>
              <Link href="/marketplace" className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-heading text-xl text-white">
                    {category.name}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
