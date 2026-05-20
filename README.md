# XeonTek Website

Static Next.js corporate website for Cloudflare Pages, with a small Cloudflare
Worker for contact form submissions.

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static export is written to `out/`.

## Documentation

Repository documentation is consolidated in [`docs/`](./docs/):

- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/deployment.md`](./docs/deployment.md)
- [`docs/migration.md`](./docs/migration.md)
- [`docs/design.md`](./docs/design.md)
- [`docs/legal.md`](./docs/legal.md)
- [`docs/todo.md`](./docs/todo.md)

## Cloudflare Deployment

Full setup notes are in [`docs/deployment.md`](./docs/deployment.md).

Deploy the static site to Cloudflare Pages:

```bash
npm run build
npm run deploy:static
```

Deploy the contact form Worker:

```bash
npm run deploy:contact
```

The Pages project uses `wrangler.toml`. The contact form Worker uses
`wrangler.contact.toml`, so Cloudflare Pages can validate the root config during
GitHub builds.

Route the Worker only to:

```text
xeontek.com/api/contact
www.xeontek.com/api/contact
```

Static page traffic remains on Cloudflare Pages. Only contact form submissions
invoke the Worker.

## Contact Form

The contact form uses:

- Cloudflare Turnstile for bot protection.
- Cloudflare Email Routing `send_email` binding for delivery.
- No Web3Forms, hCaptcha, SMTP credentials, or paid form service.

Required Cloudflare setup:

1. Enable Email Routing for `xeontek.com`.
2. Verify the destination mailbox used by the `CONTACT_EMAIL` binding.
3. Create a Turnstile widget for `xeontek.com`.
4. Add the public key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Pages build variables.
5. Add the secret key to the Worker:

```bash
wrangler secret put TURNSTILE_SECRET_KEY
```

The Worker sender address must be on the domain where Email Routing is active.
The current defaults are configured in `wrangler.toml`.
