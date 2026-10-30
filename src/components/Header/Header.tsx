import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import { useColorMode } from '../../app/color-mode'
import { Rise } from '../Rise/Rise'
import { BrandLockup } from '../Brand/BrandLockup'
import { isActivePath, navEntries, navItems, type NavGroup } from '../../content/navigation'
import { site } from '../../content/site'
import { motion, typeScale } from '../../styles/tokens'

export function Header() {
  const { mode, toggleMode } = useColorMode()
  const { pathname } = useLocation()
  const [menuState, setMenuState] = useState({ open: false, path: pathname })
  const menuOpen = menuState.open && menuState.path === pathname

  const modeLabel = mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'

  const openMenu = () => setMenuState({ open: true, path: pathname })
  const closeMenu = () => setMenuState({ open: false, path: pathname })

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 64, md: 80 }, gap: { xs: 0.5, md: 1 } }}
        >
          <Link
            to="/"
            aria-label={`${site.name} — página inicial`}
            style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}
          >
            <BrandLockup height={40} />
          </Link>

          <Box
            component="nav"
            aria-label="Navegação principal"
            sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}
          >
            {navEntries.map((entry, index) =>
              'items' in entry ? (
                <NavGroupMenu key={entry.label} group={entry} pathname={pathname} delay={index * 55} />
              ) : (
                <Button
                  key={entry.to}
                  component={Link}
                  to={entry.to}
                  aria-current={isActivePath(pathname, entry.to) ? 'page' : undefined}
                  disableRipple
                  sx={navLinkSx(isActivePath(pathname, entry.to))}
                >
                  <Rise delay={index * 55}>{entry.label}</Rise>
                </Button>
              ),
            )}
          </Box>

          <Tooltip title={modeLabel}>
            <IconButton
              onClick={toggleMode}
              aria-label={modeLabel}
              sx={{ ml: { xs: 0, md: 1 }, color: 'text.primary' }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Button
            component={Link}
            to="/associe-se"
            variant="contained"
            size="small"
            sx={{ ml: { xs: 0.5, sm: 1 }, whiteSpace: 'nowrap' }}
          >
            <Rise delay={navEntries.length * 55}>Associe-se</Rise>
          </Button>

          <IconButton
            onClick={openMenu}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            sx={{ display: { xs: 'inline-flex', lg: 'none' }, ml: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={closeMenu}
        slotProps={{
          paper: {
            'aria-label': 'Menu de navegação',
            elevation: 0,
            sx: {
              width: '100%',
              maxWidth: { sm: 420 },
              bgcolor: 'background.default',
              backgroundImage: 'none',
              borderLeft: 1,
              borderColor: 'divider',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 64,
              pl: 3,
              pr: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <BrandLockup height={36} />
            <IconButton autoFocus onClick={closeMenu} aria-label="Fechar menu">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="nav"
            id="menu-principal"
            aria-label="Menu principal"
            sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 2 }}
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.to)
              return (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1,
                    minHeight: 48,
                    fontSize: typeScale.subhead,
                    color: 'text.primary',
                    borderLeft: '3px solid',
                    borderColor: active ? 'primary.main' : 'transparent',
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>

          <Box sx={{ mt: 'auto', p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button
              component={Link}
              to="/associe-se"
              onClick={closeMenu}
              variant="contained"
              size="large"
              fullWidth
            >
              Associe-se
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {site.emails.general}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}

/**
 * Desktop bar link: the amber underline grows on hover and stays on the active
 * page. Bar buttons skip the ripple; the underline and focus outline are their feedback.
 */
function navLinkSx(active: boolean) {
  return {
    position: 'relative',
    px: 1,
    py: 1,
    flexShrink: 0,
    color: 'text.primary',
    fontSize: '1rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 8,
      bottom: 4,
      left: 8,
      height: 2,
      bgcolor: 'primary.main',
      transform: active ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${motion.fast} ${motion.ease}`,
    },
    '&:hover': {
      bgcolor: 'transparent',
      '&::after': { transform: 'scaleX(1)' },
    },
  } as const
}

type NavGroupMenuProps = {
  group: NavGroup
  pathname: string
  delay: number
}

/** A bar entry that opens its pages in a menu; underlined while one of them is open. */
function NavGroupMenu({ group, pathname, delay }: NavGroupMenuProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const active = group.items.some((item) => isActivePath(pathname, item.to))
  const menuId = `menu-${group.label.toLowerCase().replace(/\W+/g, '-')}`

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={anchor ? 'true' : undefined}
        aria-controls={anchor ? menuId : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        endIcon={<ExpandMoreIcon sx={{ ml: -0.5 }} />}
        disableRipple
        sx={navLinkSx(active)}
      >
        <Rise delay={delay}>{group.label}</Rise>
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { mt: 1, minWidth: 200, border: 1, borderColor: 'divider', borderRadius: 0 },
          },
        }}
      >
        {group.items.map((item) => {
          const current = isActivePath(pathname, item.to)
          return (
            <MenuItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => setAnchor(null)}
              aria-current={current ? 'page' : undefined}
              selected={current}
              sx={{ minHeight: 44, fontWeight: current ? 600 : 400 }}
            >
              {item.label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
