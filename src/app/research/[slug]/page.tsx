import { notFound } from "next/navigation";
import { ArrowLeft, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getWhitepaper, getWhitepapers } from "@/lib/content";
import { absoluteUrl, pageMetadata, siteUrl } from "@/lib/seo";

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
    encoding: whitepaper.readLink
      ? {
          "@type": "MediaObject",
          contentUrl: absoluteUrl(whitepaper.readLink),
          encodingFormat: "application/pdf",
        }
      : undefined,
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
          {whitepaper.readLink && (
            <a
              href={whitepaper.readLink}
              className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal-600"
            >
              <DownloadSimple size={16} />
              Read PDF
            </a>
          )}
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <p>
            This paper is published as part of XeonTek&apos;s research into
            applied AI, data platforms, and market intelligence.
          </p>
          <p>
            It is provided for general information only. It is not financial,
            legal, investment, or professional advice, and should not be relied
            upon as a recommendation to make investment decisions.
          </p>
        </div>
      </section>
    </>
  );
}
