# XeonTek Website Content & Imagery Plan

## Context

XeonTek is a **self-funded product company** that builds its own software solutions.
There are no external clients. No services for hire. No interest in funding.
The website exists for one reason: **when someone researches XeonTek, they should
see a legitimate, competent technology company that builds real products.**

Visitors will be: potential hires, partners, vendors, regulators, curious people
who found a whitepaper, or anyone doing due diligence on the company.

---

## Brand Voice

**Tone:** Understated confidence. Let the work speak.
**Perspective:** First-person plural ("we"), matter-of-fact.
**Avoid:** Sales language, CTAs that push for conversion, "contact us to learn more",
buzzwords like "cutting-edge", "revolutionary", "leverage", "synergy".
**Model after:** Stripe's early website, Linear's about page, Basecamp's company page.
Companies that explain what they do without trying to sell you something.

---

## SITE STRUCTURE

```
/                → Homepage (who we are + what we build)
/about           → Company story, values, team
/research        → Whitepapers and published thinking
/careers         → Open positions (only if hiring, otherwise remove from nav)
/contact         → Simple contact info (not a sales funnel)
/privacy         → Keep
/terms           → Keep
```

5 real pages. No filler. Every page earns its place.

---

## PAGE 1: HOMEPAGE (/)

The homepage answers: "What is XeonTek?" in 30 seconds.

### Hero Section

**Headline:**
"We build software that makes sense of financial data."

**Subheadline:**
"XeonTek is a London-based technology company. We design, engineer,
and operate our own AI-driven platforms for property analytics,
investment intelligence, and financial modelling."

No CTA buttons. No "learn more." The subheadline *is* the information.
If someone wants to dig deeper, the nav is right there.

#### Hero Imagery
- **Option A (recommended):** No image. Clean typographic hero with generous
  whitespace. The teal-to-white gradient background you already have works
  well — just strip the clutter.
- **Option B:** Subtle SVG pattern or abstract data mesh in the background,
  built with code (not a raster image). Keeps the page fast and unique.
- **If using Firefly:** "Minimal abstract geometric mesh pattern with subtle
  teal gradients on white background, very low opacity, clean modern aesthetic,
  no text, no objects, suitable as a faint background texture"
- **Dimensions:** 1440×600px (will be used as CSS background, faded)

---

### What We Build Section (3 Cards)

**Section Heading:** "Our focus areas"

These describe the *products and domains* you work in — not services you sell.

**Card 1: Property Analytics**
"We build platforms that process property market data — valuations, yields,
transaction histories, and market indicators — into structured, queryable
systems. Our tools help surface patterns in data that manual analysis misses."

**Card 2: Investment Intelligence**
"We develop models for investment risk assessment, portfolio analysis, and
market forecasting. Our systems are designed for explainability — every
prediction is traceable to the data and logic behind it."

**Card 3: Financial Modelling**
"We engineer financial modelling tools that handle complex scenarios —
multi-variable projections, sensitivity analysis, and Monte Carlo
simulations — presented through clear, interactive interfaces."

Each card: Teal outline icon + heading + description. No links. No CTAs.

#### Card Icons
- Use expanded SVG icons from existing `icons.ts` system
- Card 1: database/chart icon
- Card 2: brain/analytics icon
- Card 3: calculator/document icon
- No Firefly needed — clean line icons are better here

---

### Technology Section

**Section Heading:** "How we build"

A brief paragraph + a clean grid of technology categories. Not a scrolling
carousel — a static, scannable layout.

**Body:**
"We work primarily in Python and TypeScript. Our stack reflects what we've
found to be reliable and maintainable at our scale."

**Grid layout (icon + label, grouped):**

| Category | Technologies |
|----------|-------------|
| Languages | Python, TypeScript, SQL |
| AI & Data | PyTorch, scikit-learn, pandas, dbt, Airflow |
| Backend | FastAPI, Node.js, PostgreSQL, Redis, Kafka |
| Frontend | React, Astro, Tailwind CSS |
| Infrastructure | AWS, Azure, Vercel, Docker |
| Security | Cloudflare, SonarQube, Keycloak, OAuth 2.0 |

