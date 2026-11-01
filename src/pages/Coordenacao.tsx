import { useId } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import { governance, pastTerms, type Group } from '../content/people'
import { hideOnPhone } from '../styles/phone'
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

function PeopleGroup({ group }: { group: Group }) {
  const id = useId()

  return (
    <Box component="section" aria-labelledby={id}>
      <Typography
        id={id}
        component="h3"
        sx={{ ...textRoles.itemTitle }}
      >
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
            <Typography component="dd" sx={{ m: 0, fontWeight: 500 }}>
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
          {governance.term}
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
                <PeopleGroup key={group.title} group={group} />
              ))}
            </Box>
          ))}
        </Box>
      </Section>

      {/* The archive is reference material: kept off phones. */}
      <Section tone="sand" labelledBy="historico-title" sx={hideOnPhone}>
        <Typography id="historico-title" component="h2" variant="h2">
          Gestões anteriores
        </Typography>
        <Typography sx={{ mt: 3, maxWidth: '52ch', color: 'text.secondary' }}>
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
                  justifyContent: 'space-between',
                  gap: 3,
                  py: 3,
                  cursor: 'pointer',
                  listStyle: 'none',
                  '&::-webkit-details-marker': { display: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: { xs: 2, md: 4 }, flexWrap: 'wrap' }}>
                  <Typography
                    component="span"
                    sx={{
                      ...textRoles.statement,
                    }}
                  >
                    {term.period}
                  </Typography>
                  {term.election && (
                    <Typography component="span" sx={{ ...textRoles.meta, color: 'text.secondary' }}>
                      {term.election}
                    </Typography>
                  )}
                </Box>
                <ExpandMoreIcon
                  className="term-chevron"
                  sx={{ transition: 'transform 140ms ease', flexShrink: 0, alignSelf: 'center' }}
                />
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
                  <PeopleGroup key={`${term.period}-${group.title}`} group={group} />
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
              id="coordenacao-cta"
              component="h2"
              variant="h2"
              sx={{ maxWidth: '18ch', color: colors.paper }}
            >
              As regras que valem para todos.
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: '52ch', color: 'rgba(255, 255, 255, 0.76)' }}>
              O estatuto e o regimento interno definem como a associação se organiza e como as
              decisões são tomadas.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifySelf: { md: 'end' } }}>
            <Button component={Link} to="/documentos" variant="contained" size="large">
              Ver documentos
            </Button>
            <Button
              component={Link}
              to="/contato"
              variant="outlined"
              size="large"
              sx={{
                color: colors.paper,
                borderColor: 'rgba(255, 255, 255, 0.6)',
                '&:hover': {
                  borderColor: colors.paper,
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
                ...hideOnPhone,
              }}
            >
              Falar com a coordenação
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
