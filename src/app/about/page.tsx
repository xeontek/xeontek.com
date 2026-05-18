import {
  Target,
  HandHeart,
  Scales,
  MapPin,
  Users,
  Calendar,
  Globe,
  Compass,
  Code,
  ShieldCheck,
  Brain,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { company, registeredOfficeText } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Company information for XeonTek, a self-funded UK technology company founded in London in 2013.",
  path: "/about",
});

const values = [
  {
    icon: Target,
    title: "Depth over breadth",
    description:
      "We specialise. Our domain is complex data and the systems that make it useful. We don't chase trends or pivot to whatever's popular.",
  },
  {
    icon: HandHeart,
    title: "Ownership",
    description:
      "We build, operate, and maintain our own platforms. There's no gap between the team that writes the code and the team that lives with it.",
  },
  {
    icon: Scales,
    title: "Rigour",
    description:
      "Every model is tested. Every system is monitored. Every decision is documented. We hold our own work to the standard we'd expect from anyone else.",
  },
];

const stats = [
  { label: "Founded", value: "2013", icon: Calendar },
  { label: "Headquarters", value: "London, UK", icon: MapPin },
  { label: "Focus", value: "Product company", icon: Globe },
  { label: "Model", value: "Self-funded", icon: Users },
];

const operatingModel = [
  {
    icon: Users,
    title: "Self-funded",
    description:
      "We are not optimising for investor milestones or short-term fundraising narratives.",
  },
  {
    icon: Compass,
    title: "Product-led",
    description: "We build platforms we own, improve, and operate over time.",
  },
  {
    icon: Brain,
    title: "Research-backed",
    description:
      "Our AI and data work starts from specific market problems, not generic technology demos.",
  },
  {
    icon: Code,
    title: "Engineering-led",
    description:
      "Architecture, maintainability, and reliability matter because we live with the systems we build.",
  },
];

const timeline = [
  {
    title: "2013",
    description:
      "XeonTek founded in London as a software company focused on building durable technology products.",
  },
  {
    title: "Property platforms",
    description:
      "Early work focused on real estate data, property discovery, and connecting users with providers in fragmented markets.",
  },
  {
    title: "Market intelligence",
    description:
      "The company expanded its research and data work into emerging markets where reliable information is harder to access.",
  },
  {
    title: "Capital networks",
    description:
      "XeonTek began developing tools around deal flow, founder discovery, investor matching, and early-stage market intelligence.",
  },
  {
    title: "Applied AI research",
    description:
      "AI research became a core part of the product process, supporting modelling, classification, matching, and market analysis.",
  },
];

const notUs = [
  {
    title: "Not an agency",
    description:
      "We do not position the company around client delivery or outsourced development work.",
  },
  {
    title: "Not a consultancy wrapper",
    description:
      "Our research exists to support products, not to create slide decks without implementation.",
  },
  {
    title: "Not an AI gimmick company",
    description:
      "We use AI where it improves a workflow, model, search experience, or analytical process. We do not treat it as a substitute for domain understanding.",
  },
  {
    title: "Not chasing every market",
    description:
      "We focus on property, emerging market intelligence, and capital networks because these domains share similar data and relationship problems.",
  },
];

