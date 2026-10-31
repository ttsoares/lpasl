import { Box, Button, Container, Stack, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { BinaryRail } from '../components/BinaryRail/BinaryRail'
import { FlyingBorb } from '../components/FlyingBorb/FlyingBorb'
import { site } from '../content/site'
import { hideOnPhone } from '../styles/phone'
import { colors, layout, sky, typeScale } from '../styles/tokens'
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

const skyFade = [
  'transparent',
  'rgb(0 0 0 / 0.2) 5%',
  'rgb(0 0 0 / 0.55) 11%',
  'rgb(0 0 0 / 0.85) 17%',
  '#000 23%',
  '#000 77%',
  'rgb(0 0 0 / 0.85) 83%',
  'rgb(0 0 0 / 0.55) 89%',
  'rgb(0 0 0 / 0.2) 95%',
  'transparent',
].join(', ')

// Tablets and up, in either orientation. Phones fail one side or the other
// (narrow upright, short on their side), so they never fetch three.js.
const skyScreen = '(min-width: 600px) and (min-height: 600px)'

function HomeHero() {
  const showSky = useMediaQuery(skyScreen)

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
        // The sky square bleeds past the container; never let it scroll the page.
        overflowX: 'clip',
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
              <Button component={Link} to="/associe-se" variant="contained" size="large">
                Associe-se
              </Button>
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
                  ...hideOnPhone,
                }}
              >
                Conheça a ASL
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'none',
              [`@media ${skyScreen}`]: { display: 'flex' },
              alignItems: 'stretch',
              // Below md the grid is one column, so this lands under the
              // buttons as a banner.
              mt: { sm: 8, md: 0 },
              gap: { sm: 3, md: 4, lg: 6 },
              // Bleed out of the column: left into the gap beside the text (or
              // the gutter, as a banner), and right into the page margin, up
              // to 96px or as much as it has (never less than the 24px gutter).
              ml: -3,
              mr: `calc(-1 * min(96px, max(24px, (100vw - ${layout.maxWidth}px) / 2 + 24px)))`,
            }}
          >
            <BinaryRail />
            <Box
              sx={{
                flex: 1,
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                aspectRatio: { sm: '16 / 7', md: '1' },
                background: `linear-gradient(${sky.top}, ${sky.bottom})`,
                // Feather all four edges into the hero's black. The eased stops
                // avoid the visible seam a straight ramp leaves.
                maskImage: ['to right', 'to bottom']
                  .map((dir) => `linear-gradient(${dir}, ${skyFade})`)
                  .join(', '),
                maskComposite: 'intersect',
              }}
            >
              {showSky && <FlyingBorb />}
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
