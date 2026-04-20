"use client";

import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="bg-patina-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl text-patina-espresso">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-patina-sand/50">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-patina-warning text-patina-warning"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-heading text-lg italic text-patina-espresso leading-relaxed mt-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Attribution */}
                <p className="text-sm font-medium text-patina-walnut mt-4">
                  {testimonial.name}
                </p>
                <p className="text-xs text-patina-clay">{testimonial.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
