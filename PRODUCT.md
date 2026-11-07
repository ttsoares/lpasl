# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (decided 2026-11-06): the evaluators of two funding applications
ASL has submitted, about US$270,000 each. They will look at this site to judge
whether ASL is real, active, well governed and able to deliver a project of
that size. They do not know ASL and are not joining it; they are checking it.

Secondary: old friends, former volunteers and partners of the FISL years, who
are expected to come back if funding returns; and current associates
(editais, assemblies, statute and governance documents).

Membership is no longer a goal: the coordination does not expect new
applications. "Associe-se" stays available but is not the site's call to
action.

## Product Purpose

asl.org.br is the site of Associação Software Livre.Org, a non-profit civil
association founded on 11 September 2003 in Porto Alegre. It replaces a dated
WordPress site that never said what ASL is.

The site exists to show a funder, within minutes, that ASL is a credible
organisation to fund: a long track record (FISL, 18 editions, 2000-2018),
current work (Cine Kafuné, and the projects it has applied for), documented
governance (elected coordination, Estatuto, atas, accounts), and a real
address and people to contact. Success means an evaluator finds that evidence
without searching and leaves trusting ASL's capacity.

The one message, above all: **"A ASL está viva."** The redesign gives ASL a
modern face, moves it off WordPress and shows a living organisation, not an
archive of FISL. Every page should carry at least one current, dated sign of
activity. When ready, this site replaces the WordPress site at asl.org.br.

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
