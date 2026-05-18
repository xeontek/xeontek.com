import { getJobs } from "@/lib/content";
import { HeroStagger, HeroItem } from "@/components/motion/hero-entrance";
import { FadeIn } from "@/components/motion/fade-in";
import { pageMetadata } from "@/lib/seo";
import { CareersBoard } from "@/components/ui/careers-board";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Career opportunities at XeonTek. We're building AI-driven financial platforms in London.",
  path: "/careers",
});

export default function CareersPage() {
  const jobs = getJobs();
  const openJobs = jobs
    .filter((j) => j.status === "open")
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
  const careerJobs = openJobs.map((job) => ({
    slug: job.slug,
    title: job.title,
    description: job.description,
    location: job.location,
    type: job.type,
    focus: job.focus,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
  }));

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
                We&apos;re a small, self-funded team building AI-driven
                platforms across property, market intelligence, and capital
                networks. We work remotely, move deliberately, and value people
                who care about the quality of what they build.
              </p>
            </HeroItem>
          </HeroStagger>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
                Open positions
              </p>
              <h2 className="mt-3">Current roles</h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                Select a role to view the details and apply directly with your
                CV.
              </p>
            </div>
          </FadeIn>
          <CareersBoard jobs={careerJobs} />
        </div>
      </section>
    </>
  );
}
