import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getJobs } from "@/lib/content";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Career opportunities at XeonTek. We're building AI-driven financial platforms in London.",
};

export default function CareersPage() {
  const jobs = getJobs();
  const openJobs = jobs.filter((j) => j.status === "open");

  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <HeroStagger>
            <HeroItem>
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Careers
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="mt-3 max-w-3xl">Work with us</h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-4 max-w-2xl text-lg text-slate-500">
                We&apos;re a small, self-funded team building AI-driven financial
                platforms. We work remotely, move deliberately, and value people who
                care about the quality of what they build.
              </p>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          {openJobs.length > 0 ? (
            <div className="space-y-4">
              {openJobs.map((job, i) => (
                <FadeIn key={job.slug} delay={i * 0.1}>
                  <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-lg sm:items-center sm:p-8">
                    <div>
                      <h3 className="text-lg">{job.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {job.description}
                      </p>
                    </div>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800 transition-colors duration-150 hover:bg-teal-100"
                    >
                      Apply
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center sm:p-12">
                <p className="text-slate-600">
                  We don&apos;t have open positions at the moment.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  If you&apos;re interested in future opportunities, connect with
                  us on{" "}
                  <a
                    href="https://www.linkedin.com/company/xeontek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal-800 hover:text-teal-700"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