const decisionCriteria = [
  {
    title: "Market complexity",
    description:
      "Is the problem difficult because data, workflows, or relationships are fragmented?",
  },
  {
    title: "User value",
    description:
      "Does better software materially improve search, comparison, decision-making, or access?",
  },
  {
    title: "Compounding advantage",
    description:
      "Does the platform become stronger as its data, models, and workflows mature?",
  },
  {
    title: "Responsible use",
    description:
      "Can we build the product without overstating what automation or AI can safely decide?",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <HeroStagger>
            <HeroItem>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Company
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-3 max-w-3xl">
                The company behind the platforms.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-2xl text-lg text-slate-500">
                XeonTek is a self-funded UK technology company founded in London
                in 2013. We build and operate our own products, with a small
                technical team and a long-term view of the systems we create.
              </p>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <StaggerChildren
            className="grid grid-cols-2 divide-y divide-slate-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0"
            stagger={0.1}
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-4 py-6 sm:justify-center sm:py-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">
                      {value}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Operating model */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr]">
            <FadeIn>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Operating model
              </p>
              <h2 className="mt-3">How we operate</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                XeonTek is intentionally small, technical, and product-led. We
                do not separate research, engineering, and operations into
                disconnected functions. The same thinking that shapes a market
                thesis also shapes the data model, user workflow,
                infrastructure, and long-term maintenance plan.
              </p>
            </FadeIn>

            <StaggerChildren
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              stagger={0.1}
            >
              {operatingModel.map(({ icon: Icon, title, description }) => (
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

      {/* Story */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2>Our story</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
              <p>
                XeonTek was founded in London in 2013. We started with a simple
                observation: important markets were still being served by
                fragmented data, manual workflows, and tools that were either
                too generic or built for a different era.
              </p>
              <p>
                Rather than building around client projects, we chose to build
                our own portfolio of products. That operating model gives us
                room to work on difficult data problems, revisit assumptions,
                and improve the same systems over time.
              </p>
              <p>
                We&apos;re a self-funded company. We don&apos;t take on client
                work or outside investment. Everything we build is for our own
                product portfolio. This gives us the freedom to focus on getting
                things right rather than getting things shipped to meet someone
                else&apos;s deadline.
              </p>
              <p>
                Alongside product engineering, we invest in applied AI and data
                research where it supports a real product workflow. That work
                feeds into product decisions rather than sitting apart as a
                separate research initiative.
              </p>
              <p>
                Our team is small and technical. We value depth over breadth,
                and we&apos;d rather solve one problem well than five problems
                poorly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Timeline
            </p>
            <h2 className="mt-3">A long-term company, built deliberately</h2>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {timeline.map(({ title, description }) => (
              <FadeIn key={title}>
                <div className="grid grid-cols-1 gap-4 border-l-2 border-teal-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-[12rem_1fr] sm:items-start">
                  <h3 className="text-lg text-teal-800">{title}</h3>
                  <p className="leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning clarity */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Focus
              </p>
              <h2 className="mt-3">What we are not</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Being clear about what we do not do is part of staying focused.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            stagger={0.1}
          >
            {notUs.map(({ title, description }) => (
              <StaggerItem key={title}>
                <div className="flex h-full gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <XCircle
                    size={22}
                    className="mt-0.5 shrink-0 text-slate-400"
                    weight="duotone"
                  />
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

      {/* Decision criteria */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr]">
            <FadeIn>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Product decisions
              </p>
              <h2 className="mt-3">How we make product decisions</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                We prioritise problems that meet three tests: the market is
                underserved by existing software, the data is difficult enough
                to require deep modelling, and the product can become more
                useful over time as its knowledge base improves.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {decisionCriteria.map(({ title, description }) => (
                <FadeIn key={title}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <CheckCircle
                      size={22}
                      className="text-teal-700"
                      weight="duotone"
                    />
                    <h3 className="mt-4 text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Our values
            </p>
            <h2 className="mt-3">What drives us</h2>
          </FadeIn>

          <StaggerChildren
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
            stagger={0.1}
            delay={0.1}
          >
            {values.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
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
      </section>

      {/* Trust and governance */}
      <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <ShieldCheck size={24} />
                </div>
                <p className="mt-6 text-sm font-medium tracking-wider text-teal-700 uppercase">
                  Trust and governance
                </p>
                <h2 className="mt-3">Trust, security, and responsible AI</h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                  As XeonTek&apos;s platforms develop, we are building the
                  internal foundations needed for responsible operation: clear
                  data handling, security controls, AI governance, and
                  product-specific documentation. The public website does not
                  provide an AI system or make automated decisions about
                  visitors.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:max-w-xs lg:justify-end">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/security", label: "Security" },
                  { href: "/terms", label: "Terms of Use" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:border-teal-300 hover:text-teal-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team & Location */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2>Team</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                XeonTek is led by two co-founders with backgrounds in software
                engineering and technology. Our team is small by design — we
                value focused execution over headcount.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <h2>Location</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {company.name} is registered in{" "}
                {company.registrationJurisdiction}. Our team works remotely
                across the UK.
              </p>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                <address className="not-italic">
                  {company.name}, company number {company.registrationNumber},{" "}
                  {registeredOfficeText}
                </address>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
