# Website Compliance, SEO, And Standards TODO

Prioritized checklist for bringing the XeonTek main website up to a stronger
standard before/alongside the Cloudflare migration.

This is an implementation TODO, not legal advice. Legal/compliance wording
should be reviewed by counsel where risk is material.

## P0 - Launch Blockers / Legal Identity

- [x] Add full UK company disclosure wherever legal identity appears.
  - Include exact registered company name: `XeonTek Ltd`.
  - Add company registration number.
  - Include place of registration: England and Wales.
  - Include registered office address.
  - Update footer, Contact, About, Privacy Policy, and Terms pages.

- [x] Add point-of-collection privacy notice to the contact form.
  - Brief text near the form explaining that submitted details are used to
    respond to enquiries.
  - Link directly to `/privacy`.
  - Mention recruitment/application enquiries also use this form.

- [x] Confirm whether PDFs under `/docs/whitepapers/` should be indexable.
  - If yes, remove `Disallow: /docs/` from `robots.ts`.
  - If no, keep robots blocking and ensure the research page itself contains
    enough indexable summary content.

## P1 - Privacy / UK GDPR / PECR

- [x] Rewrite the Privacy Policy as a clearer processing table.
  - Contact enquiries.
  - Recruitment/application enquiries.
  - Turnstile anti-spam/security verification.
  - Cloudflare hosting, CDN, security, and logs.
  - Email Routing/contact message delivery.
  - Whitepaper/PDF request logs, if retained by Cloudflare.

- [x] Make lawful bases more specific.
  - Contact enquiries: legitimate interests or steps before contract.
  - Recruitment enquiries: legitimate interests or steps before contract.
  - Security/Turnstile/logs: legitimate interests.
  - Legal/compliance correspondence: legal obligation or legitimate interests.

- [x] Add explicit legitimate interests where relied upon.
  - Site security.
  - Spam and abuse prevention.
  - Responding to business enquiries.
  - Managing recruitment enquiries.

- [x] Replace vague retention language with practical ranges.
  - General enquiries: proposed maximum, e.g. 24 months.
  - Recruitment enquiries: proposed maximum, e.g. 6-12 months unless hired or
    consent is obtained for longer retention.
  - Security logs: align with Cloudflare/default provider retention.
  - Legal/compliance records: up to 6 years where necessary.

- [x] Strengthen Cloudflare processor and transfer wording.
  - Identify Cloudflare as hosting/CDN/security/Turnstile/Email Routing
    processor.
  - Mention processing may occur outside the UK/EEA.
  - Reference Cloudflare DPA and appropriate transfer safeguards, such as SCCs
    and UK Addendum/IDTA where applicable.

- [x] Add a clear Cookies and Security Technologies section.
  - State that the site does not use analytics cookies.
  - Explain Cloudflare Turnstile may use cookies or similar technologies only
    for bot/security verification on the contact form.
  - Explain why this is treated as strictly necessary security.
  - Avoid adding a cookie banner unless non-essential cookies/analytics return.

- [x] Add automated decision-making wording.
  - State the website does not use automated decision-making or profiling with
    legal or similarly significant effects.
  - State that contact submissions are not used to train AI models.

- [x] Add recruitment-specific privacy language.
  - What application data is collected.
  - Who reviews it.
  - Retention period.
  - Whether speculative applications are retained.

## P1 - EU AI Act / AI Claims

- [x] Rewrite the EU AI Act section to avoid overclaiming.
  - State that the public website does not provide an AI system to users.
  - State that the website does not make automated decisions about visitors.
  - State product-specific AI disclosures are provided in relevant product or
    service documentation.

- [x] Create an internal AI governance TODO before making stronger public
      compliance claims.
  - AI system inventory.
  - Risk classification process under the EU AI Act.
  - Prohibited-practices review.
  - High-risk assessment checklist.
  - Human oversight approach.
  - Logging and documentation approach.
  - Data governance and model evaluation records.
  - AI literacy/training for staff involved in AI systems.

- [x] Review all public AI wording for accuracy.
  - Avoid implying regulated financial advice, investment advice, or automated
    investment decision-making.
  - Add disclaimers where content discusses financial modelling or investment
    intelligence.

## P1 - SEO Fundamentals

- [x] Add canonical URLs.
  - Global/default canonical where possible.
  - Page-specific canonical for `/`, `/about`, `/research`, `/contact`,
    `/careers`, `/privacy`, and `/terms`.

- [x] Add explicit `og:url` metadata for each page.

- [x] Add structured data.
  - `Organization` for XeonTek Ltd.
  - `WebSite` for `https://www.xeontek.com`.
  - Optional `ContactPage`, `AboutPage`, and `CollectionPage` for research.
  - Optional `CreativeWork` entries for whitepapers.

