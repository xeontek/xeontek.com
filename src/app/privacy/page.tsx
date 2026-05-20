import { company, registeredOfficeText } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "XeonTek privacy policy. How we collect, use, and protect your information.",
  path: "/privacy",
  index: false,
});

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-400">
            Last updated: 18 May 2026
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <h2>1. Who We Are</h2>
          <p>
            {company.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
            a company registered in {company.registrationJurisdiction} with
            company number {company.registrationNumber}. Our registered office
            is {registeredOfficeText}.
          </p>
          <p>
            For any data protection enquiries, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>

          <h2>2. How We Use Personal Data</h2>
          <p>
            This website collects limited personal data. We do not require you
            to create an account, we do not process payments through this site,
            and we do not use website analytics cookies.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Data involved</th>
                  <th>Purpose</th>
                  <th>Lawful basis</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>General contact enquiries</td>
                  <td>Name, email address, subject, message content</td>
                  <td>
                    Responding to your enquiry and keeping a business record
                  </td>
                  <td>
                    Legitimate interests in responding to business enquiries, or
                    steps before entering into a contract where your enquiry
                    relates to potential work
                  </td>
                  <td>Up to 24 months unless a longer period is needed</td>
                </tr>
                <tr>
                  <td>Recruitment or application enquiries</td>
                  <td>
                    Name, email address, message content, role applied for, and
                    any application details you choose to provide
                  </td>
                  <td>Reviewing and responding to recruitment enquiries</td>
                  <td>
                    Legitimate interests in managing recruitment, or steps
                    before entering into an employment or contractor arrangement
                  </td>
                  <td>
                    Up to 12 months unless you are engaged by us or agree to a
                    longer retention period
                  </td>
                </tr>
                <tr>
                  <td>Turnstile anti-spam verification</td>
                  <td>
                    Browser and device signals, IP address, challenge outcome,
                    and security tokens processed by Cloudflare Turnstile
                  </td>
                  <td>Protecting the contact form from spam and abuse</td>
                  <td>
                    Legitimate interests in site security and abuse prevention
                  </td>
                  <td>
                    Retained by Cloudflare according to its service and security
                    retention practices
                  </td>
                </tr>
                <tr>
                  <td>Hosting, CDN, and security logs</td>
                  <td>
                    IP address, request metadata, user agent, timestamps, and
                    requested URLs, including PDF/whitepaper requests
                  </td>
                  <td>
                    Delivering the website, preventing abuse, and diagnosing
                    issues
                  </td>
                  <td>
                    Legitimate interests in operating and securing the website
                  </td>
                  <td>
                    Retained by Cloudflare according to configured service and
                    log retention settings
                  </td>
                </tr>
                <tr>
                  <td>Email delivery</td>
                  <td>Contact form message data routed to our mailbox</td>
                  <td>
                    Delivering your message to the relevant XeonTek mailbox
                  </td>
                  <td>
                    Legitimate interests or steps before entering into a
                    contract, depending on the enquiry
                  </td>
                  <td>
                    Follows the relevant enquiry retention period above, unless
                    needed for legal or compliance reasons
                  </td>
                </tr>
                <tr>
                  <td>Legal or compliance correspondence</td>
                  <td>Correspondence and related business records</td>
                  <td>Handling legal, regulatory, or compliance matters</td>
                  <td>Legal obligation or legitimate interests</td>
                  <td>Up to 6 years where necessary</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>3. Cookies and Security Technologies</h2>
          <p>
            This website does not use analytics cookies. Cloudflare Turnstile is
            loaded on the contact form to verify that submissions are
            legitimate. Turnstile may use cookies or similar technologies,
            browser signals, and security tokens for bot detection and abuse
            prevention. We treat this as strictly necessary for protecting the
            contact form and the website.
          </p>
          <p>
            If we add non-essential cookies or analytics in future, we will
            update this policy and request consent where required.
          </p>

          <h2>4. Third-Party Processors and Transfers</h2>
          <p>
            We use Cloudflare, Inc. to host and secure this website, provide CDN
            services, run Turnstile, and operate the form submission functions.
            We use Brevo to deliver contact and application emails. These
            providers process personal data on our behalf as service providers.
          </p>
          <p>
            Cloudflare may process data outside the United Kingdom and European
            Economic Area. Where this happens, we rely on Cloudflare&apos;s data
            processing terms and appropriate transfer safeguards, such as
            standard contractual clauses and the UK Addendum or other safeguards
            recognised under UK data protection law.
          </p>
          <p>
            We do not sell or rent your personal data. We may disclose personal
            data where required by law or where necessary to protect our legal
            rights.
          </p>

          <h2>5. Automated Decision-Making and AI</h2>
          <p>
            This public website does not provide an AI system to visitors and
            does not use automated decision-making or profiling that produces
            legal or similarly significant effects. Contact form submissions are
            not used to train AI models.
          </p>
          <p>
            XeonTek develops AI-enabled products and research, but product-level
            AI disclosures, risk information, and user documentation are
            provided in the relevant product or service context. This website
            itself does not make decisions about you using AI.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to
            protect your data, including encryption in transit (TLS), secure
            hosting infrastructure, and access controls. However, no method of
            transmission over the internet is completely secure.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under the UK GDPR, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Rectify inaccurate or incomplete data</li>
            <li>Request erasure of your data</li>
            <li>Restrict or object to processing</li>
            <li>
              Data portability — receive your data in a structured,
              machine-readable format
            </li>
            <li>
              Withdraw consent at any time where consent is the lawful basis
            </li>
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

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated &quot;Last updated&quot;
            date. We encourage you to review this page periodically.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
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
