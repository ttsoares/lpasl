import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { formatPostDate, posts } from '../content/posts'
import { textRoles } from '../styles/tokens'
import { NotFound } from './NotFound'

/** In-article subhead: the item-title role, with more room above than below. */
function Subhead({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography
      id={id}
      component="h2"
      sx={{ ...textRoles.itemTitle, mt: 6, mb: 2, '&:first-of-type': { mt: 0 } }}
    >
      {children}
    </Typography>
  )
}

export function Noticia() {
  const { slug } = useParams()
  const post = posts.find((candidate) => candidate.slug === slug)

  if (!post) return <NotFound />

  // A convocation is long and formal: give it a standfirst and named parts so
  // the date, place and agenda can be found without reading the whole notice.
  const structured = Boolean(post.agenda)

  return (
    <>
      <PageHero title={post.title}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ mt: 3, ...textRoles.meta, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.76)' }}
        >
          <Box component="span" sx={{ fontWeight: 600, color: 'common.white' }}>
            {post.category}
          </Box>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </Stack>
      </PageHero>

      <Section sx={{ pt: { xs: 8, md: 10 } }}>
        <Box component="article" sx={{ maxWidth: textRoles.prose.maxWidth, overflowWrap: 'anywhere' }}>
          {structured && (
            <Typography
              sx={{
                ...textRoles.lead,
                pb: 4,
                mb: 6,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              {post.summary}
            </Typography>
          )}

          {structured && <Subhead id="convocacao">Convocação</Subhead>}
          <Box sx={{ '& > p + p': { mt: 2 } }}>
            {post.body.map((paragraph) => (
              <Typography key={paragraph} sx={textRoles.prose}>
                {paragraph}
              </Typography>
            ))}
          </Box>

          {post.agenda && (
            <>
              <Subhead id="ordem-do-dia">Ordem do dia</Subhead>
              <Box
                component="ol"
                sx={{
                  listStyleType: 'lower-alpha',
                  m: 0,
                  pl: 3.5,
                  '& li': { ...textRoles.prose, pl: 1 },
                  '& li + li': { mt: 1.5 },
                  '& li::marker': {
                    fontWeight: 600,
                    color: 'text.secondary',
                    fontVariantNumeric: 'tabular-nums',
                  },
                }}
              >
                {post.agenda.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Box>
            </>
          )}

          {post.closing && (
            <Typography sx={{ ...textRoles.prose, mt: 6, color: 'text.secondary' }}>
              {post.closing}
            </Typography>
          )}

          {post.link && (
            <Typography sx={{ mt: 3 }}>
              <MuiLink href={post.link.href} underline="always" sx={{ fontWeight: 600 }}>
                {post.link.label}
              </MuiLink>
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <MuiLink
              component={Link}
              to="/noticias"
              underline="always"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, minHeight: 44 }}
            >
              <ArrowBackIcon fontSize="small" aria-hidden />
              Todas as notícias
            </MuiLink>
            {post.scan && (
              <MuiLink
                href={post.scan.src}
                underline="always"
                sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
              >
                Ver o edital original assinado (imagem)
              </MuiLink>
            )}
          </Stack>
        </Box>
      </Section>
    </>
  )
}
