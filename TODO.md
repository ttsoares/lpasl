# TODO

What is left before asl.org.br can replace the current WordPress site.
Ordered by what blocks what; each item says what "done" looks like.

State as of the last commit (`a303600`): home, `/atuacao`, `/quem-somos` and
`/coordenacao` are built. `/documentos`, `/contato`, `/noticias`, `/noticias/:slug` and `/associe-se` are
now built (uncommitted at the time of writing); redirects, hosting, SEO and tests remain.

---

## 1. Blocking — the site cannot launch without these

### Pages

- [x] **`/documentos`** — the three PDFs (Estatuto, Regimento Interno, Proposta
      de Associado) as ruled rows: title, one line saying what the document is,
      file type and size, download link. Links out to the PDFs under
      `/public/docs/` (copy them from the WordPress mirror). *Done when:* each
      document downloads with a sensible filename and the page explains which
      one an interested person should read first.
- [x] **`/contato`** — the three addresses with their purpose (general,
      volunteering, press), the phone, the full address, and the emails as
      `mailto:` links. *Blocked by:* the form decision below — if there is no
      form, the page is probably 30 minutes of work. *Done when:* someone can
      reach ASL without reading any other page.
- [x] **`/noticias`** — index of all posts from `src/content/posts.ts`.
      *Done when:* dates sort newest first and the page is linked from the home
      section's "Ver todas as notícias".
- [x] **`/noticias/[slug]`** — individual post pages. The two editais are
      currently **images** (scanned notices), not text; either keep the image
      with an alt description or retype them. *Done when:* each post has its own
      URL, title, date and body.
