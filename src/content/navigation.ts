export type NavItem = {
  label: string
  to: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

/** The desktop bar: four choices, with the institutional pages behind one menu. */
export const navEntries: (NavItem | NavGroup)[] = [
  {
    label: 'A ASL',
    items: [
      { label: 'Quem somos', to: '/quem-somos' },
      { label: 'Coordenação', to: '/coordenacao' },
      { label: 'Documentos', to: '/documentos' },
    ],
  },
  { label: 'Atuação', to: '/atuacao' },
  { label: 'Notícias', to: '/noticias' },
  { label: 'Contato', to: '/contato' },
]

/** Every page in bar order; the mobile drawer has room to list them all. */
export const navItems: NavItem[] = navEntries.flatMap((entry) =>
  'items' in entry ? entry.items : [entry],
)

export function isActivePath(pathname: string, to: string) {
  return pathname === to || (to !== '/' && pathname.startsWith(`${to}/`))
}
