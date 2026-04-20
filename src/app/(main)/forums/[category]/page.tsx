import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FORUM_CATEGORIES } from "@/lib/constants";

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = FORUM_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl text-patina-espresso">
          Category not found
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <FadeIn>
        <Link
          href="/forums"
          className="inline-flex items-center gap-1 text-sm text-patina-clay hover:text-patina-walnut transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Forums
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl text-patina-espresso">
              {category.name}
            </h1>
            <p className="mt-1 text-patina-clay">{category.description}</p>
          </div>
          <Link
            href="/register"
            className="hidden items-center rounded-lg bg-patina-verdigris-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-600 sm:inline-flex"
          >
            + New Thread
          </Link>
        </div>

        {/* Empty state */}
        <div className="mt-16 flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-patina-linen">
            <MessageSquare className="h-8 w-8 text-patina-clay" />
          </div>
          <h2 className="mt-6 font-heading text-xl text-patina-espresso">
            No threads yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-patina-clay">
            Start the conversation. Share your knowledge or ask a question.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center rounded-lg bg-patina-verdigris-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-600"
          >
            Create Account & Post
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
