"use client";

import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import Link from "next/link";

const COOKIE_NAME = "xeontek-cookie-consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    setCookie(COOKIE_NAME, "accepted");
    setVisible(false);
  }

  function dismiss() {
    setCookie(COOKIE_NAME, "dismissed");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:flex sm:items-center sm:gap-4 sm:p-5">
        <div className="flex-1">
          <p className="text-sm text-slate-600">
            We use analytics to understand how visitors use our site. Click
            &quot;Accept&quot; to enable analytics, or dismiss to browse
            without tracking. See our{" "}
            <Link
              href="/privacy"
              className="font-medium text-teal-800 underline underline-offset-2 hover:text-teal-700"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2 sm:mt-0 sm:shrink-0">
          <button
            onClick={accept}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800"
          >
            Accept
          </button>
          <button
            onClick={dismiss}
            className="rounded-lg p-2 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
