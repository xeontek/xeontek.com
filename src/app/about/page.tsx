import type { Metadata } from "next";
import {
  Target,
  HandHeart,
  Scales,
  MapPin,
  Users,
  Calendar,
  Buildings,
  Globe,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { AiCapabilities } from "@/components/ui/ai-capabilities";

export const metadata: Metadata = {
  title: "About",
  description:
    "XeonTek is a self-funded technology company building platforms for property analytics, investment intelligence, and capital networks. Founded in London, 2013.",
};

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
  { label: "Markets", value: "Property, Emerging, Capital", icon: Globe },
  { label: "Model", value: "Self-funded", icon: Users },
];

const expertise = [
  {
    icon: Buildings,
    title: "Property Platforms",
    description:
      "Aggregating real estate market data and connecting investors, buyers, and tenants with property providers across fragmented markets.",
  },
  {
    icon: Globe,
    title: "Emerging Market Intelligence",
    description:
      "Tracking and analysing markets where reliable data is scarce — surfacing opportunities, risks, and regional trends to inform real decisions.",
  },
  {
    icon: Handshake,
    title: "Deal Flow & Capital Networks",
    description:
      "Platforms for angel investors, VCs, and investment networks — deal tracking, portfolio oversight, and matching between founders and capital.",
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
                About us
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-3 max-w-3xl">
                Built for depth, not scale.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-2xl text-lg text-slate-500">
                We&apos;re a self-funded technology company that builds its own
                platforms, powered by our own applied AI research. No clients,
                no investors — just focused engineering.
              </p>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      {/* AI Capabilities — prominent infographic */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <AiCapabilities />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <StaggerChildren className="grid grid-cols-2 divide-y divide-slate-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0" stagger={0.1}>
            {stats.map(({ label, value, icon: Icon }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-4 py-6 sm:justify-center sm:py-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">{value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2>Our story</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-5 text-slate-600 leading-relaxed">
              <p>
                XeonTek was founded in London in 2013. We started with a simple
                observation: the markets we cared about — property, emerging
                economies, early-stage investment — were full of fragmented data
                and disconnected people. The tools that existed were either too
                expensive, too generic, or built for a different era.
              </p>
              <p>
                So we started building our own. First in real estate, where we
                built platforms that aggregate market data and connect investors,
                buyers, and tenants with property providers. Then into emerging
                markets, where we track and analyse regions where reliable
                information is hardest to find. And more recently into capital
                networks, building tools that match founders with the right
                investors — angels, VCs, and syndicates.
              </p>
              <p>
                We&apos;re a self-funded company. We don&apos;t take on client
                work or outside investment. Everything we build is for our own
                product portfolio. This gives us the freedom to focus on getting
                things right rather than getting things shipped to meet someone
                else&apos;s deadline.
              </p>
              <p>
                Alongside our platforms, we invest in applied AI research —
                building our own models for pattern recognition, market
                analysis, and intelligent matching. This R&amp;D feeds directly
                into our products rather than existing as a separate initiative.
              </p>
              <p>
                Our team is small and technical. We value depth over breadth, and
                we&apos;d rather solve one problem well than five problems poorly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              What we build
            </p>
            <h2 className="mt-3">Platforms for three markets</h2>
          </FadeIn>

          <StaggerChildren className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.1} delay={0.1}>
            {expertise.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-xl border border-teal-200/60 bg-white p-6 transition-all duration-300 hover:border-teal-300 hover:shadow-md sm:p-8">
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

      {/* Values */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Our values
            </p>
            <h2 className="mt-3">What drives us</h2>
          </FadeIn>

          <StaggerChildren className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.1} delay={0.1}>
            {values.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-teal-200 hover:shadow-md">
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

      {/* Team & Location */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2>Team</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                XeonTek is led by two co-founders with backgrounds in software
                engineering and technology. Our team is small by design — we
                value focused execution over headcount.
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <h2>Location</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Registered in London, United Kingdom. Our team works remotely
                across the UK.
              </p>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                <address className="not-italic">
                  XeonTek Ltd, 27 Old Gloucester Street, London, WC1N 3AX
                </address>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
