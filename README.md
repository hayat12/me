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
│  ├─ projects/[slug]/page.tsx
│  └─ api/appointments/      # REST: POST /, GET /slots?date=, GET /[id]/ics
├─ design-system/            # No business logic. Reusable across features
│  ├─ tokens/tokens.css      # SOURCE OF TRUTH for color, type, radius, shadow, motion
│  ├─ tokens/tokens.json     # Same tokens for Figma Tokens Studio / Style Dictionary
│  └─ ui/                    # Button, CodeTag, Chip, SpotlightCard, Drawer
├─ features/                 # Vertical slices; each owns its UI + local logic
│  ├─ home/ · projects/ · technologies/ · appointment/
├─ data/                     # Typed content (profile, experience, projects, technologies)
├─ lib/                      # Domain/infra: slots, validation (zod), repository, ics, notify
└─ types/                    # Shared types
```

**Dependency rule:** `app → features → design-system`, and `features → data/lib/types`. `design-system` never imports from `features`. Content lives in `data/`, so adding a project or technology is a single typed object — no component changes.

## Design system & tokens

1. Tokens are CSS variables in `tokens.css`: primitives (`--slate-*`, `--green-*`) → semantic (`--color-bg`, `--color-brand`, …) → component use.
2. `tailwind.config.ts` maps utilities (`bg-bg`, `text-brand`, `rounded-pill`, `shadow-glow`) to those variables — **never hard-code hex values in components**.
3. To retheme, edit semantic tokens only. `tokens.json` mirrors them for design tooling.
4. Motion respects `prefers-reduced-motion`; focus rings, skip link and ARIA roles are built in.

## Appointment system

- Slots: 30 min, Mon–Fri 10:00–18:00 **Europe/Berlin**, at least 2 hours ahead, up to 90 days out (`src/lib/slots.ts`).
- `GET /api/appointments/slots?date=YYYY-MM-DD` → availability per slot.
- `POST /api/appointments` → validates (zod), re-checks the slot, books atomically (409 on double-booking).
- `GET /api/appointments/[id]/ics` → calendar file.
- Set `NOTIFY_WEBHOOK_URL` (Slack/Discord/Make/Zapier) to be notified on each booking.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run typecheck && npm run build
```

## Scaling notes

- **Storage:** bookings use `FileRepository` (`.data/appointments.json`) — fine locally or on a single VM/Docker volume, **not** on serverless (ephemeral disk). Implement `AppointmentRepository` for Postgres/Supabase/Redis and change one export in `lib/appointments-repo.ts`.
- **Content:** move `data/` to a headless CMS by replacing the module exports with fetchers; pages already use static params.
- **Monorepo:** `design-system/` is import-free of app code, so it can be lifted into an Nx/Turborepo package (`@hayat/ui`) unchanged.
- **Quality gates (recommended next):** Vitest for `lib/slots`, Playwright for the booking flow, Storybook for `design-system/ui`, GitHub Actions running `typecheck` + `build`.

## Adding real screenshots

Cover art is generated (`ProjectCover`). To use real images, drop `public/images/projects/<slug>.png` and render it with `next/image` inside `ProjectCover`. I did not scrape company logos/screenshots — use assets you have the right to publish.

## Content notes

- Years of experience: **8** (resume). The old site said 6+.
- Staffery, NRICH and FMX descriptions were enriched from public company profiles; double-check wording before publishing.
# me
