# Deployment

The site uses Cloudflare Pages for the static export in `out/` and one
Cloudflare Worker for form submissions.

## Current Live DNS And Hosting State

Checked on 2026-05-19:

```text
NS xeontek.com
  rodrigo.ns.cloudflare.com
  karsyn.ns.cloudflare.com

A xeontek.com
  216.198.79.1

CNAME www.xeontek.com
  f5d6e445b93fc940.vercel-dns-017.com

MX xeontek.com
  aspmx.l.google.com
  alt1.aspmx.l.google.com
  alt2.aspmx.l.google.com
  alt3.aspmx.l.google.com
  alt4.aspmx.l.google.com

TXT xeontek.com
  google-site-verification=...
```

No live `AAAA`, `CAA`, or `_dmarc.xeontek.com` records were found.

The domain is managed by Cloudflare nameservers, but live web traffic is still
served by Vercel:

- `https://xeontek.com` redirects to `https://www.xeontek.com/`.
- `https://www.xeontek.com` responds with `server: Vercel`.
- `https://www.xeontek.com/api/contact` currently returns a Vercel 404.

So the remaining migration work is not changing nameservers; it is replacing
the Vercel web records and enabling the Cloudflare Worker routes.

## Local Development

```bash
npm install
npm run dev
```

The development server runs on port `4000`.

## Build

```bash
npm run lint
npm run build
```

The static export is written to `out/`.

## Cloudflare Pages

Use these Pages build settings:

```text
Build command: npm run build
Build output directory: out
Node version: current LTS
```

Set this Pages environment variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your Turnstile site key>
```

Deploy static pages with:

```bash
npm run deploy:static
```

## DNS Cutover From Current Vercel Records

Cloudflare already hosts DNS for `xeontek.com`. To move production traffic from
Vercel to Cloudflare Pages:

1. Add `xeontek.com` and `www.xeontek.com` as custom domains on the Cloudflare
   Pages project.
2. Replace the current Vercel apex record:

```text
Remove:
  A xeontek.com -> 216.198.79.1
```

3. Replace the current Vercel `www` record:

```text
Remove:
  CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
```

4. Add the DNS records Cloudflare Pages gives for the project. In the usual
   Cloudflare Pages setup this is:

```text
CNAME xeontek.com -> <project>.pages.dev
CNAME www -> <project>.pages.dev
```

Cloudflare will flatten the apex CNAME where required.

5. Keep the Google Workspace MX records unless inbound business email is being
   migrated separately. Do not replace Google MX records with Cloudflare Email
   Routing records unless that mail-routing change is intentional.
6. Keep the Google site verification TXT record.
7. Add SPF, DKIM, and DMARC records for the active mail provider if they are
   missing.
8. After DNS changes propagate, confirm production responses no longer include
   `server: Vercel`.

## Cloudflare Worker

Authenticate Wrangler:

```bash
npx wrangler login
```

Set the Turnstile secret for the Worker:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Deploy the Worker:

```bash
npm run deploy:contact
```

Worker routes are configured in `wrangler.toml`. Normal page traffic stays on
Cloudflare Pages; only form endpoints invoke the Worker.

Before cutover, confirm the Worker routes exist in Cloudflare:

```text
xeontek.com/api/contact
www.xeontek.com/api/contact
xeontek.com/api/apply
www.xeontek.com/api/apply
```

The current live `/api/contact` endpoint returns a Vercel 404, which means the
Cloudflare Worker is not currently handling that production route.

## Email Routing

The Worker uses Cloudflare's `send_email` binding. Verify that this is active
in Cloudflare before relying on the production forms.

If Google Workspace remains the inbound mail provider, keep the existing Google
MX records and treat Cloudflare Email Routing only as the Worker delivery
mechanism if that configuration is verified in Cloudflare. If Cloudflare Email
Routing is intended to receive inbound mail for the domain, plan that as a
separate mail migration because it requires changing MX records.

Verify the destination mailbox:

```text
enquiries@xeontek.com
```

The Worker uses:

```toml
[[send_email]]
name = "CONTACT_EMAIL"
destination_address = "enquiries@xeontek.com"
```

The configured sender must be on the Email Routing domain.

## Pre-Deploy Checks

- Run `npm run lint`.
- Run `npm run build`.
- Run `npx wrangler deploy --dry-run`.
- Preview with `npm run preview`.
- Check desktop and mobile layouts.
- Check `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, `/security`, and
  `/research`.
- Submit a test enquiry in a staging or production-safe Cloudflare environment.
- Confirm `xeontek.com` and `www.xeontek.com` resolve to Cloudflare Pages, not
  Vercel.
- Confirm `/api/contact` and `/api/apply` are handled by the Cloudflare Worker.
- Confirm response headers from `public/_headers` are present.
