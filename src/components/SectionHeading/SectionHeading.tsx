import { Box, Link as MuiLink, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { typeScale } from '../../styles/tokens'

type SectionHeadingProps = {
  id: string
  title: ReactNode
  lead?: string
  action?: { label: string; to: string }
}

/**
 * Section title block. The hairline above it is the only framing device:
 * no eyebrow, no numbering, no chip.
 */
export function SectionHeading({ id, title, lead, action }: SectionHeadingProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
        columnGap: 6,
        rowGap: 2,
        alignItems: 'start',
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography id={id} variant="h2" component="h2" sx={{ maxWidth: '18ch' }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '46ch' }}>
        {lead && (
          <Typography
            sx={{ fontSize: typeScale.subhead, lineHeight: 1.5, color: 'text.secondary' }}
          >
            {lead}
          </Typography>
        )}
        {action && (
          <MuiLink
            component={Link}
            to={action.to}
            sx={{ alignSelf: 'flex-start', fontWeight: 500, color: 'text.primary' }}
          >
            {action.label}
          </MuiLink>
        )}
      </Box>
    </Box>
  )
}
