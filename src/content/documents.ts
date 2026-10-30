export type SiteDocument = {
  title: string
  description: string
  href: string
  /** Size shown next to the link; update when the file changes. */
  size: string
  /** Name the browser saves the file under. */
  filename: string
}

/** In reading order: the person who wants to join starts with the proposal. */
export const documents: SiteDocument[] = [
  {
    title: 'Estatuto Social',
    description:
      'Quarta alteração e consolidação do Estatuto (2019): finalidades, associados, órgãos e como a ASL se organiza e decide.',
    href: '/docs/asl-estatuto-final-2019-07.pdf',
    size: '67 KB',
    filename: 'ASL-Estatuto-Social.pdf',
  },
  {
    title: 'Regimento Interno',
    description:
      'Detalha a organização da associação e complementa o Estatuto: assembleia, conselho fiscal, coordenação e funcionamento.',
    href: '/docs/asl-regimento-interno-2019-07.pdf',
    size: '64 KB',
    filename: 'ASL-Regimento-Interno.pdf',
  },
  {
    title: 'Proposta de Associado',
    description:
      'Formulário para quem quer se associar. Preencha, assine e envie para a ASL.',
    href: '/docs/proposta-associado.pdf',
    size: '295 KB',
    filename: 'ASL-Proposta-de-Associado.pdf',
  },
]
