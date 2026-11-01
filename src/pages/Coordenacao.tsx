import { useEffect } from 'react'
import { Box, Button, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { visuallyHidden } from '@mui/utils'
import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '../components/PageHero/PageHero'
import { Section } from '../components/Section/Section'
import {
  bodyRoles,
  currentElectionRecord,
  governance,
  pastTerms,
  type Group,
} from '../content/people'
import { colors, textRoles } from '../styles/tokens'

/**
 * The other bodies of the current term, in reading order: coordination
 * substitutes, then the council and its substitutes. The coordination itself
 * is set apart above them as the page's main moment.
 */
const supportingGroups: Group[] = [
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

/**
 * Terms with no recorded election date, newest first. Said once above the
 * archive instead of in every row, so five identical lines don't read as noise.
 */
const undated = pastTerms.filter((term) => !term.election).map((term) => term.period)
const undatedNote =
  undated.length === 0
    ? null
    : undated.length === 1
      ? `O mandato ${undated[0]} não tem data de eleição nos registros publicados.`
      : `Os mandatos de ${undated[undated.length - 1]} a ${undated[0]} não têm data de eleição nos registros publicados.`

/** `2022–2025` -> `mandato-2022-2025`: a stable anchor for linking to one term. */
const termAnchor = (period: string) => `mandato-${period.replace('–', '-')}`

const linkSx = { fontWeight: 600, textUnderlineOffset: 4 }

/** Anchors for the current term's bodies, used by the phone jump links. */
const groupAnchors: Record<string, string> = {
  'Conselho fiscal': 'conselho-fiscal-atual',
}

/**
 * On phones the current term is ~2,000px of names before the archive and the
 * join action; these links let the reader skip ahead. Wide screens don't need them.
 */
const jumpLinks = [
  { label: 'Coordenação', href: '#coordenacao-atual' },
  { label: 'Conselho fiscal', href: '#conselho-fiscal-atual' },
  { label: 'Mandatos anteriores', href: '#mandatos-anteriores' },
  { label: 'Associe-se', href: '#associe-se-coordenacao' },
]

/**
 * One body (coordination, council, substitutes). A plain container, not a
 * region: the page has dozens of these, and landmarks are for the few big parts.
 */
function PeopleGroup({
  group,
  level,
  describe = false,
  id,
  subgrid = false,
}: {
  group: Group
  level: 'h3' | 'h4'
  /** Show what the body does, under its title (current term only). */
  describe?: boolean
  /** Anchor for the in-page jump links. */
  id?: string
  /** Share the parent grid's rows, so titles, descriptions and lists line up across columns. */
  subgrid?: boolean
}) {
  const role = describe ? bodyRoles[group.title] : undefined

  return (
    <Box
      id={id}
      sx={{
        scrollMarginTop: 96,
        ...(subgrid && {
          display: { md: 'grid' },
          gridRow: { md: 'span 3' },
          gridTemplateRows: { md: 'subgrid' },
          alignContent: 'start',
        }),
      }}
    >
      <Typography component={level} sx={{ ...textRoles.itemTitle }}>
        {group.title}
      </Typography>
      {role && (
        <Typography sx={{ ...textRoles.prose, mt: 1, color: 'text.secondary' }}>
          {role}
        </Typography>
      )}

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

/**
 * The elected coordination, set as the page's one strong moment: names in the
 * display face, like the term periods. On wide screens the three executive
 * posts share the first row and the four area posts the second, so the grid
 * itself shows how the body is built (art. 20).
 */
function CoordinationPeak() {
  return (
    <Box id="coordenacao-atual" sx={{ scrollMarginTop: 96 }}>
      <Typography component="h3" sx={{ ...textRoles.itemTitle }}>
        Coordenação
      </Typography>
      <Typography sx={{ ...textRoles.prose, mt: 1, color: 'text.secondary' }}>
        {bodyRoles['Coordenação']}
      </Typography>

      <Box
        component="dl"
        sx={{
          m: 0,
          mt: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' },
          columnGap: 4,
          rowGap: { xs: 4, md: 6 },
        }}
      >
        {governance.coordination.map((person, index) => (
          <Box
            key={person.role}
            sx={{
              gridColumn: { md: index < 3 ? 'span 4' : 'span 3' },
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'text.primary',
            }}
          >
            <Typography component="dt" sx={{ ...textRoles.meta, color: 'text.secondary' }}>
              {person.role}
            </Typography>
            <Typography component="dd" sx={{ ...textRoles.statement, m: 0, mt: 1 }}>
              {person.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export function Coordenacao() {
  const { hash } = useLocation()

  // A link to one term (#mandato-2010-2012) opens it, so the reader lands on names.
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target instanceof HTMLDetailsElement) target.open = true
  }, [hash])

  return (
    <>
      <PageHero
        title="Coordenação"
        lead="Quem responde pela associação: a coordenação e o conselho fiscal eleitos para o mandato 2025–2028, e os mandatos anteriores."
      />

      <Section labelledBy="atual-title" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography id="atual-title" component="h2" variant="h2">
          Mandato {governance.term}
        </Typography>
        <Typography sx={{ ...textRoles.prose, mt: 2, color: 'text.secondary' }}>
          Eleitos em {governance.electedOn}, na Assembleia Geral convocada pelo{' '}
          <MuiLink component={Link} to={currentElectionRecord.href} underline="always" sx={linkSx}>
            {currentElectionRecord.label}
          </MuiLink>
          . Os cargos não são remunerados (Estatuto, art. 16, §1º).
        </Typography>

        <Box
          component="nav"
          aria-label="Nesta página"
          sx={{ display: { xs: 'block', md: 'none' }, mt: 4 }}
        >
          <Box
            component="ul"
            sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', columnGap: 3 }}
          >
            {jumpLinks.map((link) => (
              <li key={link.href}>
                <MuiLink
                  href={link.href}
                  underline="always"
                  sx={{ ...linkSx, display: 'inline-flex', alignItems: 'center', minHeight: 44 }}
                >
                  {link.label}
                </MuiLink>
              </li>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          <CoordinationPeak />
        </Box>

        {/* The quieter bodies: a denser row, so the coordination above reads as the peak. */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            columnGap: 6,
            // Rows belong to the subgrid on wide screens, so no gap between them there.
            rowGap: { xs: 5, md: 0 },
            mt: { xs: 8, md: 12 },
          }}
        >
          {supportingGroups.map((group) => (
            <PeopleGroup
              key={group.title}
              group={group}
              level="h3"
              describe
              subgrid
              id={groupAnchors[group.title]}
            />
          ))}
        </Box>
      </Section>

      {/* Shown on every width: the hero lead promises it, and terms start closed. */}
      <Section id="mandatos-anteriores" tone="sand" labelledBy="historico-title" sx={{ scrollMarginTop: 64 }}>
        <Typography id="historico-title" component="h2" variant="h2">
          Mandatos anteriores
        </Typography>
        <Typography sx={{ ...textRoles.prose, mt: 3, color: 'text.secondary' }}>
          A composição de cada mandato desde 2006, do mais recente para o mais antigo, como a
          associação a publicou no seu site anterior. Até o mandato 2019–2021 havia também um
          conselho geral, órgão que o Estatuto de 2019 não prevê. Encontrou um erro ou tem a ata de uma eleição?{' '}
          <MuiLink component={Link} to="/contato" underline="always" sx={linkSx}>
            Fale com a associação
          </MuiLink>
          .
        </Typography>
        {undatedNote && (
          <Typography sx={{ ...textRoles.meta, mt: 2, color: 'text.secondary' }}>
            {undatedNote}
          </Typography>
        )}

        <Box sx={{ mt: { xs: 5, md: 8 } }}>
          {pastTerms.map((term) => (
            <Box
              key={term.period}
              id={termAnchor(term.period)}
              component="details"
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                scrollMarginTop: 96,
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
                  {/* Fixed box: the glyph's width no longer nudges the date beside it. */}
                  <Box
                    component="span"
                    aria-hidden
                    sx={{ display: 'inline-flex', width: 24, height: 24, flexShrink: 0 }}
                  >
                    <ExpandMoreIcon
                      className="term-chevron"
                      sx={{ transition: 'transform 140ms ease', fontSize: 24 }}
                    />
                  </Box>
                </Typography>
                <Typography component="span" sx={{ ...textRoles.meta, color: 'text.secondary' }}>
                  {/* Keeps the period and the date apart when read aloud. */}
                  <Box component="span" sx={visuallyHidden}>
                    ,{' '}
                  </Box>
                  {/* Undated rows stay visually empty: the archive note says why once. */}
                  {term.election ?? (
                    <Box component="span" sx={visuallyHidden}>
                      data da eleição não consta nos registros publicados
                    </Box>
                  )}
                </Typography>
              </Box>

              {term.record && (
                <Typography sx={{ ...textRoles.meta, mt: -1, mb: 3 }}>
                  <MuiLink component={Link} to={term.record.href} underline="always" sx={linkSx}>
                    {term.record.label}
                  </MuiLink>
                </Typography>
              )}

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
        id="associe-se-coordenacao"
        aria-labelledby="coordenacao-cta"
        sx={{
          scrollMarginTop: 64,
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
              A Assembleia Geral elege a coordenação e o conselho fiscal (Estatuto, art. 19).
              Associar-se é gratuito.
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
