import { Box, Container, useTheme, type SxProps, type Theme } from '@mui/material'
import type { ReactNode } from 'react'
import { colors } from '../../styles/tokens'

type SectionTone = 'paper' | 'sand' | 'ink'

type SectionProps = {
  id?: string
  tone?: SectionTone
  labelledBy?: string
  /** Halves the vertical rhythm, for a band that only carries a CTA. */
  compact?: boolean
  sx?: SxProps<Theme>
  children: ReactNode
}

/**
 * Full-bleed page band. Tones map to the palette rather than to components:
 * paper is the reading surface, sand is the one warm band, ink is a statement.
 */
export function Section({
  id,
  tone = 'paper',
  labelledBy,
  compact = false,
  sx,
  children,
}: SectionProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const palette: Record<SectionTone, { bg: string; fg: string }> = {
    paper: { bg: isDark ? colors.ink : colors.paper, fg: isDark ? colors.paper : colors.ink },
    sand: { bg: isDark ? colors.graphite : colors.sand, fg: isDark ? colors.paper : colors.ink },
    // On a black page a black band disappears, so ink surfaces lift to graphite.
    ink: { bg: isDark ? colors.graphite : colors.ink, fg: colors.paper },
  }

  const { bg, fg } = palette[tone]

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={labelledBy}
      sx={[
        {
          bgcolor: bg,
          color: fg,
          py: compact ? { xs: 8, md: 10 } : { xs: 8, md: 16 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  )
}
