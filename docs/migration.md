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
Vercel web records, deploy the Cloudflare Pages site, and activate the
Cloudflare Worker API routes.

## Target Cloudflare State

- Cloudflare Pages serves the static Next.js export from `out/`.
- Cloudflare Workers handles only:
  - `/api/contact`
  - `/api/apply`
- Cloudflare Turnstile protects contact and application forms.
- The Worker sends email through the Cloudflare `send_email` binding.
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

The Cloudflare Worker is configured in `wrangler.toml`:

```text
xeontek.com/api/contact
www.xeontek.com/api/contact
xeontek.com/api/apply
www.xeontek.com/api/apply
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

Set this Pages environment variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<production Turnstile site key>
```

Do not add `TURNSTILE_SECRET_KEY` to the Pages project expecting it to affect
the homepage. That secret is used by the Worker only. The homepage should render
without any Worker secret.

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
- Confirm the Pages deployment is not expecting a `_worker.js` or Pages
  Functions output for the homepage.
- Confirm no Cloudflare Worker route is attached to `xeontek.com/*` or
  `www.xeontek.com/*`; only `/api/contact` and `/api/apply` should go to the
  Worker.

## Phase 2: Prepare Turnstile

Create or update the Cloudflare Turnstile widget to allow:

```text
xeontek.com
www.xeontek.com
localhost
```

Use the site key in Cloudflare Pages.

Set the Worker secret in the Cloudflare dashboard or with Wrangler.

Dashboard path:

```text
Workers & Pages -> xeontek-contact -> Settings -> Variables and Secrets
```

Add:

```text
TURNSTILE_SECRET_KEY=<production Turnstile secret key>
```

If using Wrangler, first check whether local auth is usable:

```bash
npx wrangler whoami
```

If `whoami` works, set the secret:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

If `wrangler login` opens a browser but does not complete, or appears to do
nothing after authorisation, use the Cloudflare dashboard instead. A CI/API-token
workflow is also valid, but the migration does not require local Wrangler auth
just to set this secret.

## Phase 3: Prepare Worker And Email

Authenticate Wrangler only if you are deploying the Worker from the command
line:

```bash
npx wrangler login
```

Check auth before deploying:

```bash
npx wrangler whoami
```

If local auth is unreliable, deploy the Worker through Cloudflare's dashboard or
use a scoped `CLOUDFLARE_API_TOKEN` in CI instead of relying on interactive
login.

Dry-run the Worker:

```bash
npx wrangler deploy --dry-run
```

Deploy the Worker:

```bash
npm run deploy:contact
```

Confirm the Worker routes exist in Cloudflare for:

```text
xeontek.com/api/contact
www.xeontek.com/api/contact
xeontek.com/api/apply
www.xeontek.com/api/apply
```

The Worker uses this email binding:

```toml
[[send_email]]
name = "CONTACT_EMAIL"
destination_address = "enquiries@xeontek.com"

[vars]
CONTACT_FROM = "website@xeontek.com"
CONTACT_TO = "enquiries@xeontek.com"
```

Keep the current Google Workspace MX records unless inbound email is being
migrated separately. The Cloudflare Worker mail path and the domain's inbound
mail routing are separate decisions.

Before production cutover, verify in Cloudflare that the `send_email` binding is
active and can deliver to `enquiries@xeontek.com`.

Worker variables/secrets and Pages variables are separate. Check both:

```text
Pages project:
  NEXT_PUBLIC_TURNSTILE_SITE_KEY

Worker:
  TURNSTILE_SECRET_KEY
  CONTACT_FROM
  CONTACT_TO
  CONTACT_EMAIL send_email binding
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
- `/api/contact` and `/api/apply` are handled by the Cloudflare Worker.
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
4. Leave the Cloudflare Pages deployment and Worker in place for investigation.
5. Fix the issue, redeploy, and repeat the verification checklist before
   attempting cutover again.
