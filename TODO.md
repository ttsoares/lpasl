# TODO

What is left before asl.org.br can replace the current WordPress site.
Ordered by what blocks what; each item says what "done" looks like.

State as of `861a5fc` (31 Oct 2026): every page is built (home, `/quem-somos`,
`/atuacao`, `/coordenacao`, `/documentos`, `/contato`, `/noticias`,
`/noticias/:slug`, `/associe-se`, 404), the redirect map is generated at build,
favicons and the Open Graph card are in, and 60 Playwright tests cover routes,
motion and the phone layout. The home hero flies a 3D swallowtail
(`src/components/FlyingBorb/`); below 600px the site is a single column with one
call to action per screen (`src/styles/phone.ts`). What remains is hosting,
ASL's decisions, SEO, audits and performance.

---

## 1. Blocking — the site cannot launch without these

### Hosting and deploy

- [ ] Choose the host and write the deploy steps. Static site, so any static
      host works, but SPA routing needs a rewrite to `index.html` (and the 404
      must not swallow the old-URL redirects).
- [ ] Verify real 301s on that host. `src/content/redirects.json` →
      `scripts/build-redirects.mjs` → `public/_redirects` is written in Netlify
      syntax and untested. Hosts that ignore query strings in redirect rules
      (Cloudflare Pages) can't serve the `?p=40`-style links as 301s; there only
      the in-app fallback (`LegacyRedirects`) applies. *Done when:* a link from
      2010 lands on the right new page with a 301, not the 404.
- [ ] Set `Cache-Control` for `/assets/*` (hashed, immutable) and no-cache for
      `index.html`.

### Membership

- [ ] **`/associe-se` is built as download-the-PDF-and-email-it.** It still needs
      ASL's answer on cost and on whether Apoia.se is part of it (see §2). *Done
      when:* the page states what a membership costs and the flow is the one ASL
      confirmed.

---

## 2. Decisions only ASL can make

- [ ] **Membership flow.** Apoia.se (recurring donation), a form plus a payment
      path, or download-the-PDF-and-email-it? The site currently does the last
      one; confirm it, and the cost.
- [ ] **Contact form?** A `mailto:` link is honest and needs no backend. A form
      needs spam protection, a destination mailbox, and an LGPD note. Recommend
      `mailto:` for launch (that is what `/contato` does now).
- [ ] **News content model.** Posts are typed objects in `src/content/posts.ts`:
      fine for three posts, wrong for weekly publishing. Decide between Markdown
      files in the repo, a headless CMS, or keeping it manual.
- [ ] **Tagline.** "Software livre é liberdade em movimento." is still working
      copy. It is the home hero and the OG card, so changing it later means
      changing the most prominent sentence on the site (and regenerating the
      card with `npm run brand`).
- [ ] **Hero lead.** `site.hero.lead` is written, not approved. It should read
      like ASL's own words.
- [ ] **Photos.** There are no images of FISL, of the team, or of any project.
      Decide whether to add three or four real photos before launch or after.

---

## 3. Content accuracy

- [ ] **Editais.** The two editais were retyped from the scans in
      `public/posts/`; proofread the text against the scans.
- [ ] **Statutory wording.** On `/quem-somos`, the seven objectives were lightly
      copy-edited. Compare against the Estatuto PDF; the page presents itself as
      the canonical list.
- [ ] **Mission wording.** Same check against the Estatuto.
- [ ] **Coordination records.** Old terms were transcribed from the site,
      including gaps where substitute slots were empty. Someone from ASL should
      confirm the 2019–2021 and 2006–2008 lists are complete.
- [ ] **Coordination on the home page** shows the seven coordination roles on
      tablets and desktops (phones skip it). Confirm that is the right level of
      detail for a home page.
- [ ] **Dates.** Confirm the 2025 election was 14 November 2025, as the editais
      state.
- [ ] **PSL.Br link.** The project row links to the Facebook page
      (`facebook.com/PSLBrasil`) because the old site is gone; confirm that is
      the link and wording ASL wants.

---

## 4. Brand

- [ ] **Clean logo master.** `brand/logo-source.svg` is a VTracer *trace* of the
      PNG (573 paths), not an original drawing. `npm run brand` derives
      everything from it; the mark is 105 KB raw / 28 KB gzip. Get the clean
      master from whoever drew the logo: a few paths, flat colours, a few KB,
      usable in print.
- [ ] **OG domain.** The `og:*` tags in `index.html` use the absolute
      `https://asl.org.br/og-image.png`; confirm the final domain.

