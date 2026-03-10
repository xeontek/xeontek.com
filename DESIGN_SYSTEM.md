# XeonTek Design System Specification

## Design Philosophy

Premium corporate that ages well. Think: a well-typeset annual report,
not a SaaS landing page. Trust through craft, restraint, and attention
to detail. If something doesn't need to be there, it shouldn't be.

Reference points: Stripe's typography, Linear's spacing, gov.uk's clarity,
The Economist's editorial confidence.

---

## TYPOGRAPHY

The current DM Sans + Work Sans pairing is competent but reads "startup."
For a financial technology company that wants to signal establishment and
seriousness, a serif heading font changes everything.

### Recommended Pairing

**Headings: Instrument Serif**
- Free, variable weight, Google Fonts
- Why: It has the editorial gravitas of a financial publication without
  being stuffy. Looks expensive. Ages well. Distinctive enough to feel
  ownable but not quirky.
- Weights to load: 400 (regular) only — serif headings look best at
  normal weight with size doing the hierarchy work.

**Body: Geist Sans**
- Free, by Vercel, self-hosted (not on Google Fonts)
- Download from: https://vercel.com/font
- Why: Exceptionally legible at small sizes. Designed for interfaces.
  Clean, modern, but not cold. Pairs beautifully with serif headings
  because it provides contrast without competing.
- Weights to load: 400 (regular), 500 (medium), 600 (semibold)

**Monospace (for tech stack listings): Geist Mono**
- Free, same family as Geist Sans
- Use sparingly — technology names, code references, version numbers.
- Weight: 400 only

### Alternative Pairings (if Instrument Serif doesn't suit)

**Option B: Newsreader (headings) + Inter (body)**
- Newsreader: Designed for on-screen reading, editorial feel, Google Fonts
- Inter: Industry standard, nothing wrong with it, very safe
- This is the "conservative" option — impeccable but less distinctive

**Option C: Fraunces (headings) + Source Sans 3 (body)**
- Fraunces: Quirky old-style serif, more personality, Google Fonts
- Source Sans 3: Adobe's open-source workhorse
- This is the "more character" option — riskier but memorable

### Type Scale

Use a consistent modular scale. Based on 1rem = 16px, with a 1.25 ratio
(major third scale):

```
--text-xs:    0.75rem   / 12px   — captions, legal text
--text-sm:    0.875rem  / 14px   — secondary body, metadata
--text-base:  1rem      / 16px   — body text
--text-lg:    1.125rem  / 18px   — lead paragraphs, emphasis
--text-xl:    1.25rem   / 20px   — card headings, section labels
--text-2xl:   1.563rem  / 25px   — section headings (h3)
--text-3xl:   1.953rem  / 31px   — page section headings (h2)
--text-4xl:   2.441rem  / 39px   — page titles (h1) mobile
--text-5xl:   3.052rem  / 49px   — page titles (h1) desktop
--text-6xl:   3.815rem  / 61px   — homepage hero only
```

### Line Heights

```
Headings (serif):   1.1 – 1.2  (tight, creates density and authority)
Body text:          1.6 – 1.7  (comfortable reading)
UI elements:        1.4         (buttons, labels, nav)
```

### Letter Spacing

```
Headings (serif):   -0.02em    (slight tightening — standard for display serif)
Body:               0           (Geist is already optically balanced)
All-caps labels:    0.05em      (always track out uppercase)
Monospace:          -0.01em     (slight tightening)
```

### Implementation (global.css changes)

```css
@theme {
  --font-heading: "Instrument Serif", Georgia, "Times New Roman", serif;
  --font-body: "Geist Sans", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", "Cascadia Code", monospace;
}

@layer base {
  body {
    @apply font-body text-base leading-relaxed text-slate-700 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-heading tracking-tight text-slate-900;
    line-height: 1.15;
  }

  h1 { @apply text-4xl sm:text-5xl lg:text-6xl; }
  h2 { @apply text-3xl sm:text-4xl; }
  h3 { @apply text-2xl; }
  h4 { @apply text-xl; }
}
```

### Font Loading Strategy

**Self-host both fonts** (not Google Fonts CDN). Reasons:
1. No third-party requests = faster, more private, more professional
2. Geist isn't on Google Fonts anyway
3. Control over subsetting and formats

