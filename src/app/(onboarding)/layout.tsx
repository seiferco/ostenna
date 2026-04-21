import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-patina-cream">
      <header className="flex items-center justify-center py-6">
        <Link
          href="/"
          className="font-heading text-2xl tracking-tight text-patina-espresso"
        >
          {SITE_NAME}
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
