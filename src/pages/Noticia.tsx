import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { formatPostDate, posts } from '../content/posts'
import { NotFound } from './NotFound'

export function Noticia() {
  const { slug } = useParams()
  const post = posts.find((candidate) => candidate.slug === slug)

  if (!post) return <NotFound />

  return (
    <>
      <PageHero title={post.title}>
        <Typography sx={{ mt: 3, color: 'rgba(255, 255, 255, 0.76)' }}>
          {post.category} ·{' '}
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </Typography>
      </PageHero>

      <Section sx={{ pt: { xs: 8, md: 10 } }}>
        <Box sx={{ maxWidth: '68ch', overflowWrap: 'anywhere' }}>
          {post.body.map((paragraph) => (
            <Typography key={paragraph} sx={{ mb: 3 }}>
              {paragraph}
            </Typography>
          ))}

          {post.agenda && (
            <Box
              component="ol"
              sx={{ listStyleType: 'lower-alpha', pl: 3, mb: 3, '& li': { mb: 1.5 } }}
            >
              {post.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Box>
          )}

          {post.link && (
            <Typography sx={{ mb: 3 }}>
              <MuiLink href={post.link.href} underline="always" sx={{ fontWeight: 600 }}>
                {post.link.label}
              </MuiLink>
            </Typography>
          )}

          {post.closing && <Typography sx={{ mb: 3 }}>{post.closing}</Typography>}

          {post.scan && (
            <Typography sx={{ mb: 3 }}>
              <MuiLink href={post.scan.src} underline="always">
                Ver o edital original assinado (imagem)
              </MuiLink>
            </Typography>
          )}

          <MuiLink component={Link} to="/noticias" underline="always">
            ← Todas as notícias
          </MuiLink>
        </Box>
      </Section>
    </>
  )
}
