import { Box } from '@mui/material'
import { RuledRow } from '../../components/RuledRow/RuledRow'
import { Section } from '../../components/Section/Section'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { initiatives } from '../../content/initiatives'

export function InitiativesSection() {
  return (
    <Section tone="paper" labelledBy="iniciativas-title">
      <SectionHeading
        id="iniciativas-title"
        title="O que fazemos"
        lead="Projetos que mantêm o software livre em circulação: eventos, transmissão, formação e cultura."
        action={{ label: 'Ver todos os projetos', to: '/atuacao' }}
      />

      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 4, md: 6 } }}>
        {initiatives.map((initiative) => (
          <RuledRow
            key={initiative.slug}
            title={initiative.name}
            description={initiative.summary}
            meta={initiative.since ? `Desde ${initiative.since}` : undefined}
            to={`/atuacao#${initiative.slug}`}
            brief
          />
        ))}
      </Box>
    </Section>
  )
}
