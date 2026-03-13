import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { ConsentAnalytics } from "@/components/ui/consent-analytics";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xeontek.com"),
  title: {
    default: "XeonTek — Financial Technology, London",
    template: "%s — XeonTek",
  },
  description:
    "XeonTek is a London-based technology company building AI-driven platforms for property analytics, investment intelligence, and financial modelling.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "XeonTek",
    images: [{ url: "/poster.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-white selection:bg-teal-200 selection:text-slate-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
