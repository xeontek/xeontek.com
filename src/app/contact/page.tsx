import type { Metadata } from "next";
import {
  MapPin,
  Envelope,
  LinkedinLogo,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/ui/contact-form";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with XeonTek. General enquiries, partnership opportunities, or just to say hello.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;

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
                    Questions, ideas, or just curious about what we do — we&apos;d be
                    happy to hear from you.
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
                  <ContactForm subject={subject} />
                </div>
              </div>
            </FadeIn>
          </div>
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
              <address className="text-sm not-italic text-slate-500">
                XeonTek Ltd, 27 Old Gloucester Street, London, WC1N 3AX, United Kingdom
              </address>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
