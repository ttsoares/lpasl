export type Post = {
  slug: string
  title: string
  /** ISO date, formatted for display with `formatPostDate`. */
  date: string
  category: 'Editais' | 'Projetos'
  summary: string
  /** Paragraphs of the post, in order. */
  body: string[]
  /** Agenda items, rendered as a lettered list after the body. */
  agenda?: string[]
  /** Text shown after the agenda, e.g. place and date of signing. */
  closing?: string
  /** The scanned original, kept next to the retyped text. */
  scan?: { src: string; alt: string }
  link?: { href: string; label: string }
}

export const posts: Post[] = [
  {
    slug: 'edital-de-convocacao-1-2025',
    title: 'Edital de convocação 1/2025',
    date: '2025-11-03',
    category: 'Editais',
    summary:
      'Assembleia Geral Ordinária em 14 de novembro de 2025, no TECNOPUC, para deliberar sobre as contas de 2022 a 2024 e eleger a coordenação do triênio 2025–2028.',
    body: [
      'O Coordenador-geral da Associação Software Livre.Org, no uso das atribuições vinculadas que lhe confere o novo Estatuto Social, aprovado pela Ata 25, de vinte e sete de março de dois mil e dezenove, convoca todos os associados da entidade para reunirem-se em Assembleia Geral Ordinária, a realizar-se no dia 14 de novembro de 2025, no TECNOPUC – Parque Tecnológico da PUCRS, na Sala 105 – Sede da ASL.Org – Prédio 98A, localizado na Av. Ipiranga, 6681 em Porto Alegre – RS e, ao mesmo tempo, na sala virtual https://meet.jit.si/sala_ASL_Assembleia_141125 às 19h, em primeira chamada, com a presença de 2/3 (dois terços) dos associados e às 19h15min em segunda e última chamada com quórum de qualquer natureza, para deliberarem sobre a seguinte ordem do dia:',
    ],
    agenda: [
      'leitura da Ata da Assembleia anterior;',
      'leitura do parecer do Conselho Fiscal, relativo aos exercícios sociais encerrados em 31 de dezembro de 2022, em 31 de dezembro de 2023 e em 31 de dezembro de 2024;',
      'deliberação sobre a destinação do superávit dos exercícios citados, ou sobre encaminhamentos relativos a eventuais dívidas, caso haja;',
      'exame e discussão sobre o Relatório da Administração e o Relatório Financeiro, relativos ao exercício social em curso, período de 01 de janeiro a 01 de novembro de 2025;',
      'eleição da Coordenação e Conselho Fiscal da Associação Software Livre.Org para o período 2025-2028;',
      'comunicação de admissão e demissão de Associados, no período referido;',
      'avaliação de assuntos gerais e eventuais encaminhamentos pertinentes, de interesse da Associação.',
    ],
    closing: 'Porto Alegre, 03 de novembro de 2025. Sady Jacques, Associação Software Livre.Org.',
    scan: {
      src: '/posts/edital-1-2025.png',
      alt: 'Edital de convocação nº 001/2025, assinado digitalmente por Sady Jacques em 3 de novembro de 2025.',
    },
  },
  {
    slug: 'edital-de-convocacao-2-2025',
    title: 'Edital de convocação 2/2025',
    date: '2025-11-03',
    category: 'Editais',
    summary:
      'Assembleia Geral Extraordinária em 14 de novembro de 2025 para deliberar sobre a quinta alteração do Estatuto Social da ASL.',
    body: [
      'O Coordenador-geral da Associação Software Livre.Org, no uso das atribuições vinculadas que lhe confere o novo Estatuto Social, aprovado pela Ata 25, de vinte e sete de março de dois mil e dezenove, convoca todos os associados da entidade para reunirem-se em Assembleia Geral Extraordinária, a realizar-se no dia 14 de novembro de 2025, no TECNOPUC – Parque Tecnológico da PUCRS, na Sala 105 – Sede da ASL.Org – Prédio 98A, localizado na Av. Ipiranga, 6681 em Porto Alegre – RS e, ao mesmo tempo, na sala virtual https://meet.jit.si/sala_ASL_Assembleia_141125 às 20h, em primeira chamada, com a presença de 2/3 (dois terços) dos associados e às 20h15min em segunda e última chamada com quórum de qualquer natureza, para deliberarem sobre a seguinte ordem do dia:',
    ],
    agenda: ['Quinta Alteração do Estatuto Social da Associação Software Livre.Org'],
    closing: 'Porto Alegre, 03 de novembro de 2025. Sady Jacques, Associação Software Livre.Org.',
    scan: {
      src: '/posts/edital-2-2025.png',
      alt: 'Edital de convocação nº 002/2025, assinado digitalmente por Sady Jacques em 3 de novembro de 2025.',
    },
  },
  {
    slug: 'projeto-software-livre-brasil',
    title: 'Projeto Software Livre Brasil',
    date: '2022-12-05',
    category: 'Projetos',
    summary:
      'A ASL está de volta e precisa de apoio. A campanha de contribuição mensal segue aberta no Apoia.se.',
    body: [
      'Prezadas/os: a Associação Software Livre.Org está de volta. Precisamos do teu apoio livre!',
      'Para ajudar com um apoio mensal, acesse e divulgue o crowdfunding da ASL.Org no Apoia.se.',
    ],
    link: { href: 'https://apoia.se/softwarelivre', label: 'apoia.se/softwarelivre' },
  },
]

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatPostDate(isoDate: string) {
  return dateFormat.format(new Date(`${isoDate}T12:00:00`))
}

export const postsNewestFirst = [...posts].sort((a, b) => b.date.localeCompare(a.date))
