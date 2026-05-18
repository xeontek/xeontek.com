import type { Metadata } from "next";
import { company, registeredOfficeText } from "@/lib/company";

export const siteUrl = "https://www.xeontek.com";
export const siteName = "XeonTek";
export const defaultTitle = "XeonTek — Financial Technology, London";
export const defaultDescription =
  "XeonTek is a London-based technology company building AI-driven platforms for property analytics, investment intelligence, and financial modelling.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const fullTitle = `${title} — ${siteName}`;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "website",
      locale: "en_GB",
      siteName,
      images: [{ url: "/poster.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/poster.png"],
    },
    robots: index ? undefined : { index: false, follow: true },
  };
}

export function SiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        legalName: company.name,
        url: siteUrl,
        logo: absoluteUrl("/icon-512.png"),
        foundingDate: "2013",
        identifier: company.registrationNumber,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.registeredOffice.line1,
          addressLocality: company.registeredOffice.city,
          postalCode: company.registeredOffice.postcode,
          addressCountry: "GB",
        },
        sameAs: ["https://www.linkedin.com/company/xeontek"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const companyLegalText = `${company.name}, company number ${company.registrationNumber}, registered in ${company.registrationJurisdiction}. Registered office: ${registeredOfficeText}.`;
