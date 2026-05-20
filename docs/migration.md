# Vercel To Cloudflare Migration Plan

This plan covers moving production for `xeontek.com` from Vercel to the
Cloudflare setup in this repo.

## Current Production State

Checked on 2026-05-19.

DNS is already hosted on Cloudflare:

```text
NS xeontek.com
  rodrigo.ns.cloudflare.com
  karsyn.ns.cloudflare.com
```

Production web traffic still points to Vercel:

```text
A xeontek.com
  216.198.79.1

AAAA xeontek.com
  <none>

CNAME www.xeontek.com
  f5d6e445b93fc940.vercel-dns-017.com
```

Mail currently uses Google Workspace:

```text
MX xeontek.com
  1  aspmx.l.google.com
  5  alt1.aspmx.l.google.com
  5  alt2.aspmx.l.google.com
  10 alt3.aspmx.l.google.com
  10 alt4.aspmx.l.google.com
```

Other observed records:

```text
TXT xeontek.com
  google-site-verification=...

TXT _dmarc.xeontek.com
  <none>

CAA xeontek.com
  <none>
```

Live HTTP responses also show Vercel serving production:

- `https://xeontek.com` redirects to `https://www.xeontek.com/`.
- `https://www.xeontek.com` responds with `server: Vercel`.
- `https://www.xeontek.com/api/contact` returns a Vercel 404.

The nameserver migration is already done. The remaining work is to replace the
Vercel web records, deploy the Cloudflare Pages site, and verify the Pages
Function API routes.

## Target Cloudflare State

- Cloudflare Pages serves the static Next.js export from `out/`.
- Cloudflare Pages Functions handle only:
  - `/api/contact`
  - `/api/apply`
- Cloudflare Turnstile protects contact and application forms.
- Pages Functions send email through the Brevo Transactional Email API.
- Google Workspace MX records remain unchanged unless inbound email is
  intentionally migrated separately.
- Vercel no longer serves production traffic.

## Repo Readiness

The codebase is already configured for Cloudflare static hosting:

```ts
// next.config.ts
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: false,
};
```

The Cloudflare Pages Functions are configured in `functions/api/`:

```text
/api/contact
/api/apply
```

Validate the repo before creating or changing production records:

```bash
npm install
npm run lint
npm run build
```

The build must produce `out/`.

## Phase 1: Prepare Cloudflare Pages

Create or confirm a Cloudflare Pages project for this repository.

Use:

```text
Build command: npm run build
Build output directory: out
Node version: current LTS
```

If Cloudflare asks for a framework preset, treat this as a static Next.js export
and make sure the final output directory remains `out`. Do not configure the
Pages project to serve `.next`, `public`, the repo root, or a Next adapter
output.

Set this public Pages build variable in `wrangler.toml`:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<production Turnstile site key>
```

Add these values in the Pages project under Settings -> Variables and Secrets:

```text
TURNSTILE_SECRET_KEY=<production Turnstile secret key>
BREVO_API_KEY=<Brevo API key>
```

Set `TURNSTILE_SECRET_KEY` and `BREVO_API_KEY` as encrypted secrets. Keep
`CONTACT_FROM` and `CONTACT_TO` in `wrangler.toml` unless the defaults need to
change.

Deploy to the generated `*.pages.dev` URL and verify:

- Homepage loads.
- `/about`, `/research`, `/careers`, `/contact`, `/security`, `/privacy`, and
  `/terms` load.
- `/robots.txt` and `/sitemap.xml` load.
- Whitepaper PDFs under `/docs/whitepapers/` load as intended.
- Headers from `public/_headers` are present.

If the homepage does not load on the `*.pages.dev` URL, fix the Pages deployment
before changing DNS:

- Confirm the Pages project root is the repository root.
- Confirm the build command is exactly `npm run build`.
- Confirm the build output directory is exactly `out`.
- Confirm the deployment contains `out/index.html`.
- Confirm the Cloudflare build log shows `next build` completed successfully.
- Confirm the Pages deployment is not using `.next`, `public`, or the repo root
  as the output directory.
- Confirm Pages Functions are only used for `/api/contact` and `/api/apply`.

## Phase 2: Prepare Turnstile

Create or update the Cloudflare Turnstile widget to allow:

```text
xeontek.com
www.xeontek.com
localhost
```

Use the site key in Cloudflare Pages.

Set the Turnstile secret in the Pages project.

Dashboard path:

```text
Workers & Pages -> xeontek -> Settings -> Variables and Secrets
```

Add:

```text
TURNSTILE_SECRET_KEY=<production Turnstile secret key>
```

## Phase 3: Prepare Pages Functions And Email

Pages Functions deploy with the Cloudflare Pages project from the top-level
`functions/` directory. Confirm the routes exist after deployment:

```text
https://<project>.pages.dev/api/contact
https://<project>.pages.dev/api/apply
https://www.xeontek.com/api/contact
https://www.xeontek.com/api/apply
```

Configure Brevo:

1. Verify the sending domain or sender used by `CONTACT_FROM`.
2. Create a transactional API key.
3. Add the key to the Pages project as `BREVO_API_KEY`.

Keep the current Google Workspace MX records unless inbound email is being
migrated separately. Do not enable Cloudflare Email Routing as part of this site
migration because it requires replacing Google Workspace MX records.

Check Pages variables and secrets:

```text
Pages project:
  NEXT_PUBLIC_TURNSTILE_SITE_KEY
  TURNSTILE_SECRET_KEY
  BREVO_API_KEY
  CONTACT_FROM
  CONTACT_TO
