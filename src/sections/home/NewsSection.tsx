import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section/Section'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { formatPostDate, posts } from '../../content/posts'
import { hideOnPhone } from '../../styles/phone'
import { textRoles } from '../../styles/tokens'

export function NewsSection() {
  return (
    <Section tone="paper" labelledBy="noticias-title">
      <SectionHeading
        id="noticias-title"
        title="Notícias e editais"
        lead="Convocações, assembleias e o que a associação está publicando."
        action={{ label: 'Ver todas as notícias', to: '/noticias' }}
      />

      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 4, md: 6 } }}>
        {posts.map((post) => (
          <Box
            component="li"
            key={post.slug}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '3fr 7fr 2fr' },
              columnGap: 6,
              rowGap: 1,
              py: { xs: 2, md: 4 },
              borderTop: '1px solid',
              borderColor: 'divider',
              alignItems: 'baseline',
            }}
          >
            <Typography
              sx={{ ...textRoles.meta, color: 'text.primary', fontWeight: 600 }}
            >
              {post.category}
            </Typography>

            <Box>
              <Typography
                component="h3"
                sx={{ ...textRoles.itemTitle }}
              >
                <MuiLink
                  component={Link}
                  to={`/noticias/${post.slug}`}
                  underline="hover"
                  sx={{ color: 'inherit', textUnderlineOffset: 4 }}
                >
                  {post.title}
                </MuiLink>
              </Typography>
              <Typography sx={{ ...textRoles.prose, mt: 1, color: 'text.secondary', ...hideOnPhone }}>
                {post.summary}
              </Typography>
            </Box>

            <Typography
              component="time"
              dateTime={post.date}
              sx={{
                ...textRoles.meta,
                color: 'text.secondary',
                justifySelf: { md: 'end' },
                textAlign: { md: 'right' },
                whiteSpace: 'nowrap',
              }}
            >
              {formatPostDate(post.date)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  )
}
