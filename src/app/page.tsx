import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  ChartLine,
  Brain,
  Globe,
  MagnifyingGlass,
  Handshake,
  Database,
  Network,
  Stack,
  TrendUp,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react/dist/ssr";
import { getWhitepapers } from "@/lib/content";
import { HeroGrid } from "@/components/svg/hero-grid";
import { DataFlowGraphic } from "@/components/svg/data-flow";
import { NeuralNetworkGraphic } from "@/components/svg/neural-network";
import { ChartGraphic } from "@/components/svg/chart-graphic";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { FloatingStack } from "@/components/ui/floating-stack";

const focusAreas = [
  {
    icon: Buildings,
    title: "Property Platforms",
    description:
      "Platforms that aggregate real estate market data and connect investors, buyers, and tenants with property providers — making fragmented markets searchable and accessible.",
    graphic: DataFlowGraphic,
  },
  {
    icon: Brain,
    title: "Emerging Market Intelligence",
    description:
      "Data platforms that track and analyse emerging markets — using our own AI models to surface opportunities, risks, and trends across regions where reliable information is hardest to find.",
    graphic: NeuralNetworkGraphic,
  },
  {
    icon: ChartLine,
    title: "Deal Flow & Capital Intelligence",
    description:
      "Platforms for angel investors, VCs, and investment networks — deal tracking, portfolio oversight, and data-driven matching between founders and capital.",
    graphic: ChartGraphic,
  },
];

const marketDrivers = [
  {
    icon: Database,
    title: "Fragmented data",
    description:
      "We structure messy, distributed information into products that are searchable, comparable, and useful for decision-making.",
  },
  {
    icon: Network,
    title: "Relationship-heavy markets",
    description:
      "We build for markets where the right connection matters: investors and founders, buyers and providers, operators and local market knowledge.",
  },
  {
    icon: Stack,
    title: "Long-term product ownership",
    description:
      "We build and operate our own platforms, so engineering choices are shaped by durability, maintainability, and real usage.",
  },
];

const platformSteps = [
  {
    label: "01",
    title: "Collect",
    description:
      "We gather public, partner, and market-specific data from sources that are often inconsistent, incomplete, or difficult to compare.",
  },
  {
    label: "02",
    title: "Structure",
    description:
      "We normalise data into clear models, taxonomies, and workflows so users can search, filter, and compare information reliably.",
  },
  {
    label: "03",
    title: "Analyse",
    description:
      "We apply research methods and AI-assisted analysis to identify patterns, gaps, risks, and opportunities across markets.",
  },
  {
    label: "04",
    title: "Connect",
    description:
      "We turn intelligence into action by helping users find properties, understand markets, track deals, or connect with relevant counterparties.",
  },
];

const productThemes = [
  {
    icon: Buildings,
    title: "Property discovery and analytics",
    description:
      "Search, comparison, and market intelligence tools for real estate markets where supply, pricing, and provider data are fragmented.",
  },
  {
    icon: Globe,
    title: "Emerging market research systems",
    description:
      "Internal and external tools for tracking regional opportunities, macro indicators, sector signals, and local market risks.",
  },
  {
    icon: Handshake,
    title: "Capital network infrastructure",
    description:
      "Deal-flow, founder discovery, investor matching, and relationship intelligence for early-stage funding ecosystems.",
  },
  {
    icon: TrendUp,
    title: "AI-assisted financial modelling",
    description:
      "Research-led modelling workflows that help structure assumptions, compare scenarios, and explain drivers behind market or asset-level decisions.",
  },
];

