"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const COOKIE_NAME = "xeontek-cookie-consent";

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function ConsentAnalytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(getCookie(COOKIE_NAME) === "accepted");

    // Re-check when cookie banner is interacted with
    const observer = new MutationObserver(() => {
      setAccepted(getCookie(COOKIE_NAME) === "accepted");
    });
    observer.observe(document.documentElement, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, []);

  if (!accepted) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
