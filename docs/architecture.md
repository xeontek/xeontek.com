# Architecture

XeonTek is a static Next.js website deployed to Cloudflare Pages, with Pages
Functions for form submissions.

## Runtime Shape

- `src/app/` contains App Router pages, metadata, sitemap, and robots rules.
- `src/components/` contains shared layout, UI, motion, and SVG components.
- `src/data/jobs/` contains Markdown job posts.
- `src/data/whitepapers/` contains whitepaper metadata JSON.
- `src/lib/` contains shared company data, content loading, schemas, SEO, and
  utilities.
- `public/` contains static assets and Cloudflare Pages headers.
- `functions/api/` handles form endpoints through Cloudflare Pages Functions.

## Public Routes

- `/`
- `/about`
- `/research`
- `/careers`
- `/contact`
- `/security`
- `/privacy`
- `/terms`

Whitepaper PDFs are served from `public/docs/whitepapers/` and referenced as
`/docs/whitepapers/...`.

## Form Flow

Contact and application submissions are sent to Pages Function routes:

- `/api/contact`
- `/api/apply`

The functions verify Turnstile responses and send mail through the Brevo
Transactional Email API.

## Key Dependencies

- Next.js and React for the static website.
- Tailwind CSS for styling.
- Radix Dialog for mobile navigation.
- Phosphor Icons for UI icons.
- Zod for form validation.
- Wrangler for Cloudflare Pages deployment.
