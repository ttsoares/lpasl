# TODO

What is left before asl.org.br can replace the current WordPress site.
Ordered by what blocks what; each item says what "done" looks like.

State as of 1 Nov 2026: every page is built (home, `/quem-somos`,
`/atuacao`, `/coordenacao`, `/documentos`, `/contato`, `/noticias`,
`/noticias/:slug`, `/associe-se`, 404), the redirect map is generated at build,
favicons and the Open Graph card are in, and 77 Playwright test runs cover
routes, motion, the phone layout, `/atuacao`, `/associe-se` and `/coordenacao`. The home hero flies a 3D
swallowtail (`src/components/FlyingBorb/`); `/atuacao` is a run of five
scroll-driven scenes (`src/sections/atuacao/`); below 600px the site is a single
column with one call to action per screen (`src/styles/phone.ts`). Product
truth (audience, main action, binding facts) is in `PRODUCT.md`; text roles are
in `src/styles/tokens.ts` (`textRoles`) and `DESIGN.md`. Body text is
Instrument Sans. What remains is hosting, ASL's decisions, SEO, audits and
performance. What was done on 1 Nov 2026 is in `docs/sessions/2026-11-01.md`;
6 Nov 2026 is summarised under "Start here" below and in the git log.

---

## Start here — next session (written 6 Nov 2026)

`main` is pushed and clean; 82 tests pass. The deployed preview is
`lpasl.vercel.app`; `asl.org.br` is still the old WordPress site.

**Ground rules set on 6 Nov** (also in `PRODUCT.md` and `~/.claude/CLAUDE.md`):
- This is a website refactor, not a strategy for ASL. Keep the tone of the
  current asl.org.br (plain, institutional, movement-rooted, nothing
  promotional) and keep its audience and calls to action ("Associe-se" stays).
- Never say or imply FISL ended for good. It has not run since 2018 but may
  return in another format: "18 edições entre 2000 e 2018", "a mais recente,
  em 2018", "o maior evento … já realizado". No "última edição".
- The user always does `git push`. Work on a branch, merge when asked, leave
  the repo on `main`.

**Design suggestions still open** (from the 6 Nov review; none changes what
the site says or asks):
1. [ ] **"Ativo" marker on active projects** in the home list and `/atuacao`
       (amber dot + word), active ones first. Cine Kafuné is active. *Needs:*
       is PSL.Br active?
2. [ ] **Mission heading style.** "Difundir o software livre…"
       (`ManifestoSection.tsx`) is Archivo 700 at normal width; every other
       heading is Archivo 800 expanded (125%). Use one style.
3. [ ] **Desktop density.** The home is 5,100px tall; section padding is 128px
       on desktop. Try ~96px, and set the FISL section's numbers (18 edições ·
       8.232 inscritos no FISL 10) large beside the photo instead of leaving
       its right half empty.
4. [ ] **A recent photo.** Nothing visual is newer than 2009. One photo of a
       Cine Kafuné session, the 2025 assembly or the team. *Needs:* the photo
       and permission.

**Waiting on the user / ASL:**
- [ ] **Hero lead** (`site.hero.lead`, `src/content/site.ts`). Draft offered,
      not applied: "A ASL nasceu para organizar o FISL, o maior evento de
      software livre da América do Sul. Dele vieram o Workshop Software Livre,
      a TV e a Rádio Software Livre." If a lead naming FISL lands, drop the
      "Desde 2003… Organizamos o FISL." line at the hero's foot (repeat).
- [ ] **Recent, dated activity** (2025–2026): Cine Kafuné sessions, supported
      projects, meetings. News on the home only shows posts from the last six
      months (`homeNews()` in `posts.ts`), so the section is hidden today.
      *Reconsider:* the current asl.org.br leads with its news and editais,
      and the tone rule says to keep that. Either show the latest posts
      regardless of age, or keep the rule and publish recent posts. User's
      call.
- [ ] **CNPJ and publishable documents** (accounts, the 2025 assembly ata).
      None are on the site; `/documentos` has the Estatuto, the Regimento and
      the membership form only.
