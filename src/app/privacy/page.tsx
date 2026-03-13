import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "XeonTek privacy policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: 10 March 2026</p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <h2>1. Who We Are</h2>
          <p>
            XeonTek Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
            a company registered in England and Wales. Our registered address
            is 27 Old Gloucester Street, London, WC1N 3AX, United Kingdom.
          </p>
          <p>
            For any data protection enquiries, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>

          <h2>2. What Data We Collect</h2>
          <p>
            This website collects a limited amount of personal data. We do not
            require you to create an account, and we do not process payments.
          </p>
          <ul>
            <li>
              <strong>Contact form submissions</strong> — your name, email
              address, and message, provided voluntarily when you use our
              contact form.
            </li>
            <li>
              <strong>Analytics data</strong> — aggregated, non-identifiable
              page-view and visitor data collected by Vercel Web Analytics,
              only when you have given consent via our cookie banner.
            </li>
            <li>
              <strong>Cookie preference</strong> — a record of whether you
              accepted or dismissed our cookie consent banner.
            </li>
          </ul>

          <h2>3. Lawful Basis for Processing</h2>
          <p>
            Under the UK General Data Protection Regulation (UK GDPR) and the
            Data Protection Act 2018, we process personal data on the following
            bases:
          </p>
          <ul>
            <li>
              <strong>Consent (Article 6(1)(a))</strong> — for loading Vercel
              Web Analytics. You give consent by clicking &quot;Accept&quot; on
              our cookie banner and may withdraw it at any time.
            </li>
            <li>
              <strong>Legitimate interest (Article 6(1)(f))</strong> — for
              essential site operation, security, and storing your cookie
              preference.
            </li>
            <li>
              <strong>Performance of a contract (Article 6(1)(b))</strong> — for
              processing contact form submissions in order to respond to your
              enquiry.
            </li>
          </ul>

          <h2>4. Cookies</h2>
          <p>
            When you first visit our site, a cookie consent banner is
            displayed. Analytics are only activated after you explicitly
            click &quot;Accept&quot;. If you dismiss the banner, no analytics
            data is collected.
          </p>
          <p>This site uses the following cookie:</p>
          <ul>
            <li>
              <strong>xeontek-cookie-consent</strong> — a first-party cookie
              that stores your consent preference (&quot;accepted&quot;
              or &quot;dismissed&quot;). Retention: 1 year. Classification:
              strictly necessary. This cookie does not track you and does not
              require consent under the Privacy and Electronic Communications
              Regulations 2003 (PECR).
            </li>
          </ul>
          <p>
            Vercel Web Analytics is privacy-focused and does not use cookies
            or collect personally identifiable information. It is only loaded
            when you have accepted cookies via our consent banner.
          </p>
          <p>
            You can withdraw consent at any time by clearing your browser
            cookies. The consent banner will reappear on your next visit.
          </p>

          <h2>5. Third-Party Processors</h2>
          <p>
            We share personal data with the following third-party processors,
            each of whom processes data on our behalf:
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong> — hosts this website and provides
              web analytics. Data may be processed in the United States under
              appropriate safeguards.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google Workspace (Google LLC)</strong> — contact form
              submissions are delivered to us via Google Workspace email
              (SMTP). Google processes this data as a data processor under
              its{" "}
              <a
                href="https://workspace.google.com/terms/dpa_terms.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Processing Amendment
              </a>
              .
            </li>
          </ul>
          <p>
            We do not sell, rent, or share your personal data with any other
            third parties.
          </p>

          <h2>6. Data Retention</h2>
          <ul>
            <li>
              <strong>Contact form submissions</strong> — retained only for as
              long as necessary to respond to your enquiry, then deleted.
            </li>
            <li>
              <strong>Cookie consent preference</strong> — stored in your
              browser for 1 year.
            </li>
            <li>
              <strong>Analytics data</strong> — retained by Vercel in
              aggregated, non-identifiable form.
            </li>
          </ul>

          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to
            protect your data, including encryption in transit (TLS), secure
            hosting infrastructure, and access controls. However, no method of
            transmission over the internet is completely secure.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Under the UK GDPR, you have the right to:
          </p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Rectify inaccurate or incomplete data</li>
            <li>Request erasure of your data</li>
            <li>Restrict or object to processing</li>
            <li>Data portability — receive your data in a structured, machine-readable format</li>
            <li>Withdraw consent at any time where consent is the lawful basis</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>. We
            will respond within one calendar month.
          </p>
          <p>
            If you are unsatisfied with our response, you have the right to
            lodge a complaint with the{" "}
            <a
              href="https://ico.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Information Commissioner&apos;s Office (ICO)
            </a>
            , the UK&apos;s supervisory authority for data protection.
          </p>

          <h2>9. International Transfers</h2>
          <p>
            Some of our third-party processors (Vercel, Google) may process
            data outside the United Kingdom. Where this occurs, we ensure
            appropriate safeguards are in place, such as standard contractual
            clauses or adequacy decisions recognised by the UK Government.
          </p>

          <h2>10. EU AI Act</h2>
          <p>
            XeonTek develops AI-driven platforms for financial analytics and
            investment intelligence. We are committed to compliance with the EU
            Artificial Intelligence Act (Regulation (EU) 2024/1689). Where our
            AI systems are deployed, we ensure:
          </p>
          <ul>
            <li>Transparency about the use of AI in our products and services</li>
            <li>Human oversight of AI-assisted decision-making</li>
            <li>Risk assessment and mitigation proportionate to the system&apos;s classification</li>
            <li>Clear documentation of AI system capabilities and limitations</li>
          </ul>
          <p>
            Our AI systems are designed to assist and augment human
            decision-making, not to replace it. This website itself does not
            use AI to process your personal data. If you have questions about
            how we use AI in our products, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Last
            updated&quot; date. We encourage you to review this page
            periodically.
          </p>

          <h2>12. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>
          <address className="not-italic">
            XeonTek Ltd
            <br />
            27 Old Gloucester Street
            <br />
            London, WC1N 3AX
            <br />
            United Kingdom
          </address>
        </div>
      </section>
    </>
  );
}
