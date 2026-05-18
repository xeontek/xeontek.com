import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-body text-2xl font-light tracking-tight text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
          translate="no"
        >
          <span className="font-semibold text-teal-700">Xeon</span>Tek
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-slate-500 transition-colors duration-150 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
            >
              {label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
