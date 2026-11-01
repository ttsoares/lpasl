# ASL — Associação Software Livre.Org

Redesign of [asl.org.br](https://asl.org.br) — a modern, accessible site for the
Brazilian free software association founded in 2003.

Built with **React 19**, **Vite**, **TypeScript**, **Material UI** and
**React Router**. Fonts are self-hosted (Archivo, Instrument Sans, IBM Plex Mono).

## Status

- **Step 1 — design foundation:** `DESIGN.md`, `src/styles/tokens.ts`,
  `src/theme.ts`.
- **Step 2 — app shell:** header, mobile drawer, footer, routing, light/dark
  mode with `localStorage` persistence, skip link, brand lockups.
- **Step 2.5 — design audit:** 8px spacing grid, Major Third type scale,
  shadowless surfaces, 65ch prose cap.
- **Step 3 — home hero:** ink hero with the amber headline, binary rail,
  butterfly plate and founding facts line.
- **Step 4 — home page:** initiatives as ruled rows, the mission band, news and
  editais, the amber membership call, and the 2025–2028 coordination.
- **Step 5 — `/atuacao`:** the seven initiatives as full entries with their
  descriptions and outbound links, the two institutional partnerships, and a
  volunteer CTA. Home rows deep-link into the entries.
- **Step 6 — `/quem-somos`:** who the association is, its facts, the mission
  (`#missao`) and the seven statutory objectives.
- **Step 7 — `/coordenacao`:** the current term as two columns, the fiscal
  council, and eight previous terms as native `<details>` disclosures.
- **Next:** `/documentos`, `/contato`, `/noticias`, `/associe-se`. Those four
  routes are still placeholders with a real one-line lead.

## Scripts

```bash
npm install    # install dependencies
npm run dev    # start the dev server
npm run build  # type-check and build for production
npm run preview
npm run lint   # oxlint
```

## Structure

```
src/
  app/          # color-mode context/provider, scroll restoration
  components/   # Brand, Header, Footer, Section, SectionHeading, RuledRow
  content/      # site details, navigation, initiatives, people, posts
  layouts/      # SiteLayout: skip link + header + main + footer
  sections/     # page-level bands (home: initiatives, manifesto, news, ...)
  pages/        # Home, section placeholders, 404
  styles/       # design tokens (colors, type, layout, motion)
  theme.ts      # MUI theme built from the tokens
public/brand/   # logo lockups and butterfly mark (raster, no SVG source)
```

## Docs

- `TODO.md` — everything still to do before launch, in priority order.
- `HANDOFF.md` — current state, open decisions, next steps.
- `PLAN.md` — site redesign plan, sitemap, redirects, phases.
- `DESIGN.md` — visual direction, token rationale, implementation map.

## Brand assets

`public/brand/*.svg` are generated from `brand/logo-source.svg` by
`npm run brand` (mark and horizontal lockup, ink and paper variants; favicons and
the Open Graph card come from the same run). Edit the generator, not the output.
