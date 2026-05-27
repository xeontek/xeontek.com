# Deployment

The site runs on Cloudflare Pages. Next.js is statically exported to `out/`, and
Cloudflare Pages Functions handle form submissions from `functions/api/`.

## Production State

Current production shape:

```text
Hosting: Cloudflare Pages
Canonical host: https://www.xeontek.com
Apex redirect: https://xeontek.com/* -> https://www.xeontek.com/*
Form functions: /api/contact and /api/apply
Email delivery: Brevo Transactional Email API
Inbound email: Google Workspace MX records
```

Keep `xeontek.com` and `www.xeontek.com` attached as custom domains on the
Cloudflare Pages project so Cloudflare manages HTTPS certificates for both.

## Local Development

```bash
npm install
npm run dev
```

The development server runs on port `4000`.

## Build

The production build requires the public Turnstile key in the environment when
run locally:

```bash
npm run lint
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADSoOOQRbYdZ9vrI npm run build
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
must serve `out/`. Do not point Pages at `.next`, `public`, the repo root, or a
Next adapter output.

The root `wrangler.toml` is intentionally Pages-only. Cloudflare Pages reads it
during GitHub builds, so it must not contain Worker-only keys such as `main`,
`routes`, or `send_email`, and it must not contain secret values.

Public Pages variables live in `wrangler.toml`:

```toml
[vars]
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAADSoOOQRbYdZ9vrI"
CONTACT_FROM = "website@xeontek.com"
CONTACT_TO = "enquiries@xeontek.com"
```

Cloudflare build logs should show those public variables. Secret values should
not appear in build logs.

Set these Cloudflare Pages secrets in the Production environment:

```text
TURNSTILE_SECRET_KEY=<Turnstile secret key>
BREVO_API_KEY=<Brevo REST API key>
```

Use a Brevo REST API key, not SMTP credentials. If the Cloudflare UI does not
offer a Secret type, set secrets with Wrangler:

```bash
npx wrangler pages secret put TURNSTILE_SECRET_KEY --project-name xeontek
npx wrangler pages secret put BREVO_API_KEY --project-name xeontek
```

Deploy manually with:

```bash
npm run deploy
```

GitHub-connected Pages deployments run automatically from the configured branch.

## Pages Functions

Cloudflare Pages deploys functions from the top-level `functions/` directory.
The form endpoints are:

```text
/api/contact
/api/apply
```

The frontend submits to relative paths, so the same functions work on the
`*.pages.dev` preview domain and on production custom domains.

A GET request to `/api/contact` should return `405 Method not allowed`. That is
expected and confirms the function route exists; form submissions use POST.

Tail live Pages Function logs with:

```bash
npx wrangler pages deployment tail \
  --project-name xeontek \
  --environment production \
  --format pretty \
  --method POST
```

Start the tail before submitting a test form. Pages Function logs are live
streams and are not the same as the general Cloudflare Observability history.

## Email Delivery

The form functions send email through Brevo's Transactional Email API over
HTTPS. Keep Google Workspace MX records in place for normal inbound mail.

Do not enable Cloudflare Email Routing for `xeontek.com` unless inbound mail is
intentionally moved away from Google Workspace.

Brevo setup:

1. Verify the sending domain or sender used by `CONTACT_FROM`.
2. Create a REST API key with transactional email access.
3. Add that key to Cloudflare Pages as `BREVO_API_KEY`.

For Brevo API-key IP authorization, do not use a laptop/home IP, Google
Workspace IP, or Cloudflare DNS IP. Cloudflare Pages Functions do not provide a
stable per-site outbound IP. If Brevo requires a fixed authorized IP, use a
different provider such as Resend.

## DNS

Keep:

```text
NS xeontek.com -> Cloudflare nameservers
MX xeontek.com -> Google Workspace
TXT xeontek.com -> google-site-verification=...
TXT xeontek.com -> brevo-code:...
TXT _dmarc.xeontek.com -> DMARC policy
CNAME brevo1._domainkey.xeontek.com -> Brevo DKIM target
CNAME brevo2._domainkey.xeontek.com -> Brevo DKIM target
```

Cloudflare Pages custom domains should manage the web records for both:

```text
xeontek.com
www.xeontek.com
```

Remove old Vercel records if they reappear:

```text
A xeontek.com -> 216.198.79.1
CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
Any Vercel verification TXT records
```

Mail-auth checks still to maintain:

```text
SPF TXT at xeontek.com including Google Workspace and Brevo
Google Workspace DKIM TXT record
Brevo DKIM CNAME records
DMARC TXT record
```

Recommended SPF value when Google Workspace and Brevo are both active senders:

```text
v=spf1 include:_spf.google.com include:spf.brevo.com ~all
```

Only publish one SPF record for `xeontek.com`.

## Verification

After each production deploy or DNS change:

```bash
dig +short NS xeontek.com
dig +short A xeontek.com
dig +short AAAA xeontek.com
dig +short MX xeontek.com
curl -I https://xeontek.com
curl -I https://www.xeontek.com
curl -i https://www.xeontek.com/api/contact
```

Expected results:

- `https://xeontek.com` returns `301` to `https://www.xeontek.com/...`.
- `https://www.xeontek.com` returns `200` with `server: cloudflare`.
- GET `/api/contact` returns `405 Method not allowed`.
- Contact form submission succeeds and arrives at `enquiries@xeontek.com`.
- Application form submission succeeds if careers are active.
- `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, `/security`, and
  `/research` load.
- Security headers from `public/_headers` are present.
