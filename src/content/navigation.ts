export type NavItem = {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Quem somos', to: '/quem-somos' },
  { label: 'Atuação', to: '/atuacao' },
  { label: 'Coordenação', to: '/coordenacao' },
  { label: 'Notícias', to: '/noticias' },
  { label: 'Documentos', to: '/documentos' },
  { label: 'Contato', to: '/contato' },
]

export function isActivePath(pathname: string, to: string) {
  return pathname === to || (to !== '/' && pathname.startsWith(`${to}/`))
}
