# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: would-be members. People in the Brazilian free-software community
(developers, students, activists, professionals and public servants) who are
deciding whether to join ASL. They arrive curious about what ASL is, often
knowing it only through FISL, and need to understand it, trust it, and see how
to join.

Secondary, served by the same site: current members (editais, assemblies,
statute and governance documents), volunteers, and partners or press checking
the association's history and legitimacy.

## Product Purpose

asl.org.br is the site of Associação Software Livre.Org, a non-profit civil
association founded on 11 September 2003 in Porto Alegre. It replaces a dated
WordPress site that never said what ASL is.

The site exists to turn a curious visitor into a member. Success means a
visitor understands within seconds that ASL is the free-software association
behind FISL, active since 2003, and finds the way to join without searching.

## Positioning

ASL is the association that organised FISL (Fórum Internacional Software
Livre), the largest free-software event in South America, and maintains the
Projeto Software Livre Brasil. FISL ran for 18 editions, 2000 to 2018; it
ended with COVID-19 and with free software becoming ordinary in Brazil, and is
not expected to return. ASL's standing comes from that history (FISL, TV
Software Livre, Rádio Software Livre, Cine Kafuné) and from an elected,
documented governance. No newer group can truthfully claim it. Write about
FISL in the past tense.

Open question: with FISL over, what ASL does now is the weakest part of the
pitch to new members. ASL later widened its cause to Padrões Livres (open
codecs and document formats); see TODO.md.

## Operating Context

- Joining (associar-se) is the one primary action. The current flow: download
  the membership proposal PDF, fill it in, and email it to ASL.
- Members are convened through formal editais de convocação for general
  assemblies (ordinária and extraordinária), held at TECNOPUC and online.
- Governance is elected for three-year terms (coordenação and conselho fiscal);
  previous terms back to 2006 are published.
- Volunteering goes through voluntarios@asl.org.br; financial support through
  the Apoia.se campaign.

## Capabilities and Constraints

- **Membership is free.** Joining ASL costs nothing; no future surface may
  imply a fee.
- **Portuguese only (pt-BR).** No English or Spanish version is planned.
- Static React site (Vite, TypeScript, MUI); content lives in typed files under
  `src/content/`. All current asl.org.br URLs must keep working through 301
  redirects.
- Undecided: who edits content after launch and how (typed files, Markdown, or
  a headless CMS); whether Apoia.se becomes part of joining; whether
  `/contato` gets a form or stays `mailto:`; the hosting provider.

## Brand Commitments

- Name: Associação Software Livre.Org, short form ASL (ASL.Org).
- Logo: the butterfly built from binary digits, with the wordmark. Supplied as
  PNG in `~/ASL/midias`.
- Voice: Portuguese, direct and warm, sentence case, plain verbs, no corporate
  filler.
- Working copy not yet approved by ASL: the tagline "Software livre é liberdade
  em movimento." and the home hero lead.

## Evidence on Hand

- Founding date, seat, statutory mission and seven objectives
  (`src/content/about.ts`).
- Current coordination 2025–2028 and previous terms (`src/content/people.ts`).
- Five current initiatives and two institutional partnerships
  (`src/content/initiatives.ts`).
- Editais 1/2025 and 2/2025 with scanned originals (`public/posts/`), and the
  Estatuto, Regimento Interno and membership proposal PDFs.
- Media in `public/media/atuacao/`: PSL.Br and FISL marks, a Rádio Software
  Livre studio photo, the Cine Kafuné logo, and FISL 10 (2009) footage.
- Absent, and not to be fabricated: membership counts, attendance figures,
  testimonials, photos of the team or of FISL crowds, and press coverage.

## Product Principles

1. Joining is always one obvious step away. Every page leads toward associar-se.
2. Say what ASL is before anything else: the association behind FISL, since
   2003.
3. Trust comes from facts on record: founding date, elected governance,
   published editais and statute. Never from invented numbers.
4. Free means free: never imply a cost, a paywall, or a hidden step to join.
5. Accessible and fast for everyone, on any connection.

## Accessibility & Inclusion

Required, not aspirational: WCAG 2.1 AA (contrast, focus states, keyboard
navigation, landmarks, skip link) and Lighthouse ≥ 95 on mobile for
Performance, Accessibility, Best Practices and SEO. Honour
`prefers-reduced-motion` everywhere.
