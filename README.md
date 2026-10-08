# Hayatullah Rahnamoon — Portfolio

A Next.js (App Router) portfolio with a token-driven design system, a working appointment booking flow, researched project case studies, and clickable technology panels with replayable setup "clips".

Design source: `portfolio.pdf` — slate `#34373c` background, signal-green `#34c759` accent, `<h1>/<span>/<p>` code-tag hero, pill buttons, vertical pill navigation.

## Product

| Area | What it does |
| --- | --- |
| **Home / Hero** | Code-tag hero from the design with a typed heading, CTA pills (Book a meeting, My Works), and key stats |
| **Vertical pill nav** | Scroll-synced section navigation (IntersectionObserver), as in the design |
| **Projects** | 7 products (Jobtimizer, NRICH, EMS, CIT, NearU, JPNBUY, FMX site) with cover art, feature lists and a detail page per project (`/projects/[slug]`) |
| **Technologies** | 13 technologies; clicking one opens a drawer with a short intro, install steps in an animated terminal clip (replay + copy), docs and tutorial links |
| **About / Experience** | Timeline from 2017 to today, education, languages, courses |
| **Appointment** | `/appointment` — pick a weekday, see live free slots, book, get an `.ics` calendar file; optional webhook notification |

## Project structure

```
src/
├─ app/                      # Routing layer only — thin pages that compose features
│  ├─ layout.tsx · page.tsx · globals.css
│  ├─ appointment/page.tsx
│  └─ projects/[slug]/page.tsx
├─ design-system/            # No business logic. Reusable across features
│  ├─ tokens/tokens.css      # SOURCE OF TRUTH for color, type, radius, shadow, motion
│  ├─ tokens/tokens.json     # Same tokens for Figma Tokens Studio / Style Dictionary
│  └─ ui/                    # Button, CodeTag, Chip, SpotlightCard, Drawer
├─ features/                 # Vertical slices; each owns its UI + local logic
│  ├─ home/ · projects/ · technologies/ · appointment/
├─ data/                     # Typed content (profile, experience, projects, technologies)
├─ lib/                      # Domain/infra: slots, validation (zod), appointments-store, deliver, ics
└─ types/                    # Shared types
```

**Dependency rule:** `app → features → design-system`, and `features → data/lib/types`. `design-system` never imports from `features`. Content lives in `data/`, so adding a project or technology is a single typed object — no component changes.

## Design system & tokens

1. Tokens are CSS variables in `tokens.css`: primitives (`--slate-*`, `--green-*`) → semantic (`--color-bg`, `--color-brand`, …) → component use.
2. `tailwind.config.ts` maps utilities (`bg-bg`, `text-brand`, `rounded-pill`, `shadow-glow`) to those variables — **never hard-code hex values in components**.
3. To retheme, edit semantic tokens only. `tokens.json` mirrors them for design tooling.
4. Motion respects `prefers-reduced-motion`; focus rings, skip link and ARIA roles are built in.

## Appointment system (static-hosting safe)

GitHub Pages (free plan) serves **static files only**, so there is no API or database. The booking flow runs entirely in the browser:

- **Slots:** 30 min, Mon–Fri 10:00–18:00 **Europe/Berlin**, at least 2 h ahead, up to 90 days out (`src/lib/slots.ts`). The visitor sees the time converted to their own timezone.
- **Validation:** zod (`src/lib/validation.ts`).
- **Double-booking guard:** `src/lib/appointments-store.ts` (localStorage). It only knows about bookings made in *that visitor's browser* — a static site cannot share availability between visitors.
- **Delivery to you** (`src/lib/deliver.ts`):
  1. If `NEXT_PUBLIC_BOOKING_ENDPOINT` is set (Formspree, Basin, Getform … any endpoint that accepts a JSON POST), the request is posted there and lands in your inbox.
  2. Otherwise a pre-filled **email** to `NEXT_PUBLIC_CONTACT_EMAIL` opens automatically (with a fallback button).
- **Calendar file:** `.ics` is generated in the browser (`src/lib/ics.ts`), marked *tentative* until you confirm by email.

Each booking is a *request* that you confirm. For real shared availability (a slot disappears for everyone) point `appointments-store.ts` at a backend or embed a scheduler such as Cal.com — the UI only depends on `bookedTimes` / `createAppointment`.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run typecheck && npm run build   # static export → ./out
```

## Deployment — GitHub Pages (free plan)

`next.config.mjs` uses `output: "export"`; `.github/workflows/deploy.yml` builds and publishes `./out` on every push to `main`.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions** (free plan requires a **public** repo).
2. Push to `main`. The workflow typechecks, builds and deploys; the URL is `https://hayat12.github.io/me/` for this repo.
3. The workflow reads the base path from `actions/configure-pages` (`/me` here, empty for a `hayat12.github.io` user-site repo or a custom domain), so **no code change is needed if you rename the repo**.
4. Optional **Settings → Secrets and variables → Actions → Variables**: `BOOKING_ENDPOINT` (form-backend URL) and `CONTACT_EMAIL`.

What is *not* possible on static hosting: API routes, `force-dynamic` pages, middleware, the Next image optimiser (`images.unoptimized` is on) and server-side storage.

## Scaling notes

- **Storage:** bookings are client-side (see *Appointment system*). To move to a real backend, re-implement `bookedTimes` / `createAppointment` / `deliverBooking` against an API (Supabase, Cloudflare Workers, …) — the form does not change.
- **Content:** move `data/` to a headless CMS by replacing the module exports with fetchers; pages already use static params.
- **Monorepo:** `design-system/` is import-free of app code, so it can be lifted into an Nx/Turborepo package (`@hayat/ui`) unchanged.
- **Quality gates (recommended next):** Vitest for `lib/slots`, Playwright for the booking flow, Storybook for `design-system/ui`, (GitHub Actions already runs `typecheck` + `build`).

## Adding real screenshots

Cover art is generated (`ProjectCover`). To use real images, drop `public/images/projects/<slug>.png` and render it with `next/image` inside `ProjectCover`. I did not scrape company logos/screenshots — use assets you have the right to publish.

## Content notes

- Years of experience: **8** (resume). The old site said 6+.
- Staffery, NRICH and FMX descriptions were enriched from public company profiles; double-check wording before publishing.
