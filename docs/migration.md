# Vercel To Cloudflare Migration Record

This document records the completed migration of `xeontek.com` from Vercel to
Cloudflare Pages.

## Current State

Production now runs on Cloudflare:

```text
Hosting: Cloudflare Pages
Canonical host: https://www.xeontek.com
Apex redirect: https://xeontek.com/* -> https://www.xeontek.com/*
Static output: out/
Functions: functions/api/contact.ts and functions/api/apply.ts
Email delivery: Brevo Transactional Email API
Inbound mailbox provider: Google Workspace
```

Cloudflare Pages manages HTTPS certificates for both custom domains:

```text
xeontek.com
www.xeontek.com
```

## Removed Vercel Records

The old Vercel records should remain absent:

```text
A xeontek.com -> 216.198.79.1
CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
```

Remove any old Vercel verification TXT records if they reappear.

## DNS To Keep

Keep Google Workspace MX records for inbound mail:

```text
MX xeontek.com
  aspmx.l.google.com
  alt1.aspmx.l.google.com
  alt2.aspmx.l.google.com
  alt3.aspmx.l.google.com
  alt4.aspmx.l.google.com
```

Keep the existing verification and mail-authentication records:

```text
TXT xeontek.com -> google-site-verification=...
TXT xeontek.com -> brevo-code:...
TXT _dmarc.xeontek.com -> DMARC policy
CNAME brevo1._domainkey.xeontek.com -> Brevo DKIM target
CNAME brevo2._domainkey.xeontek.com -> Brevo DKIM target
```

Maintain one SPF record for all active outbound mail providers. For Google
Workspace plus Brevo:

```text
v=spf1 include:_spf.google.com include:spf.brevo.com ~all
```

Add Google Workspace DKIM from the Google Admin Console if it is not already
present.

## Cloudflare Pages Configuration

Use:

```text
Build command: npm run build
Build output directory: out
Node version: current LTS
```

The root `wrangler.toml` is the Pages configuration source of truth for public
variables:

```toml
[vars]
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAADSoOOQRbYdZ9vrI"
CONTACT_FROM = "website@xeontek.com"
CONTACT_TO = "enquiries@xeontek.com"
```

Do not add Worker-only keys such as `main`, `routes`, or `send_email` to the
root `wrangler.toml`. Do not store secret values in `wrangler.toml`.

Set these values as Cloudflare Pages Production secrets:

```text
TURNSTILE_SECRET_KEY
BREVO_API_KEY
```

Use a Brevo REST API key, not SMTP credentials.

## Runtime Checks

After deployment:

```bash
curl -I https://xeontek.com
curl -I https://www.xeontek.com
curl -i https://www.xeontek.com/api/contact
```

Expected:

```text
https://xeontek.com -> 301 to https://www.xeontek.com/
https://www.xeontek.com -> 200, server: cloudflare
GET /api/contact -> 405 Method not allowed
```

Submit a real contact form test and confirm the email arrives at:

```text
enquiries@xeontek.com
```

## Function Logs

Tail production Pages Function logs with:

```bash
npx wrangler pages deployment tail \
  --project-name xeontek \
  --environment production \
  --format pretty \
  --method POST
```

Start the tail before submitting a form. Pages Function logs are live streams
and are not the same as the general Cloudflare Observability history.

## Rollback

Rollback should only be needed if Cloudflare Pages fails in production.

1. Restore the old Vercel DNS records:

```text
A xeontek.com -> 216.198.79.1
CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
```

2. Confirm `https://www.xeontek.com` responds from Vercel.
3. Leave the Cloudflare Pages deployment in place for investigation.
4. Fix the issue, redeploy Cloudflare Pages, then repeat the runtime checks
   before cutting back again.
