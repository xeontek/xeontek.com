# Deployment

The site uses Cloudflare Pages for the static export in `out/` and Pages
Functions for form submissions.

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
the Vercel web records and verifying the Cloudflare Pages Function routes.

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

This repo uses `next.config.ts` with `output: "export"`, so Cloudflare Pages
should serve the static export in `out`. Do not point Pages at `.next`, `public`,
the repo root, or a Next adapter output.

The root `wrangler.toml` is intentionally Pages-only. Cloudflare Pages reads it
during GitHub builds, so it must not contain Worker-only keys such as `main`,
`routes`, or `send_email`.

Set this public Pages build variable in `wrangler.toml`:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your Turnstile site key>
```

This is the only variable the static Pages build needs for Turnstile rendering,
and it is public browser-side configuration.

Set these Pages secrets in Cloudflare:

```text
TURNSTILE_SECRET_KEY=<your Turnstile secret key>
BREVO_API_KEY=<your Brevo API key>
```

These non-secret function variables are also configured in `wrangler.toml`:

```text
CONTACT_FROM=website@xeontek.com
CONTACT_TO=enquiries@xeontek.com
```

The required secret names are declared in `wrangler.toml`, but their values must
be added as encrypted Pages secrets before deployment.

Deploy static pages with:

```bash
npm run deploy
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

## Pages Functions

Cloudflare Pages deploys functions from the top-level `functions/` directory.
The form endpoints are:

```text
/api/contact
/api/apply
```

The frontend submits to these relative paths, so the same functions work on the
`*.pages.dev` preview domain and on production custom domains.

## Email Delivery

The form functions use Brevo's Transactional Email API over HTTPS. Keep Google
Workspace MX records in place for normal inbound mail.

Do not enable Cloudflare Email Routing for `xeontek.com` unless inbound mail is
being intentionally moved away from Google Workspace.

In Brevo:

1. Verify the sending domain or sender used by `CONTACT_FROM`.
2. Create an API key with transactional email access.
3. Add the key to Cloudflare Pages as the `BREVO_API_KEY` secret.

The defaults are:

```text
CONTACT_FROM=website@xeontek.com
CONTACT_TO=enquiries@xeontek.com
```

Verify the destination mailbox exists:

```text
enquiries@xeontek.com
```

## Pre-Deploy Checks

- Run `npm run lint`.
- Run `npm run build`.
- Preview with `npm run preview`.
- Confirm the Cloudflare Pages build output directory is `out`, not `.next`,
  `public`, or the repo root.
- Confirm the Pages deployment contains `index.html` at the output root.
- Confirm the `*.pages.dev` deployment loads before changing production DNS.
- Check desktop and mobile layouts.
- Check `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, `/security`, and
  `/research`.
- Submit a test enquiry and test application in a staging or production-safe
  Cloudflare environment.
- Confirm `xeontek.com` and `www.xeontek.com` resolve to Cloudflare Pages, not
  Vercel.
- Confirm `/api/contact` and `/api/apply` are handled by Pages Functions.
- Confirm response headers from `public/_headers` are present.