- [ ] **Padrões Livres**: the user is researching it (see §3).
- [ ] **FISL 10 frame on the home** (Lula at the podium) needs ASL's approval
      as the home's only photo (see §11, footage rights).

**Ready to do without input:**
- [ ] **Old WordPress links on Vercel.** The redirect map only builds Netlify's
      `_redirects`; Vercel ignores it. Generate the same rules into
      `vercel.json` (`redirects`, with `has` for the `?p=` / `?page_id=`
      query links) from `src/content/redirects.json`. Needed before
      `asl.org.br` points at the new site.
- [ ] **Route-level code splitting** (§7): the 3D now starts when idle, but the
      main bundle (175 KB gzip) still carries every page.

---

## 1. Blocking — the site cannot launch without these

### Hosting and deploy

- [ ] Choose the host and write the deploy steps. The preview runs on Vercel
      (`lpasl.vercel.app`); `vercel.json` rewrites client routes to
      `index.html` (paths with a dot still 404), done 6 Nov. Confirm Vercel is
      the production host, then point `asl.org.br` at it (ASL's call, when the
      site is ready).
- [ ] Verify real 301s on that host. `src/content/redirects.json` →
      `scripts/build-redirects.mjs` → `public/_redirects` is written in Netlify
      syntax and untested; on Vercel it does nothing (see "Start here"). Hosts that ignore query strings in redirect rules
      (Cloudflare Pages) can't serve the `?p=40`-style links as 301s; there only
      the in-app fallback (`LegacyRedirects`) applies. *Done when:* a link from
      2010 lands on the right new page with a 301, not the 404.
- [ ] Set `Cache-Control` for `/assets/*` (hashed, immutable) and no-cache for
      `index.html`.

### Membership

- [ ] **`/associe-se` is built as download-the-PDF-and-email-it.** It still needs
      ASL to confirm the flow and whether Apoia.se is part of it (§2), and to
      settle the anuidade in the Estatuto against "gratuito" on the site (§3).
      *Done when:* the flow is the one ASL confirmed and the cost line matches
      the Estatuto.

---

## 2. Decisions only ASL can make

- [ ] **Membership flow.** Apoia.se (recurring donation), a form plus a payment
      path, or download-the-PDF-and-email-it? The site currently does the last
      one; confirm it. Cost is settled: membership is free (1 Nov 2026, recorded
      in `PRODUCT.md`).
- [ ] **Who may join?** `/associe-se` states no eligibility. Anyone, or are
      there conditions (age, sponsorship by a member)? *Done when:* one line in
      "Antes de enviar" says it. (From the /associe-se critique, 1 Nov 2026.)
- [ ] **Signature format.** Is a photographed or digitally signed proposal
      accepted, or only a scan of a hand-signed one? This is the biggest
      friction for new members. *Done when:* "Antes de enviar" says which.
- [ ] **Approve the data line on `/associe-se`.** "Seus dados: usados apenas
      para analisar a sua proposta de associação." is a draft (LGPD). ASL must
      confirm it, and say whether the sender gets a reply when the proposal
      arrives, so the page can promise it.
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
- [ ] **Photos.** The home now shows one FISL 10 (2009) video frame; there is
      still no photo of the team or of any current project. Decide whether to
      add three or four real photos before launch or after.

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
- [ ] **Names in the archive.** On 1 Nov 2026 each person's name was set to
      its most complete spelling across terms (e.g. Junior → Júnior Goergen,
      Carlos Castro → Carlos Alberto Jacques de Castro; full list in the commit).
      Three were left as transcribed because the match is uncertain; ASL should
      settle them: "Daniel Barbieri" (2014–2016 fiscal council) vs "Jonatas
      Daniel Dornelles Barbieri"; "Fátima de Fátima Torres Formoso" (2008–2010,
      likely a doubled first name); "Daniel Muller" (Muller or Müller?). Also
      confirm "Priscilla" (two terms) over "Priscila" (one term).
