import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { useColorMode } from '../../app/color-mode'
import { site } from '../../content/site'
import { hideOnPhone } from '../../styles/phone'
import { colors } from '../../styles/tokens'

const currentYear = new Date().getFullYear()

type FooterColumnProps = {
  title: string
  /** Leave it off phones, where it repeats the menu. */
  wide?: boolean
  children: ReactNode
}

function FooterColumn({ title, wide = false, children }: FooterColumnProps) {
  return (
    <Box sx={wide ? hideOnPhone : undefined}>
      <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 600, color: colors.paper }}>
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: 2,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 0, sm: 1 },
          color: 'rgba(255, 255, 255, 0.72)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export function Footer() {
  const { mode } = useColorMode()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: mode === 'dark' ? 'background.paper' : colors.ink,
        color: colors.paper,
        borderTop: mode === 'dark' ? 1 : 0,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '2fr 1fr 1fr 1.3fr' },
            gap: { xs: 6, md: 8 },
          }}
        >
          <Box>
            <Box
              component="img"
              src="/brand/logo-lockup-paper.svg"
              alt={site.name}
              width={2056}
              height={720}
              sx={{ height: { xs: 52, md: 64 }, width: 'auto', display: 'block' }}
            />
            <Typography
              sx={{
                mt: 3,
                maxWidth: '40ch',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.6,
              }}
            >
              Associação sem fins lucrativos que promove o software livre no Brasil desde 2003.
            </Typography>
          </Box>

          <FooterColumn title="Navegue" wide>
            <li>
              <Link className="footer-link" to="/quem-somos">
                Quem somos
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/atuacao">
                Atuação
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/coordenacao">
                Coordenação
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/documentos">
                Documentos
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/noticias">
                Notícias
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Participe" wide>
            <li>
              <Link className="footer-link" to="/associe-se">
                Associe-se
              </Link>
            </li>
            <li>
              <a className="footer-link" href={`mailto:${site.emails.volunteers}`}>
                Voluntariado
              </a>
            </li>
            <li>
              <a className="footer-link" href={`mailto:${site.emails.press}`}>
                Imprensa
              </a>
            </li>
            <li>
              <Link className="footer-link" to="/contato">
                Contato
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Contato">
            <li>
              <a className="footer-link" href={`mailto:${site.emails.general}`}>
                {site.emails.general}
              </a>
            </li>
            <li>
              <a className="footer-link" href={`tel:${site.phone.href}`}>
                {site.phone.display}
              </a>
            </li>
            <li>
              <Box
                component="address"
                sx={{ fontStyle: 'normal', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.72)' }}
              >
                {site.address.street}
                <br />
                {site.address.complement}
                <br />
                {site.address.city}
                <br />
                {site.address.postalCode}
              </Box>
            </li>
          </FooterColumn>
        </Box>
      </Container>

      <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.18)' }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.64)' }}>
            © {currentYear} {site.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.64)' }}>
            Desde 2003, em Porto Alegre.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
