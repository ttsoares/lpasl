import { Box, Link as MuiLink, Typography } from '@mui/material'
import { PageHero } from '../components/PageHero/PageHero'
import { RuledRow } from '../components/RuledRow/RuledRow'
import { Section } from '../components/Section/Section'
import { site } from '../content/site'
import { textRoles } from '../styles/tokens'

const channels = [
  {
    title: 'Contato geral',
    description: 'Associação, parcerias, dúvidas sobre a ASL e sobre o FISL.',
    email: site.emails.general,
  },
  {
    title: 'Voluntariado',
    description: 'Quer programar, traduzir, editar vídeo ou organizar eventos com a gente.',
    email: site.emails.volunteers,
  },
  {
    title: 'Imprensa',
    description: 'Pedidos de entrevista, material de divulgação e comunicação.',
    email: site.emails.press,
  },
]

const linkSx = { fontWeight: 600, textUnderlineOffset: 4 }

export function Contato() {
  return (
    <>
      <PageHero
        title="Contato"
        lead="Escolha o endereço que corresponde ao seu assunto. Respondemos por e-mail."
      />

      <Section labelledBy="canais-heading" sx={{ pt: { xs: 8, md: 10 } }}>
        <Typography
          id="canais-heading"
          variant="h2"
          sx={{ mb: 4 }}
        >
          Por e-mail
        </Typography>

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {channels.map((channel) => (
            <RuledRow key={channel.email} title={channel.title} description={channel.description}>
              <MuiLink
                href={`mailto:${channel.email}`}
                underline="always"
                sx={{ display: 'inline-block', mt: 1.5, ...linkSx }}
              >
                {channel.email}
              </MuiLink>
            </RuledRow>
          ))}
        </Box>
      </Section>

      <Section tone="sand" labelledBy="sede-heading" compact>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            columnGap: 6,
            rowGap: 4,
          }}
        >
          <Box>
            <Typography
              id="sede-heading"
              variant="h2"
              sx={{ mb: 3 }}
            >
              Sede
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', lineHeight: 1.6 }}>
              {site.address.street}
              <br />
              {site.address.complement}
              <br />
              {site.address.city} · CEP {site.address.postalCode}
            </Box>
          </Box>

          <Box>
            <Typography component="h2" sx={{ ...textRoles.itemTitle, mb: 1 }}>
              Telefone
            </Typography>
            <MuiLink href={`tel:${site.phone.href}`} underline="always" sx={linkSx}>
              {site.phone.display}
            </MuiLink>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>
              Também atende por WhatsApp, Telegram e Signal.
            </Typography>
          </Box>
        </Box>
      </Section>
    </>
  )
}
