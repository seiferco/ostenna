import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const quickLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/forums", label: "Forums" },
  { href: "/register", label: "Sell Your Gear" },
  { href: "/trust-and-safety", label: "Trust & Safety" },
] as const;

const communityLinks = [
  { href: "/forums/general", label: "General Discussion" },
  { href: "/forums/deals", label: "Deals & Steals" },
  { href: "/help", label: "Help Center" },
] as const;

export function Footer() {
  return (
    <footer className="bg-patina-espresso text-patina-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-heading text-lg tracking-tight">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm text-patina-clay">
              The marketplace for quality used kitchen and espresso equipment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-patina-sand">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-patina-clay transition-colors hover:text-patina-cream"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-patina-sand">
              Community
            </h4>
            <ul className="mt-3 space-y-2">
              {communityLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-patina-clay transition-colors hover:text-patina-cream"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay in the Loop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-patina-sand">
              Stay in the Loop
            </h4>
            <p className="mt-3 text-sm text-patina-clay">
              Get notified about new listings and community updates.
            </p>
            <form className="mt-3 flex">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-l-lg border-none bg-patina-walnut px-3 py-2 text-sm text-patina-cream placeholder:text-patina-clay focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-patina-verdigris-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-400"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-patina-walnut pt-6 text-center text-xs text-patina-clay">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          <span className="mx-2">&middot;</span>
          <Link href="/privacy" className="transition-colors hover:text-patina-cream">
            Privacy
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/terms" className="transition-colors hover:text-patina-cream">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
