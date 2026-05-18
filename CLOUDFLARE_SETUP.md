# Cloudflare Setup

This site is designed to run with:

- Cloudflare Pages for the static Next.js export in `out/`.
- One Cloudflare Worker for `POST /api/contact`.
- Cloudflare Turnstile for form verification.
- Cloudflare Email Routing `send_email` for contact form delivery.

Normal page traffic stays static. Only contact form submissions invoke the
Worker.

## 1. Cloudflare Pages

Create a Pages project for this repository.

Use these build settings:

```text
Build command: npm run build
Build output directory: out
Node version: current LTS
```

Add this Pages environment variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your Turnstile site key>
```

## 2. Turnstile

Create a Cloudflare Turnstile widget for:

```text
xeontek.com
www.xeontek.com
localhost
```

Use the site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Cloudflare Pages.

The secret key is for the Worker only:

```bash
wrangler secret put TURNSTILE_SECRET_KEY
```

## 3. Email Routing

Enable Cloudflare Email Routing for `xeontek.com`.

Verify the destination mailbox:

```text
enquiries@xeontek.com
```

The Worker is configured in `wrangler.toml` with:

```toml
[[send_email]]
name = "CONTACT_EMAIL"
destination_address = "enquiries@xeontek.com"
```

The sender address must be on the Email Routing domain:

```toml
[vars]
CONTACT_FROM = "website@xeontek.com"
CONTACT_TO = "enquiries@xeontek.com"
```

## 4. Contact Worker

Authenticate Wrangler:

```bash
npx wrangler login
```

Set the Turnstile secret:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Deploy the Worker:

```bash
npm run deploy:contact
```

The Worker routes are:

```text
xeontek.com/api/contact
www.xeontek.com/api/contact
```

## 5. Static Deploy

Build and deploy the static site:

```bash
npm run build
npm run deploy:static
```

## 6. Verification

Run local checks before deployment:

```bash
npm run lint
npm run build
env XDG_CONFIG_HOME=/tmp npx wrangler deploy --dry-run
```

After deployment:

1. Open `https://www.xeontek.com/contact`.
2. Confirm Turnstile loads.
3. Submit a test enquiry.
4. Confirm the email arrives at `enquiries@xeontek.com`.
5. Confirm normal pages still load from Cloudflare Pages.

## Cost Notes

This setup is intended to stay on free Cloudflare primitives:

- Cloudflare Pages for static hosting.
- Cloudflare Turnstile.
- Cloudflare Email Routing.
- Cloudflare Workers free tier for contact form submissions.

If form submissions ever grow beyond the free Worker limits, only the contact
endpoint should need adjustment.