export default function HomePage() {
  const whitepapers = getWhitepapers();

  return (
    <>
      {/* Hero — soft teal-to-white gradient */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-100 via-teal-50/50 to-white">
        <HeroGrid className="absolute inset-0 h-full w-full text-teal-600 opacity-15" />
        <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
          <HeroStagger className="max-w-3xl">
            <HeroItem>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Technology, engineered in-house
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-4 text-slate-800">
                Platforms engineered for clarity in complex markets.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                XeonTek is a self-funded technology company. We design,
                engineer, and operate our own platforms for property, emerging
                markets, and capital networks — backed by our own applied AI
                research.
              </p>
            </HeroItem>
            <HeroItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal-600"
                >
                  About us
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50"
                >
                  Read our research
                </Link>
              </div>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      {/* Market drivers */}
      <section className="border-y border-slate-100 bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <FadeIn>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Where we focus
              </p>
              <h2 className="mt-3">
                Built around markets where better software changes access
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                XeonTek focuses on markets where information is fragmented,
                workflows are manual, and good decisions depend on connecting
                data from many sources. Our work sits across property, emerging
                market intelligence, and capital networks, with applied AI used
                where it improves search, analysis, matching, or modelling.
              </p>
            </FadeIn>

            <StaggerChildren
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              stagger={0.1}
            >
              {marketDrivers.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title}>
                  <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm ring-1 ring-slate-200">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                What we build
              </p>
              <h2 className="mt-3">
                Three domains, one focus: making complex data useful
              </h2>
            </div>
          </FadeIn>

          <div className="mt-14 space-y-6">
            {focusAreas.map(
              ({ icon: Icon, title, description, graphic: Graphic }, i) => (
                <FadeIn key={title} delay={i * 0.1} distance={32}>
                  <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-teal-200 hover:shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div
                        className={`flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
                          i === 1 ? "lg:order-2" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                          <Icon size={22} weight="regular" />
                        </div>
                        <h3 className="mt-5 text-2xl">{title}</h3>
                        <p className="mt-3 leading-relaxed text-slate-500">
                          {description}
                        </p>
                      </div>
                      <div
                        className={`flex items-center justify-center bg-slate-50 p-8 lg:p-12 ${
                          i === 1 ? "lg:order-1" : ""
                        }`}
                      >
                        <Graphic className="w-full max-w-xs text-teal-700" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Platform process */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                How our platforms work
              </p>
              <h2 className="mt-3">
                From raw market signals to usable products
              </h2>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
            {platformSteps.map(({ label, title, description }) => (
              <FadeIn key={title}>
                <div className="h-full border-l border-teal-200 bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-semibold tracking-wider text-teal-700 uppercase">
                    {label}
                  </p>
                  <h3 className="mt-4 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — services overview */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                What we do
              </p>
              <h2 className="mt-3">How we deliver</h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                Each platform we build serves a specific market. These are the
                capabilities that run through all of them.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
            stagger={0.1}
          >
            <StaggerItem>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Globe size={22} />
                </div>
                <h3 className="mt-5 text-lg">Market Aggregation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  We pull together fragmented data from multiple sources —
                  property listings, market feeds, public records — into
                  unified, searchable platforms.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <MagnifyingGlass size={22} />
                </div>
                <h3 className="mt-5 text-lg">Research &amp; Intelligence</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Structured analysis of emerging markets where reliable data is
                  scarce. We surface trends, risks, and opportunities that
                  inform real decisions.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Handshake size={22} />
                </div>
                <h3 className="mt-5 text-lg">Network &amp; Matching</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Connecting the right people — investors to founders, buyers to
                  providers — through intelligent matching and deal flow tools.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* Product themes */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Current product themes
              </p>
              <h2 className="mt-3">
                Product themes we are actively developing
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
            stagger={0.1}
          >
            {productThemes.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex h-full gap-5 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Icon size={23} />
                  </div>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Engineering principles — marquee */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              What drives our engineering
            </p>
            <h2 className="mt-3">Principles, not shortcuts</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500">
              Being self-funded means we answer to the work, not to a board.
              That changes how we build — including our investment in applied AI
              research that feeds directly into our products.
            </p>
          </FadeIn>
          <div className="mt-14">
            <FloatingStack />
          </div>
        </div>
      </section>

      {/* Research bridge */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="grid grid-cols-1 gap-8 border-y border-slate-200 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                  Research in practice
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl">
                  Research is part of the build process
                </h2>
                <p className="mt-4 leading-relaxed text-slate-500">
                  Our whitepapers are not separate from our product work. They
                  document the market problems we are studying, the assumptions
                  we are testing, and the technical direction behind the
                  platforms we build.
                </p>
              </div>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal-600"
              >
                Explore the research library
                <MagnifyingGlassPlus size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Research */}
      {whitepapers.length > 0 && (
        <section className="bg-gradient-to-b from-white via-teal-50/60 to-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                    Published research
                  </p>
                  <h2 className="mt-3">Ideas we&apos;re exploring</h2>
                  <p className="mt-3 max-w-lg text-slate-500">
                    We publish our thinking on technology, data, and the
                    industries we work in. These papers reflect the problems
                    we&apos;re actively working on.
                  </p>
                </div>
                <Link
                  href="/research"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-teal-700 transition-colors duration-150 hover:text-teal-600"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>

            <StaggerChildren
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
              stagger={0.1}
            >
              {whitepapers.map((wp) => (
                <StaggerItem key={wp.slug}>
                  <Link
                    href={`/research/${wp.slug}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-teal-200 hover:shadow-sm"
                  >
                    <span className="inline-block rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                      Whitepaper
                    </span>
                    <h3 className="mt-3 text-lg leading-snug transition-colors duration-150 group-hover:text-teal-700">
                      {wp.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                      {wp.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Read more <ArrowRight size={12} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* Bottom CTA strip */}
      <section className="border-t border-slate-100 bg-slate-50">
        <FadeIn className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl">Have a question?</h2>
          <p className="mt-3 text-slate-500">
            We&apos;re always open to conversations about technology, data, and
            what we&apos;re building.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal-600"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
