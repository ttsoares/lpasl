# ASL.Org — Redesign Plan

Redesign of **asl.org.br** (Associação Software Livre.Org) as a modern, vibrant site built on the
existing React + Vite + TypeScript + MUI scaffold in this repository.

This is **not a clone**. We keep the institution's content and identity and rebuild the
presentation, information architecture and interaction from scratch. No implementation code is
included in this document.

---

## 1. What we are starting from

The current site is a WordPress install using the Newspaperly theme. Audit of the mirror in
`~/ASL/asl.org.br`:

### Pages and content

| Page | Current content | Notes |
| --- | --- | --- |
| Home | 3 banner images (PSL Brasil, RISoL, COMC&T), latest posts list, sidebar with search, "Sócio" illustration, recent posts, categories | No hero statement, no explanation of what ASL is |
| Quem Somos | About text, founding date (11 Sep 2003), role as FISL organizer, 7 objectives | Long list, no visual hierarchy |
| Missão | One-sentence mission | Very thin page |
| Atuação | 7 initiatives: PSL.Br, FISL, TV Software Livre, Rádio Software Livre, Pontão de Cultura Digital Minuano, Festival de Cultura Livre, Cine Kafuné + institutional partnerships | Text-heavy, no cards or anchors |
| Coordenação e Conselho | Current 2025–2028 board, fiscal council, full history back to 2018/2019 | Dense; no structure by term |
| Documentos | 3 PDFs: Estatuto, Regimento Interno, Proposta de Associado | Plain links |
| Contato | 3 e-mails, address at TECNOPUC, phone | No form, no map, no volunteer CTA |
| Blog | 3 posts: 2 editais (Nov 2025), PSL Brasil (Dec 2022) | WordPress comments, categories, "Posted on" |
| Footer | 3 long quotes (FSF, Snowden, Aaron Swartz), copyright | Tiny grey text, low contrast |

### Brand assets

- Logo: butterfly made of binary digits + "Associação Software Livre.Org" wordmark (PNG only).
- Brand colours sampled from the logo/banner: **#FFC00F** (amber), **#EF9A2A** (orange),
  **#F3D1A5** (sand), **#000000** (ink).
- Existing imagery: three 2022 banner PNGs, a "Sócio" illustration, edital images.
- PDFs under `wp-content/uploads/2022/12/`.

### Problems to solve

1. Dated visual language: banner + black nav bar + boxed blog layout, no contemporary identity.
2. Weak first impression: the homepage never says what ASL is or why it matters.
3. Thin, redundant pages (Missão) and walls of text (Atuação, Coordenação).
4. No visible membership/donation path except a small sidebar image.
5. Stale content surfaced as "recent", no event/news rhythm.
6. Poor mobile nav (hamburger reveals a plain list), small footer type, contrast issues.
7. No SEO structure, no social previews, no structured data.
8. No modern accessibility or performance baseline.

---

## 2. Goals and success criteria

**Goals**

- Communicate in 5 seconds: ASL is the free-software association behind FISL, active since 2003.
- Make the three core actions obvious everywhere: **conhecer**, **participar/voluntariar**, **associar-se/apoiar**.
- Bring the brand's amber/black energy into a contemporary editorial layout.
- Make governance and documents easy to find and trust.
- Give news/editais a real home so the site can stay alive.
- Ship a fast, accessible, responsive static site that is cheap to host and easy to maintain.

**Success criteria**

- Lighthouse ≥ 95 Performance / Accessibility / Best Practices / SEO on mobile.
- WCAG 2.1 AA: contrast, focus states, keyboard navigation, landmarks, skip link.
- All current URLs keep working through 301 redirects.
- Homepage answers "o que é", "o que faz", "quem coordena", "como apoiar" without leaving the fold.
- Content editable by a non-developer through typed content files (or headless CMS, see decisions).

---

## 3. Design direction — "Raiz e Futuro"

An editorial, high-contrast look built from the association's own symbols: amber as energy,
binary/butterfly as motif, black as ink. Vibrant but institutional — not a startup landing page.