```

## Phase 4: DNS Cutover

Cloudflare already hosts DNS, so this is a record change inside the existing
Cloudflare zone.

Remove the Vercel apex record:

```text
Remove:
  A xeontek.com -> 216.198.79.1
```

Remove the Vercel `www` record:

```text
Remove:
  CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
```

Add the records provided by Cloudflare Pages for the Pages project. The usual
shape is:

```text
Add:
  CNAME xeontek.com -> <project>.pages.dev
  CNAME www -> <project>.pages.dev
```

Cloudflare will flatten the apex CNAME where required.

Do not change these records as part of the web cutover:

```text
Keep:
  MX Google Workspace records
  TXT google-site-verification=...
```

Recommended DNS hygiene after the web cutover:

```text
Add if missing:
  SPF TXT for the active outbound mail provider
  DKIM records for Google Workspace or the active sender
  DMARC TXT at _dmarc.xeontek.com
```

Only add CAA records if certificate issuance should be explicitly restricted.
If CAA is added, allow the certificate authorities Cloudflare needs for Pages.

## Phase 5: Canonical Redirects

Current production redirects apex to `www`.

Before cutover, decide whether to keep that policy:

- Keep `https://www.xeontek.com` as canonical, or
- Move to `https://xeontek.com` as canonical.

Then configure the same canonical behaviour in Cloudflare after the Pages custom
domains are active. Avoid serving both hosts as independent canonical origins.

## Phase 6: Production Verification

After DNS changes propagate:

```bash
dig +short A xeontek.com
dig +short AAAA xeontek.com
dig +short CNAME www.xeontek.com
curl -I -L https://xeontek.com
curl -I -L https://www.xeontek.com
curl -I -L https://www.xeontek.com/api/contact
```

Verify:

- HTTP responses no longer include `server: Vercel`.
- The Cloudflare Pages `*.pages.dev` deployment loads before the custom domains
  are pointed at it.
- `xeontek.com` and `www.xeontek.com` resolve to Cloudflare Pages.
- The selected canonical host redirects correctly.
- `/api/contact` and `/api/apply` are handled by Pages Functions.
- Contact form submission succeeds.
- Application form submission succeeds if careers are active.
- Emails arrive at `enquiries@xeontek.com`.
- `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, and `/security` load.
- Whitepaper PDF links under `/docs/whitepapers/` work.
- Security headers from `public/_headers` are present.

## Phase 7: Vercel Decommissioning

Do not delete the Vercel project immediately.

After Cloudflare has served production successfully for at least one release
cycle:

- Remove the production domain assignment from Vercel.
- Remove Vercel-only environment variables if they are no longer needed.
- Disable Vercel analytics or monitoring if enabled.
- Keep the project only if it is still useful for rollback or archived history.

## Rollback Plan

If Cloudflare production fails during cutover:

1. Restore the Vercel apex record:

```text
A xeontek.com -> 216.198.79.1
```

2. Restore the Vercel `www` record:

```text
CNAME www -> f5d6e445b93fc940.vercel-dns-017.com
```

3. Confirm `https://www.xeontek.com` responds with Vercel again.
4. Leave the Cloudflare Pages deployment in place for investigation.
5. Fix the issue, redeploy, and repeat the verification checklist before
   attempting cutover again.
