# chesen.dev

## Concept — SIGNAL

> One serif voice for the human, one mono voice for the machine.
> A live signal field answers your cursor; everything else is restraint —
> hairlines, vertical rhythm, and a single signal color (#FEBD11) instead of decoration.
> The site behaves like an instrument: ⌘K drives it, the konami code overclocks it,
> and every word on the page lives in one typed content file.

Personal site of **Mehdi "Chesen" Osmanoğlu** — software engineering dual-degree
student (Fırat University ⇄ Sam Houston State University) building toward a US
backend career: C#/.NET at the core, exploring blockchain along the way.

## Stack

- **Next.js 16** (App Router, RSC, static export) · **TypeScript strict**
- **Tailwind CSS v4** (CSS-first `@theme` tokens) · **Framer Motion** (transform/opacity only)
- Zero other runtime dependencies. Deploys anywhere static files are served
  (GitHub Pages via `CNAME` today; Vercel-ready as-is).

## Architecture

| Path | Purpose |
| --- | --- |
| `content/site.ts` | Single source of truth for every word, link, and project |
| `app/components/SignalField.tsx` | Signature visual — 60fps canvas grid, cursor ripple, pauses offscreen, static under reduced-motion |
| `app/components/CommandPalette.tsx` | ⌘K palette: navigate, copy email, links, barrel roll |
| `app/components/Fx.tsx` | Console greeting, konami overdrive, toast |
| `app/opengraph-image.tsx` · `sitemap.ts` · `robots.ts` · `icon.svg` | Generated metadata suite |

## Commands

```bash
npm run dev     # develop
npm run build   # static export → out/
```

## Easter eggs

Open the console. Press ⌘K. Try ↑↑↓↓←→←→BA.
