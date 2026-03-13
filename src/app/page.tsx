import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  ChartLine,
  Brain,
  Globe,
  MagnifyingGlass,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { getWhitepapers } from "@/lib/content";
import { HeroGrid } from "@/components/svg/hero-grid";
import { DataFlowGraphic } from "@/components/svg/data-flow";
import { NeuralNetworkGraphic } from "@/components/svg/neural-network";
import { ChartGraphic } from "@/components/svg/chart-graphic";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
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
                XeonTek is a self-funded technology company. We design, engineer,
                and operate our own platforms for property, emerging markets,
                and capital networks — backed by our own applied AI research.
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

      {/* Focus Areas */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                What we build
              </p>
              <h2 className="mt-3">Three domains, one focus: making complex data useful</h2>
            </div>
          </FadeIn>

          <div className="mt-14 space-y-6">
            {focusAreas.map(({ icon: Icon, title, description, graphic: Graphic }, i) => (
              <FadeIn key={title} delay={i * 0.1} distance={32}>
                <div
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-teal-200 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className={`flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
                      i === 1 ? "lg:order-2" : ""
                    }`}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                        <Icon size={22} weight="regular" />
                      </div>
                      <h3 className="mt-5 text-2xl">{title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-500">
                        {description}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center bg-slate-50 p-8 lg:p-12 ${
                      i === 1 ? "lg:order-1" : ""
                    }`}>
                      <Graphic className="w-full max-w-xs text-teal-700" />
                    </div>
                  </div>
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

          <StaggerChildren className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.1}>
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
                  Structured analysis of emerging markets where reliable data
                  is scarce. We surface trends, risks, and opportunities that
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
                  Connecting the right people — investors to founders, buyers
                  to providers — through intelligent matching and deal flow
                  tools.
                </p>
              </div>
            </StaggerItem>
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
            <h2 className="mt-3">
              Principles, not shortcuts
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500">
              Being self-funded means we answer to the work, not to a board.
              That changes how we build — including our investment in applied
              AI research that feeds directly into our products.
            </p>
          </FadeIn>
          <div className="mt-14">
            <FloatingStack />
          </div>
        </div>
      </section>

      {/* Research */}
      {whitepapers.length > 0 && (
        <section className="bg-gradient-to-b from-white via-teal-50/60 to-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                    Published research
                  </p>
                  <h2 className="mt-3">Ideas we&apos;re exploring</h2>
                  <p className="mt-3 max-w-lg text-slate-500">
                    We publish our thinking on technology, data, and the industries
                    we work in. These papers reflect the problems we&apos;re actively
                    working on.
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

            <StaggerChildren className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.1}>
              {whitepapers.map((wp) => (
                <StaggerItem key={wp.slug}>
                  <Link
                    href="/research"
                    className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-teal-200 hover:shadow-sm"
                  >
                    <span className="inline-block rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                      Whitepaper
                    </span>
                    <h3 className="mt-3 text-lg leading-snug group-hover:text-teal-700 transition-colors duration-150">
                      {wp.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-3">
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
