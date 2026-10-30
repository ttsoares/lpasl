// Renders the raster brand files (favicons, touch icon, Open Graph card) from
// the SVGs in public/brand. Needs Chromium (`npx playwright install chromium`).
// Run with `npm run brand` after build-brand.mjs; the output is committed.
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'
import { site } from './site-copy.mjs'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root))
const dataUri = (path, type) => `data:${type};base64,${read(path).toString('base64')}`

const mark = dataUri('public/brand/logo-mark.svg', 'image/svg+xml')
const markPaper = dataUri('public/brand/logo-mark-paper.svg', 'image/svg+xml')
const archivo = dataUri(
  'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
  'font/woff2',
)

const browser = await chromium.launch()

async function render(html, width, height, out, { transparent = false } = {}) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  const buffer = await page.screenshot({ omitBackground: transparent })
  writeFileSync(new URL(`public/${out}`, root), buffer)
  await page.close()
}

// Square icon: the mark centred on a white tile so it reads on any tab colour.
const icon = (size, padding) => `
  <body style="margin:0;width:${size}px;height:${size}px;background:#fff;display:grid;place-items:center">
    <img src="${mark}" style="height:${size * (1 - padding * 2)}px">`

await render(icon(32, 0.04), 32, 32, 'favicon-32.png')
await render(icon(180, 0.1), 180, 180, 'apple-touch-icon.png')
await render(icon(192, 0.1), 192, 192, 'icon-192.png')
await render(icon(512, 0.1), 512, 512, 'icon-512.png')

// Open Graph card, 1200×630: the paper mark on ink with the tagline in amber.
const lines = site.taglineLines.map((line) => `<div>${line}</div>`).join('')
await render(
  `<style>@font-face{font-family:A;src:url(${archivo});font-weight:100 900;font-stretch:62% 125%}</style>
   <body style="margin:0;width:1200px;height:630px;background:#000;display:flex;align-items:center;gap:80px;padding:0 96px;box-sizing:border-box">
     <img src="${markPaper}" style="height:400px">
     <div style="font:800 62px/1 A;white-space:nowrap;font-stretch:125%;letter-spacing:-0.035em;color:#ffc00f">${lines}</div>`,
  1200,
  630,
  'og-image.png',
)

await browser.close()
