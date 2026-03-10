# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XeonTek corporate website built with Next.js 15 (App Router), deployed on Vercel.
Self-funded product company — no client work, no services page, no sales funnel.
The site exists for credibility when people research the company.

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build
- `npm run start` — Serve production build locally
- `npm run lint` — Run Next.js linting

## Architecture

- **Framework:** Next.js 15, App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4 via PostCSS, custom OKLCH teal/slate palette in `src/app/globals.css`
- **Typography:** Instrument Serif (headings, via next/font/google) + Geist Sans/Mono (body, via `geist` package)
- **UI:** Radix UI for interactive components (Dialog for mobile nav), Phosphor Icons for iconography
- **Forms:** Server Actions with Zod validation, Web3Forms API backend (`WEB3FORM_API_KEY` env var)
- **Content:** Static JSON/MD files in `src/data/`, loaded via `src/lib/content.ts` with Zod schemas
- **Deployment:** Vercel (static + server-rendered contact page)

## Path Alias

`@/*` → `src/*` (single alias, replaces the old multi-alias setup)

## Key Files

- `src/app/globals.css` — Tailwind theme (colors, fonts, base styles)
- `src/lib/schemas.ts` — Zod schemas for content + contact form
- `src/lib/content.ts` — File-based content loading (whitepapers, jobs)
- `src/actions/contact.ts` — Server Action for contact form
- `src/components/layout/` — Navbar, Footer, MobileNav
- `src/components/ui/` — Button, ContactForm

## Content

- **Whitepapers:** JSON files in `src/data/whitepapers/`, validated with `whitepaperSchema`
- **Jobs:** Markdown with frontmatter in `src/data/jobs/`, validated with `jobSchema`

## Design Conventions

- Serif headings (Instrument Serif), sans-serif body (Geist Sans)
- Teal used sparingly for accents/links only — most UI is slate-on-white
- Borders over shadows, consistent `rounded-lg`, 150ms transitions
- No scroll animations, no decorative elements, no emoji in content
- See `DESIGN_SYSTEM.md` for full specification
