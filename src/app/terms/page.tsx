import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "XeonTek terms of use governing access to our website.",
};

function formatDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Terms of Use</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: {formatDate()}</p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <p>
            Welcome to XeonTek Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing or
            using our website, you agree to be bound by these Terms of Use.
          </p>

          <h2>1. Use of Site</h2>
          <p>
            You agree to use this website for lawful purposes only and in a manner
            that does not infringe the rights of, restrict, or inhibit anyone
            else&apos;s use of the site.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and
            software, is the property of XeonTek Ltd and is protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works without our prior written
            consent.
          </p>

          <h2>3. User Content</h2>
          <p>
            By submitting content through our website (such as contact form
            messages), you grant us a non-exclusive licence to use that content
            for the purpose of responding to your enquiry.
          </p>

          <h2>4. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Attempt to gain unauthorised access to our systems</li>
            <li>Transmit malware or malicious code</li>
            <li>Scrape or harvest data from our website</li>
            <li>Use the site for any illegal activity</li>
          </ul>

          <h2>5. Disclaimers</h2>
          <p>
            This website is provided on an &quot;as is&quot; basis. We make no warranties,
            expressed or implied, regarding the accuracy, completeness, or
            reliability of any content.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, XeonTek Ltd shall not be
            liable for any indirect, incidental, or consequential damages arising
            from your use of this website.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of England and Wales. Any
            disputes shall be subject to the exclusive jurisdiction of the courts
            of England and Wales.
          </p>

          <h2>8. Contact</h2>
          <p>
            For questions about these Terms of Use, contact us at{" "}
            <a href="mailto:legal@xeontek.com">legal@xeontek.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