### 3.1 Brand system

**Palette**

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0B0B0F` | Dark sections, primary text |
| `ink-soft` | `#16161C` | Cards on dark |
| `amber` | `#FFC00F` | Primary accent, CTAs, highlights |
| `amber-deep` | `#EF9A2A` | Gradient partner, hover states |
| `cream` | `#FFF8E7` | Warm section background |
| `paper` | `#FAF7F2` | Page background |
| `lime` | `#C8F135` | Sparing secondary accent (tags, hovers) — optional |
| `white` | `#FFFFFF` | Cards on light |

Rules: amber is never used for body text on white (contrast); large display type on ink only.
Dark mode is optional in phase 2; the base is light paper with ink and amber sections.

**Typography**

- Display: **Space Grotesk** (700/500) — geometric, technical, friendly. Portuguese accents supported.
- Body/UI: **Inter** (400/500/600).
- Self-hosted via Fontsource, subset to Latin + Latin-ext.
- Scale: `h1 clamp(2.75rem, 6vw, 5rem)`, `h2 clamp(2rem, 4vw, 3.25rem)`,
  `h3 1.5rem`, body `1rem/1.65`, small `0.875rem`. Tight display leading (1.02–1.08).

**Shape and texture**

- 20–28 px radii on cards and media; pill buttons.
- 1 px borders in `rgba(11,11,15,.12)`, soft layered shadows only on hover.
- Subtle grain/noise overlay on dark sections; amber radial gradient mesh behind hero.
- Binary-digit pattern and butterfly silhouette as low-opacity SVG texture, not clip-art.

**Motion**

- Scroll-reveal (fade + 12 px rise) on section entry, 200–300 ms.
- Card hover: 2 px lift, border darkens, arrow slides.
- Logo butterfly gently animated once on load (no perpetual loop).
- Respect `prefers-reduced-motion`; no autoplay video.

**Imagery**

- Prefer real photos: FISL audience, community, workshops, TVSL/radio setups.
- Fallback: geometric amber/ink compositions and the butterfly motif — no stock photos of laptops.
- Round or 24 px-radius crops, duotone amber/ink treatment for consistency.
- Every image gets pt-BR alt text.

**Voice**

- Portuguese (pt-BR), direct and warm, no corporate filler.
- Fix existing typos and casing ("Software LIvre", "associacao") during migration.
- Keep attributed quotes (FSF, Snowden, Swartz) but shorten and elevate them.

### 3.2 Layout system

- 12-column grid, max-width 1200 px, 24 px gutters; full-bleed dark bands.
- Generous vertical rhythm: section padding 96–128 px desktop, 56–72 px mobile.
- Asymmetry where it helps: oversized headline + narrow supporting column; 2/3 + 1/3 splits.
- Every section has one job and one primary action.

---

## 4. Information architecture

### 4.1 Proposed sitemap

```
/                       Home
/quem-somos             Quem Somos (absorve Missão + objetivos + linha do tempo)
/atuacao                Atuação (grade de iniciativas + parcerias)
/atuacao/[slug]         Detalhe opcional por iniciativa (fase 2)
/coordenacao            Coordenação e Conselho (mandato atual + histórico)
/documentos             Documentos (Estatuto, Regimento, Proposta de Associado)
/contato                Contato
/noticias               Notícias, comunicados e editais
/noticias/[slug]        Post
/associe-se             Associe-se / apoie
```

Recommendation: **merge Missão into Quem Somos** as a highlighted statement block, keeping
`/quem-somos#missao` as anchor. Missão alone does not justify a page. If the client insists, keep
`/missao` as a short dedicated page in the same visual language.

### 4.2 Navigation

- Header: Quem Somos · Atuação · Coordenação · Documentos · Notícias · Contato + **Associe-se** button.
- "Sobre" can group Quem Somos / Coordenação / Documentos on mobile if the bar gets crowded.
- Mobile: full-screen drawer with large type, contact shortcuts and the membership CTA.
- Footer: sitemap columns, contact block, PDFs, social links (if any), credits/license, back-to-top.

