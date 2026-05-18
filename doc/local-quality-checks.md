# Local Quality Checks

Use this workflow when validating the static site before deployment.

## Build And Static Export

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npx wrangler deploy --dry-run`

## Browser Checks

- [ ] Run the site locally with `npm run preview` after building.
- [ ] Check desktop and mobile layouts.
- [ ] Check the contact form with Cloudflare Turnstile test keys or a staging
      Cloudflare environment.
- [ ] Confirm `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, `/security`,
      and `/research/*` render correctly.

## Lighthouse And Accessibility

- [ ] Run Lighthouse against the local preview for desktop and mobile.
- [ ] Confirm Performance, Accessibility, Best Practices, and SEO results.
- [ ] Run an axe accessibility scan, or browser DevTools accessibility checks,
      on the homepage, contact page, research page, and a whitepaper page.
- [ ] Check keyboard navigation for desktop nav, mobile nav, footer links,
      contact form fields, and research links.

## Crawl And Metadata

- [ ] Confirm each indexable page has one canonical URL.
- [ ] Confirm Privacy and Terms are `noindex, follow`.
- [ ] Confirm sitemap URLs match deployed routes.
- [ ] Confirm Open Graph metadata uses absolute URLs after deployment.
- [ ] Confirm structured data validates for Organization, WebSite,
      CollectionPage, and CreativeWork entries.