- [x] Fix sitemap `lastModified`.
  - Do not use `new Date()` for every page on every build.
  - Use stable content dates or omit `lastModified`.

- [x] Decide whether legal pages should be indexed.
  - If no, add `robots: { index: false, follow: true }` metadata to privacy and
    terms.

- [x] Improve research/whitepaper SEO.
  - Consider dedicated routes for individual whitepapers instead of only a
    single `/research` list and PDF links.
  - Add titles/descriptions/publication dates for each whitepaper.

## P1 - Accessibility / Progressive Enhancement

- [x] Fix motion progressive enhancement.
  - Current server-rendered HTML can include `opacity: 0`, hiding content if
    JavaScript fails.
  - Ensure content is visible by default and animation only enhances after
    hydration.

- [x] Respect `prefers-reduced-motion`.
  - Framer Motion components.
  - CSS marquee animation.
  - AI capability beam animation.

- [x] Add `aria-current="page"` to active nav links.

- [x] Add a semantic Radix `Dialog.Title` for the mobile navigation.
  - Use visually hidden text if no visible title is desired.

- [x] Review focus-visible states on links and buttons.
  - Nav links.
  - Footer links.
  - Research PDF links.
  - Contact details links.

- [x] Check color contrast for muted slate text and teal text on light teal
      backgrounds.

## P1 - Security Headers

- [x] Expand `public/_headers`.
  - `Strict-Transport-Security` already exists.
  - Add `X-Content-Type-Options: nosniff`.
  - Add `Referrer-Policy: strict-origin-when-cross-origin`.
  - Add `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

- [x] Design and test a Content Security Policy.
  - Allow same-origin assets.
  - Allow Cloudflare Turnstile script/frame/connect sources:
    `https://challenges.cloudflare.com`.
  - Account for Next inline scripts/static export output before enforcing.
  - Start with `Content-Security-Policy-Report-Only` if needed.

## P2 - Terms / Commercial Readiness

- [x] Clarify that current Terms are website terms only.
  - They do not cover paid services, hosted products, APIs, client work, SLAs,
    or software development engagements.

- [x] Create placeholders or separate documents if the business offers services
      or hosted products.
  - Master Services Agreement.
  - Product/SaaS Terms.
  - Data Processing Agreement.
  - Acceptable Use Policy.
  - SLA/support terms.
  - Security addendum.
  - Subprocessor list.
  - See `doc/commercial-readiness-todo.md`.

- [x] Tighten AI disclaimer language in Terms.
  - Avoid implying all AI output is available on this website.
  - Keep financial/legal/investment advice disclaimers where relevant.

## P2 - ISO/IEC 27001 And SOC 2 Positioning

- [x] Avoid certification or compliance claims unless independently verified.
  - Do not say `ISO 27001 certified`, `ISO 27001 compliant`, `SOC 2 certified`,
    or `SOC 2 compliant` unless evidence exists and scope is accurate.

- [x] If useful, create a lightweight Security page.
  - Security contact email.
  - Hosting and subprocessor summary.
  - Vulnerability disclosure instructions.
  - High-level access control, encryption, backup, and incident response
    statements that are true today.
  - Clear statement if not currently ISO/IEC 27001 certified or SOC 2 audited.

- [x] If pursuing ISO/SOC readiness, create internal control evidence TODOs.
  - Asset inventory.
  - Risk assessment.
  - Access review process.
  - Change management process.
  - Incident response process.
  - Vendor/subprocessor management.
  - Data classification and retention.
  - Backup and recovery.
  - Security awareness training.
  - See `doc/security-control-evidence-todo.md`.

## P2 - Performance / Technical Quality

- [x] Reduce unnecessary client-side JavaScript.
  - Navbar could be mostly server-rendered if active route handling is changed.
  - Review whether all Framer Motion usage is worth the JS cost.
  - Removed the Framer Motion runtime from section animation wrappers and the AI
    capabilities component.

- [x] Review homepage payload size.
  - Current static home HTML is large due to inline SVG/React payload.
  - Consider simplifying decorative SVGs or moving repeated graphics to assets.
  - Kept the existing visual assets, but removed the Framer Motion dependency
    from the homepage runtime path. Further SVG extraction can be revisited if
    Lighthouse or transfer-size budgets show a problem.

- [x] Add Lighthouse/axe checks to the local verification workflow.
  - Desktop and mobile Lighthouse.
  - Accessibility scan.
  - Basic crawl check for canonical/sitemap/robots.
  - See `doc/local-quality-checks.md`.

## References

- ICO UK GDPR right to be informed:
  https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/
- ICO PECR cookies and similar technologies:
  https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/
- GOV.UK company website disclosure guidance:
  https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material
- European Commission AI Act guidance:
  https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- ISO/IEC 27001 overview:
  https://www.iso.org/standard/27001
- AICPA SOC overview:
  https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services
