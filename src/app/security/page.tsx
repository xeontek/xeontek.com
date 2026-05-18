import { company, registeredOfficeText } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  description:
    "Security information for XeonTek's public website, including vulnerability reporting and hosting details.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Security</h1>
          <p className="mt-3 text-sm text-slate-400">
            Last updated: 18 May 2026
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <p>
            This page summarises the security posture for the public XeonTek
            website. Product-specific, client-specific, or service engagement
            security commitments are provided separately where applicable.
          </p>

          <h2>Website Security Model</h2>
          <p>
            This website is a static site hosted on Cloudflare Pages. It does
            not provide user accounts, payment processing, customer dashboards,
            or public APIs. The contact form is protected by Cloudflare
            Turnstile and delivered through a Cloudflare Worker.
          </p>

          <h2>Hosting and Subprocessors</h2>
          <p>
            Cloudflare provides hosting, CDN, security filtering, Turnstile bot
            protection, Worker runtime, and contact message routing for this
            website. Details about how website personal data is processed are in
            our <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>Vulnerability Disclosure</h2>
          <p>
            To report a security issue affecting this website, contact{" "}
            <a href="mailto:security@xeontek.com">security@xeontek.com</a>.
            Please include enough detail to reproduce the issue and avoid
            actions that could disrupt service, access data that is not yours,
            or test third-party systems without permission.
          </p>

          <h2>Current Public Assurance Position</h2>
          <p>
            This website does not claim that {company.name} is ISO/IEC 27001
            certified, ISO/IEC 27001 compliant, SOC 2 certified, or SOC 2
            audited. Any future certification, audit, or compliance statements
            should identify the exact entity, scope, dates, and evidence behind
            the claim.
          </p>

          <h2>Security Controls for This Website</h2>
          <ul>
            <li>Static deployment with no website user database</li>
            <li>TLS encryption in transit</li>
            <li>Cloudflare CDN and security services</li>
            <li>Cloudflare Turnstile protection on the contact form</li>
            <li>Security headers configured for the static site</li>
            <li>No analytics cookies or behavioural advertising cookies</li>
          </ul>

          <h2>Contact</h2>
          <address className="not-italic">
            {company.name}
            <br />
            Company number {company.registrationNumber}
            <br />
            Registered in {company.registrationJurisdiction}
            <br />
            {registeredOfficeText}
          </address>
        </div>
      </section>
    </>
  );
}
