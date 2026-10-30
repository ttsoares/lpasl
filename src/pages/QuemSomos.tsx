import { Box, Button, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { about } from '../content/about'
import { colors, typeScale } from '../styles/tokens'

export function QuemSomos() {
  return (
    <>
      <PageHero
        title="Quem somos"
        lead="Uma associação civil sem fins lucrativos que, desde 2003, transforma a defesa do software livre em projetos concretos."
      />

      <Section
        labelledBy="associacao-title"
        sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 8, md: 12 } }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            columnGap: 6,
            rowGap: { xs: 6, md: 0 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography id="associacao-title" component="h2" variant="h2" sx={{ maxWidth: '16ch' }}>
              A associação
            </Typography>

            <Box sx={{ mt: 4 }}>
              {about.intro.map((paragraph) => (
                <Typography key={paragraph} sx={{ maxWidth: '58ch', '& + &': { mt: 3 } }}>
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <MuiLink
              component={Link}
              to="/atuacao"
              sx={{ display: 'inline-block', mt: 4, fontWeight: 500, color: 'text.primary' }}
            >
              Ver projetos e iniciativas
            </MuiLink>
          </Box>

          <Box
            component="dl"
            sx={{
              m: 0,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {about.facts.map((fact) => (
              <Box
                key={fact.label}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  rowGap: 0.5,
                  py: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-of-type': { borderBottom: 'none' },
                }}
              >
                <Typography component="dt" sx={{ fontSize: typeScale.small, color: 'text.secondary' }}>
                  {fact.label}
                </Typography>
                <Typography component="dd" sx={{ m: 0, fontWeight: 500 }}>
                  {fact.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>

      <Section id="missao" tone="sand" labelledBy="missao-title" compact>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '4fr 7fr' },
            columnGap: 6,
            rowGap: 3,
            alignItems: 'start',
          }}
        >
          <Typography id="missao-title" component="h2" variant="h2">
            Missão
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Archivo Variable", "Archivo", system-ui, sans-serif',
              fontWeight: 600,
              fontStretch: '112%',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              fontSize: typeScale.h3,
              maxWidth: '34ch',
            }}
          >
            {about.mission}
          </Typography>
        </Box>
      </Section>

      <Section labelledBy="objetivos-title">
        <Typography id="objetivos-title" component="h2" variant="h2" sx={{ maxWidth: '16ch' }}>
          Objetivos
        </Typography>
        <Typography sx={{ mt: 3, maxWidth: '52ch', color: 'text.secondary' }}>
          Os sete objetivos previstos no estatuto da associação.
        </Typography>

        <Box component="ol" role="list" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 4, md: 6 } }}>
          {about.objectives.map((objective, index) => (
            <Box
              component="li"
              key={objective}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '2rem 1fr', md: '3rem 1fr' },
                columnGap: { xs: 2, md: 4 },
                py: { xs: 3, md: 4 },
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                aria-hidden
                sx={{
                  fontSize: typeScale.small,
                  color: 'text.secondary',
                  fontVariantNumeric: 'tabular-nums',
                  pt: 0.5,
                }}
              >
                {index + 1}
              </Typography>
              <Typography sx={{ maxWidth: '62ch' }}>{objective}</Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Box
        component="section"
        aria-labelledby="quem-somos-cta"
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
              id="quem-somos-cta"
              component="h2"
              variant="h2"
              sx={{ maxWidth: '18ch', color: colors.paper }}
            >
              A ASL organiza o FISL.
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: '52ch', color: 'rgba(255, 255, 255, 0.76)' }}>
              O Fórum Internacional Software Livre é o maior evento de software livre da América
              do Sul e acontece todos os anos em Porto Alegre.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifySelf: { md: 'end' } }}
          >
            <Button component={Link} to="/atuacao" variant="contained" size="large">
              Ver atuação
            </Button>
            <Button
              component={Link}
              to="/associe-se"
              variant="outlined"
              size="large"
              sx={{
                color: colors.paper,
                borderColor: 'rgba(255, 255, 255, 0.6)',
                '&:hover': {
                  borderColor: colors.paper,
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              Associe-se
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