---

## 5. SEO and metadata

- [ ] Per-route `<title>` and `<meta name="description">`. Every page still
      inherits the home title from `index.html`.
- [ ] Canonical URLs.
- [ ] `robots.txt` and `sitemap.xml` (neither exists in `public/`).
- [ ] JSON-LD: `Organization` (name, logo, address, founding date, sameAs to
      social profiles) and `Article` on posts.
- [ ] Verify the `lang` and the Portuguese diacritics in every meta tag.

---

## 6. Accessibility

- [ ] Run axe (or Lighthouse a11y) on every route (each post, and the 404), both colour modes, at
      375px and desktop. No automated audit has been run; `tests/mobile.spec.ts`
      only covers overflow and tap-target size.
- [ ] Screen-reader pass (NVDA or VoiceOver) on the home page, `/coordenacao`
      and the mobile drawer (which now also holds the dark-mode switch on
      phones). The `<details>` disclosures and the drawer are the likeliest
      places for an issue.
- [ ] Check the skip link target when a page has no `h1` visible in the
      viewport (e.g. after deep-linking into `/atuacao#fisl`).
- [ ] Confirm 200% zoom and 400% reflow on the widest pages.

---

## 7. Performance

- [ ] The main JS chunk is 552 kB raw / 174 kB gzip and the build warns about
      it. Route-level `React.lazy` would cut the first load to the layout plus
      the current page; MUI's icons and the `@mui/material` barrel are the bulk.
      (three.js is already its own 128 kB gzip chunk, loaded only on the home
      page at 600×600 and up.)
- [ ] Preload the two fonts used above the fold; consider dropping the
      Vietnamese and Latin-Ext subsets if Portuguese-only is settled.
- [ ] Measure Lighthouse on a throttled connection before launch, not after.

---

## 8. 3D hero and mobile pass: open questions

- [ ] **3D on real hardware.** The swallowtail was only checked in headless
      Chrome with software WebGL. Check frame rate and battery on a real iPad, a
      mid-range Android tablet and an older laptop. If it struggles: smaller wing
      textures (now 1024px, `PIXELS` in `swallowtail.ts`) and a lower pixel-ratio
      cap on tablets (now 2, in `scene.ts`).
- [ ] **WebGL context loss.** `scene.ts` has no `webglcontextlost` handler; if
      the GPU drops the context the canvas goes blank instead of showing the CSS
      sky behind it. Remove the canvas on loss, or restore the scene.
- [ ] **Safari / iOS.** The sky's feathered edge uses `mask-image` with
      `mask-composite: intersect` (Home.tsx). Check it in real Safari and iPadOS;
      older versions would show a hard-edged square.
- [ ] **Short desktop windows.** The 3D loads only at 600×600 and up, so a
      desktop window under 600px tall shows the static sky gradient with no
      butterfly. Decide if that is acceptable.
- [ ] **Two buttons on some phone screens.** Home shows "Associe-se" in the
      hero and "Quero me associar" further down (same destination);
      `/quem-somos` and `/coordenacao` show the header's "Associe-se" plus one
      end-of-page button. Decide whether to drop either on phones
      (`hideOnPhone`).
- [ ] **Hero spacing at ≥1440px.** The binary rail sits 24px from the period of
      "em movimento."; check it doesn't feel cramped, or reduce the hero
      block's left bleed (`ml: -3` in Home.tsx).
- [ ] **Perched butterfly on `/associe-se`.** On tablets and desktops its upper
      wings briefly overlap the end of step 4 ("…Assembleia") until it
      vanishes, about 7s after landing. Shift it right if that bothers anyone.
- [ ] **Sky image.** `~/ASL/midias/blue-sky.webp` is a watermarked Shutterstock
      preview; do not ship it. The sky is painted in code (`sky.ts`).

---

## 9. Testing and tooling

- [ ] Drawer keyboard test: open with Enter, focus lands on close, Tab stays
      inside, Esc closes and returns focus to the menu button.
- [ ] Decide whether `npm test` runs in CI (no workflow exists yet).
- [ ] `.ignore` (graft's search re-admit, at the repo root) is untracked:
      commit it or add it to `.gitignore`.

---

## 10. Nice to have

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
- On phones (below 600px) the home page drops the manifesto and the
  coordination list, lists show titles only, the footer drops its menu
  columns, and secondary buttons are hidden. Tablets and desktops keep all of
  it; `tests/mobile.spec.ts` guards both sides.
