import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ColorModeProvider } from './app/ColorModeProvider'
import { useColorMode } from './app/color-mode'
import { LegacyRedirects } from './app/LegacyRedirects'
import { ScrollToTop } from './app/ScrollToTop'
import { SiteLayout } from './layouts/SiteLayout'
import { AssocieSe } from './pages/AssocieSe'
import { Atuacao } from './pages/Atuacao'
import { Contato } from './pages/Contato'
import { Coordenacao } from './pages/Coordenacao'
import { Documentos } from './pages/Documentos'
import { Home } from './pages/Home'
import { Noticia } from './pages/Noticia'
import { Noticias } from './pages/Noticias'
import { NotFound } from './pages/NotFound'
import { QuemSomos } from './pages/QuemSomos'
import redirects from './content/redirects.json'
import { getTheme } from './theme'

function ThemedApp() {
  const { mode } = useColorMode()
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <LegacyRedirects />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="quem-somos" element={<QuemSomos />} />
            <Route path="atuacao" element={<Atuacao />} />
            <Route path="coordenacao" element={<Coordenacao />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="noticias/:slug" element={<Noticia />} />
            <Route path="documentos" element={<Documentos />} />
            <Route path="contato" element={<Contato />} />
            <Route path="associe-se" element={<AssocieSe />} />
            {redirects.paths
              .filter(({ from }) => !from.startsWith('/wp-content'))
              .map(({ from, to }) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  )
}
