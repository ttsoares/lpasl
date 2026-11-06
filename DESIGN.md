# ASL.Org — Design System v0.1

Step 1 of `PLAN.md`. This document sets the visual foundation before any page is built.
It supersedes the provisional direction in `PLAN.md` §3 where the two differ.

## Brief

- **Subject:** Associação Software Livre.Org — a non-profit founded in 2003 in Porto Alegre,
  organiser of FISL, the largest free-software event in South America.
- **Audience:** Brazilian free-software community, students, developers, activists, partner
  institutions, potential members and donors.
- **Job of the site:** explain what ASL is in five seconds, make its work visible, and open a
  clear path to participate, associate or support.
- **Tone:** modern and vibrant, but institutional and trustworthy. Not a startup, not a
  hackathon poster.

## Concept — "Sinal aberto"

ASL's logo is a butterfly built from binary digits. Its history is about transmission:
TV Software Livre, Rádio Software Livre, FISL, shared knowledge. The design treats **amber as
a broadcast signal on black**, and the binary digit as a structural element rather than an
ornament.

- Amber is a signal, not a wash: it appears in solid blocks, CTAs and the hero headline.
- Black is the transmission medium: hero, footer, manifesto sections.
- White is the reading surface: content pages stay quiet and legible.
- The binary rail — a narrow column of 0/1 taken from the logo — marks section changes
  instead of decorative dividers or numbered eyebrows.

## Tokens

### Color

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#000000` | Text, hero and footer ground, borders |
| `paper` | `#FFFFFF` | Reading surface |
| `sand` | `#F4EDDD` | One warm band per page at most |
| `amber` | `#FFC00F` | Signal: hero type, primary CTA, marks |
| `amberPressed` | `#E0A800` | Pressed/hover state for amber |
| `graphite` | `#1C1C1C` | Raised dark surface |
| `sandNight` | `#221D15` | Sand's dark-mode band |
| `muted` | `#565656` | Secondary text on paper |

Rules:
- Amber is never body text on white (≈1.6:1).
- Black on amber and amber on black both exceed 10:1.
- No gradients as decoration. No third accent colour.

### Type

| Role | Family | Treatment |
| --- | --- | --- |
| Display | **Archivo Variable** | weight 800, width 125%, tracking −0.035em, leading 0.96 |
| Body/UI | **Instrument Sans Variable** | 400/500/600, 16px base, leading 1.6, tracking +0.005em |
| Binary/mono | **IBM Plex Mono** | 400/500, used only for actual 0/1 content |

All three are OFL and self-hosted through Fontsource. Archivo is used only for display sizes
(h1/h2 and the hero); Instrument Sans carries everything readable. Plex Mono never labels UI
sections — it only renders binary.

Body face changed from IBM Plex Sans to Instrument Sans on 1 Nov 2026 (warmer, less corporate,
same roles). Its zero is wide, so `ch` overstates the measure: widths for running text are set
in `em` (`layout.textWidth` = 33em, about 70 characters), not `ch`. Rule: widths on Instrument
Sans text use `em`; `ch` is kept only for Archivo headings, where the zero is near the average glyph.

Scale: `display clamp(3rem, 7vw, 6rem)`, `h1 clamp(2.4375rem, 4.6vw, 4rem)`,
`h2 clamp(1.9375rem, 3.4vw, 3rem)`, `h3 1.5625rem`, `subhead 1.25rem`, body `1rem`,
small `0.875rem`. The text scale follows a Major Third (×1.25): 16 → 20 → 25 → 31 → 39.
Only the display size is larger, as the brand's one loud element. Line length capped at 33em (about 70 characters).

Text roles (`textRoles` in `src/styles/tokens.ts`, spread into `sx`). Use the role, never
a one-off size, so the same job reads the same on every page:

| Role | Treatment | Used for |
| --- | --- | --- |
| `statement` | Archivo 600, width 112%, h3 size, leading 1.25 | One strong line: mission, term periods |
| `itemTitle` | Instrument Sans 600, subhead size, leading 1.3, −0.01em | Row and block titles, article subheads |
| `lead` | Instrument Sans subhead size, leading 1.5 | The sentence under a title, article standfirst |
| `prose` | Instrument Sans body, leading 1.6, max 33em, `text-wrap: pretty` | All running text |
| `meta` | Instrument Sans small, leading 1.45, tabular figures | Dates, years, captions |

Headings balance their lines (`text-wrap: balance`). Light text on black takes leading
1.65 instead of 1.6. Long articles (editais) open with their summary as a standfirst and
split into named parts (Convocação, Ordem do dia) under `itemTitle` subheads.

