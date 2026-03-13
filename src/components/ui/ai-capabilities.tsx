"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    icon: (
      <svg className="size-6 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M13 21V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v18" />
        <path d="M7 9v2" />
        <path d="M7 13v2" />
        <path d="M17 5v2" />
        <path d="M17 9v2" />
        <path d="M17 13v2" />
      </svg>
    ),
    label: "Property Platforms",
    text: "Aggregate real estate data and connect investors, buyers, and tenants with property providers across fragmented markets.",
  },
  {
    icon: (
      <svg className="size-6 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: "Emerging Markets",
    text: "Track and analyse markets where reliable data is hardest to find — surfacing opportunities, risks, and regional trends.",
  },
  {
    icon: (
      <svg className="size-6 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Capital Networks",
    text: "Match founders with the right investors — angels, VCs, and networks — through deal tracking and intelligent matching.",
  },
];

function BeamConnector({ delay = 0, path }: { delay?: number; path: string }) {
  return (
    <svg className="h-16 w-full" viewBox="0 0 300 60" fill="none" preserveAspectRatio="none">
      <path d={path} stroke="#e2e8f0" strokeWidth="2" />
      <path
        d={path}
        stroke="#5AAEAE"
        strokeWidth="2"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: 300,
          animation: `beam-animation 4s ease-in-out ${delay}s infinite`,
        }}
      />
    </svg>
  );
}

export function AiCapabilities() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-teal-400 px-6 pt-12 pb-8 shadow-xl sm:px-12 sm:pt-16 lg:flex lg:items-start lg:gap-x-16 lg:px-16 lg:pt-0 lg:pb-0">
      {/* Radial gradient background */}
      <svg
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        aria-hidden="true"
      >
        <circle cx="512" cy="512" r="512" fill="url(#ai-grad)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="ai-grad">
            <stop offset="0" stopColor="#087F7F" />
            <stop offset="1" stopColor="#087F7F" />
          </radialGradient>
        </defs>
      </svg>

      {/* Left — text */}
      <div className="mx-auto my-auto max-w-md py-8 text-left sm:text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 sm:text-3xl">
          Three markets. Three platforms. One company building all of them.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          We build products for real estate, emerging markets, and capital
          networks — underpinned by applied AI research that we develop
          in-house.
        </p>
        <div className="mt-8">
          <a
            href="/research"
            className="group inline-flex items-center gap-x-2 rounded-lg bg-teal-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-white"
          >
            Learn more
            <svg
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right — staggered cards with beam connectors */}
      <div className="relative flex flex-col items-center py-8 lg:py-12">
        {capabilities.map((cap, i) => (
          <div key={i} className="flex w-full flex-col items-center">
            <motion.div
              className={`z-10 flex w-64 flex-col rounded-xl bg-white/50 p-5 shadow-lg ring-1 ring-white/5 backdrop-blur-xl ${
                i === 0
                  ? "self-start"
                  : i === 1
                    ? "self-center lg:ml-8"
                    : "self-start"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div>{cap.icon}</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {cap.text}
              </p>
            </motion.div>

            {i < capabilities.length - 1 && (
              <BeamConnector
                delay={i * 2}
                path={
                  i === 0
                    ? "M85 0 C85 30 150 30 150 60"
                    : "M150 0 C150 30 85 30 85 60"
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
