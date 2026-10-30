import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Borb } from '../components/Borb/Borb'
import { BinaryRail } from '../components/BinaryRail/BinaryRail'
import { site } from '../content/site'
import { colors, layout, typeScale } from '../styles/tokens'
import { GovernanceSection } from '../sections/home/GovernanceSection'
import { InitiativesSection } from '../sections/home/InitiativesSection'
import { ManifestoSection } from '../sections/home/ManifestoSection'
import { MembershipSection } from '../sections/home/MembershipSection'
import { NewsSection } from '../sections/home/NewsSection'

export function Home() {
  return (
    <>
      <HomeHero />
      <InitiativesSection />
      <ManifestoSection />
      <NewsSection />
      <MembershipSection />
      <GovernanceSection />
    </>
  )
}

function HomeHero() {
  return (
    <Box
      component="section"
      aria-labelledby="home-title"
      sx={{
        display: 'flex',
        bgcolor: colors.ink,
        color: colors.paper,
        // Only shows in dark mode, where the hero would otherwise run into the page.
        borderBottom: 1,
        borderColor: 'divider',
        minHeight: { lg: 'calc(100svh - 81px)' },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            flexGrow: 1,
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            alignItems: 'center',
            columnGap: 6,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              id="home-title"
              variant="h1"
              sx={{
                color: colors.amber,
                fontSize: { xs: '2.25rem', sm: typeScale.hero },
                whiteSpace: { xs: 'normal', sm: 'pre-line' },
              }}
            >
              {site.taglineLines.join('\n')}
            </Typography>

            <Typography
              sx={{
                mt: 4,
                maxWidth: '50ch',
                color: 'rgba(255, 255, 255, 0.76)',
                fontSize: { xs: typeScale.body, md: typeScale.subhead },
                lineHeight: 1.6,
              }}
            >
              {site.hero.lead}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 6, alignItems: { sm: 'center' } }}
            >
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <Button component={Link} to="/associe-se" variant="contained" size="large">
                  Associe-se
                </Button>
                <Borb />
              </Box>
              <Button
                component={Link}
                to="/quem-somos"
                variant="outlined"
                size="large"
                sx={{
                  color: colors.paper,
                  borderColor: 'rgba(255, 255, 255, 0.72)',
                  '&:hover': {
                    color: colors.ink,
                    borderColor: colors.amber,
                    backgroundColor: colors.amber,
                  },
                }}
              >
                Conheça a ASL
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'stretch',
              justifySelf: 'end',
              gap: 3,
              width: '100%',
              maxWidth: 442,
            }}
          >
            <BinaryRail />
            <Box
              sx={{
                flex: 1,
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                aspectRatio: '1',
                bgcolor: colors.paper,
              }}
            >
              <Box
                component="img"
                src="/brand/logo-mark.svg"
                alt=""
                width={586}
                height={720}
                sx={{ display: 'block', width: 'auto', height: '62%' }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            pt: 3,
            maxWidth: layout.textWidth,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: typeScale.body }}>
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {site.hero.place}
            </Box>{' '}
            <Box component="span" sx={{ color: colors.paper, fontWeight: 500, whiteSpace: 'nowrap' }}>
              {site.hero.work}
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
