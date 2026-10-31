import { Box, Button, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { initiatives, partnerships } from '../content/initiatives'
import { site } from '../content/site'
import { hideOnPhone } from '../styles/phone'
import { colors, typeScale } from '../styles/tokens'

export function Atuacao() {
  return (
    <>
      <PageHero
        title="Atuação"
        lead="Sete iniciativas e duas parcerias institucionais que levam o software livre da discussão para a prática."
      />

      <Section labelledBy="iniciativas-heading" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography id="iniciativas-heading" component="h2" sx={visuallyHidden}>
          Iniciativas
        </Typography>

        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {initiatives.map((initiative, index) => (
            <Box
              component="li"
              key={initiative.slug}
              id={initiative.slug}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '4fr 7fr' },
                columnGap: 6,
                rowGap: 2,
                py: { xs: 4, md: 6 },
                borderTop: index === 0 ? 'none' : '1px solid',
                borderColor: 'divider',
                scrollMarginTop: 96,
              }}
            >
              <Box>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: typeScale.h3,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    maxWidth: '20ch',
                  }}
                >
                  {initiative.name}
                </Typography>

                {initiative.since && (
                  <Typography
                    sx={{ mt: 2, fontSize: typeScale.small, color: 'text.secondary' }}
                  >
                    Desde {initiative.since}
                  </Typography>
                )}
              </Box>

              <Box>
                {initiative.body.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 24)}
                    sx={{
                      maxWidth: '58ch',
                      lineHeight: 1.65,
                      '& + &': { mt: 2 },
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                {initiative.url && (
                  <MuiLink
                    href={initiative.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Saiba mais sobre ${initiative.name} (abre em nova aba)`}
                    sx={{ display: 'inline-block', mt: 3, fontWeight: 500 }}
                  >
                    Saiba mais
                  </MuiLink>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="sand" labelledBy="parcerias-heading">
        <Box
          sx={{
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '4fr 7fr' },
            columnGap: 6,
            rowGap: 4,
          }}
        >
          <Typography id="parcerias-heading" component="h2" variant="h2" sx={{ maxWidth: '14ch' }}>
            Parcerias institucionais
          </Typography>

          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {partnerships.map((partnership) => (
              <Box
                component="li"
                key={partnership.name}
                sx={{ '& + &': { mt: 6, pt: 6, borderTop: '1px solid', borderColor: 'divider' } }}
              >
                <Typography
                  component="h3"
                  sx={{ fontSize: typeScale.subhead, fontWeight: 600, letterSpacing: '-0.01em' }}
                >
                  {partnership.name}
                </Typography>
                {partnership.body.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 24)}
                    sx={{ mt: 2, maxWidth: '58ch', lineHeight: 1.65 }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Section>

      <Box
        component="section"
        aria-labelledby="atuacao-cta"
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? colors.graphite : colors.ink),
          color: colors.paper,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 8, md: 10 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            columnGap: 6,
            rowGap: 4,
            alignItems: 'end',
          }}
        >
          <Box>
            <Typography
              id="atuacao-cta"
              component="h2"
              variant="h2"
              sx={{ maxWidth: '18ch', color: colors.paper }}
            >
              Esses projetos são feitos por voluntários.
            </Typography>
            <Typography
              sx={{
                mt: 3,
                maxWidth: '46ch',
                fontSize: typeScale.subhead,
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.76)',
              }}
            >
              Se você programa, traduz, edita vídeo, organiza eventos ou quer aprender, há espaço
              para você.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifySelf: { md: 'end' }, alignItems: { sm: 'center' } }}
          >
            <Button component={Link} to="/associe-se" variant="contained" size="large">
              Associe-se
            </Button>
            <Button
              href={`mailto:${site.emails.volunteers}`}
              variant="outlined"
              size="large"
              sx={{
                color: colors.paper,
                borderColor: 'rgba(255, 255, 255, 0.6)',
                '&:hover': { borderColor: colors.paper, bgcolor: 'rgba(255, 255, 255, 0.08)' },
                ...hideOnPhone,
              }}
            >
              Quero ser voluntário
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