- [ ] **Election dates and atas.** The terms from 2006–2008 to 2014–2016 have no
      election date; one note above the archive says so. Add the dates to
      `people.ts` if the atas exist (the note updates itself), and link each
      term to its ata (`record`).
- [ ] **Approve the body descriptions on `/coordenacao`.** One sentence per
      body (coordenação, suplentes, conselho fiscal) drafted from the Estatuto,
      art. 20–23 (`bodyRoles` in `people.ts`). ASL to confirm the wording.
- [ ] **Conselho geral and the archive source.** The archive intro says the
      terms come from ASL's previous site and that "até o mandato 2019–2021
      havia também um conselho geral, órgão que o Estatuto de 2019 não prevê".
      Both are inferred (the 2019 Estatuto has no conselho geral; the earlier
      statute was not available). ASL to confirm, or supply the earlier
      statute.
- [ ] **Current coordinators' names.** `/coordenacao` now sets the seven
      2025–2028 names large in Archivo, so a misspelling is very visible.
      Confirm each spelling against the ata or Edital 1/2025.
- [ ] **Annual fee vs "membership is free".** The Estatuto (art. 7, §2) says
      full members vote and stand for election "30 dias após o seu ingresso e
      com a quitação da anuidade do exercício", i.e. an annual fee. The site
      (`/associe-se`, `/coordenacao`, `PRODUCT.md`) says joining is free. ASL
      must say which is current; if a fee applies, the free-membership copy
      changes everywhere. Decision on 1 Nov 2026: keep "gratuito" on the
      site (ASL said membership is free) until ASL confirms the Assembleia
      set the anuidade at zero (art. 12 and art. 19 let it fix the amount). Also: the Estatuto has the Coordenação approve new
      members (art. 7, §2) and the Assembleia only referendar (art. 19), while
      `/associe-se` says the proposal is voted at the Assembleia.
- [ ] **Coordination on the home page** is the second section since 6 Nov:
      the seven roles and names on tablets and desktops; on phones a compact
      band (title, election date, link). Confirm that is the right level of
      detail for a home page.
- [ ] **Dates.** Confirm the 2025 election was 14 November 2025, as the editais
      state.
- [ ] **PSL.Br link.** The project row links to the Facebook page
      (`facebook.com/PSLBrasil`) because the old site is gone; confirm that is
      the link and wording ASL wants.
- [ ] **Padrões Livres (deferred, user is researching).** ASL widened its cause
      from free software to open standards: free audio/video codecs, open
      document formats. Nothing on the site says so. Needs when it started and
      one or two concrete actions before it goes on `/quem-somos` (a three-step
      history: FISL 2000 → ASL 2003 → Padrões Livres). Wikipedia's FISL article
      does not cover it.
- [ ] **FISL's status in the copy.** FISL has not run since 2018 but is not
      over (ASL may revive it in another format). The site gives it no end
      date: "18 edições entre 2000 e 2018", "a mais recente, em 2018", and a
      neutral `period` label in `initiatives.ts`. TV and Rádio work from inside
      FISL and are labelled "Criada em". Cine Kafuné is active. If FISL comes
      back, update `period` and the "mais recente" lines.
- [ ] **Workshop Software Livre.** FISL's academic event since 2000 (SBC,
      published proceedings, per Wikipedia), which ASL ran inside FISL. Not on
      the site; decide whether it is its own `/atuacao` scene or a line under
      FISL.

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
- [ ] `sitemap.xml`. (`robots.txt` was added on 6 Nov; add its `Sitemap:`
      line once the sitemap exists and the domain is final.)
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
- [ ] Preload the two fonts used above the fold (Archivo and Instrument Sans);
      drop the Vietnamese and Latin-Ext subsets (Portuguese-only is settled in
      `PRODUCT.md`). Check that `@fontsource-variable/instrument-sans` ships a
      Latin-only file to import instead of the full one.
