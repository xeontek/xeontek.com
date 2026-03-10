import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  ChartLine,
  Brain,
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
    title: "Property Analytics",
    description:
      "Platforms that process property market data — valuations, yields, transaction histories, and market indicators — into structured, queryable systems that surface patterns manual analysis misses.",
    graphic: DataFlowGraphic,
  },
  {
    icon: Brain,
    title: "Investment Intelligence",
    description:
      "Models for investment risk assessment, portfolio analysis, and market forecasting. Designed for explainability — every prediction is traceable to the data and logic behind it.",
    graphic: NeuralNetworkGraphic,
  },
  {
    icon: ChartLine,
    title: "Financial Modelling",
    description:
      "Tools that handle multi-variable projections, sensitivity analysis, and Monte Carlo simulations — presented through clear, interactive interfaces.",
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
                Est. 2013 &mdash; London
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-4 text-slate-800">
                We build software that makes sense of financial data.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                XeonTek is a self-funded technology company. We design, engineer,
                and operate our own AI-driven platforms for property analytics,
                investment intelligence, and financial modelling.
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
              <h2 className="mt-3">Three domains, one focus: financial intelligence</h2>
            </div>
          </FadeIn>

          <div className="mt-14 space-y-6">
            {focusAreas.map(({ icon: Icon, title, description, graphic: Graphic }, i) => (
              <FadeIn key={title} delay={i * 0.1} distance={32}>
                <div
                  className={`group overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:border-teal-200 hover:shadow-lg ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                        <Icon size={22} weight="regular" />
                      </div>
                      <h3 className="mt-5 text-2xl">{title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-500">
                        {description}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center p-8 ${
                      i % 2 === 0 ? "bg-slate-50" : "bg-white"
                    } lg:p-12`}>
                      <Graphic className="w-full max-w-xs text-teal-700" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technology — soft slate section with marquee */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Our stack
            </p>
            <h2 className="mt-3">
              Built on technologies we trust
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500">
              We work primarily in Python and TypeScript. Our stack reflects
              what we&apos;ve found to be reliable and maintainable at our
              scale — tools chosen for long-term viability, not hype.
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
                    We publish our thinking on AI applications in finance and real
                    estate. These papers reflect the problems we&apos;re actively
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
            financial systems.
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
