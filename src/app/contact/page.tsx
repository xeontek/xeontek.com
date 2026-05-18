import {
  MapPin,
  Envelope,
  LinkedinLogo,
  Clock,
  ChatCircleText,
  Handshake,
  BookOpenText,
  UserCirclePlus,
  CheckCircle,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  ShieldWarning,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ContactForm } from "@/components/ui/contact-form";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { company, registeredOfficeText } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with XeonTek. General enquiries, partnership opportunities, or just to say hello.",
  path: "/contact",
});

const enquiryTypes = [
  {
    icon: ChatCircleText,
    title: "General enquiries",
    description:
      "Questions about XeonTek, our platforms, research, or company information.",
  },
  {
    icon: Handshake,
    title: "Partnership conversations",
    description:
      "Relevant data, distribution, market access, or ecosystem partnerships linked to property, emerging markets, or capital networks.",
  },
  {
    icon: BookOpenText,
    title: "Research discussions",
    description:
      "Follow-up questions about our whitepapers, market analysis, AI research, or product direction.",
  },
  {
    icon: UserCirclePlus,
    title: "Careers and introductions",
    description:
      "Speculative applications, founder introductions, investor-network conversations, or people interested in what we are building.",
  },
];

const messageChecklist = [
  "Who you are and the organisation you represent, if any.",
  "What market, product area, or research topic your message relates to.",
  "Whether your enquiry is time-sensitive.",
  "Any relevant links, context, or documents that will help us understand the request.",
  "For recruitment enquiries, the type of role or collaboration you are interested in.",
];

const nextSteps = [
  {
    icon: NumberCircleOne,
    title: "We review the message",
    description:
      "Your enquiry is routed to the relevant XeonTek mailbox and reviewed by the appropriate person.",
  },
  {
    icon: NumberCircleTwo,
    title: "We decide the best response",
    description:
      "Some enquiries need a direct reply, some need internal review, and some may be better suited to a future conversation.",
  },
  {
    icon: NumberCircleThree,
    title: "We respond where relevant",
    description:
      "We aim to respond within 24 hours, but complex or speculative enquiries may take longer.",
  },
];

const contactBoundaries = [
  {
    title: "Security issues",
    description:
      "Please report security issues to security@xeontek.com so they can be handled through the right route.",
  },
  {
    title: "Legal notices",
    description:
      "Formal legal notices should be sent to legal@xeontek.com or to the registered office where required.",
  },
  {
    title: "Sales spam",
    description:
      "Unsolicited mass sales messages, list purchases, and unrelated outreach are unlikely to receive a response.",
  },
  {
    title: "Sensitive personal data",
    description:
      "Please avoid sending special category personal data or confidential information unless we have specifically asked for it.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero + Form */}
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — headline + details */}
            <div>
              <HeroStagger>
                <HeroItem>
                  <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                    Contact
                  </p>
                </HeroItem>
                <HeroItem>
                  <h1 className="mt-3">Get in touch</h1>
                </HeroItem>
                <HeroItem>
                  <p className="mt-4 max-w-lg text-lg text-slate-500">
                    Questions, ideas, or just curious about what we do —
                    we&apos;d be happy to hear from you.
                  </p>
                </HeroItem>
              </HeroStagger>

              {/* Contact details — compact inline */}
              <StaggerChildren className="mt-10 space-y-5" stagger={0.1}>
                <StaggerItem>
                  <a
                    href="mailto:enquiries@xeontek.com"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors duration-150 group-hover:bg-teal-100">
                      <Envelope size={18} />
                    </span>
                    <span className="text-sm text-slate-600 transition-colors duration-150 group-hover:text-teal-800">
                      enquiries@xeontek.com
                    </span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <MapPin size={18} />
                    </span>
                    <span className="text-sm text-slate-600">
                      London, United Kingdom
                    </span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href="https://www.linkedin.com/company/xeontek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors duration-150 group-hover:bg-teal-100">
                      <LinkedinLogo size={18} />
                    </span>
                    <span className="text-sm text-slate-600 transition-colors duration-150 group-hover:text-teal-800">
                      linkedin.com/company/xeontek
                    </span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Clock size={18} />
                    </span>
                    <span className="text-sm text-slate-600">
                      We typically respond within 24 hours
                    </span>
                  </div>
                </StaggerItem>
              </StaggerChildren>
            </div>

            {/* Right — Form */}
            <FadeIn direction="right" delay={0.2}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl">Send us a message</h2>
                <p className="mt-2 text-sm text-slate-500">
                  We&apos;ll get back to you as soon as we can.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Enquiry types */}
      <section className="border-y border-slate-100 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Enquiries
              </p>
              <h2 className="mt-3">What to contact us about</h2>
            </div>
          </FadeIn>

          <StaggerChildren
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
            stagger={0.1}
          >
            {enquiryTypes.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
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
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Before you write */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <FadeIn>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Before you write
              </p>
              <h2 className="mt-3">A few useful details to include</h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                A little context helps us route the message properly and respond
                with something useful.
              </p>
            </FadeIn>

            <FadeIn>
              <ul className="space-y-4">
                {messageChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-teal-700"
                      weight="duotone"
                    />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
              Process
            </p>
            <h2 className="mt-3">What happens next</h2>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {nextSteps.map(({ icon: Icon, title, description }) => (
              <FadeIn key={title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon size={28} className="text-teal-700" weight="duotone" />
                  <h3 className="mt-5 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Boundaries */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Contact boundaries
              </p>
              <h2 className="mt-3">What this form is not for</h2>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactBoundaries.map(({ title, description }) => (
              <FadeIn key={title}>
                <div className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-6">
                  <ShieldWarning
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy reassurance */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="grid grid-cols-1 gap-8 border-y border-slate-200 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                  Message handling
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl">
                  How we handle messages
                </h2>
                <p className="mt-4 leading-relaxed text-slate-500">
                  We use the information you submit to review and respond to
                  your enquiry. Contact and recruitment messages are handled
                  according to our Privacy Policy and are not used to train AI
                  models.
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

      {/* Address — full width strip */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <FadeIn>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                Registered address
              </p>
              <address className="text-sm text-slate-500 not-italic">
                {company.name}, company number {company.registrationNumber},{" "}
                registered in {company.registrationJurisdiction}. Registered
                office: {registeredOfficeText}.
              </address>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
