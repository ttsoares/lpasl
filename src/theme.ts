import { createTheme, type PaletteMode } from '@mui/material/styles'
import { phone } from './styles/phone'
import { colors, fonts, layout, motion, radii, typeScale } from './styles/tokens'

const display = {
  fontFamily: fonts.display,
  fontWeight: 800,
  fontStretch: '125%',
  letterSpacing: '-0.035em',
  lineHeight: 0.96,
  textWrap: 'balance',
} as const

export function getTheme(mode: PaletteMode = 'light') {
  const isDark = mode === 'dark'
  const text = isDark ? colors.paper : colors.ink
  const textMuted = isDark ? 'rgba(255, 255, 255, 0.64)' : colors.muted
  const background = isDark ? colors.ink : colors.paper
  const surface = isDark ? colors.graphite : colors.paper

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.amber,
        dark: colors.amberPressed,
        contrastText: colors.ink,
      },
      secondary: {
        main: text,
        contrastText: background,
      },
      background: {
        default: background,
        paper: surface,
      },
      text: {
        primary: text,
        secondary: textMuted,
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.18)' : colors.line,
    },
    shape: {
      borderRadius: radii.sm,
    },
    typography: {
      fontFamily: fonts.body,
      fontSize: 16,
      h1: { ...display, fontSize: typeScale.h1 },
      h2: { ...display, fontSize: typeScale.h2, lineHeight: 1 },
      h3: {
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: typeScale.h3,
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        textWrap: 'balance',
      },
      h4: { fontFamily: fonts.body, fontWeight: 600, letterSpacing: '-0.01em' },
      subtitle1: { fontSize: typeScale.subhead, lineHeight: 1.4 },
      body1: { fontSize: typeScale.body, lineHeight: 1.6, letterSpacing: '0.005em', textWrap: 'pretty' },
      body2: { fontSize: typeScale.small, lineHeight: 1.6 },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      caption: { fontSize: typeScale.small, lineHeight: 1.45 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--asl-ink': colors.ink,
            '--asl-graphite': colors.graphite,
            '--asl-paper': colors.paper,
            '--asl-sand': colors.sand,
            '--asl-amber': colors.amber,
            '--asl-amber-pressed': colors.amberPressed,
            '--asl-muted': colors.muted,
            '--asl-line': colors.line,
            '--asl-font-display': fonts.display,
            '--asl-font-body': fonts.body,
            '--asl-font-mono': fonts.mono,
            '--asl-ease': motion.ease,
          },
          '::selection': {
            backgroundColor: colors.amber,
            color: colors.ink,
          },
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            backgroundColor: background,
            color: text,
            // Instrument Sans is spaced tight for display; open it a hair for reading.
            letterSpacing: '0.005em',
          },
          a: {
            color: 'inherit',
            textUnderlineOffset: '0.2em',
            textDecorationThickness: '1.5px',
          },
          ':focus-visible': {
            outline: '3px solid currentColor',
            outlineOffset: 3,
          },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            maxWidth: layout.maxWidth,
            '@media (min-width:1200px)': {
              maxWidth: layout.maxWidth,
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          color: 'transparent',
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: radii.sm,
            padding: '8px 24px',
            borderWidth: 2,
            whiteSpace: 'nowrap',
            transition: `background-color ${motion.fast} ${motion.ease}, color ${motion.fast} ${motion.ease}, border-color ${motion.fast} ${motion.ease}`,
          },
          sizeSmall: {
            padding: '8px 16px',
            fontSize: typeScale.body,
          },
          sizeLarge: {
            padding: '16px 32px',
            fontSize: typeScale.body,
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              border: `2px solid ${colors.ink}`,
              '&:hover': { backgroundColor: colors.amberPressed },
            },
          },
          {
            props: { variant: 'outlined', color: 'primary' },
            style: {
              color: text,
              borderColor: text,
              '&:hover': {
                color: colors.ink,
                borderColor: colors.ink,
                backgroundColor: colors.amber,
              },
            },
          },
        ],
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: '3px solid currentColor',
              outlineOffset: 3,
            },
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
        styleOverrides: {
          root: {
            color: 'inherit',
            textDecorationColor: 'currentColor',
            textDecorationThickness: '2px',
            textUnderlineOffset: 3,
            // A link standing on its own (not inside running text) is a tap
            // target on phones: give it the 44px minimum.
            [phone]: {
              '&:not(p *)': { display: 'inline-flex', alignItems: 'center', minWidth: 44, minHeight: 44 },
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            [phone]: { padding: 12 },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : colors.line,
            borderRadius: radii.md,
            boxShadow: 'none',
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: radii.xs,
            fontWeight: 500,
            backgroundColor: colors.sand,
            color: colors.ink,
          },
        },
        variants: [
          {
            props: { variant: 'outlined' },
            style: {
              backgroundColor: 'transparent',
              color: text,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.32)' : colors.line,
            },
          },
        ],
      },
    },
  })
}