### 4.3 Redirect map (from WordPress)

| Old | New |
| --- | --- |
| `/?p=40` | `/quem-somos` |
| `/?p=45` | `/quem-somos#missao` |
| `/?p=47` | `/atuacao` |
| `/?p=124` | `/coordenacao` |
| `/?p=49` | `/contato` |
| `/?p=271` | `/noticias/edital-de-convocacao-1-2025` |
| `/?p=276` | `/noticias/edital-de-convocacao-2-2025` |
| `/?p=102` | `/noticias/projeto-software-livre-brasil` |
| `/category/coordenacao/` | `/noticias?categoria=coordenacao` |
| `/category/semcategoria/` | `/noticias` |
| PDF paths | keep same paths in `/documentos/` or 301 |

---

## 5. Page blueprints

### 5.1 Home

1. **Header** — glass/blur sticky bar, SVG logo, nav, amber "Associe-se" pill.
2. **Hero (ink background, amber mesh)** — eyebrow "Desde 2003 · Porto Alegre";
   headline "Software livre é liberdade em movimento." (last words in amber gradient);
   one-line mission; CTAs "Conheça a ASL" (amber) and "Associe-se" (ghost);
   butterfly/binary motif; scroll cue.
3. **Stats strip** — 2003 fundação · +20 anos · FISL, o maior da América do Sul · 7 iniciativas.
4. **O que fazemos** — 6–7 initiative cards (PSL.Br, FISL, TVSL, Rádio, Pontão, Festival, Cine Kafuné):
   icon, 2-line description, "Saiba mais"; responsive 1/2/3 columns.
5. **Manifesto split** — dark or cream panel: "Não é só código. É sobre quem controla a tecnologia."
   Short text from Missão + quote; CTA to Quem Somos.
6. **Notícias e editais** — 3 most recent posts as cards with date, category chip, title, excerpt;
   "Ver todas".
7. **Associe-se (full-bleed amber)** — "A ASL é feita por pessoas. Entre."; benefits in 3 bullets;
   primary "Quero me associar" (proposta PDF) + secondary "Apoiar via Apoia.se"; small print.
8. **Governança e transparência** — current coordenação snapshot (names/roles), link to full page;
   document download chips.
9. **Footer (ink)** — 4 columns: logo/mission, navegação, contato, documentos; quote rotator or a
   single strong quote; copyright, license, "feito com software livre".

### 5.2 Quem Somos

Page hero with title + intro; founding/history timeline (2000 PSL.Br · 2003 ASL · 2005 TVSL ·
2009 Rádio · 2010s expansion · hoje); "O que nos move" (mission block); 7 objectives as numbered
cards with short labels; FISL callout; CTA to Atuação and Associe-se.

### 5.3 Atuação

Hero; filter-free grid of initiative cards; each expands to a detail block (anchor) with longer text,
external link ("Saiba mais") and optional image; "Parcerias institucionais" subsection for Banco de
Sementes Livres and Difusão Audiovisual; closing CTA to volunteer.

### 5.4 Coordenação e Conselho

Hero with "Gestão 2025–2028"; two groups (Coordenação, Conselho Fiscal) as role cards with name and
role; suplentes listed compactly; history in an accordion by term (2022–2025, 2019–2021, earlier if
available); note on election date and transparency.

### 5.5 Documentos

Intro ("Estatuto, regimento e documentos institucionais"); 3 document cards with PDF icon, title,
year, file size, download button; optional inline PDF viewer in a dialog; version/date note.

### 5.6 Contato

Channel cards: geral, voluntariado, comunicação (mailto links); address block with map link
(OpenStreetMap, no embedded tracker by default); phone/WhatsApp; simple contact form (name, email,
subject, message) with serverless endpoint or mailto fallback; privacy note on data use.

### 5.7 Notícias

