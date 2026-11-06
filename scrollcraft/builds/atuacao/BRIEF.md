# BRIEF: /atuacao, made dramatic

Self-authored from the user's directives (2026-11-01). The user supplied the
assets and the content changes; vibe, curve and devices are authored decisions.

## User directives (verbatim intent)

"Lets make this page /atuacao more dramatic using the nateherk-design."
PSL.Br uses pslbr.png. FISL uses FISL.jpeg. TV Software Livre uses Lula.mp4
without its first 31 seconds. Rádio Software Livre loses its broken "Saiba
mais" link and uses radioSL.jpg. Pontão de Cultura Digital Minuano and Festival
de Cultura Livre are removed. Cine Kafuné uses kafune.jpg.

## Authored decisions

1. Vibe: archival broadcast, night stage, signal on air.
2. Journey: who we are in action, then five initiatives in founding order,
   then partnerships, then the volunteer call.
3. Energy: quiet open, rising through FISL, loudest at TV, calm at Rádio,
   a held breath at Cine Kafuné, warm close.
4. Peak: TV Software Livre. The frame of a president speaking at FISL 10 grows
   from a small monitor to fill the screen.
5. Signature move: the broadcast frame. The video arrives as a small scanlined
   monitor and grows until the visitor is inside the transmission. It loops with
   sound on (user revision, 2026-11-01), muted only until the first gesture when
   the browser refuses autoplay audio.
6. Range: editorial, documentary. Inside the existing ASL system (ink, amber,
   Archivo, Plex). No new palette.
7. Structure: distinct scenes, not one continuous world.
8. Assets: all supplied by the user. Nothing generated, no spend.

Grammar: editorial chapters, one bespoke device per chapter.

## Feeling curve

| Act | Feeling | Cause |
|---|---|---|
| Hero | Orientation | The page title alone (user revision: years and FISL mark removed) |
| PSL.Br | Rooted | The paper panel settles in; the national logo turns into place |
| FISL | Anticipation | The sign swings upright on its corner, like a road sign set in place |
| TV Software Livre | Awe (peak) | A small monitor grows into the whole screen; a president at FISL 10 |
| Rádio | Intimacy | A studio photo drifts slower than the page; "on air" pulses |
| Cine Kafuné | Hush | Letterbox bars part on the logo once, like house lights going down |
| Close | Invitation | Existing volunteer call |

Peak sentence: "There's a part where the old TV clip of Lula at FISL grows
until it fills your screen." It's the site where scrolling turns into a
broadcast.

Authored silence: none. Mobile and reduced motion get a static composition.

## Revision, 2026-11-06: entrances instead of scrubbing

The user found the scroll animation poor, and the PSL.Br wipe looked broken in
Chromium browsers. Cause: PSL.Br, FISL and Cine Kafuné were scrubbed to scroll
position, so any stop mid-scroll froze a half-cut logo, and PSL.Br was already
62% revealed at page load. FISL (240vh) and TV (300vh) pins also took 58% of
the page's scroll.

Now each act makes a timed entrance when it comes into view (`useReveal`):
the image first, then the copy line by line, always running to its end. Only
the TV growth (pin cut to 170vh) and the radio photo's drift still follow the
scroll, because both read well at any point. Page height 9322px -> 6625px.
