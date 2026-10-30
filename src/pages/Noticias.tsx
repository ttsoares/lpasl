import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { formatPostDate, postsNewestFirst } from '../content/posts'
import { typeScale } from '../styles/tokens'

export function Noticias() {
  return (
    <>
      <PageHero title="Notícias" lead="Editais, comunicados e novidades da associação." />

      <Section labelledBy="posts-heading" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography
          id="posts-heading"
          variant="h2"
          sx={{ mb: 4 }}
        >
          Publicações
        </Typography>

        {postsNewestFirst.length === 0 && (
          <Typography sx={{ color: 'text.secondary', maxWidth: '58ch' }}>
            Ainda não há publicações. Esta página reúne os editais de convocação, comunicados e
            novidades da ASL assim que forem publicados.
          </Typography>
        )}

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {postsNewestFirst.map((post) => (
            <Box
              component="li"
              key={post.slug}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '3fr 7fr 2fr' },
                columnGap: 6,
                rowGap: 1,
                py: { xs: 3, md: 4 },
                borderTop: '1px solid',
                borderColor: 'divider',
                alignItems: 'baseline',
              }}
            >
              <Typography sx={{ fontSize: typeScale.small, color: 'text.primary', fontWeight: 600 }}>
                {post.category}
              </Typography>

              <Box>
                <Typography
                  component="h3"
                  sx={{ fontSize: typeScale.subhead, fontWeight: 600, letterSpacing: '-0.01em' }}
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
                <Typography sx={{ mt: 1, color: 'text.secondary', maxWidth: '58ch' }}>
                  {post.summary}
                </Typography>
              </Box>

              <Typography
                component="time"
                dateTime={post.date}
                sx={{
                  fontSize: typeScale.small,
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
    </>
  )
}
