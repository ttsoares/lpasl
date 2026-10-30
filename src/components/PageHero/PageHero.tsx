import { Box, Container, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { BinaryRail } from '../BinaryRail/BinaryRail'
import { colors, typeScale } from '../../styles/tokens'

type PageHeroProps = {
  title: string
  lead?: string
  /** Optional extra content below the lead, e.g. a link or a metadata line. */
  children?: ReactNode
}

/**
 * Inner-page opener: an ink band with the page title in amber and a single
 * lead sentence. Compact on purpose — the home hero owns the full-height
 * statement.
 */
export function PageHero({ title, lead, children }: PageHeroProps) {
  return (
    <Box
      component="section"
      aria-labelledby="page-title"
      sx={{ position: 'relative', bgcolor: colors.ink, color: colors.paper }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 6, md: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
          columnGap: 6,
        }}
      >
        <Box>
          <Typography
            key={title}
            id="page-title"
            className="fade-in"
            variant="h1"
            component="h1"
            sx={{
              maxWidth: '20ch',
              color: colors.amber,
              fontWeight: 800,
              fontStretch: '125%',
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontSize: { xs: 'clamp(1.75rem, 8.4vw, 2.4375rem)', sm: typeScale.h1 },
              textWrap: 'balance',
            }}
          >
            {title}
          </Typography>

          {lead && (
            <Typography
              sx={{
                mt: 4,
                maxWidth: '52ch',
                fontSize: typeScale.subhead,
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.76)',
              }}
            >
              {lead}
            </Typography>
          )}

          {children}
        </Box>
      </Container>

      {/* Sits in the right of the band the title leaves empty, sized by the band. */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          top: 40,
          bottom: 40,
          right: 'max(24px, calc((100% - 1200px) / 2))',
        }}
      >
        <BinaryRail fontSize="9px" />
      </Box>
    </Box>
  )
}
