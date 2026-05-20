# XeonTek Website

Static Next.js corporate website for Cloudflare Pages, with Pages Functions for
contact and application form submissions.

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
npm run deploy
```

The Pages project uses `wrangler.toml` for build configuration and the
`functions/` directory for API routes:

```text
/api/contact
/api/apply
```

Static page traffic remains on Cloudflare Pages. Only form submissions invoke
Pages Functions.

## Contact Form

The contact form uses:

- Cloudflare Turnstile for bot protection.
- Brevo Transactional Email API for delivery.
- No Web3Forms, hCaptcha, SMTP credentials, Cloudflare Email Routing, or
  separate Worker app.

Required Cloudflare setup:

1. Create a Turnstile widget for `xeontek.com`.
2. Set the public key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `wrangler.toml`.
3. Verify the sending domain or sender in Brevo.
4. Add `TURNSTILE_SECRET_KEY` and `BREVO_API_KEY` as encrypted Pages secrets.
5. Keep `CONTACT_FROM` and `CONTACT_TO` in `wrangler.toml` unless the defaults
   need to change.

The default sender is `website@xeontek.com` and the default recipient is
`enquiries@xeontek.com`.
