import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section/Section'
import { hideOnPhone } from '../../styles/phone'
import { colors, textRoles } from '../../styles/tokens'

export function MembershipSection() {
  return (
    <Section
      tone="paper"
      compact
      labelledBy="associe-se-title"
      sx={{ bgcolor: colors.amber, color: colors.ink }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          columnGap: 6,
          rowGap: 4,
          alignItems: 'end',
        }}
      >
        <Box>
          <Typography
            id="associe-se-title"
            component="h2"
            variant="h2"
            sx={{ maxWidth: '16ch', color: colors.ink }}
          >
            A ASL é feita por pessoas.
          </Typography>
          <Typography
            sx={{
              mt: 3,
              maxWidth: '27.5em',
              ...textRoles.lead,
              color: colors.ink,
            }}
          >
            Associar-se sustenta os projetos, os eventos e a infraestrutura que mantêm o
            software livre em movimento no Brasil.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifySelf: { md: 'end' } }}>
          <Button
            component={Link}
            to="/associe-se"
            variant="contained"
            size="large"
            sx={{
              bgcolor: colors.ink,
              color: colors.paper,
              border: `2px solid ${colors.ink}`,
              '&:hover': { bgcolor: colors.graphite, borderColor: colors.graphite },
            }}
          >
            Quero me associar
          </Button>
          <Button
            component={Link}
            to="/documentos"
            variant="outlined"
            size="large"
            sx={{
              color: colors.ink,
              borderColor: colors.ink,
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)', borderColor: colors.ink },
              ...hideOnPhone,
            }}
          >
            Proposta de associado
          </Button>
        </Stack>
      </Box>
    </Section>
  )
}