### Space, shape, motion

- Spacing: 8px base; 8 / 16 / 24 / 32 / 48 / 64. Section rhythm doubles the top step
  to 128. 4px is reserved for icon and micro-adjustments.
- Radius: 4px for controls and cards, 2px for chips. No pills, no zero-radius broadsheet.
- Borders: 1px hairlines, 2px on interactive elements. Shadows are not used.
- Motion: one orchestrated page-load moment, `cubic-bezier(0.22, 1, 0.36, 1)`; hover
  feedback 140ms. The load moment is the header labels rising from a clip line (560ms,
  55ms stagger, replayed on every navigation) and, on the home page only, a butterfly
  (`components/Borb`, two wing images squeezed toward the body) flying in from above
  with its wings flapping, landing on the hero's "Associe-se" button (anchored to the button, so it holds at any size), flapping slowly for 5s and then vanishing so only the logo stays (2.1s flight). Everything is disabled under
  `prefers-reduced-motion`.
- Exception, `/atuacao` (2026-11-01, requested by the user): one scroll-driven scene per
  initiative (`src/sections/atuacao/`), built with the scroll-craft skill. Scenes run only at
  ≥900px with motion allowed; phones, reduced motion and no-JS get the finished static
  composition. Brief in `scrollcraft/builds/atuacao/BRIEF.md`.
- Focus: 3px `currentColor` ring with 3px offset, visible on paper and on ink.

## Layout concept

12 columns, 1280px max, 24px gutters, left-aligned. Sections alternate 7/5 and 5/7 splits;
no centred hero. Structural rules replace card containers.

```
┌──────────────────────────────────────────────────────────┐
│ ASL butterfly   Quem Somos  Atuação  ...   [ Associe-se ] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  SOFTWARE LIVRE                                          │
│  É LIBERDADE              ┌──────────────┐   0 1 1 0     │
│  EM MOVIMENTO.            │  butterfly   │   1 0 0 1     │
│                           └──────────────┘   0 1 0 0     │
│  [ Conheça a ASL ]        Associe-se                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Desde 2003 em Porto Alegre. Organizamos o FISL.         │
├──────────────────────────────────────────────────────────┤
│  O que fazemos                                           │
│  PSL.Br        ───────────────────────────────  Saiba mais│
│  FISL          ───────────────────────────────  Saiba mais│
│  TVSL          ───────────────────────────────  Saiba mais│
└──────────────────────────────────────────────────────────┘
```

The hero headline is set in amber on black in full, not one highlighted word. The butterfly
asset sits in a white or amber square so the original mark stays legible on ink.

## Principles

1. **One bold moment per page.** The hero is the loudest thing; content below is quiet.
2. **Editorial rows over card grids.** Initiatives and news use ruled rows, not identical boxes.
3. **Type carries the personality.** Photography is documentary; no stock imagery, no 3D blobs.
4. **Structure encodes information.** The binary rail marks section changes; no decorative
   numbering, no all-caps eyebrows, no middle-dot meta strings.
5. **Motion answers actions.** Only the page-load reveal and hover states; no scroll-fade on
   every section.
6. **Portuguese-first.** Sentence case, plain verbs, no filler.

## Review against generic defaults

The first draft in `PLAN.md` used Space Grotesk + Inter, lime accent, gradient mesh, numbered
stats, label chips and soft-shadow cards. Those were replaced because they are the default
AI-landing-page kit, not choices made for ASL:

| Dropped | Why | Replaced with |
| --- | --- | --- |
| Space Grotesk + Inter | The standard generated pairing | Archivo Expanded + Instrument Sans (Plex Sans until Nov 2026) |
| Lime secondary accent | Dilutes the brand; amber is already loud | Amber only |
| Amber gradient mesh | Decoration with no job | Flat amber on black |
| Eyebrow chips (`Vite + React…`) | Generic template chrome | Founding facts as a sentence rule |
| Numbered stat cards | Numbers are not a sequence here | One typographic facts line |
| Identical rounded cards + shadows | SaaS kit, weak hierarchy | Ruled rows and asymmetric splits |
| Scroll fade-up on every section | Scattered motion | One load reveal, hover feedback |

Kept from `PLAN.md`: the amber/black brand, the butterfly/binary motif, light reading surfaces,
documentary imagery, and the page structure.

## Implementation map (step 1)

- `src/styles/tokens.ts` — canonical typed tokens (colour, type, radius, motion, layout).
- `src/theme.ts` — MUI theme assembled from tokens, including focus, selection, reduced motion
  and button/link/card overrides.
- `src/main.tsx` — self-hosted font imports.
- `src/index.css` — only the document-level fallbacks MUI's `CssBaseline` does not cover.

