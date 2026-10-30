// Derives the site's logo SVGs from brand/logo-source.svg (a VTracer trace of
// ASL's official logo, 1000×1023: butterfly and binary digits above, the name
// below). Writes public/brand/*.svg. Run with `npm run brand`; the output is
// committed, so a normal build never needs this.
import { readFileSync, writeFileSync } from 'node:fs'

const source = readFileSync(new URL('../brand/logo-source.svg', import.meta.url), 'utf8')

// The trace is split in two by a clean gap: everything above y=740 is the mark,
// everything from y=790 down is the name. The white background rectangle is
// the only path that spans both.
const WORDMARK_FROM_Y = 740

const paths = [...source.matchAll(/<path d="([^"]*)" fill="#([0-9A-F]{6})" transform="translate\(([-\d.]+),([-\d.]+)\)"\/>/g)]
  .map(([, d, hex, tx, ty]) => {
    const numbers = d.match(/-?\d+\.?\d*/g).map(Number)
    const ys = numbers.filter((_, i) => i % 2 === 1)
    const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
    return { d, rgb, tx: Number(tx), ty: Number(ty), top: Number(ty) + Math.min(...ys), bottom: Number(ty) + Math.max(...ys) }
  })
  // Drop the background rectangle (it spans the whole canvas).
  .filter((p) => !(p.top <= 0 && p.bottom >= 1000))

const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
const chroma = ([r, g, b]) => Math.max(r, g, b) - Math.min(r, g, b)

/**
 * 'ink' = outline colour (dark neutral), 'fill' = butterfly colour,
 * 'hole' = the near-white paths the tracer drew over the ink: the counters of
 * the digits and letters, plus anti-aliasing. They become punch-outs in a mask
 * so the logo stays transparent on any surface.
 */
function role(rgb) {
  if (chroma(rgb) < 24) return luminance(rgb) < 150 ? 'ink' : 'hole'
  return luminance(rgb) < 90 ? 'ink' : 'fill'
}

const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))))
const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('')

function render(list, ink, id) {
  const roled = list.map((p) => ({ ...p, role: role(p.rgb) }))
  const path = (p, fill) =>
    `<path d="${round(p.d)}" fill="${fill}" transform="translate(${p.tx},${p.ty})"/>`

  const holes = roled.filter((p) => p.role === 'hole').map((p) => path(p, '#000')).join('')
  const shapes = roled
    .filter((p) => p.role !== 'hole')
    .map((p) => path(p, p.role === 'ink' ? ink : hex(p.rgb)))
    .join('')

  return (
    `<mask id="${id}" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1300" height="1300">` +
    `<rect x="-100" y="-100" width="1300" height="1300" fill="#fff"/>${holes}</mask>` +
    `<g mask="url(#${id})">${shapes}</g>`
  )
}

const mark = paths.filter((p) => p.bottom < WORDMARK_FROM_Y)
const word = paths.filter((p) => p.top >= WORDMARK_FROM_Y)


// Mark bounds measured from the traced paths, with a small margin.
const MARK = { x: 205, y: -15, w: 586, h: 720 }
const WORD = { x: 0, y: 790, w: 1000, h: 233 }

const svg = (viewBox, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img"><title>${title}</title>${body}</svg>\n`

const NAME = 'Associação Software Livre.Org'
const INK = '#1a1917'
const PAPER = '#ffffff'

// Horizontal lockup: the mark on the left, the two-line name centred on it.
const SCALE = 1.4
const GAP = 70
const wordX = MARK.w + GAP
const wordY = (MARK.h - WORD.h * SCALE) / 2 + 40
const lockupWidth = Math.round(wordX + WORD.w * SCALE)

function lockup(ink) {
  return svg(
    `0 0 ${lockupWidth} ${MARK.h}`,
    NAME,
    `<g transform="translate(${-MARK.x},${-MARK.y})">${render(mark, ink, 'm')}</g>` +
      `<g transform="translate(${wordX},${wordY}) scale(${SCALE}) translate(${-WORD.x},${-WORD.y})">${render(word, ink, 'w')}</g>`,
  )
}

const out = (name, content) =>
  writeFileSync(new URL(`../public/brand/${name}`, import.meta.url), content)

const markBody = (ink) => render(mark, ink, 'm')
const markView = `${MARK.x} ${MARK.y} ${MARK.w} ${MARK.h}`

out('logo-mark.svg', svg(markView, NAME, markBody(INK)))
out('logo-mark-paper.svg', svg(markView, NAME, markBody(PAPER)))
out('logo-lockup.svg', lockup(INK))
out('logo-lockup-paper.svg', lockup(PAPER))

console.log(`mark: ${mark.length} paths, wordmark: ${word.length} paths, lockup ${lockupWidth}×${MARK.h}`)
