import { Box, Button, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Borb } from '../components/Borb/Borb'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { documents } from '../content/documents'
import { site } from '../content/site'
import { hideOnPhone } from '../styles/phone'
import { typeScale } from '../styles/tokens'

const steps = [
  'Baixe e leia o Estatuto Social para conhecer as finalidades e os deveres da associação.',
  'Preencha e assine a Proposta de Associado.',
  `Envie o formulário para ${site.emails.general}.`,
  'Sua proposta é votada na próxima Assembleia Geral, que se reúne uma vez por ano.',
]

/** What people ask before they commit: answered beside the steps, not after them. */
const facts = [
  { term: 'Custo', detail: 'Nenhum. A associação é gratuita.' },
  { term: 'Aprovação', detail: 'Na Assembleia Geral, uma vez por ano.' },
  { term: 'Participação', detail: 'Associados participam das decisões nas assembleias da ASL.' },
]

const proposal = documents.find((doc) => doc.title === 'Proposta de Associado')

const factSx = { py: 2, borderTop: '1px solid', borderColor: 'divider' }

export function AssocieSe() {
  return (
    <>
      <PageHero
        title="Associe-se"
        lead="A ASL é mantida por quem acredita que o conhecimento deve ser compartilhado. Associar-se é gratuito e é a forma de participar das decisões."
      />

      <Section labelledBy="como-heading" sx={{ pt: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            columnGap: 8,
            rowGap: 6,
            alignItems: 'start',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              id="como-heading"
              variant="h2"
              sx={{ mb: 4 }}
            >
              Como se associar
            </Typography>

            <Box component="ol" sx={{ maxWidth: '62ch', pl: 3, '& li': { mb: 2 } }}>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              {proposal && (
                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <Button
                    href={proposal.href}
                    download={proposal.filename}
                    variant="contained"
                    size="large"
                  >
                    Baixar a proposta (PDF, {proposal.size})
                  </Button>
                  <Borb />
                </Box>
              )}
              {/* Step 3 already links the address; on phones the download is the one action. */}
              <Button
                href={`mailto:${site.emails.general}`}
                variant="outlined"
                size="large"
                sx={hideOnPhone}
              >
                Enviar por e-mail
              </Button>
            </Stack>
          </Box>

          <Box component="aside" aria-labelledby="antes-heading">
            <Typography
              id="antes-heading"
              component="h3"
              sx={{ mb: 2, fontSize: typeScale.subhead, fontWeight: 600 }}
            >
              Antes de enviar
            </Typography>

            <Box component="dl" sx={{ m: 0, borderBottom: '1px solid', borderColor: 'divider' }}>
              {facts.map((fact) => (
                <Box key={fact.term} sx={factSx}>
                  <Typography component="dt" sx={{ fontWeight: 600 }}>
                    {fact.term}
                  </Typography>
                  <Typography component="dd" sx={{ m: 0, mt: 0.5, color: 'text.secondary' }}>
                    {fact.detail}
                  </Typography>
                </Box>
              ))}
              <Box sx={factSx}>
                <Typography component="dt" sx={{ fontWeight: 600 }}>
                  Dúvidas
                </Typography>
                <Typography component="dd" sx={{ m: 0, mt: 0.5 }}>
                  <MuiLink
                    href={`mailto:${site.emails.general}`}
                    underline="always"
                    sx={{ fontWeight: 600, textUnderlineOffset: 4 }}
                  >
                    {site.emails.general}
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>

      <Section tone="sand" labelledBy="apoio-heading" compact>
        <Typography
          id="apoio-heading"
          variant="h2"
          sx={{ mb: 3 }}
        >
          Prefere apoiar sem se associar?
        </Typography>
        <Typography sx={{ maxWidth: '58ch' }}>
          A campanha de contribuição mensal segue aberta no{' '}
          <MuiLink href="https://apoia.se/softwarelivre" underline="always">
            Apoia.se
          </MuiLink>
          .
        </Typography>
      </Section>
    </>
  )
}
