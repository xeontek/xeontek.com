import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { company, registeredOfficeText } from "@/lib/company";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company" },
  { href: "/research", label: "Research" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/security", label: "Security" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Company */}
          <div>
            <p
              className="font-body text-xl font-light text-slate-400"
              translate="no"
            >
              <span className="font-semibold text-teal-700">Xeon</span>Tek
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Driving technology forward.
            </p>
            <a
              href="https://www.linkedin.com/company/xeontek"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-slate-400 transition-colors duration-150 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
              aria-label="XeonTek on LinkedIn"
            >
              <LinkedinLogo size={20} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6">
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              &copy; 2013&ndash;{currentYear} {company.name}. Registered in{" "}
              {company.registrationJurisdiction}.
            </p>
            <p>
              Company number {company.registrationNumber}. Registered office:{" "}
              {registeredOfficeText}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