Place font files in `/public/fonts/`:
```
public/fonts/
├── InstrumentSerif-Regular.woff2
├── InstrumentSerif-Italic.woff2
├── GeistSans-Regular.woff2
├── GeistSans-Medium.woff2
├── GeistSans-SemiBold.woff2
└── GeistMono-Regular.woff2
```

Load via @font-face in global.css with `font-display: swap` and
`unicode-range` subsetting for Latin characters only.

---

## COLOUR PALETTE

The current teal + slate works. But it's applied too liberally — teal
backgrounds on cards, teal gradients everywhere. Premium means restraint.

### Refined Palette

**Primary: Slate (text and structure)**
Keep the existing OKLCH-based slate scale. It's well-calibrated.
- `slate-900` — headings, primary text
- `slate-700` — body text (NOT slate-600, which is too light for body)
- `slate-500` — secondary text, metadata, placeholders
- `slate-300` — borders, dividers
- `slate-100` — subtle backgrounds, hover states
- `slate-50`  — page section backgrounds (alternating)

**Accent: Teal (used sparingly)**
Keep the existing teal scale but use it for:
- Links (teal-800, hover: teal-700)
- Active/selected states
- Small accent elements (a thin top border, an icon fill, a badge)
- The logo accent color

**DO NOT use teal for:**
- Large background fills (no more teal-400 contact form background)
- Card backgrounds (use white or slate-50)
- Gradient washes across sections

**Surfaces:**
```
--surface-primary:    #ffffff       (white — cards, content areas)
--surface-secondary:  #fafafa       (off-white — alternating sections)
--surface-tertiary:   slate-50      (subtle emphasis areas)
--surface-inverse:    slate-900     (dark sections — use sparingly, max 1 per page)
```

**Borders:**
```
--border-default:     slate-200     (cards, inputs, dividers)
--border-subtle:      slate-100     (very light separation)
--border-emphasis:    slate-300     (when you need more contrast)
--border-accent:      teal-700      (sparingly — active states, highlights)
```

### Colour Usage Rules

1. **90% of the page should be slate text on white/off-white.** Teal is
   seasoning, not the main course.
2. **Never use teal text on teal backgrounds.** The existing teal-700 on
   teal-100 cards is low contrast and hard to read.
3. **One accent colour only.** Don't introduce secondary accent colours.
4. **Dark sections:** If using a slate-900 section (e.g., footer or a
   single feature callout), use white/slate-100 text and teal-400 for
   links. Maximum one dark section per page.

---

## SPACING & LAYOUT

### Spacing Scale

Use Tailwind's default scale but establish consistent patterns:

```
Section padding (vertical):    py-16 sm:py-20 lg:py-24
Section padding (horizontal):  px-6 sm:px-8 lg:px-12
Card padding:                  p-6 sm:p-8
Component gaps:                gap-4, gap-6, gap-8
Stack spacing (text blocks):   space-y-4 (body), space-y-6 (sections)
```

**Container max-widths:**
```
--container-prose:   42rem  (672px)  — text-heavy pages (about, privacy, terms)
--container-content: 64rem  (1024px) — standard content pages
--container-wide:    80rem  (1280px) — homepage, pages with side-by-side layouts
```

Keep content narrower than the current `max-w-[85rem]` (1360px). Narrower
content columns are easier to read and feel more considered.

### Grid

- **Homepage:** Single column, centred. No multi-column hero.
- **Cards:** 1 col mobile → 3 col desktop (gap-6 lg:gap-8)
- **Content pages:** Single column, max-w-prose (42rem) for readability
- **Research page:** Single column list (not a grid — academic style)
- **Contact:** Single column, centred, narrow (max-w-lg)

### Vertical Rhythm

Maintain consistent spacing between sections. Every section should have
the same vertical padding. This creates a calm, predictable rhythm that
signals attention to detail.

---

## COMPONENT DESIGN (shadcn-inspired)

You can't use shadcn/ui directly (it's React + Radix). But you can adopt
its design language in Astro components with Tailwind. The key shadcn
principles:

1. **Subtle borders instead of shadows** — shadows feel 2020. Thin borders
   (1px, slate-200) feel current and will age well.
2. **Consistent border radius** — pick one and use it everywhere.
   Recommendation: `rounded-lg` (0.5rem/8px). Not too sharp, not too soft.
3. **Muted backgrounds** — hover states use slate-50 or slate-100, not
   colour changes.
