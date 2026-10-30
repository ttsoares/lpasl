import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'

export function SiteLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Box
        component="main"
        id="conteudo"
        tabIndex={-1}
        sx={{ flexGrow: 1, '&:focus': { outline: 'none' } }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