#### Imagery
- Use official technology logos where licensing allows (most do for "powered by" usage)
- Display in grayscale, full colour on hover
- **Dimensions:** 40×40px per logo
- Alternatively, skip logos entirely and just use a clean typographic grid

---

### Research Preview

**Section Heading:** "Published research"

Show 2-3 whitepaper cards. Simple layout:
- Title
- One-sentence description
- "Read PDF →" link

**Body above cards:**
"We publish our thinking on AI applications in finance and real estate.
These papers reflect the problems we're actively working on."

No cover images needed at this size — titles and descriptions are enough
on the homepage. Save imagery for the /research page.

---

### Footer note (replaces the current CTA banner)

A single line in the footer area of the homepage:

"XeonTek Ltd — London, est. 2013"

That's it. No newsletter signup. No "ready to talk?" No founder quotes.
The company speaks for itself through its design and content.

---

## PAGE 2: ABOUT (/about)

The about page answers: "Who are these people and should I take them seriously?"

### Hero

**Headline:** "About XeonTek"

No subheadline needed. Let the content below carry it.

---

### Company Story

**Body:**
"XeonTek was founded in London in 2013. We started with a simple premise:
the financial data tools available to small and mid-size firms were either
too expensive, too generic, or both. So we began building our own.

Over the past decade, we've focused on the intersection of financial services
and artificial intelligence — building platforms for property analytics,
investment modelling, and data-driven decision-making.

We're a self-funded company. We don't take on client work or outside investment.
Everything we build is for our own product portfolio. This gives us the freedom
to focus on getting things right rather than getting things shipped to meet
someone else's deadline.

Our team is small and technical. We value depth over breadth, and we'd rather
solve one problem well than five problems poorly."

This is honest. It explains the self-funded model without being defensive.
It turns "we don't have clients" into "we have the freedom to build properly."

---

### What We Value (3 items, keep it tight)

1. **Depth over breadth**
   "We specialise. Our domain is financial data and the AI systems that
   make it useful. We don't chase trends or pivot to whatever's popular."

2. **Ownership**
   "We build, operate, and maintain our own platforms. There's no gap
   between the team that writes the code and the team that lives with it."

3. **Rigour**
   "Every model is tested. Every system is monitored. Every decision
   is documented. We hold our own work to the standard we'd expect
   from anyone else."

---

### Team Section

**Heading:** "Team"

Small team, no photos. Keep it minimal and factual.

**Format:**
A short paragraph rather than individual cards:

"XeonTek is led by two co-founders with backgrounds in software engineering
and financial technology. Our team is small by design — we value focused
execution over headcount."

Optionally add a single LinkedIn company page link. No individual bios
or avatars needed. The rest of the site (research, tech stack, company
story) communicates competence without personal exposure.

**Trust without faces:**
- Companies House registration number in the footer (verifiable)
- "Est. 2013" prominently placed (longevity)
- Published whitepapers (intellectual depth)
- LinkedIn company page link (social proof)
- Design quality itself (attention to detail)

---

### Location

"Registered in London, United Kingdom. Our team works remotely."

If the Old Gloucester St address is a virtual/registered office (it's a well-known
virtual office building), label it honestly as "Registered address" — anyone
who knows London will recognise it. Being upfront about it is more credible
than pretending it's a physical office.

#### Imagery (optional)
- **Firefly Prompt:** "Minimal stylised illustration of London skyline silhouette,
  very simple, single teal color on white background, flat design, no detail,
  no text, suitable as a subtle decorative element"
- **Dimensions:** 1200×200px (wide, thin, used as a subtle section divider)

---

## PAGE 3: RESEARCH (/research)

Replaces /whitepaper. The name "research" signals seriousness.

### Hero

**Headline:** "Research"
**Subheadline:** "Papers and technical writing from the XeonTek team."

---

### Whitepaper Cards

**Layout:** 1-column list (not a grid — these are long-form content, treat
them like journal articles, not product cards).

**Per whitepaper:**
- Title (large, linked)
- Category tag: "Whitepaper"
- 2-3 sentence description
- "Read PDF →" link (opens in new tab)
- Optional: "Download" button

**Rewritten descriptions:**