4. **Restrained transitions** — 150ms duration, ease-in-out. No bounces,
   no spring animations.

### Updated Button Variants

```
Primary:     bg-slate-900 text-white hover:bg-slate-800
             (Dark, authoritative. NOT teal.)

Secondary:   bg-white text-slate-700 border border-slate-200
             hover:bg-slate-50 hover:border-slate-300
             (Outlined, subtle.)

Ghost:       bg-transparent text-slate-600 hover:bg-slate-100
             (For nav links, secondary actions.)

Accent:      bg-teal-800 text-white hover:bg-teal-700
             (Use only for ONE primary action per page, if needed.)
```

All buttons: `rounded-lg px-4 py-2 text-sm font-medium transition-colors
duration-150`

**Note:** Making the primary button slate-900 (near-black) instead of teal
is a deliberate choice. It reads as more serious and corporate. Teal
becomes the exception, not the default — which makes it more impactful
when you do use it.

### Card Component

```
Base:        bg-white border border-slate-200 rounded-lg p-6 sm:p-8
Hover:       hover:border-slate-300 transition-colors duration-150
             (NO shadow on hover. NO scale transform. Just a border shift.)

No dashed borders (the current card utility uses dashed — too playful).
No gradient overlays on hover.
```

### Input Fields

```
Base:        bg-white border border-slate-200 rounded-lg px-3 py-2
             text-sm text-slate-900 placeholder:text-slate-400
Focus:       focus:border-teal-700 focus:ring-1 focus:ring-teal-700
             focus:outline-none
```

Floating labels are trendy but age poorly and hurt accessibility.
Use standard labels above inputs:

```html
<label class="block text-sm font-medium text-slate-700 mb-1.5">
  Email address
</label>
<input type="email" class="..." />
```

### Dividers

```
Horizontal:  border-t border-slate-200    (between sections)
Subtle:      border-t border-slate-100    (within components)
```

No decorative dividers, SVG separators, or wave shapes.

### Badges / Tags

```
Default:     bg-slate-100 text-slate-600 text-xs font-medium
             rounded-md px-2 py-0.5
Accent:      bg-teal-50 text-teal-800 text-xs font-medium
             rounded-md px-2 py-0.5
```

Use for: whitepaper categories, technology tags, status labels.

---

## ICONS — PHOSPHOR

### Why Phosphor
- 9,000+ icons, 6 weights (thin, light, regular, bold, fill, duotone)
- Consistent 24×24 grid, designed to work as a family
- Tree-shakeable — only ships icons you import
- React-native API — works inside Astro `client:*` islands

### Package
```
npm install @phosphor-icons/react
```

### Weight Convention
Use **one weight consistently** across the entire site. Recommendation:

**Regular (default)** for body/UI icons
**Light** for large decorative icons (hero sections, feature cards)

Never mix weights within the same visual context. A nav using regular
icons and a footer using bold icons looks inconsistent.

### Sizing Convention
```
Navigation icons:    size={18}
Inline body icons:   size={16}
Card/feature icons:  size={28} or size={32}
Hero/decorative:     size={40} or size={48}
```

Always set via the `size` prop, not CSS. This keeps the stroke
proportional.

### Colour Convention
```
Default:     className="text-slate-500"
Interactive: className="text-slate-600 hover:text-slate-900"
Accent:      className="text-teal-700"
On dark bg:  className="text-slate-300"
```

