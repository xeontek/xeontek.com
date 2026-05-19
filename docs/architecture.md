# Architecture

XeonTek is a static Next.js website deployed to Cloudflare Pages, with a small
Cloudflare Worker for form submissions.

## Runtime Shape

- `src/app/` contains App Router pages, metadata, sitemap, and robots rules.
- `src/components/` contains shared layout, UI, motion, and SVG components.
- `src/data/jobs/` contains Markdown job posts.
- `src/data/whitepapers/` contains whitepaper metadata JSON.
- `src/lib/` contains shared company data, content loading, schemas, SEO, and
  utilities.
- `public/` contains static assets and Cloudflare Pages headers.
- `worker/contact.ts` handles form endpoints through Cloudflare Workers.

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

Contact and application submissions are sent to Cloudflare Worker routes
configured in `wrangler.toml`:

- `xeontek.com/api/contact`
- `www.xeontek.com/api/contact`
- `xeontek.com/api/apply`
- `www.xeontek.com/api/apply`

The Worker verifies Turnstile responses and sends mail using the Cloudflare
Email Routing `send_email` binding named `CONTACT_EMAIL`.

## Key Dependencies

- Next.js and React for the static website.
- Tailwind CSS for styling.
- Radix Dialog for mobile navigation.
- Phosphor Icons for UI icons.
- Zod for form validation.
- Wrangler for Cloudflare Pages and Worker deployment.