## Implementation map (step 2)

- `src/app/ColorModeProvider.tsx`, `src/app/color-mode.ts` — light/dark preference with
  `localStorage`, OS fallback, and an inline pre-paint script in `index.html` to avoid a flash.
- `src/components/Header/Header.tsx` — sticky header, desktop nav, theme toggle, membership CTA,
  full-height mobile drawer with focus trapping and Escape-to-close.
- `src/components/Footer/Footer.tsx` — ink footer with navigation, contact details and the full
  lockup; graphite instead of ink in dark mode.
- `src/components/Brand/BrandLockup.tsx` — compact butterfly + ASL wordmark for the header and
  drawer. The full name remains the link's accessible label and the footer lockup.
- `src/layouts/SiteLayout.tsx` — skip link, header, main landmark, footer.
- `src/pages/*`, `src/content/*` — routed section placeholders, site and navigation data.
- `public/brand/*` — `logo-ink`, `logo-paper`, `logo-mark`, `logo-mark-paper`, derived from
  `~/ASL/midias/logo_ASL_220.png`. The paper variants recolour the near-black pixels to white and
  keep the amber butterfly.

The source logo is still a raster PNG. These variants are crisp at header and footer sizes, but an
SVG is still needed for a large hero lockup and any print use.

## Cheat-code audit (step 2.5)

The shell was checked against the five `design-cheat-codes` defaults. Where the rule and the
brand system agreed, the code now follows the rule; where they did not, the exception is listed
below.

| Rule | Finding | Change |
| --- | --- | --- |
| 8px spacing scale | Buttons used `10px 20px` / `14px 26px`, nav used 10px padding and 2px gaps, drawer header used 12px, footer links used 10px gaps. | Buttons `8px 16px` / `8px 24px` / `16px 32px`; nav `8px` padding and `4px` gaps; drawer uses `8 / 16 / 24px` steps; footer link gap `8px`. Section rhythm is `64px` mobile / `128px` desktop. |
| 60 / 30 / 10 palette | Accent is the amber hero headline plus the primary CTA; measured at 3.7% of the hero viewport, with ink as the dominant ground. | No change. Amber remains the only accent; the secondary CTA stays outlined. The 30% secondary layer (sand) belongs to the content sections in step 3 — the temporary page is one full-bleed field. |
| Major Third type scale | 17px body, 15px secondary, 22px h3 and 18px leads were in-between sizes. | Base `16px`; body2/small `14px`; subhead/lead `20px`; h3 `25px`; h2 `31–48px`; h1 `39–64px`. Body leading `1.6`. |
| Shadows never pure black | No component shadows, but MUI `Paper` still carried its default elevation and the drawer could cast one. | `MuiPaper` now sets `boxShadow: none`; the drawer uses `elevation={0}` and a 1px divider instead. |
| 45–75ch, 1.4–1.6 leading | Prose was already 52–58ch, but the global cap was 68ch and body leading 1.65. | Global text cap `65ch`; body leading `1.6`; footer mission stays at `34ch`. |

**Deliberate exceptions.** Display type keeps `0.96` leading and may reach `96px`; both are the
"Sinal aberto" signal and are limited to the hero and page titles. The amber headline is the one
accent moment; at 3.7% it leaves headroom for the primary CTA and links instead of spreading
accent across buttons, chips and borders. `4px` is used only for focus offsets, underline insets
and micro-gaps.

## Implementation map (step 3 — home hero)

The first real page content: the hero only. Sections below it are still to come.