Use `currentColor` (Phosphor's default) wherever possible so icons
inherit text colour from their parent.

### Usage in Astro

Since Phosphor is a React library, icons must render inside React
islands. Create a thin wrapper component:

**`src/components/ui/PhIcon.tsx`**
```tsx
import type { IconProps } from "@phosphor-icons/react";

// Re-export individual icons as needed
export {
  ArrowRight,
  ArrowUpRight,
  Buildings,
  ChartLine,
  Database,
  Envelope,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MapPin,
  Brain,
  Shield,
  Code,
  Lightning,
  CaretRight,
  List,
  X,
} from "@phosphor-icons/react";
```

**Usage in .astro files:**
```astro
---
import { Envelope } from "@ui/PhIcon";
---
<Envelope size={20} className="text-slate-500" client:load />
```

For icons that are purely decorative (no interactivity), consider using
`client:visible` to defer hydration until scrolled into view.

For icons in the nav/above the fold, use `client:load`.

### Icon Mapping (old → new)

| Old (icons.ts) | Phosphor Equivalent |
|----------------|-------------------|
| arrowDownRight | ArrowDownRight |
| chevronRight | CaretRight |
| cursorRays | CursorClick |
| cog | Gear |
| puzzle | PuzzlePiece |
| dataBase | Database |
| brain | Brain |
| lightbulb | Lightbulb |
| chartPie | ChartPie |
| portfolio | Briefcase |
| presentationChart | Presentation |
| articles | Article |
| documentChartBar | FileText |
| blankDocument | File |
| documentMagnifyingGlass | MagnifyingGlass |
| info | Info |
| mobile | DeviceMobile |
| email | Envelope |
| world | Globe |
| mapPin | MapPin |
| download | DownloadSimple |
| badge | Medal |
| chatBubble | ChatCircle |
| arrowPath | ArrowsClockwise |
| check | Check |
| minus | Minus |
| questionMark | Question |
| checkCircle | CheckCircle |
| newWindow | ArrowSquareOut |
| thumbUp | ThumbsUp |
| thumbDown | ThumbsDown |

### Cleanup
After migration, delete:
- `src/components/ui/icons/icons.ts` (entire file)
- `src/components/ui/icons/Icon.astro` (entire file)
- `src/components/ui/icons/` directory

---

## RADIX UI — INTERACTIVE COMPONENTS

### Why Radix
- Unstyled, accessible primitives — you own the visual design completely
- WAI-ARIA compliant out of the box (keyboard nav, focus management, screen readers)
- Composable — use only what you need, no monolithic bundle
- The foundation shadcn/ui is built on (same design philosophy without the copy-paste)
- Works with React islands in Astro via `client:*` directives

### Packages (install only what you use)
```
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-dialog
npm install @radix-ui/react-separator
npm install @radix-ui/react-tooltip        # optional
npm install @radix-ui/react-accordion       # optional
```

### Architecture in Astro

Radix components are React. In Astro, they live as **client islands** —
small React components embedded in otherwise static Astro pages.

**Key principle:** Keep islands small and focused. Don't make the entire
navbar a React component. Only the interactive parts (mobile menu toggle,
dropdown) need to be React.

```
src/components/
├── sections/
│   ├── Navbar.astro          ← Static shell (logo, desktop links)
│   └── Footer.astro          ← Fully static, no React
├── ui/
│   ├── MobileNav.tsx         ← Radix Dialog (React island)
│   ├── PhIcon.tsx            ← Phosphor icon re-exports
│   └── Button.astro          ← Static, no React needed
```

### Component: MobileNav (Radix Dialog)

The mobile hamburger menu becomes a Radix Dialog overlay.
This gives you: focus trapping, Escape to close, scroll locking,
proper aria attributes — all for free.

**`src/components/ui/MobileNav.tsx`**
```tsx
import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

interface Props {
  currentPath: string;
}

export default function MobileNav({ currentPath }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-lg
                     p-2 text-slate-600 hover:bg-slate-100
                     transition-colors duration-150 lg:hidden"
          aria-label="Open navigation menu"
        >
          <List size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/40
                     data-[state=open]:animate-in data-[state=open]:fade-in-0
                     data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm
                     bg-white p-6 shadow-lg
                     data-[state=open]:animate-in data-[state=open]:slide-in-from-right
                     data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-medium text-slate-900">
              XeonTek
            </span>
            <Dialog.Close asChild>
              <button
                className="rounded-lg p-2 text-slate-500
                           hover:bg-slate-100 transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col space-y-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium
                  transition-colors duration-150
                  ${currentPath === href
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**Usage in Navbar.astro:**
```astro
---
import MobileNav from "@ui/MobileNav";
const currentPath = Astro.url.pathname;
---
<header class="sticky top-0 z-50 border-b border-slate-200 bg-white">
  <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
    <a href="/" class="text-lg font-medium text-slate-900">XeonTek</a>

    <!-- Desktop nav (static, no React) -->
    <nav class="hidden lg:flex items-center gap-8">
      <a href="/" class="text-sm font-medium text-slate-500 hover:text-slate-900">Home</a>
      <a href="/about" class="text-sm font-medium text-slate-500 hover:text-slate-900">About</a>
      <a href="/research" class="text-sm font-medium text-slate-500 hover:text-slate-900">Research</a>
      <a href="/contact" class="text-sm font-medium text-slate-500 hover:text-slate-900">Contact</a>
    </nav>

    <!-- Mobile nav (React island) -->
    <MobileNav currentPath={currentPath} client:load />
  </div>
</header>
```

### Component: Separator (Radix Separator)

Semantic `<hr>` replacement with proper ARIA role.

**Usage inline (no wrapper needed):**
```tsx
import * as Separator from "@radix-ui/react-separator";

<Separator.Root className="h-px w-full bg-slate-200" />
```

Or just use a styled `<hr>` in Astro — Radix Separator is only
necessary if you need vertical separators or decorative role semantics.

For most cases in Astro, this is fine:
```astro
<hr class="border-t border-slate-200" />
```

### Component: Tooltip (optional, for tech stack)

If showing a technology grid with logos/icons, tooltips can show the
full name on hover.

**`src/components/ui/TechTooltip.tsx`**
```tsx
import * as Tooltip from "@radix-ui/react-tooltip";

interface Props {
  label: string;
  children: React.ReactNode;
}

export default function TechTooltip({ label, children }: Props) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs
                       font-medium text-white shadow-md
                       animate-in fade-in-0 zoom-in-95"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
```

### What NOT to use Radix for

Don't over-componentise. These should stay as plain Astro/HTML:

- **Buttons** — a `<button>` or `<a>` with Tailwind classes is fine.
  Radix has no Button primitive anyway.
- **Cards** — static content blocks. No interactivity needed.
- **Forms** — the contact form is server-rendered. Standard HTML form
  elements with Tailwind styling. No React needed.
- **Footer** — fully static. No React.
- **Page content** — all static Astro.

**Rule of thumb:** If it doesn't have interactive state (open/closed,
hover with content, focus trapping), keep it as Astro. Only reach for
Radix when you need accessible interactive behaviour that's hard to
build correctly by hand.

### Hydration Strategy

Every React island adds JS to the client bundle. Minimise this:

```
client:load     → MobileNav (needs to work immediately)
client:visible  → Tooltips, Accordion (defer until scrolled to)
client:idle     → Non-critical interactive elements
```

For a 5-page corporate site, the total Radix footprint will be small
(Dialog ~8KB + any others). But be intentional — don't wrap static
content in React just because you can.

---

## NAVIGATION (Navbar Redesign)

### Desktop

Clean horizontal nav, not floating/rounded (the current floating pill
style is trendy but dates fast).

```
Layout:      Full-width, border-b border-slate-200, bg-white
             Sticky top-0 z-50

Left:        Logo ("XeonTek" — all one weight, teal-800 color.
             Drop the split colouring of "Xeon" vs "Tek".)

Right:       Nav links + no button-styled CTA

Link style:  text-sm font-medium text-slate-500
             hover:text-slate-900 transition-colors duration-150

Active:      text-slate-900 (no underline, just darker text)
```

**Why remove the floating nav:** Floating navbars with rounded corners
and backdrop blur are a 2023-2024 trend. A clean top-anchored nav with
a bottom border is timeless (see: every major financial institution,
Stripe, Apple developer docs, The New York Times).

### Mobile

Simple hamburger → full-screen overlay or slide-down panel.
Replace Preline's HSCollapse with ~20 lines of vanilla JS:

```js
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
```

No animation library needed.

---

## FOOTER (Redesign)

### Structure

```
Border-top:  border-t border-slate-200

Layout:      Three columns on desktop, stacked on mobile
             py-12 sm:py-16

Column 1:    Logo + one-line description
             "XeonTek — Financial technology, London."

Column 2:    Nav links (vertical list)
             Home, About, Research, Contact
             (+ Careers if hiring)

Column 3:    Legal links (vertical list)
             Privacy Policy, Terms of Use

Bottom bar:  text-xs text-slate-400
             "© 2013–2026 XeonTek Ltd. Registered in England & Wales."
             Company number if you want to (adds legitimacy).
```

Remove: Newsletter form, investor contact section, conditional rendering
(same footer on every page), extended grid layout.

---

## IMAGERY APPROACH (without photos)

Since there are no team photos, trust must come entirely from design
quality, content depth, and subtle credibility signals. Here's how:

### Trust Signals That Replace Photos

1. **Companies House number in the footer** — verifiable proof of
   legitimacy. Anyone can check. This is the corporate equivalent of
   showing your face.

2. **"Est. 2013" prominently placed** — longevity is trust. A company
   that's been registered for 13 years is real.

3. **Published research with real depth** — the whitepapers. Present
   them with academic-level descriptions. Depth signals competence.

4. **Design quality itself** — a beautifully typeset site with perfect
   spacing, consistent components, and zero rough edges says "these
   people pay attention to detail." This IS the trust signal.

5. **LinkedIn company page link** — verifiable social proof without
   personal exposure.

### Visual Elements (instead of photos)

**Abstract geometric patterns (Firefly):**
Use as subtle section backgrounds or card accents. Keep opacity low
(10-20%). These should feel like texture, not illustration.

**SVG line graphics (code-generated):**
Simple, precise line art communicates engineering rigour better than
AI-generated imagery. Think: architectural blueprints, circuit diagrams,
financial charts — all abstracted to pure geometry.

**Data visualisation as decoration:**
Consider using real (anonymised) or stylised data visualisations as
hero imagery. A beautifully rendered chart or network graph says more
about a data company than any stock photo.

### Firefly Prompts (Revised for Premium Corporate)

| # | Asset | Prompt | Dims |
|---|-------|--------|------|
| 1 | Homepage background texture | "Extremely subtle geometric grid pattern, hairline thin lines, light gray on white background, barely visible, architectural blueprint aesthetic, no text, no objects" | 1440×600 |
| 2 | Research cover: Real Estate | "Aerial photograph of London financial district, moody overcast sky, desaturated teal monochrome color grading, editorial architectural photography, high contrast, no text" | 800×450 |
| 3 | Research cover: B2B/B2C | "Abstract minimal composition of two intersecting geometric planes with subtle data point scatter, monochrome teal and dark gray, very clean, no text, editorial" | 800×450 |
| 4 | Research cover: VC/Angel | "Close-up photograph of modern glass and steel architecture with geometric reflections, desaturated teal tone, editorial photography, shallow depth of field, no text" | 800×450 |
| 5 | OG/Social image | "Dark slate background with subtle geometric grid pattern and thin teal accent line, minimal, corporate, modern, no text, clean" | 1200×630 |

**Style notes for all Firefly prompts:**
- Always add "no text" — Firefly tends to hallucinate text
- Use "editorial" and "architectural" as style keywords — they produce
  more premium, less "AI-looking" results
- Keep colour grading to teal monotone — consistency across all imagery
- Prefer photography-style over illustration-style for the research covers
  (more serious, less startup-y)
- Generate at 2x resolution and downscale for sharpness

---

## DARK MODE

**Don't implement dark mode.** Reasons:

1. Corporate sites don't need it — your visitors aren't coding at 2am
2. It doubles your design/testing surface area
3. It introduces colour inconsistencies that erode the premium feel
4. Every major financial institution, law firm, and consultancy uses
   light mode only

If you ever want it later, the OKLCH colour scale makes it straightforward
to add, but don't do it now.

---

## MOTION & ANIMATION

### Principles

1. **Prefer no animation to gratuitous animation.** A static, well-laid-out
   page is more premium than one with scroll-triggered reveals.
2. **Transitions, not animations.** Hover states transition (150ms).
   Page elements don't animate in.
3. **No scroll-triggered animations.** No fade-in-on-scroll, no parallax,
   no intersection observer reveals. These are ubiquitous, distracting,
   and age poorly.

### What to keep
- Button hover state transitions (150ms, color only)
- Link hover transitions (150ms, color only)
- Mobile nav open/close (200ms, opacity or height)

### What to remove
- Homepage beam line SVG animations
- About page scrolling carousel animation
- Any staggered entrance animations
- The scroll animation keyframes in global.css

---

## DEPENDENCIES TO CHANGE

### Remove
- `preline` (3.2.3) — only used for HSCollapse. Replace with Radix
  NavigationMenu or a vanilla JS toggle. Removes ~50KB and the
  `@import "preline/variants.css"` dependency.
- `astro-font` (1.1.0) — unnecessary with self-hosted @font-face
- Google Fonts CSS imports from global.css
- Custom `icons.ts` + `Icon.astro` system (34 hand-rolled SVG icons) —
  replaced entirely by Phosphor Icons.

### Add
- `@phosphor-icons/react` — icon library (see Icons section below)
- `@radix-ui/react-navigation-menu` — accessible nav with keyboard support
- `@radix-ui/react-dialog` — mobile nav overlay / any future modal needs
- `@radix-ui/react-separator` — semantic dividers
- `@radix-ui/react-tooltip` — tech stack tooltips (optional)
- `@radix-ui/react-accordion` — FAQ or expandable sections (optional)
- Self-hosted font files in `/public/fonts/`

### Keep
- `tailwindcss` + `@tailwindcss/vite` (core styling)
- `@tailwindcss/forms` (input styling reset)
- `@tailwindcss/typography` (prose styling for whitepaper content)
- `tailwind-merge` (class conflict resolution)
- `@astrojs/react` (already installed — now actually used for Radix)
- Everything else (Astro, Keystatic, etc.)

---

## TAILWIND ANIMATION UTILITIES (for Radix)

Radix uses `data-[state=open]` and `data-[state=closed]` attributes
for animation hooks. Add `tailwindcss-animate` for the utility classes
used in the Radix component examples above:

```
npm install tailwindcss-animate
```

Then in global.css:
```css
@plugin 'tailwindcss-animate';
```

This gives you: `animate-in`, `animate-out`, `fade-in-0`, `fade-out-0`,
`slide-in-from-right`, `slide-out-to-right`, `zoom-in-95`, etc.

These are the same animation utilities shadcn/ui uses.

---

## IMPLEMENTATION PRIORITY

### Phase 1: Foundation (typography, colour, dependencies)
1. `npm install @phosphor-icons/react @radix-ui/react-dialog tailwindcss-animate`
2. `npm uninstall preline astro-font`
3. Download and self-host Instrument Serif + Geist Sans + Geist Mono
4. Update global.css: @font-face, theme tokens, base styles, remove
   preline import, add tailwindcss-animate plugin
5. Update Head.astro: Remove AstroFont component
6. Adjust colour usage across all pages (reduce teal, increase slate)

### Phase 2: Component Migration
1. Create `src/components/ui/PhIcon.tsx` (Phosphor re-exports)
2. Create `src/components/ui/MobileNav.tsx` (Radix Dialog)
3. Rewrite Navbar.astro (clean top bar, MobileNav island, Phosphor icons)
4. Delete `src/components/ui/icons/` directory (old icon system)
5. Rewrite Button.astro with new variants
6. Rewrite Footer.astro (minimal three-column, same on all pages)
7. Update all icon references across pages to use Phosphor
8. Update form inputs (standard labels, clean borders)

### Phase 3: Content & Layout
1. Implement new page content (from CONTENT_PLAN.md)
2. Apply new spacing and container widths
3. Remove animations and decorative elements
4. Add Companies House number and est. date to footer
5. Optionally add TechTooltip.tsx (Radix Tooltip) for tech stack grid

### Phase 4: Imagery & Polish
1. Generate Firefly assets
2. Optimise and place images
3. Update OG/social meta image
4. Final spacing and alignment pass
5. Cross-browser and mobile testing

---

## QUICK REFERENCE: BEFORE → AFTER

| Element | Current | New |
|---------|---------|-----|
| Heading font | DM Sans (sans-serif) | Instrument Serif (serif) |
| Body font | Work Sans | Geist Sans |
| Font loading | Google Fonts CDN | Self-hosted woff2 |
| Icons | 34 hand-rolled SVGs in icons.ts | Phosphor Icons (React, tree-shaken) |
| Interactive UI | Preline HSCollapse | Radix UI (Dialog, Tooltip) |
| Animations | Custom keyframes | tailwindcss-animate (shadcn-style) |
| Primary button | Teal-800 bg | Slate-900 bg |
| Card borders | Dashed, slate-300 | Solid, slate-200 |
| Card hover | Gradient overlay | Border darkens (150ms) |
| Nav style | Floating pill, backdrop blur | Clean top bar, border-bottom |
| Mobile nav | Preline HSCollapse | Radix Dialog (focus trap, esc, a11y) |
| Teal usage | Backgrounds, gradients, cards | Links, accents, logo only |
| Motion | Beam lines, carousels, scroll | Hover transitions only (150ms) |
| Shadows | Various (xs, md, lg) | None or shadow-sm only |
| Border radius | Mixed (lg, xl, 2xl) | Consistent rounded-lg |
| Footer | Conditional, newsletter, investor | Simple 3-col, same everywhere |
| Emoji | In headings | None |
| Stats | "6+", "100K+", "Millions" | Removed |
