import { Box, Link as MuiLink, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section/Section'
import { hideOnPhone } from '../../styles/phone'
import { colors, fonts, textRoles, typeScale } from '../../styles/tokens'

// The statute's mission, split where it turns from what to how: the first
// clause carries the display type, the rest reads at lead size.
const missionHead = 'Difundir o software livre e seus princípios,'
const missionRest =
  'propiciando espaço de discussão, apoio, organização e visibilidade a modelos, sistemas, iniciativas e resultados que promovam o conhecimento compartilhado para o desenvolvimento humano.'

export function ManifestoSection() {
  return (
    <Section
      tone="ink"
      labelledBy="missao-title"
      // On phones the mission lives on Quem somos only.
      sx={{ borderTop: `1px solid rgba(255, 255, 255, 0.16)`, ...hideOnPhone }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          columnGap: 6,
          rowGap: { xs: 4, md: 0 },
        }}
      >
        <Box>
          <Typography
            id="missao-title"
            component="h2"
            sx={visuallyHidden}
          >
            Missão
          </Typography>
          <Typography component="p" sx={{ color: colors.paper }}>
            <Box
              component="span"
              sx={{
                display: 'block',
                maxWidth: '14em',
                fontFamily: fonts.display,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                fontSize: typeScale.h2,
                textWrap: 'balance',
              }}
            >
              {missionHead}
            </Box>{' '}
            <Box
              component="span"
              sx={{
                display: 'block',
                mt: 3,
                maxWidth: '30em',
                ...textRoles.lead,
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {missionRest}
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignSelf: 'end' }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.72)', maxWidth: '26.5em' }}>
            Fundada em 11 de setembro de 2003, em Porto Alegre, a ASL organizou o FISL, o maior
            evento de software livre da América do Sul, até a última edição, em 2018. Hoje
            apoia projetos ligados ao software livre, como o Cine Kafuné.
          </Typography>
          <MuiLink
            component={Link}
            to="/quem-somos"
            sx={{
              alignSelf: 'flex-start',
              color: colors.amber,
              fontWeight: 500,
              textDecorationColor: colors.amber,
            }}
          >
            Conheça a ASL
          </MuiLink>
        </Box>
      </Box>
    </Section>
  )
}
