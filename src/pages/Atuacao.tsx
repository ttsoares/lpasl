import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section/Section'
import { initiatives, partnerships, type Initiative } from '../content/initiatives'
import { site } from '../content/site'
import { hideOnPhone } from '../styles/phone'
import { colors, textRoles } from '../styles/tokens'
import {
  AtuacaoHero,
  FislAct,
  KafuneAct,
  PslAct,
  RadioAct,
  TvAct,
} from '../sections/atuacao/Acts'
import '../sections/atuacao/atuacao.css'

/** Each initiative gets its own scroll device; see sections/atuacao. */
const acts: Record<string, (props: { initiative: Initiative }) => React.JSX.Element> = {
  'psl-br': PslAct,
  fisl: FislAct,
  'tv-software-livre': TvAct,
  'radio-software-livre': RadioAct,
  'cine-kafune': KafuneAct,
}

export function Atuacao() {
  return (
    <>
      <div className="atu">
        <AtuacaoHero lead="Cinco iniciativas e duas parcerias institucionais que levam o software livre da discussão para a prática." />

        <section aria-label="Iniciativas">
          {initiatives.map((initiative) => {
            const Act = acts[initiative.slug]
            return Act ? <Act key={initiative.slug} initiative={initiative} /> : null
          })}
        </section>
      </div>

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
                  sx={{ ...textRoles.itemTitle }}
                >
                  {partnership.name}
                </Typography>
                {partnership.body.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 24)}
                    sx={{ ...textRoles.prose, mt: 2 }}
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
                maxWidth: '27.5em',
                ...textRoles.lead,
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