Index with category chips (Editais, Coordenação, Projetos, Sem categoria → reassign), card list with
date, reading time, excerpt; empty/pagination states. Post page: editorial header, date/category,
body typography, attachments (PDF), share links, prev/next, related posts, CTA. **Comments removed**
(see decisions) with a contact link instead.

### 5.8 Associe-se

Hero "Sua associação. Sua infraestrutura. Sua voz."; what membership supports; how it works (3 steps);
download proposta de associado (PDF); Apoia.se donation; volunteer path; FAQ (3–5 items).

---

## 6. Technical approach

### 6.1 Stack

- React 19 + Vite 8 + TypeScript (already scaffolded).
- MUI 9 as the component/theme layer, restyled aggressively. Keep MUI for a11y primitives
  (Dialog, Menu, Accordion, TextField) but use custom `sx` tokens, not default Material look.
- `react-router-dom` for routing (`/`, `/quem-somos`, …) with a shared layout.
- Content in typed TS/JSON modules under `src/content/`; no CMS calls at runtime.
- Self-hosted fonts via `@fontsource-variable/*`.
- Icons: `@mui/icons-material` or a small custom SVG set for brand marks (butterfly, binary).

### 6.2 Structure

```
src/
  app/            router, layout, providers, theme
  components/     SiteHeader, SiteFooter, Section, PageHero, InitiativeCard,
                  PostCard, DocumentCard, QuoteBlock, Stat, MemberCTA, Prose
  content/        site.ts, navigation.ts, initiatives.ts, people.ts,
                  documents.ts, posts.ts, pages.ts
  pages/          Home, QuemSomos, Atuacao, Coordenacao, Documentos,
                  Contato, Noticias, Post, AssocieSe, NotFound
  assets/         logo SVG, textures, photos, og-image
  styles/         tokens, global css, prose styles
```

### 6.3 Content model

- `Initiative { slug, name, short, description, url?, image?, icon }`
- `Person { name, role, group, term, substitute? }`
- `Term { label, yearStart, yearEnd, coordinators, fiscalCouncil }`
- `Document { title, year, file, size, description }`
- `Post { slug, title, date, category, excerpt, body, attachments? }`
- `SiteConfig { name, mission, address, emails, phone, socials, apoiaUrl }`

All copy in pt-BR. Dates formatted `pt-BR` (e.g. "3 de novembro de 2025"). No hard-coded strings
inside components.

### 6.4 SEO and metadata

- Per-route `<title>`, description, canonical, Open Graph/Twitter image.
- `lang="pt-BR"`, JSON-LD `NGO` with name, foundingDate 2003-09-11, address, sameAs.
- `sitemap.xml` + `robots.txt` generated at build; friendly slugs.
- 301 redirects for every old URL (hosting-level config + SPA fallback).

### 6.5 Accessibility

- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, skip link.
- Visible focus rings (amber on ink, ink on amber), 44 px targets.
- Contrast checked for amber-on-ink and ink-on-cream combinations.
- Accordion/menu/dialog keyboard behavior from MUI, verified manually.
- Reduced motion, no color-only meaning, alt text, `aria-label` on icon buttons.
- Forms with labels, inline errors, no placeholder-only fields.

### 6.6 Performance

- Route-level code splitting; MUI tree-shaking with Vite.
- Responsive `srcset`, AVIF/WebP, lazy loading below the fold, explicit dimensions.
- Font subsetting + `font-display: swap`; preload display font only.
- Target: LCP < 2.0 s on 4G mobile, JS < 250 kB gzip for the home route.
- Optional privacy-friendly analytics (Plausible/Umami), no cookie banner unless required.

### 6.7 Hosting and deployment

- Static build (`npm run build`) to any static host (Cloudflare Pages, Netlify, Vercel, or ASL's own
  server). SPA fallback to `index.html`; real 301s at the edge/server.
- CI: type-check + lint + build on PR; preview deploy; Lighthouse check.
- No secrets in the client. Contact form via Formspree/Web3Forms endpoint or `mailto:` fallback.

---

## 7. Content and asset workstream