**1. AI-Driven Financial Modelling for Real Estate Investment**
"An examination of how machine learning approaches — regression models,
gradient boosting, and neural networks — can improve property valuation
accuracy and investment return forecasting. Includes methodology,
performance benchmarks, and practical implementation considerations."

**2. Transforming B2B and B2C Experiences Through Web, Mobile, and AI**
"A framework for designing AI-integrated platforms that serve both business
and consumer audiences. Covers architecture decisions, data pipeline design,
and approaches to measuring real-world impact beyond vanity metrics."

**3. Bridging the Angel-to-VC Gap with AI-Powered Investment Intelligence**
"A proposed system architecture for data-driven investor-startup matching.
Explores how risk scoring, market analysis, and natural language processing
can reduce information asymmetry in early-stage investment."

#### Cover Imagery (one per whitepaper)
- **Dimensions:** 800×450px (16:9 ratio)
- **Firefly Prompt (Real Estate):** "Aerial photograph of modern London
  cityscape with very subtle geometric line overlay, teal monochrome color
  grading, editorial photography, no text, professional"
- **Firefly Prompt (B2B/B2C):** "Abstract composition of flowing data
  streams connecting geometric nodes, teal and white color palette,
  minimal clean design, no text, modern"
- **Firefly Prompt (VC/Angel):** "Minimal abstract bridge structure
  made of interconnected glowing data points, teal accent on white
  background, modern editorial illustration, no text"

---

## PAGE 4: CONTACT (/contact)

This is NOT a sales funnel. It's a simple "here's how to reach us" page.

### Hero

**Headline:** "Contact"

---

### Content (single column, centred, minimal)

**Email**
"General enquiries: enquiries@xeontek.com"

**Careers**
"Interested in working with us? See open positions on our careers page."
(Link to /careers — or remove this line if not hiring)

**Registered Address**
"XeonTek Ltd
27 Old Gloucester Street
London, WC1N 3AX
United Kingdom"

**LinkedIn**
[LinkedIn icon + link]

### Contact Form (simplified)

Keep the existing Web3Forms contact form but simplify the framing:

**Heading above form:** "Send us a message"

No "Questions, Comments or Feedback" — just the form. Fields:
- Name
- Email
- Message
- Submit

Remove hCaptcha if spam isn't actually a problem (it adds friction).
Keep it if you do get bot submissions.

No "what to expect when you contact us" flow. No Calendly.
If someone messages you, reply when you can. No need to set expectations
for a page that exists for due diligence, not lead generation.

---

## PAGE 5: CAREERS (/careers)

**If actively hiring:** Keep, but with better framing.
**If not hiring:** Remove from main nav. Add a footer link that goes
to a simple page saying "We don't have open positions right now.
Follow us on LinkedIn for updates."

### If hiring:

**Headline:** "Careers"
**Body:**
"We're a small, self-funded team building AI-driven financial platforms.
We work remotely, move deliberately, and value people who care about
the quality of what they build."

Job listings table (keep existing format — it works).
Remove the "filled" jobs entirely. Only show open positions.

### If not hiring:

**Headline:** "Careers"
**Body:**
"We don't have open positions at the moment. If you're interested in
future opportunities, connect with us on LinkedIn."

[LinkedIn link]

One paragraph. Done.

---

## GLOBAL ELEMENTS

### Navbar

**Links:** Home | About | Research | Contact

That's it. Four links. Maybe Careers as a fifth if hiring.
No button-styled link. Everything equal weight.

### Footer

Clean, minimal, three sections:

**Left:** "XeonTek Ltd — London, est. 2013"
**Centre:** Nav links (Home, About, Research, Contact, Privacy, Terms)
**Right:** LinkedIn icon

Single line copyright: "© 2013–2026 XeonTek Ltd"

Remove:
- Newsletter form (you have nothing to send)
- The conditional homepage-only extended footer
- Investor interest section (you said no outside investment)

---

## DESIGN DIRECTION

### What to keep
- Teal + slate colour palette (professional, distinctive)
- DM Sans / Work Sans typography pairing
- Clean whitespace-heavy layout
- The basic Astro + Tailwind stack

### What to change
- **Remove all emoji from content** (🙋🏼 ❤️ ✨ undermine credibility)
- **Remove Preline UI** — you only use HSCollapse for mobile nav.
  Replace with a 15-line vanilla JS toggle.
