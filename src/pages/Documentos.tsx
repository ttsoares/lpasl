import { Box, Link as MuiLink, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { PageHero } from '../components/PageHero/PageHero'
import { RuledRow } from '../components/RuledRow/RuledRow'
import { Section } from '../components/Section/Section'
import { documents } from '../content/documents'

export function Documentos() {
  return (
    <>
      <PageHero
        title="Documentos"
        lead="Os textos que regem a associação e o formulário para fazer parte dela. Quem chega agora deve começar pelo Estatuto."
      />

      <Section labelledBy="docs-heading" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography
          id="docs-heading"
          variant="h2"
          sx={{ mb: 4 }}
        >
          Documentos institucionais
        </Typography>

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {documents.map((doc) => (
            <RuledRow
              key={doc.href}
              title={doc.title}
              description={doc.description}
              meta={`PDF · ${doc.size}`}
            >
              <MuiLink
                href={doc.href}
                download={doc.filename}
                underline="always"
                sx={{ display: 'inline-block', mt: 1.5, fontWeight: 600, textUnderlineOffset: 4 }}
              >
                Baixar {doc.title}
                <Box component="span" sx={visuallyHidden}>
                  {` (PDF, ${doc.size})`}
                </Box>
              </MuiLink>
            </RuledRow>
          ))}
        </Box>
      </Section>
    </>
  )
}