- `src/pages/Home.tsx` — full-bleed ink hero that fills the viewport under the header on
  `lg` and up (`calc(100svh - 81px)`, the header's 80px plus its 1px rule). Layout is a 7/5
  grid: amber display headline, lead paragraph and two CTAs on the left (Associe-se filled
  and first, Conheça a ASL outlined); the butterfly plate
  and the binary rail on the right. A hairline rule closes the hero with the founding facts
  line, "Desde 2003, em Porto Alegre. **Organizamos o FISL.**"  On `xs` the right column is
  dropped entirely and the headline switches from forced line breaks to natural wrapping.
- `src/components/BinaryRail/BinaryRail.tsx` — the 0/1 rail, the byte `01110111` (119, read as
  11/9: ASL's founding on 11 September 2003) repeated three times per copy (24 bits; until 1 Nov 2026 it spelled "ASL" in ASCII). Each byte's
  first bit is amber. It is
  `aria-hidden`: it is a graphic, not content. The bits repeat at a fixed pitch and flow
  downward (`asl-rail-flow`, 14s per byte run, edge-faded with a mask, still under reduced
  motion), so the rail reads as a live signal at any height. Inner headers use 11px digits
  at 0.72 opacity; the home hero keeps 0.5 beside the larger plate.
- `src/index.css` — `.hero-rail::after` is the amber scan line, the page's single load
  moment: 700ms, 120ms delay, travelling the rail once and fading out. `display: none` under
  `prefers-reduced-motion: reduce`.
- `src/styles/tokens.ts` — added `typeScale.hero` (`clamp(2.4375rem, 5.4vw, 4.75rem)`), a
  size between `h1` and `display`. `display` stays reserved for oversized statements; the
  three-line tagline does not need to run to 96px.
- `src/content/site.ts` — added `hero.lead`, `hero.place`, `hero.work` and `taglineLines`
  (the tagline pre-broken into its three lines).

**Deliberate choices.** The headline is set in amber on ink in full, not with one highlighted
word. The three lines are broken by hand above `sm` so the rag stays asymmetric; below that the
natural rag is better than a forced break that leaves "Software" alone on a line. The butterfly
sits in a white plate rather than amber: a 400px amber block would spend the whole accent budget
in one corner, and white keeps the original mark legible on ink.

**Known limitation.** `logo-mark.png` is 166×200 and is rendered at 206×248 on a 1366px
viewport, a 1.24× upscale of the raster source. It reads acceptably at that size but is the
clearest argument yet for a vector master.

## Implementation map (step 4 — home sections)

The home page is now complete as a narrative: what we do, why, what is new, how to join,
who runs it. Shared primitives were built first so the sections did not each invent a layout.

**Primitives**

- `src/components/Section/Section.tsx` — full-bleed band with three tones: `paper` (reading
  surface, becomes ink in dark mode), `sand` (the one warm band, becomes `sandNight` #221D15 in
  dark mode, a warm near-black that stays apart from the graphite footer) and `ink` (statement, always black). Vertical rhythm is 64px on mobile and 128px on
  desktop; `compact` halves it for a band that only carries a CTA.
- `src/components/SectionHeading/SectionHeading.tsx` — a 7/5 grid with the hairline rule
  above it, the `h2` on the left and the lead plus optional link on the right. No eyebrow,
  no numbering, no chip. It accepts a `ReactNode` title so a year range can be kept on one
  line without breaking mid-value.
- `src/components/RuledRow/RuledRow.tsx` — one editorial row (title 4/12, description 7/12,
  meta 1/12) separated from its neighbours by a hairline. This is the replacement for the
  card grid: seven initiatives read as a list of commitments, not as seven equal boxes.

**Sections** (`src/sections/home/`)

1. `InitiativesSection` — "O que fazemos", seven ruled rows with the year each project
   started. Links out to `/atuacao`.
2. `ManifestoSection` — ink band carrying ASL's own mission statement at 24–32px Archivo
   700, with the founding facts and a link on the right. The visible `h2` is replaced by a
   visually hidden "Missão": a 230-character heading would be useless in a screen reader's
   heading list, and a visible "Missão" label would be an eyebrow.
3. `NewsSection` — category, title, summary and date for the three live posts. Rows are not
   links yet because `/noticias/[slug]` does not exist; the section carries one
   "Ver todas as notícias" link.
4. `MembershipSection` — the single amber band, compact, with black primary and outlined
   secondary buttons. This is the only place on the page where amber fills an area.
5. `GovernanceSection` — sand band, 4/2/1-column grid of the 2025–2028 coordination with
   roles above names, plus a note on the fiscal council.

**Content** — all typed, no invented facts. Every sentence comes from the current site:
`src/content/initiatives.ts` (seven projects and two partnerships, from the Atuação page),
`src/content/people.ts` (2025–2028 coordination and fiscal council, from the Coordenação
page), `src/content/posts.ts` (three posts with dates and summaries read from the originals).

**Deliberate choices.** The section headings sit at the top of their column, not bottom-
aligned: bottom alignment made the lead float above the title and read as a caption. The
manifesto dropped from display size to 32px after the first render produced twelve lines of
800-weight type — a wall, not a statement. News categories stay as a left column rather than
a chip above each title.

**Deviation to note.** The 60/30/10 audit put accent at 3.7% before this step. The amber
membership band adds a full-width accent area, well above 10% of the page. It is kept
deliberately: it is the one moment where the accent is a surface, and the membership path is
the page's primary conversion.

## Implementation map (step 5 — Atuação)

`/atuacao` is the first inner page, and it establishes the pattern the rest will follow:
one page hero, one reading band, one contrasting band, one closing CTA.

**Page hero (`src/components/PageHero`).** Ink in both modes, the same amber `h1` treatment
as the home hero but at `typeScale.h1` instead of `display`, and `py 64/96` rather than a full
viewport. An inner page should let you reach the content quickly; only the home page earns a
full-screen statement. The lead sits at 20px and 52ch.

**Entries instead of cards.** Each of the seven initiatives is a two-column row: title and
“Desde” on the left, two paragraphs at 58ch plus an outbound `Saiba mais` on the right, with a
hairline between rows. The left column is deliberately narrow (4fr against 7fr) so the eye
falls into the text, and the title's `maxWidth: 20ch` keeps long names such as “Pontão de
Cultura Digital Minuano” to two lines rather than one very wide line.

**Body text is primary, not muted.** The first pass used `text.secondary` for the paragraphs
and the page read as disabled. Muted grey is for metadata (“Desde 2005”, dates, roles), never
for prose.

**Bands.** Initiatives on paper, partnerships on sand, CTA on ink. The sand band separates the
two kinds of relationship (projects we run, organisations we work with) without inventing a
heading style. In dark mode the ink CTA lifts to graphite — on a black page an ink band would
vanish, so the tone mapping is `ink → graphite` and the footer's top rule does the separating.

**Deep links.** Every entry has an `id`, the home rows link to `/atuacao#slug`, and the scroll
restorer re-runs after `document.fonts.ready`. Without that second pass the web-font swap
pushed the target about 52px out of place.

**Reading order on mobile.** The `Saiba mais` link lives inside the body column, after the
paragraphs. When it sat in the title column the mobile order was title → link → body, which
asks people to leave before they have read why.

## Implementation map (step 6 — Quem somos)

The page answers the question the old site never answered at the top: what is this association?

**Four bands, four jobs.** Intro (who we are) on paper, mission on sand, objectives on paper,
FISL CTA on ink. Alternating surfaces here do real work: they separate statute text from prose
without needing subheadings on every block.

**Facts as a margin list.** The right column of the intro is a `dl` — founded, seat, legal
nature, what it organises — with a hairline between items. It gives the page a scannable spine
for anyone who only wants the dates, and it keeps the prose column at 58ch. This is the same
hairline-plus-meta language as the initiatives rows, applied to key–value data.

**Mission is set, not quoted.** The mission sentence uses Archivo at `h3` size, weight 600,
width 112%, on sand. It is the only place on the site where Archivo runs below `h2`, and the
narrower width axis is what keeps a 230-character sentence readable at that size — 34ch over
six lines reads as a statement; 65ch over three would read as a paragraph.

**Objectives are numbered, and that is correct.** The design rules warn against `01 / 02 / 03`
markers, but only because numbering is usually decoration. These are seven items enumerated by
the statute; the order is part of the document. The numbers sit in a narrow left column as
margin notes — small, muted, tabular — so they label the list without becoming an ornament.

**Copy editing.** The original objectives contained typos and inconsistent punctuation
(`sócio educativos`, `tecnologia alternativas`, a period where the list expected a semicolon).
They were corrected; nothing was added or removed. The statutary text must still be checked
against the PDF before launch, since this page now presents it as the canonical wording.

## Implementation map (step 7 — Coordenação)

**The term is the heading.** The current term is set as the `h2` — “2025–2028” — rather than
“Coordenação atual”. The date is the thing that changes; the election line sits under it as
metadata. On a page whose whole job is “who is in charge now”, the year range is the most
specific thing above the fold.

**Titulares and suplentes as two columns.** A four-block grid left a large void under the short
substitute list. Arranging the page as two columns — coordenação over conselho fiscal on the
left, the substitutes on the right — lets each column read as one continuous list, and the
shorter right column ends naturally instead of leaving a hole in the middle of the page.

**History as `<details>`, not an accordion.** Eight previous terms are reference material: too
much to read, but the kind of thing people search for a name in. Native `<details>` gives
keyboard support, in-page find, and a working page with JavaScript disabled. The chevron
rotates on `[open]`; nothing else moves.

**Rows inside rows.** `PeopleGroup` repeats the hairline-plus-meta pattern: a rule under the
group title, a rule between roles, the role in small muted type and the name at 500. The same
language already used for initiatives and for the facts list — the page has one data style, not
four.

**Generated ids.** Group titles repeat across terms (“Suplentes da coordenação” appears nine
times), so `aria-labelledby` is built from `useId()`. Literal ids would produce nine elements
sharing one id.

**Hover does not fade.** An early version dimmed the summary text to grey on hover. Hover
should raise emphasis, not lower it; the only hover feedback is the cursor and the chevron.
