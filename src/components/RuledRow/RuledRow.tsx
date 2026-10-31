import { Box, Link as MuiLink, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { hideOnPhone } from '../../styles/phone'
import { typeScale } from '../../styles/tokens'

type RuledRowProps = {
  title: string
  description: string
  meta?: string
  /** Turns the title into a link to the full entry. */
  to?: string
  /** Rendered under the description, inside the row. */
  children?: ReactNode
  /** On phones, show only the title: for lists that link to the full entry. */
  brief?: boolean
}

/**
 * One editorial row: title, description and an optional meta value, separated
 * from its neighbours by a hairline. Replaces the card grid.
 */
export function RuledRow({ title, description, meta, to, children, brief = false }: RuledRowProps) {
  const detail = brief ? hideOnPhone : {}

  return (
    <Box
      component="li"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '4fr 7fr 1fr' },
        columnGap: 6,
        rowGap: 1,
        py: { xs: brief ? 1 : 3, md: 4 },
        borderTop: '1px solid',
        borderColor: 'divider',
        alignItems: 'baseline',
      }}
    >
      <Typography
        component="h3"
        sx={{ fontSize: typeScale.subhead, fontWeight: 600, letterSpacing: '-0.01em' }}
      >
        {to ? (
          <MuiLink
            component={Link}
            to={to}
            underline="hover"
            sx={{ color: 'inherit', textDecorationColor: 'currentColor', textUnderlineOffset: 4 }}
          >
            {title}
          </MuiLink>
        ) : (
          title
        )}
      </Typography>

      <Box sx={detail}>
        <Typography sx={{ color: 'text.secondary', maxWidth: '58ch' }}>{description}</Typography>
        {children}
      </Box>

      {meta && (
        <Typography
          sx={{
            fontSize: typeScale.small,
            color: 'text.secondary',
            justifySelf: { md: 'end' },
            fontVariantNumeric: 'tabular-nums',
            ...detail,
          }}
        >
          {meta}
        </Typography>
      )}
    </Box>
  )
}
