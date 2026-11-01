import { Box, Button, Container, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { governance, pastTerms, type Group } from '../content/people'
import { visuallyHidden } from '@mui/utils'
import { colors, textRoles } from '../styles/tokens'

const currentGroups: Group[] = [
  { title: 'Coordenação', people: [...governance.coordination] },
  {
    title: 'Suplentes da coordenação',
    people: governance.coordinationSubstitutes.map((name, index) => ({
      name,
      role: `${index + 1}º suplente`,
    })),
  },
  {
    title: 'Conselho fiscal',
    people: governance.fiscalCouncil.map((name, index) => ({
      name,
      role: `Conselheiro ${index + 1}`,
    })),
  },
  {
    title: 'Suplentes do conselho fiscal',
    people: governance.fiscalSubstitutes.map((name, index) => ({
      name,
      role: `${index + 1}º suplente`,
    })),
  },
]

/** Titulares on the left, substitutes on the right, so each column reads as one list. */
const termColumns: Group[][] = [
  [currentGroups[0], currentGroups[2]],
  [currentGroups[1], currentGroups[3]],
]

/**
 * One body (coordination, council, substitutes). A plain container, not a
 * region: the page has dozens of these, and landmarks are for the few big parts.
 */
function PeopleGroup({ group, level }: { group: Group; level: 'h3' | 'h4' }) {
  return (
    <Box>
      <Typography component={level} sx={{ ...textRoles.itemTitle }}>
        {group.title}
      </Typography>

      <Box
        component="dl"
        sx={{
          m: 0,
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {group.people.map((person) => (
          <Box
            key={`${person.role}-${person.name}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr' },
              rowGap: 0.5,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-of-type': { borderBottom: 'none', pb: 0 },
            }}
          >
            <Typography component="dt" sx={{ ...textRoles.meta, color: 'text.secondary' }}>
              {person.role}
            </Typography>
            <Typography
              component="dd"
              sx={{
                m: 0,
                fontWeight: person.vacant ? 400 : 500,
                color: person.vacant ? 'text.secondary' : 'text.primary',
              }}
            >
              {person.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export function Coordenacao() {
  return (
    <>
      <PageHero
        title="Coordenação"
        lead="Quem responde pela associação: a coordenação e o conselho fiscal eleitos para o triênio 2025–2028, e as gestões anteriores."
      />

      <Section labelledBy="atual-title" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography id="atual-title" component="h2" variant="h2">
          Mandato {governance.term}
        </Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Eleita em {governance.electedOn}.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            columnGap: 8,
            rowGap: 5,
            mt: { xs: 5, md: 8 },
            alignItems: 'start',
          }}
        >
          {termColumns.map((column) => (
            <Box
              key={column[0].title}
              sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              {column.map((group) => (
                <PeopleGroup key={group.title} group={group} level="h3" />
              ))}
            </Box>
          ))}
        </Box>
      </Section>

      {/* Shown on every width: the hero lead promises it, and terms start closed. */}
      <Section tone="sand" labelledBy="historico-title">
        <Typography id="historico-title" component="h2" variant="h2">
          Gestões anteriores
        </Typography>
        <Typography sx={{ mt: 3, maxWidth: '31em', color: 'text.secondary' }}>
          A composição de cada gestão desde 2006, na ordem em que foi publicada pela associação.
        </Typography>

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          {pastTerms.map((term) => (
            <Box
              key={term.period}
              component="details"
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                '&[open] .term-chevron': { transform: 'rotate(180deg)' },
              }}
            >
              <Box
                component="summary"
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  columnGap: { xs: 2, md: 4 },
                  rowGap: 0.5,
                  py: 3,
                  cursor: 'pointer',
                  listStyle: 'none',
                  '&::-webkit-details-marker': { display: 'none' },
                }}
              >
                {/* A heading inside the summary lets screen readers jump term by term. */}
                <Typography
                  component="h3"
                  sx={{ ...textRoles.statement, display: 'inline-flex', alignItems: 'center', gap: 1 }}
                >
                  {term.period}
                  <ExpandMoreIcon
                    className="term-chevron"
                    aria-hidden
                    sx={{ transition: 'transform 140ms ease', fontSize: '1.5rem' }}
                  />
                </Typography>
                <Typography component="span" sx={{ ...textRoles.meta, color: 'text.secondary' }}>
                  {/* Keeps the period and the date apart when read aloud. */}
                  <Box component="span" sx={visuallyHidden}>
                    ,{' '}
                  </Box>
                  {term.election ?? 'Data da eleição não localizada'}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  columnGap: 8,
                  rowGap: 5,
                  pb: 6,
                }}
              >
                {term.groups.map((group) => (
                  <PeopleGroup key={`${term.period}-${group.title}`} group={group} level="h4" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

      </Section>

      <Box
        component="section"
        aria-labelledby="coordenacao-cta"
        sx={{
          // Ink in both modes: in dark mode the archive band above is graphite,
          // so graphite here would run the two together.
          bgcolor: colors.ink,
          color: colors.paper,
          borderTop: 1,
          borderColor: 'divider',
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
              id="coordenacao-cta"
              component="h2"
              variant="h2"
              sx={{ maxWidth: '18ch', color: colors.paper }}
            >
              Associados elegem quem coordena.
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: '31em', color: 'rgba(255, 255, 255, 0.76)' }}>
              A coordenação e o conselho fiscal são votados na Assembleia Geral, como definem o
              estatuto e o regimento interno. Associar-se é gratuito.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifySelf: { md: 'end' } }}>
            <Button component={Link} to="/associe-se" variant="contained" size="large">
              Associe-se (gratuito)
            </Button>
            <Button
              component={Link}
              to="/documentos"
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
              Ver documentos
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
