"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, MessageSquare, LogOut, User, Search } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/forums", label: "Forums", icon: MessageSquare },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-patina-sand/50 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="font-heading text-xl tracking-tight text-patina-espresso"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-patina-espresso ${
                pathname.startsWith(href)
                  ? "text-patina-verdigris-500"
                  : "text-patina-walnut"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Inline search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-patina-clay" />
            <input
              type="text"
              placeholder="Search gear..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchValue.trim()) {
                  router.push(`/marketplace?q=${encodeURIComponent(searchValue.trim())}`);
                }
              }}
              className="w-48 rounded-full border-none bg-patina-linen/50 py-1.5 pl-8 pr-3 text-sm outline-none placeholder:text-patina-clay transition-all duration-200 focus:w-64 focus:bg-white focus:ring-2 focus:ring-patina-verdigris-200"
            />
          </div>

          <div className="ml-2 flex items-center gap-2">
            {isLoading ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-patina-sand" />
            ) : user ? (
              <>
                <Link
                  href={`/u/${profile?.username ?? ""}`}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-patina-walnut transition-colors hover:bg-patina-linen"
                >
                  <User className="h-4 w-4" />
                  {profile?.display_name ?? profile?.username ?? "Profile"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-patina-clay transition-colors hover:bg-patina-linen hover:text-patina-walnut"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-patina-walnut transition-colors hover:bg-patina-linen"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-patina-verdigris-400 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-patina-walnut transition-colors hover:bg-patina-linen md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="overflow-hidden border-t border-patina-sand md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 pb-4 pt-2 sm:px-6">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-patina-walnut transition-colors hover:bg-patina-linen"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}

              <hr className="my-2 border-patina-sand" />

              <div className="flex flex-col gap-2 pt-1">
                {user ? (
                  <>
                    <Link
                      href={`/u/${profile?.username ?? ""}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-patina-walnut transition-colors hover:bg-patina-linen"
                    >
                      <User className="h-4 w-4" />
                      {profile?.display_name ?? "Profile"}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-patina-clay transition-colors hover:bg-patina-linen"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2 text-center text-sm font-medium text-patina-walnut transition-colors hover:bg-patina-linen"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-patina-verdigris-400 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-patina-verdigris-500"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
