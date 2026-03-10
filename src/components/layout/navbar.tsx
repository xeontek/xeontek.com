"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-light tracking-tight text-slate-400 font-body"
          translate="no"
        >
          <span className="font-semibold text-teal-700">Xeon</span>Tek
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors duration-150",
                pathname === href
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <MobileNav currentPath={pathname} />
      </div>
    </header>
  );
}
