import Link from "next/link";
import {
  ArrowUpRight,
  DownloadSimple,
  BookOpenText,
  ChartLine,
  FlowArrow,
  Lightbulb,
  Strategy,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { getWhitepapers } from "@/lib/content";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import { absoluteUrl, pageMetadata, siteUrl } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "Papers and technical writing from the XeonTek team on AI applications in finance and real estate.",
  path: "/research",
});

const researchFocus = [
  {
    icon: FlowArrow,
    title: "Market structure",
    description:
      "How fragmented markets are organised, where reliable data exists, and where better software can reduce search and comparison costs.",
  },
  {
    icon: Lightbulb,
    title: "Applied AI",
    description:
      "How machine learning, language models, classification, and retrieval systems can support analysis, matching, and modelling workflows.",
  },
  {
    icon: ChartLine,
    title: "Financial modelling",
    description:
      "How assumptions, scenarios, and market signals can be structured into explainable models for research and decision support.",
  },
  {
    icon: Strategy,
    title: "Product strategy",
    description:
      "How research findings translate into platform features, data models, workflows, and long-term product direction.",
  },
];

const researchSteps = [
  {
    label: "01",
    title: "Start with a market problem",
    description:
      "We begin with a specific friction point: missing data, poor search, weak comparability, limited access, or a workflow that still depends on manual interpretation.",
  },
  {
    label: "02",
    title: "Map the data",
    description:
      "We identify available sources, gaps, quality issues, market definitions, and the assumptions needed before analysis can be useful.",
  },
  {
    label: "03",
    title: "Test the model",
    description:
      "We explore whether structured data, AI-assisted analysis, or workflow design can make the problem easier to understand or act on.",
  },
  {
    label: "04",
    title: "Feed it back into products",
    description:
      "The useful parts of the research become product requirements, data models, internal tools, or future platform capabilities.",
  },
];

const readingGuide = [
  {
    title: "For operators",
    description:
      "Look for workflow patterns, data gaps, and where software can reduce manual coordination.",
  },
  {
    title: "For investors",
    description:
      "Look for how market data, assumptions, and scenario structures can improve visibility, while remembering the papers are not investment recommendations.",
  },
  {
    title: "For technical readers",
    description:
      "Look for how we translate messy market problems into data models, retrieval workflows, matching systems, and explainable analysis.",
  },
];

const upcomingThemes = [
  {
    title: "Trustworthy AI in financial workflows",
    description:
      "How to keep AI-assisted analysis explainable, bounded, and useful without overstating automation.",
  },
  {
    title: "Emerging market data infrastructure",
    description:
      "How fragmented regional data can be collected, structured, and maintained over time.",
  },
  {
    title: "Private market discovery",
    description:
      "How founders, angels, VCs, and networks can use better data to improve deal discovery and relationship intelligence.",
  },
  {
    title: "Property market transparency",
    description:
      "How real estate search, valuation context, provider data, and local market signals can be made more accessible.",
  },
];

export default function ResearchPage() {
  const whitepapers = getWhitepapers();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research — XeonTek",
    url: `${siteUrl}/research`,
    hasPart: whitepapers.map((wp) => ({
      "@type": "CreativeWork",
      name: wp.title,
      description: wp.description,
      datePublished: wp.publishedDate,
      url: wp.readLink ? absoluteUrl(wp.readLink) : `${siteUrl}/research`,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <HeroStagger>
            <HeroItem>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Research
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-3 max-w-3xl">Papers and technical writing</h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-2xl text-lg text-slate-500">
                We publish our thinking on AI applications in finance and real
                estate. These papers reflect the problems we&apos;re actively
                working on.
              </p>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      {/* Research focus */}
      <section className="border-y border-slate-100 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Research focus
              </p>
              <h2 className="mt-3">
                Research that feeds directly into product work
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                Our research is practical rather than academic. Each paper
                starts from a market or product problem we are actively
                studying: how to model fragmented real estate data, how to
                evaluate emerging market signals, how to connect capital with
                opportunity, or how AI can support financial analysis without
                replacing human judgement.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {researchFocus.map(({ icon: Icon, title, description }) => (
              <FadeIn key={title}>
                <div className="flex h-full gap-5 rounded-xl border border-slate-200 bg-slate-50/70 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm ring-1 ring-slate-200">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Research approach */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Method
            </p>
            <h2 className="mt-3">How we approach research</h2>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {researchSteps.map(({ label, title, description }) => (
              <FadeIn key={title}>
                <div className="grid grid-cols-1 gap-4 border-l-2 border-teal-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-[5rem_1fr]">
                  <p className="text-xs font-semibold tracking-wider text-teal-700 uppercase">
                    {label}
                  </p>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6">
            {whitepapers.map((wp, i) => (
              <FadeIn key={wp.slug} delay={i * 0.1} distance={32}>
                <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto]">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2">
                        <BookOpenText size={14} className="text-teal-700" />
                        <span className="text-xs font-medium tracking-wider text-teal-700 uppercase">
                          Whitepaper
                        </span>
                        {wp.publishedDate && (
                          <span className="text-xs text-slate-400">
                            {new Intl.DateTimeFormat("en-GB", {
                              month: "long",
                              year: "numeric",
                            }).format(new Date(wp.publishedDate))}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-3 text-xl sm:text-2xl">{wp.title}</h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-slate-500">
                        {wp.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        {wp.readLink && (
                          <Link
                            href={`/research/${wp.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800 transition-colors duration-150 hover:bg-teal-100"
                          >
                            Details
                            <ArrowUpRight size={14} />
                          </Link>
                        )}
                        {wp.btnLink && (
                          <a
                            href={wp.btnLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:border-slate-300 hover:bg-slate-50"
                          >
                            <DownloadSimple size={14} />
                            {wp.btnTitle ?? "Download"}
                          </a>
                        )}
                      </div>
                    </div>
                    {/* Side accent bar */}
                    <div className="hidden w-1.5 bg-gradient-to-b from-teal-400 to-teal-600 lg:block" />
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-500">
            Our research is provided for general information only. It is not
            financial, legal, investment, or professional advice, and should not
            be relied upon as a recommendation to make investment decisions.
          </p>
        </div>
      </section>

      {/* Reading guide */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Reading guide
              </p>
              <h2 className="mt-3">How to read our papers</h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                The papers are designed to explain the direction of our
                thinking, not to provide financial, legal, investment, or
                professional advice. They should be read as product and market
                research: useful for understanding a problem space, but not a
                substitute for independent assessment.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {readingGuide.map(({ title, description }) => (
              <FadeIn key={title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming themes */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Next themes
              </p>
              <h2 className="mt-3">Themes we expect to explore next</h2>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcomingThemes.map(({ title, description }) => (
              <FadeIn key={title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <WarningCircle size={22} />
                  </div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
