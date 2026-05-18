import Link from "next/link";
import {
  ArrowUpRight,
  DownloadSimple,
  BookOpenText,
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
    </>
  );
}
