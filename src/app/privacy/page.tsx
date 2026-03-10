import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "XeonTek privacy policy. How we collect, use, and protect your information.",
};

function formatDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-12 sm:pt-36">
          <h1>Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: {formatDate()}</p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="prose prose-slate prose-sm mx-auto max-w-3xl px-6">
          <p>
            At XeonTek Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), we are committed to
            protecting your privacy. This Privacy Policy outlines how we collect,
            use, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Device information and browsing activity collected automatically</li>
            <li>Information you provide through forms, such as your name and email address</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to enquiries submitted through our contact form</li>
            <li>Improve our website and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to analyse site
            traffic and enhance your browsing experience. You can manage your
            cookie preferences through your browser settings. By continuing to
            use our site after being presented with our cookie notice, you
            consent to our use of cookies.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data,
            including encryption, secure servers, and regular audits. However, no
            method of transmission over the Internet is completely secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete any personal data we
            hold about you. To exercise these rights, please contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>

          <h2>GDPR Compliance</h2>
          <p>
            For users in the European Union, we comply with the General Data
            Protection Regulation (GDPR). This includes obtaining consent for data
            processing, providing data portability, and ensuring the right to
            erasure.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:privacy@xeontek.com">privacy@xeontek.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
