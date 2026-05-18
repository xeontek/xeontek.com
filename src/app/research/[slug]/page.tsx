import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getWhitepaper, getWhitepapers } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { WhitepaperViewer } from "@/components/ui/whitepaper-viewer";

export function generateStaticParams() {
  return getWhitepapers().map((whitepaper) => ({
    slug: whitepaper.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const whitepaper = getWhitepaper(slug);

  if (!whitepaper) {
    return pageMetadata({
      title: "Research",
      description:
        "Papers and technical writing from the XeonTek team on AI applications in finance and real estate.",
      path: "/research",
    });
  }

  return pageMetadata({
    title: whitepaper.title,
    description: whitepaper.description,
    path: `/research/${whitepaper.slug}`,
  });
}

export default async function WhitepaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const whitepaper = getWhitepaper(slug);

  if (!whitepaper) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: whitepaper.title,
    description: whitepaper.description,
    datePublished: whitepaper.publishedDate,
    url: `${siteUrl}/research/${whitepaper.slug}`,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-800 hover:text-teal-700"
          >
            <ArrowLeft size={14} />
            Research
          </Link>
          <p className="mt-8 text-sm font-medium tracking-wider text-teal-700 uppercase">
            Whitepaper
          </p>
          <h1 className="mt-3">{whitepaper.title}</h1>
          {whitepaper.publishedDate && (
            <p className="mt-4 text-sm text-slate-400">
              Published{" "}
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(whitepaper.publishedDate))}
            </p>
          )}
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {whitepaper.description}
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-slate prose-sm max-w-none">
            <h2>Summary</h2>
            {(whitepaper.summary ?? []).length > 0 ? (
              whitepaper.summary?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            ) : (
              <p>
                This paper is published as part of XeonTek&apos;s research into
                applied AI, data platforms, and market intelligence.
              </p>
            )}
          </div>

          {(whitepaper.keyPoints ?? []).length > 0 && (
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl">Key points</h2>
              <ul className="mt-5 space-y-3">
                {whitepaper.keyPoints?.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-teal-700"
                      weight="duotone"
                    />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 border-t border-slate-200 pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
              This research is provided for general information only. It is not
              financial, legal, investment, or professional advice, and should
              not be relied upon as a recommendation to make investment
              decisions.
            </p>
            {whitepaper.readLink && (
              <div className="mt-6">
                <WhitepaperViewer
                  title={whitepaper.title}
                  pdfUrl={whitepaper.readLink}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
