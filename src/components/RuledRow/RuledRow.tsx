import { Box, Link as MuiLink, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { hideOnPhone, phone } from '../../styles/phone'
import { textRoles } from '../../styles/tokens'

type RuledRowProps = {
  title: string
  description: string
  meta?: string
  /** Turns the title into a link to the full entry. */
  to?: string
  /** Rendered under the description, inside the row. */
  children?: ReactNode
  /**
   * On phones, cut the description to two lines and drop the meta: for lists
   * that link to the full entry. A bare title says nothing to a newcomer.
   */
  brief?: boolean
}

/** Two lines of the description on phones; the title links to the rest. */
const twoLinesOnPhone = {
  [phone]: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
  },
} as const

/**
 * One editorial row: title, description and an optional meta value, separated
 * from its neighbours by a hairline. Replaces the card grid.
 */
export function RuledRow({ title, description, meta, to, children, brief = false }: RuledRowProps) {
  const detail = brief ? hideOnPhone : {}
  const clamp = brief ? twoLinesOnPhone : {}

  return (
    <Box
      component="li"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '4fr 7fr 1fr' },
        columnGap: 6,
        rowGap: 1,
        py: { xs: brief ? 2 : 3, md: 4 },
        borderTop: '1px solid',
        borderColor: 'divider',
        alignItems: 'baseline',
      }}
    >
      <Typography
        component="h3"
        sx={{ ...textRoles.itemTitle }}
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

      <Box>
        <Typography sx={{ ...textRoles.prose, color: 'text.secondary', ...clamp }}>
          {description}
        </Typography>
        {children && <Box sx={detail}>{children}</Box>}
      </Box>

      {meta && (
        <Typography
          sx={{
            ...textRoles.meta,
            color: 'text.secondary',
            justifySelf: { md: 'end' },
            ...detail,
          }}
        >
          {meta}
        </Typography>
      )}
    </Box>
  )
}
