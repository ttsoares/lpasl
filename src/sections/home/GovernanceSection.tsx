import { Box, Typography } from '@mui/material'
import { Section } from '../../components/Section/Section'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { governance } from '../../content/people'
import { hideOnPhone } from '../../styles/phone'
import { textRoles } from '../../styles/tokens'

export function GovernanceSection() {
  return (
    // On phones the band keeps its title, election date and link; the names
    // live on Coordenação only.
    <Section tone="sand" labelledBy="coordenacao-title">
      <SectionHeading
        id="coordenacao-title"
        title={
          <>
            Coordenação{' '}
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {governance.term}
            </Box>
          </>
        }
        lead={`Eleitos em ${governance.electedOn}.`}
        action={{ label: 'Ver coordenação e conselho', to: '/coordenacao' }}
      />

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          mt: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          columnGap: 4,
          rowGap: 4,
          ...hideOnPhone,
        }}
      >
        {governance.coordination.map((person) => (
          <Box component="li" key={person.name}>
            <Typography sx={{ ...textRoles.meta, color: 'text.secondary' }}>
              {person.role}
            </Typography>
            <Typography sx={{ mt: 1, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {person.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          mt: { xs: 4, md: 6 },
          pt: 3,
          maxWidth: textRoles.prose.maxWidth,
          borderTop: '1px solid',
          borderColor: 'divider',
          ...textRoles.meta,
          color: 'text.secondary',
          ...hideOnPhone,
        }}
      >
        Conselho fiscal com três titulares e três suplentes. A composição das gestões anteriores
        está na página de coordenação.
      </Typography>
    </Section>
  )
}
