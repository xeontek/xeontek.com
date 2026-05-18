import { company, registeredOfficeText } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "XeonTek terms of use governing access to our website.",
  path: "/terms",
  index: false,
});

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Terms of Use</h1>
          <p className="mt-3 text-sm text-slate-400">
            Last updated: 18 May 2026
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <p>
            Welcome to the website of {company.name} (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;), a company registered in{" "}
            {company.registrationJurisdiction} with company number{" "}
            {company.registrationNumber} and registered office at{" "}
            {registeredOfficeText}. By accessing or using this website, you
            agree to be bound by these Terms of Use.
          </p>
          <p>
            These Terms of Use apply only to this public website and its
            publicly available content. They do not govern paid services, hosted
            products, APIs, client software development engagements, support
            commitments, service levels, or data processing obligations. Those
            matters must be covered by separate written agreements.
          </p>

          <h2>1. Website Terms Only</h2>
          <p>
            Information about our services, products, research, or capabilities
            on this website is provided for general informational purposes. It
            is not an offer to supply services on these terms, and it does not
            create an obligation to provide any product, platform, API,
            software, maintenance, uptime, security assurance, or professional
            service.
          </p>

          <h2>2. Use of Site</h2>
          <p>
            You agree to use this website for lawful purposes only and in a
            manner that does not infringe the rights of, restrict, or inhibit
            anyone else&apos;s use of the site.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos,
            research papers, and software, is the property of XeonTek Ltd and is
            protected by applicable intellectual property laws. You may not
            reproduce, distribute, or create derivative works without our prior
            written consent.
          </p>

          <h2>4. User Content</h2>
          <p>
            By submitting content through our website (such as contact form
            messages), you grant us a non-exclusive licence to use that content
            for the purpose of responding to your enquiry. We process this data
            in accordance with our <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Attempt to gain unauthorised access to our systems or
              infrastructure
            </li>
            <li>Transmit malware, viruses, or other malicious code</li>
            <li>
              Scrape, crawl, or harvest data from our website by automated means
            </li>
            <li>
              Use the site for any activity that is unlawful under the laws of
              England and Wales
            </li>
          </ul>

          <h2>6. Artificial Intelligence</h2>
          <p>
            XeonTek develops AI-driven products and services, but this public
            website does not provide an AI system to visitors and does not make
            automated decisions about you. Any AI-generated or AI-assisted
            content, analysis, or outputs provided through separate XeonTek
            products or platforms are governed by the relevant product terms and
            documentation.
          </p>
          <p>
            Unless expressly agreed in separate written terms, website content
            and research papers are for general information only and do not
            constitute financial, legal, investment, or other professional
            advice. Nothing on this website should be treated as a
            recommendation to buy, sell, invest, lend, or enter into any
            transaction.
          </p>

          <h2>7. Disclaimers</h2>
          <p>
            This website and its content are provided on an &quot;as is&quot;
            and &quot;as available&quot; basis. To the extent permitted by law,
            we disclaim all warranties, whether express or implied, including
            implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
          <p>
            The research papers and whitepapers published on this website
            represent our views at the time of publication and should not be
            relied upon as professional advice.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by the laws of England and Wales,
            XeonTek Ltd shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from or related
            to your use of this website, including but not limited to reliance
            on any content, research, or information published on this website.
          </p>
          <p>
            Nothing in these Terms excludes or limits our liability for death or
            personal injury caused by negligence, fraud or fraudulent
            misrepresentation, or any other liability that cannot be excluded or
            limited by English law.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites. We are not
            responsible for the content, privacy practices, or availability of
            those sites. Accessing them is at your own risk.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms of Use from time to time. Any changes will
            be posted on this page with an updated &quot;Last updated&quot;
            date. Continued use of the site after changes are posted constitutes
            acceptance of the revised terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with
            the laws of England and Wales. Any disputes arising from or in
            connection with these terms shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these Terms of Use, contact us at{" "}
            <a href="mailto:legal@xeontek.com">legal@xeontek.com</a>.
          </p>
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