1. **Copy pass (pt-BR)** — migrate all existing text, fix typos/casing, tighten paragraphs,
   standardize "ASL.Org", update copyright to 2026, decide on historical detail.
2. **Facts to confirm with ASL** — current board (2025–2028), address/phone, e-mails, Apoia.se link,
   social profiles, FISL 2026 dates/link, last election minute.
3. **Assets needed**
   - Logo rebuilt as SVG (full colour, monochrome white, favicon), butterfly mark alone.
   - 6–10 real photos (FISL, community, TVSL/radio, workshops) with consent for web use.
   - OG image template (1200×630) per page type.
   - PDFs copied and renamed consistently; file sizes recorded.
4. **New content to write** — hero and section copy, initiative one-liners, membership benefits,
   contact form microcopy, FAQ, 404 page, privacy note.
5. **Quotes** — keep FSF/Snowden/Swartz with attribution; verify permission/editorial policy.
6. **Blog** — reassign "Sem Categoria"; import the 3 posts; decide whether comments are archived
   (read-only) or dropped.

---

## 8. Phases and milestones

| Phase | Deliverable | Est. |
| --- | --- | --- |
| 0. Discovery & content sign-off | This plan approved, content inventory confirmed, decisions closed | 1–2 d |
| 1. Design system | Tokens, type scale, component states, homepage hi-fi mock (desktop + mobile) | 2–3 d |
| 2. App shell | Router, layout, header/drawer, footer, theme, content models, 404 | 2 d |
| 3. Home | All 9 sections implemented, responsive, motion, assets | 3–4 d |
| 4. Inner pages | Quem Somos, Atuação, Coordenação, Documentos, Contato, Associe-se | 4–5 d |
| 5. News | Index, post template, 3 migrated posts, attachments | 2 d |
| 6. Hardening | A11y audit, SEO/metadata, redirects, perf budgets, cross-browser QA | 2–3 d |
| 7. Launch | Hosting, analytics, DNS, post-launch smoke test | 1 d |

Sequential estimate: **~3 weeks for one developer**, excluding content wait time. Design (phase 1)
can overlap with content collection.

### Acceptance checklist

- [ ] All pages from the sitemap exist, responsive at 360/768/1024/1440 px.
- [ ] Old URLs 301 to the correct new pages; no 404s in the redirect map.
- [ ] All 3 PDFs download; news posts render with correct dates in pt-BR.
- [ ] Keyboard-only pass and screen-reader spot check on nav, menu, accordion, form.
- [ ] Lighthouse ≥ 95 on home, Quem Somos, Notícias (mobile).
- [ ] No console errors; build and type-check clean.
- [ ] Membership and contact paths reachable in ≤ 2 clicks from any page.
- [ ] Brand assets (SVG logo, favicon, OG image) in place.

---

## 9. Open decisions

1. **Editing model** — static typed content files (fast, free, developer edits) vs. headless
   WordPress/Decap CMS (non-technical editors). Recommendation: static now, headless later if ASL
   needs frequent publishing.
2. **Missão page** — merge into Quem Somos (recommended) or keep standalone.
3. **News section** — keep as "Notícias e editais" (recommended); comments dropped (recommended).
4. **Membership** — is Apoia.se still active? Do we need a signup form or only the PDF + donation link?
5. **Design accent** — amber/ink only, or add the lime secondary accent for extra vibrancy?
6. **Dark mode** — not needed for v1 (recommended), or required.
7. **Assets** — are there real photos and a vector logo, or do we recreate the identity in SVG?
8. **Hosting/DNS** — who controls the domain and where will the static site live? Can we serve 301s?
9. **Language** — pt-BR only (recommended) or add English/Spanish later.
10. **Social** — which profiles should the footer link to (none are on the current site)?

---

## 10. What we are explicitly not doing

- Not reproducing the Newspaperly layout, the orange banner strip, the black nav bar or the
  blog-with-sidebar template.
- Not changing ASL's mission, legal text or governance data.
- Not inventing projects, numbers or partnerships.
- Not shipping a WordPress theme; the result is a static React site.
