import { Box, Button, Link as MuiLink, Stack, Typography } from '@mui/material'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { documents } from '../content/documents'
import { site } from '../content/site'

const steps = [
  'Baixe e leia o Estatuto Social para conhecer as finalidades e os deveres da associação.',
  'Preencha e assine a Proposta de Associado.',
  `Envie o formulário para ${site.emails.general}. A proposta segue o rito previsto no Estatuto.`,
]

const proposal = documents.find((doc) => doc.title === 'Proposta de Associado')

export function AssocieSe() {
  return (
    <>
      <PageHero
        title="Associe-se"
        lead="A ASL é mantida por quem acredita que o conhecimento deve ser compartilhado. Associar-se é a forma de participar das decisões."
      />

      <Section labelledBy="como-heading" sx={{ pt: { xs: 8, md: 10 } }}>
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
            <Button
              href={proposal.href}
              download={proposal.filename}
              variant="contained"
              size="large"
            >
              Baixar a proposta (PDF, {proposal.size})
            </Button>
          )}
          <Button href={`mailto:${site.emails.general}`} variant="outlined" size="large">
            Enviar por e-mail
          </Button>
        </Stack>
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
