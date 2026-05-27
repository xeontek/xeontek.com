# TODO

Keep this file short. Move completed historical implementation notes out of the
active checklist.

## Website Checks

- [ ] Run `npm run lint`.
- [ ] Run `NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADSoOOQRbYdZ9vrI npm run build`.
- [ ] Preview with `npm run preview`.
- [ ] Check desktop and mobile layouts.
- [ ] Check keyboard navigation across nav, footer, forms, and research links.
- [ ] Confirm `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, `/security`,
      and `/research` render correctly.
- [ ] Confirm each indexable page has one canonical URL.
- [ ] Confirm Privacy and Terms are `noindex, follow` if that remains the
      intended indexing policy.
- [ ] Confirm Open Graph metadata uses absolute production URLs.
- [ ] Validate structured data for Organization, WebSite, CollectionPage, and
      CreativeWork entries.
- [ ] Confirm `/api/contact` returns `405` for GET and form POST succeeds.
- [ ] Confirm production apex redirects to `https://www.xeontek.com/`.

## AI Governance

- [ ] Maintain an inventory of AI systems and AI-assisted features.
- [ ] Classify each AI system under the EU AI Act risk framework.
- [ ] Review systems against prohibited AI practices.
- [ ] Document intended purpose, users, limitations, and foreseeable misuse.
- [ ] Define human oversight, logging, monitoring, and incident handling.
- [ ] Record data governance, evaluation, and model validation practices.
- [ ] Provide AI literacy training for staff involved in AI systems.

## Security Readiness

- [ ] Define the systems, repositories, cloud accounts, vendors, and people in
      scope for security readiness.
- [ ] Maintain an asset inventory and risk register.
- [ ] Require MFA for critical systems.
- [ ] Run periodic access reviews for source control, Cloudflare, email,
      production, and finance/admin systems.
- [ ] Define incident response severity levels and escalation paths.
- [ ] Maintain a vendor/subprocessor register.
- [ ] Define retention schedules for customer data, recruitment data, support
      data, logs, and legal/compliance records.
- [ ] Track vulnerability reports and remediation decisions.
- [ ] Decide whether to pursue ISO/IEC 27001, SOC 2, or a lighter customer
      security pack.

## Commercial Readiness

- [ ] Prepare commercial documents listed in `legal.md` before offering paid
      products, APIs, services, or customer data processing.
- [ ] Complete legal review.
- [ ] Complete security/privacy review.
- [ ] Define document versioning and publication process.
- [ ] Define customer-facing acceptance workflow where needed.
