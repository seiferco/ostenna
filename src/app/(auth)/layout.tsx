import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-patina-cream px-4 py-12">
      <Link
        href="/"
        className="mb-8 font-heading text-2xl tracking-tight text-patina-espresso"
      >
        {SITE_NAME}
      </Link>
      {children}
    </div>
  );
}
