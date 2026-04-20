import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Users } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { FORUM_CATEGORIES, HERO_IMAGES } from "@/lib/constants";

export const metadata = {
  title: "Forums",
  description:
    "Join the conversation about espresso, knives, cookware, and kitchen gear.",
};

export default function ForumsPage() {
  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={HERO_IMAGES.espresso}
          alt="Community forums"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-patina-espresso/60 to-patina-espresso/80" />
        <div className="relative flex h-full items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-heading text-3xl text-white sm:text-4xl">
              Forums
            </h1>
            <p className="mt-2 text-white/70">
              Discuss gear, share knowledge, and connect with the community
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {FORUM_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 0.06}>
              <Link
                href={`/forums/${cat.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-patina-sand/50 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-patina-verdigris-200"
              >
                {/* Colored dot indicator */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-patina-linen transition-colors group-hover:bg-patina-verdigris-100">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-lg text-patina-espresso">
                    {cat.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-patina-clay">
                    {cat.description}
                  </p>
                </div>
                <div className="hidden text-right text-sm text-patina-clay sm:block">
                  <p className="inline-flex items-center gap-1 font-medium text-patina-walnut">
                    <Users className="h-3.5 w-3.5" />
                    {cat.members}
                  </p>
                  <p className="inline-flex items-center gap-1 mt-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    0 threads
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
