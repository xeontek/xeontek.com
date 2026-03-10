"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors duration-150 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <List size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-lg data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-2xl font-light text-slate-400 font-body" translate="no">
              <span className="font-semibold text-teal-700">Xeon</span>Tek
            </span>
            <Dialog.Close asChild>
              <button
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  currentPath === href
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
