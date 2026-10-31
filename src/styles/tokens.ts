/**
 * Canonical design tokens for the ASL.Org redesign.
 * Source of truth for the MUI theme and any component that needs raw values.
 * Rationale and usage rules live in DESIGN.md.
 */

export const colors = {
  ink: '#000000',
  graphite: '#1C1C1C',
  paper: '#FFFFFF',
  sand: '#F4EDDD',
  amber: '#FFC00F',
  amberPressed: '#E0A800',
  muted: '#565656',
  line: 'rgba(0, 0, 0, 0.16)',
} as const

export const fonts = {
  display: '"Archivo Variable", "Archivo", system-ui, sans-serif',
  body: '"IBM Plex Sans Variable", "IBM Plex Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace',
} as const

export const typeScale = {
  display: 'clamp(3rem, 7vw, 6rem)',
  hero: 'clamp(2.4375rem, 5.4vw, 4.75rem)',
  h1: 'clamp(2.4375rem, 4.6vw, 4rem)',
  h2: 'clamp(1.9375rem, 3.4vw, 3rem)',
  h3: '1.5625rem',
  subhead: '1.25rem',
  body: '1rem',
  small: '0.875rem',
} as const

export const radii = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
} as const

export const layout = {
  maxWidth: 1280,
  textWidth: '65ch',
  gutter: 24,
} as const

export const motion = {
  fast: '140ms',
  base: '220ms',
  reveal: '420ms',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

// The hero's sky square: the 3D scene paints this gradient, and the CSS uses
// the same pair as its placeholder before the scene loads.
export const sky = {
  top: '#1E6FC2',
  bottom: '#7DBBEC',
} as const
