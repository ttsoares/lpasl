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
  body: '"Instrument Sans Variable", "Instrument Sans", system-ui, sans-serif',
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
  // In em, not ch: Instrument Sans has a wide zero, so 65ch ran to ~90 characters.
  // 33em holds about 70 characters of running Portuguese at any size.
  textWidth: '33em',
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

/**
 * Text roles, spread into `sx`. One definition per job so a role reads the
 * same on every page; sizes come from `typeScale`. Rationale in DESIGN.md.
 */
export const textRoles = {
  /** Archivo at reading size, for one strong line: a mission, a term period. */
  statement: {
    fontFamily: fonts.display,
    fontWeight: 600,
    fontStretch: '112%',
    fontSize: typeScale.h3,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    textWrap: 'balance',
  },
  /** Title of a row, card or block inside a section, and article subheads. */
  itemTitle: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: typeScale.subhead,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    textWrap: 'balance',
  },
  /** The sentence under a title that says what the section is for. */
  lead: {
    fontSize: typeScale.subhead,
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  /** Running text. */
  prose: {
    maxWidth: layout.textWidth,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
  /** Dates, years, counts and captions. */
  meta: {
    fontSize: typeScale.small,
    lineHeight: 1.45,
    fontVariantNumeric: 'tabular-nums',
  },
} as const
