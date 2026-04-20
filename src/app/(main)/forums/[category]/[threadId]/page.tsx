import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export default function ThreadDetailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <FadeIn>
        <Link
          href="/forums"
          className="inline-flex items-center gap-1 text-sm text-patina-clay hover:text-patina-walnut transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Forums
        </Link>

        <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
          <h1 className="font-heading text-2xl text-patina-espresso">
            Thread not found
          </h1>
          <p className="mt-2 text-patina-clay">
            This thread may have been removed or doesn&apos;t exist.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
