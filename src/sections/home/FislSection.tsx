import { Box, Typography } from '@mui/material'
import { Section } from '../../components/Section/Section'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { initiatives } from '../../content/initiatives'
import { textRoles } from '../../styles/tokens'

const fisl = initiatives.find((initiative) => initiative.slug === 'fisl')

/**
 * The home page's proof: one documentary frame from FISL, placed before the
 * call to join. Its words come from the FISL entry in initiatives.ts, so the
 * section makes no claim the Atuação page does not already make.
 */
export function FislSection() {
  if (!fisl) return null

  return (
    <Section tone="paper" labelledBy="fisl-title">
      <SectionHeading
        id="fisl-title"
        title="O maior evento de software livre da América do Sul"
        lead={fisl.body[0]}
        action={{ label: 'Ver o FISL na Atuação', to: '/atuacao#fisl' }}
      />

      <Box component="figure" sx={{ m: 0, mt: { xs: 4, md: 6 }, maxWidth: 654 }}>
        <Box
          component="img"
          // A frame of the 2009 broadcast; 654px is its native width, so the
          // figure never scales it up.
          src="/media/atuacao/tv-fisl10-poster.webp"
          alt="Luiz Inácio Lula da Silva discursa no púlpito do FISL 10, com a placa amarela do evento à frente."
          width={654}
          height={480}
          loading="lazy"
          decoding="async"
          sx={{ display: 'block', width: '100%', height: 'auto' }}
        />
        <Typography
          component="figcaption"
          sx={{ ...textRoles.meta, mt: 2, color: 'text.secondary' }}
        >
          FISL 10, Porto Alegre, 2009: Luiz Inácio Lula da Silva, então presidente da República.
          Imagem da TV Software Livre.
        </Typography>
      </Box>
    </Section>
  )
}