- [~] **`/associe-se`** (built as download-PDF-and-email; cost and Apoia.se flow still need ASL's answer) — *blocked by the membership decision below.* At minimum
      a page that explains what a membership is, what it costs, and links to the
      Proposta de Associado PDF. *Done when:* the amber home band and the header
      CTA both lead somewhere that completes the act.

### Redirects

- [~] Map every old WordPress URL (map in `src/content/redirects.json`; `public/_redirects` generated at build, client-side fallback in the app — real 301s still depend on the host, see below) to the new one. The map is in `PLAN.md`.
      The old site uses `?p=40`, `?p=45`, `?p=47`, `?p=124`, `?p=49`, `?p=271`,
      `?p=276`, `?p=102`, plus `/category/...`, `/feed`, and the PDFs under
      `/wp-content/uploads/`. *Done when:* a link from 2010 lands on the right
      new page with a 301, not the 404.
- [x] Keep the `?p=` query-string form working too — WordPress shared links
      often carry query strings, not paths.

### Hosting and deploy

- [ ] Choose the host and write the deploy steps. Static site, so any static
      host works, but SPA routing needs a rewrite to `index.html` (and the 404
      must not swallow the old-URL redirects).
- [ ] Set `Cache-Control` for `/assets/*` (hashed, immutable) and no-cache for
      `index.html`.

---

## 2. Decisions only ASL can make

- [ ] **Membership flow.** Apoia.se (recurring donation), a form plus a payment
      path, or download-the-PDF-and-email-it? Today the site has no answer. The
      Proposta de Associado PDF exists, which suggests "fill and email", but
      that should be confirmed.
- [ ] **Contact form?** A `mailto:` link is honest and needs no backend. A form
      needs spam protection, a destination mailbox, and an LGPD note. Recommend
      `mailto:` for launch.
- [ ] **News content model.** Right now posts are typed objects in
      `src/content/posts.ts` — fine for three posts, wrong for weekly publishing.
      Decide between Markdown files in the repo, a headless CMS, or keeping it
      manual. This determines how `/noticias` is built.
- [ ] **Tagline.** "Software livre é liberdade em movimento." is still working
      copy. It is now used on the home hero, so changing it later means changing
      the most prominent sentence on the site.
- [ ] **Hero lead.** `site.hero.lead` is written, not approved. It should read
      like ASL's own words.
- [ ] **Photos.** There are no images of FISL, of the team, or of any project.
      The design works without photography, but the site would gain a lot from
      three or four real photos. Decide whether to add them before launch or
      after.

---

## 3. Content accuracy

- [ ] **Statutory wording.** On `/quem-somos`, the seven objectives were lightly
      copy-edited (typos, punctuation). The originals are in the WordPress
      mirror. Compare against the Estatuto PDF before launch; the page presents
      itself as the canonical list.
- [ ] **Mission wording.** Same check against the Estatuto.
- [ ] **Coordination records.** Old terms were transcribed from the site,
      including gaps where substitute slots were empty. Someone from ASL should
      confirm the 2019–2021 and 2006–2008 lists are complete, not just what was
      published.
- [ ] **`governance` on the home page** shows the seven coordination roles only.
      Confirm that is the right level of detail for a home page.
- [ ] **Dates.** Election dates came from the old pages; confirm the 2025 election
      was 14 November 2025 as the editais state.

---

## 4. Brand

- [~] **Vector logo.** `brand/logo-source.svg` is a VTracer *trace* of the PNG
      (573 paths, hundreds of near-identical colours), not an original drawing.
      `npm run brand` derives the mark and lockup SVGs, ink and paper, from it;
      the paper variant is a recolour at SVG level. Sharp at every size we use,
      but the mark is 105 KB raw / 28 KB gzip. *Still wanted:* the clean master
      from whoever drew the logo (a few paths, flat colours), which would
      shrink these to a few KB and allow print use.
- [x] **Favicon set.** 32px, 180px touch icon, 192/512 and a web manifest.
- [x] **Open Graph image.** `public/og-image.png` (1200×630) and the `og:*` tags.
      The tags use the absolute `https://asl.org.br/og-image.png`; confirm the
      final domain before launch.

---

## 5. SEO and metadata

- [ ] Per-route `<title>` and `<meta name="description">`. Every page currently
      inherits the home title.
- [ ] Canonical URLs.
- [ ] `robots.txt` and `sitemap.xml`.
- [ ] JSON-LD: `Organization` (name, logo, address, founding date, sameAs to
      social profiles) and `Article` on posts.
- [ ] Verify the `lang` and the Portuguese diacritics in every meta tag.

---

## 6. Accessibility

- [ ] Run axe (or Lighthouse a11y) on all seven pages, both modes. The manual
      checks so far cover focus order, contrast, landmarks and skip link, but no
      automated audit has been run.
- [ ] Screen-reader pass (NVDA or VoiceOver) on the home page, `/coordenacao`
      and the mobile drawer. The `<details>` disclosures and the drawer are the
      two places most likely to have an issue.
- [ ] Check the skip link target when a page has no `h1` visible in the
      viewport (e.g. after deep-linking into `/atuacao#fisl`).
- [ ] Confirm 200% zoom and 400% reflow on the widest pages.

---

## 7. Performance

- [ ] The JS bundle is 512 kB raw / 162 kB gzip in one chunk, and the build
      warns about it. Route-level `React.lazy` would cut the first load to the
      layout plus the current page. MUI's icons and the `@mui/material` barrel
      are the bulk.
- [ ] Preload the two fonts used above the fold; consider dropping the
      Vietnamese and Latin-Ext subsets if Portuguese-only is settled.
- [ ] Add `width`/`height` to the logo images (the footer and drawer already
      have them; verify the hero plate).
- [ ] Measure Lighthouse on a throttled connection before launch, not after.

---

## 8. Testing and tooling

- [~] Commit the Playwright checks (route smoke tests done in `tests/routes.spec.ts`; drawer keyboard test still missing) that have been run ad hoc: one smoke test per
      route (renders, no console errors, one `h1`, no horizontal overflow at
      320/768/1366), plus the drawer keyboard behaviour.
- [~] Add `npm run test` (script exists; CI decision open) and decide whether it runs in CI.
- [x] Nothing enforces the "no horizontal overflow" rule yet; the smoke test is
      the cheapest way to keep it.

---

## 9. Nice to have

- [ ] Add the three quotes that the old footer carried (FSF, Snowden, Aaron
      Swartz) somewhere they earn their place. They are currently unused.
- [ ] A partner/community logos row on `/atuacao` (PSL estaduais, FERES) once
      permission for the marks is clear.
- [ ] Print stylesheet for `/documentos` and `/quem-somos`.
- [ ] `prefers-contrast: more` support.
- [ ] English version, if ASL wants one. Nothing in the architecture prevents
      it (content is already separated from presentation), but it doubles the
      content work.

---

## Known deviations, recorded on purpose

- The amber membership band exceeds the 10% accent budget from the design
  audit. It is the one place where the accent becomes a surface, and it carries
  the primary conversion. Documented in `DESIGN.md`.
- Display type runs at line-height 0.96–1.05 rather than the 1.1–1.2 rule; at
  76px the looser value breaks the headline apart.
