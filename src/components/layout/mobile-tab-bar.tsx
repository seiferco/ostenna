"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search, PlusCircle, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const tabs = [
  { href: "/", label: "Home", icon: House, accent: false },
  { href: "/marketplace", label: "Browse", icon: Search, accent: false },
  { href: "/register", label: "Sell", icon: PlusCircle, accent: true },
  { href: "/forums", label: "Forums", icon: MessageSquare, accent: false },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();
  const { user, profile } = useAuth();

  const profileHref = user ? `/u/${profile?.username ?? ""}` : "/login";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-patina-sand/50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <nav className="flex justify-around items-center py-2 px-4">
        {tabs.map(({ href, label, icon: Icon, accent }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 ${
                accent
                  ? "text-patina-verdigris-500"
                  : active
                    ? "text-patina-verdigris-500"
                    : "text-patina-clay"
              }`}
            >
              <Icon className={`h-5 w-5 ${accent ? "h-6 w-6" : ""}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}

        {/* Profile tab */}
        <Link
          href={profileHref}
          className={`flex flex-col items-center gap-0.5 ${
            pathname.startsWith("/u/") || pathname === "/login"
              ? "text-patina-verdigris-500"
              : "text-patina-clay"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