- [ ] Measure Lighthouse on a throttled connection before launch, not after.
      Baseline on 6 Nov (production build, headless Chromium): mobile 83–87,
      desktop 71–74; accessibility, best practices and SEO 100. Desktop is held
      down by the 3D shader compile (~330ms), which `compileAsync` can only
      hide where the GPU driver supports parallel compile; headless Chrome has
      none, so check on real hardware (DevTools → Performance → reload; there
      should be no long `scene` task). If it stays long, swap
      `MeshStandardMaterial` for `MeshLambertMaterial` (design call: less
      gloss on the wings).

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
      wings may briefly overlap the end of step 4 (now two lines) until it
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
- [ ] **Stale hand-off files.** `HANDOFF.md` is dated 29 Oct 2026, points at the
      old repo path (`/home/ttsoares/ASL/LP`) and calls four pages placeholders;
      `continue.txt` holds only an opencode session id. Both are tracked.
      Update `HANDOFF.md` from this TODO and the session reports, or delete
      both.
- [ ] Screen-reader check of the new `/coordenacao` structure: the
      coordination is a `<dl>` grid, the other bodies use subgrid on wide
      screens. Confirm the reading order is role then name, body by body.

---

## 10. Nice to have

- [ ] Add the three quotes that the old footer carried (FSF, Snowden, Aaron
      Swartz) somewhere they earn their place. They are currently unused.
- [ ] A partner/community logos row on `/atuacao` (PSL estaduais, FERES) once
      permission for the marks is clear.
- [ ] Print stylesheet for `/documentos` and `/quem-somos`.
- [ ] `prefers-contrast: more` support.
- English version: not planned. The site is Portuguese only (`PRODUCT.md`).

---

## 11. `/atuacao` scroll scenes: open questions

- [ ] **Real phones and Safari.** The scenes were checked in headless Chromium
      only. Check scroll smoothness on a real iPhone, an Android phone and
      desktop Safari. Since 6 Nov most scenes are timed entrances that play
      once in view (`useReveal`), at every width with motion allowed; only the
      TV monitor's growth and the radio photo's drift follow the scroll, at
      ≥900px. Under reduced motion the page is static.
- [ ] **Video with sound.** The FISL 10 clip (`public/media/atuacao/tv-fisl10.mp4`,
      75 s, 5 MB) loops with sound while on screen. Browsers block sound until
      the visitor's first interaction, so a direct visit plays muted and
      unmutes on the first click or key. Check that in Safari and Firefox, and
      confirm ASL wants sound on by default.
- [ ] **Footage rights.** Confirm ASL may publish the FISL 10 recording of
      President Lula's speech, and credit it if needed.
- [ ] **Removed initiatives.** Pontão de Cultura Digital Minuano and Festival
      de Cultura Livre were dropped from the site (home and `/atuacao`) on
      request. Confirm with ASL that they are no longer active.
- [ ] **`scrollcraft/`** holds the scene brief and the skill's build log. It is
      committed as a record; delete it if nobody needs it.

---

## Known deviations, recorded on purpose

- The binary rail repeats `01110111` (119, read as 11/9, ASL's founding day)
  instead of encoding "ASL". Changed on request on 1 Nov 2026; recorded in
  `DESIGN.md` and in `BinaryRail.tsx`, so it isn't "fixed" back.
- The amber membership band exceeds the 10% accent budget from the design
  audit. It is the one place where the accent becomes a surface, and it carries
  the primary conversion. Documented in `DESIGN.md`.
- Display type runs at line-height 0.96–1.05 rather than the 1.1–1.2 rule; at
  76px the looser value breaks the headline apart.
- `/atuacao` uses scroll-driven motion for the TV scene and the radio drift,
  against the "no scroll-fade" rule in `DESIGN.md`; recorded there as a
  page-specific exception the user asked for. The other scenes became timed
  entrances on 6 Nov, because scrubbed reveals froze half-cut logos.
- On phones (below 600px) the home page drops the manifesto and the
  coordination list, lists show titles only, the footer drops its menu
  columns, and secondary buttons are hidden. Tablets and desktops keep all of
  it; `tests/mobile.spec.ts` guards both sides.
