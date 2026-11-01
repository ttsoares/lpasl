import { Box, Button, Link as MuiLink, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Borb } from '../components/Borb/Borb'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { documents } from '../content/documents'
import { site } from '../content/site'
import { hideOnPhone } from '../styles/phone'
import { textRoles } from '../styles/tokens'

const statute = documents.find((doc) => doc.title === 'Estatuto Social')
const proposal = documents.find((doc) => doc.title === 'Proposta de Associado')

/** Opens the visitor's mail app with the subject ASL sorts proposals by. */
const proposalMailto = `mailto:${site.emails.general}?subject=${encodeURIComponent('Proposta de associado')}`

const linkSx = { fontWeight: 600, textUnderlineOffset: 4 }

/** Every step names the thing it needs and links to it, so no step is a dead end. */
const steps: { key: string; content: ReactNode }[] = [
  {
    key: 'estatuto',
    content: (
      <>
        Leia o{' '}
        {statute ? (
          <MuiLink href={statute.href} underline="always" sx={linkSx}>
            Estatuto Social (PDF, {statute.size})
          </MuiLink>
        ) : (
          'Estatuto Social'
        )}{' '}
        para conhecer as finalidades e os deveres da associação.
      </>
    ),
  },
  {
    key: 'proposta',
    content: (
      <>
        Baixe, preencha e assine a{' '}
        {proposal ? (
          <MuiLink href={proposal.href} download={proposal.filename} underline="always" sx={linkSx}>
            Proposta de Associado
          </MuiLink>
        ) : (
          'Proposta de Associado'
        )}
        .
      </>
    ),
  },
  {
    key: 'envio',
    content: (
      <>
        Envie a proposta assinada para{' '}
        <MuiLink href={proposalMailto} underline="always" sx={linkSx}>
          {site.emails.general}
        </MuiLink>
        .
      </>
    ),
  },
  {
    key: 'assembleia',
    content: (
      <>
        A proposta é votada na Assembleia Geral, que se reúne uma vez por ano. A convocação sai
        em{' '}
        <MuiLink component={Link} to="/noticias" underline="always" sx={linkSx}>
          Notícias
        </MuiLink>
        , como edital.
      </>
    ),
  },
]

/** What people ask before they commit: answered beside the steps, not after them. */
const facts = [
  { term: 'Custo', detail: 'Nenhum. A associação é gratuita.' },
  { term: 'Aprovação', detail: 'Na Assembleia Geral, uma vez por ano.' },
  { term: 'Participação', detail: 'Associados participam das decisões nas assembleias da ASL.' },
  // Draft, pending ASL's approval of the wording (LGPD); tracked in TODO.md.
  { term: 'Seus dados', detail: 'Usados apenas para analisar a sua proposta de associação.' },
]

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

            <Box component="ol" sx={{ maxWidth: textRoles.prose.maxWidth, pl: 3, '& li': { ...textRoles.prose, mb: 2 } }}>
              {steps.map((step) => (
                <li key={step.key}>{step.content}</li>
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
              {/* Step 3 links the address too; on phones the download is the one action. */}
              <Button
                href={proposalMailto}
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
              sx={{ ...textRoles.itemTitle, mb: 2 }}
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
                  <MuiLink href={`mailto:${site.emails.general}`} underline="always" sx={linkSx}>
                    {site.emails.general}
                  </MuiLink>
                </Typography>
              </Box>
              {/* Support without joining stays one quiet line here, so the page ends on joining. */}
              <Box sx={factSx}>
                <Typography component="dt" sx={{ fontWeight: 600 }}>
                  Apoiar sem se associar
                </Typography>
                <Typography component="dd" sx={{ m: 0, mt: 0.5, color: 'text.secondary' }}>
                  Contribuição mensal no{' '}
                  <MuiLink href="https://apoia.se/softwarelivre" underline="always" sx={linkSx}>
                    Apoia.se
                  </MuiLink>
                  .
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>

    </>
  )
}
