// The few strings the brand scripts need from src/content/site.ts, read from the
// source so the OG card never drifts from the home page.
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/content/site.ts', import.meta.url), 'utf8')
const lines = source.match(/taglineLines: \[([^\]]*)\]/)[1].match(/'([^']*)'/g).map((s) => s.slice(1, -1))

export const site = { taglineLines: lines }