- **Remove the scrolling security tools carousel** — replace with a
  static technology grid or drop it entirely
- **Remove vague statistics** ("6+ Industry Sectors", "100K+ Global Reach",
  "Millions of Data Points") — if you can't be specific, say nothing
- **Simplify animations** — the beam line SVG on the homepage is clever
  but distracting. A clean static layout communicates competence better
  than animations.
- **Add real photography** — even one team photo transforms credibility

### Visual principles
1. **Density over flash** — pack information cleanly, don't spread thin
   content across dramatic sections with huge padding
2. **Typography-first** — good type at the right size with proper spacing
   does more than imagery. Invest in the type hierarchy.
3. **Muted, not boring** — the teal palette works but use it sparingly.
   Most of the page should be slate text on white/off-white. Teal for
   accents and highlights only.
4. **No decorative elements** — every visual should communicate something.
   If an icon doesn't add information, remove it. If a gradient doesn't
   guide the eye, flatten it.

---

## IMAGERY SUMMARY

### Adobe Firefly Generation Checklist

| # | Asset | Firefly Prompt | Dimensions | Page |
|---|-------|---------------|------------|------|
| 1 | Hero background texture | "Minimal abstract geometric mesh pattern with subtle teal gradients on white background, very low opacity, clean modern aesthetic, no text, no objects, faint background texture" | 1440×600px | Home |
| 2 | Whitepaper cover: Real Estate | "Aerial photograph of modern London cityscape with very subtle geometric line overlay, teal monochrome color grading, editorial photography, no text" | 800×450px | Research |
| 3 | Whitepaper cover: B2B/B2C | "Abstract composition of flowing data streams connecting geometric nodes, teal and white color palette, minimal clean design, no text, modern" | 800×450px | Research |
| 4 | Whitepaper cover: VC/Angel | "Minimal abstract bridge structure made of interconnected glowing data points, teal accent on white background, modern editorial illustration, no text" | 800×450px | Research |
| 5 | London skyline divider | "Minimal stylised London skyline silhouette, single teal color on white background, flat design, no detail, no text, decorative element" | 1200×200px | About |
| 6 | OG / Social share image | "Abstract teal gradient with subtle geometric data pattern, modern tech company aesthetic, clean, no text" | 1200×630px | Global meta |

**That's only 6 images.** A credibility site doesn't need much imagery.
The content and typography do the heavy lifting.

### Photos needed (real, not generated)
- **Founder/team headshots** — 400×400px, natural lighting, neutral background
- This is the single highest-impact visual on the entire site

---

## CONTENT MIGRATION CHECKLIST

### Remove
- [ ] "Innovate. Build. Repeat." tagline
- [ ] Emoji in all headings and content
- [ ] "Who are we? 🙋🏼", "We ❤️ you.", "Our Mojo! ✨" cards
- [ ] Vague statistics section on about page
- [ ] Security tools scrolling carousel
- [ ] Footer newsletter form
- [ ] Footer investor interest section
- [ ] Beam line SVG animations (or simplify significantly)
- [ ] "Filled" job listings
- [ ] Preline UI dependency
- [ ] hCaptcha (unless spam is a real problem)

### Add
- [ ] /research page (replaces /whitepaper)
- [ ] Real team member photos + bios on /about
- [ ] Static technology grid (replaces carousel)
- [ ] Proper 404 page
- [ ] "Registered address" label for Old Gloucester St

### Update
- [ ] Homepage hero copy
- [ ] Homepage focus area cards (property analytics, investment intelligence, financial modelling)
- [ ] About page company story
- [ ] Whitepaper descriptions (more specific, more technical)
- [ ] Contact page (simplify, remove sales-funnel framing)
- [ ] Navbar links (Home, About, Research, Contact)
- [ ] Footer (minimal, no newsletter, no investor section)
- [ ] Fix build script typo in package.json ("bulld" → "build")
- [ ] OG/social share image

### Keystatic Updates
- [ ] Rename whitepapers collection path references
- [ ] Add `coverImage` field
- [ ] Add `publishDate` field
- [ ] Add `category` field (Whitepaper | Article | Guide)
- [ ] Remove or archive jobs collection if not hiring
