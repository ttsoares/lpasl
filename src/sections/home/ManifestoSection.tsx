import { Box, Link as MuiLink, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section/Section'
import { colors } from '../../styles/tokens'

const mission =
  'Difundir o software livre e seus princípios, propiciando espaço de discussão, apoio, organização e visibilidade a modelos, sistemas, iniciativas e resultados que promovam o conhecimento compartilhado para o desenvolvimento humano.'

export function ManifestoSection() {
  return (
    <Section
      tone="ink"
      labelledBy="missao-title"
      sx={{ borderTop: `1px solid rgba(255, 255, 255, 0.16)` }}
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
          <Typography
            component="p"
            sx={{
              maxWidth: '38ch',
              color: colors.paper,
              fontFamily: '"Archivo Variable", "Archivo", system-ui, sans-serif',
              fontWeight: 700,
              fontStretch: '100%',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
            }}
          >
            {mission}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignSelf: 'end' }}>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.72)', maxWidth: '44ch' }}>
            Fundada em 11 de setembro de 2003, em Porto Alegre, a ASL organiza o FISL — o maior
            evento de software livre da América do Sul — e mantém projetos de transmissão,
            formação e cultura livre.
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
