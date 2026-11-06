export type Initiative = {
  slug: string
  name: string
  /** One or two sentences, used in the home page rows. */
  summary: string
  /** Full description, used on the Atuação page. */
  body: string[]
  since?: string
  /** Final year, for an initiative that has ended. */
  until?: string
  /** Project site, when there is one. */
  url?: string
}

/** "Desde 2005", or "2000–2018" for an initiative that has ended. */
export function initiativePeriod({ since, until }: Initiative) {
  if (!since) return undefined
  return until ? `${since}–${until}` : `Desde ${since}`
}

/** Initiatives run by ASL, from the association's own Atuação page. */
export const initiatives: Initiative[] = [
  {
    slug: 'psl-br',
    name: 'PSL.Br',
    summary:
      'O Projeto Software Livre Brasil reúne universidades, empresas, poder público, grupos de usuários e ativistas em PSLs estaduais para promover o uso e o desenvolvimento do software livre.',
    body: [
      'Iniciativa não governamental que reúne universidades, empresários, poder público, grupos de usuários, hackers, ONGs e ativistas pela liberdade do conhecimento.',
      'Mantido pela ASL e criado em 2000, o projeto está articulado em vários estados brasileiros por meio dos PSLs estaduais. O objetivo é promover o uso e o desenvolvimento do software livre como alternativa de liberdade econômica e tecnológica.',
    ],
    since: '2000',
    url: 'https://www.facebook.com/PSLBrasil/',
  },
  {
    slug: 'fisl',
    name: 'FISL',
    summary:
      'O Fórum Internacional Software Livre foi o maior evento de software livre da América do Sul: 18 edições em Porto Alegre, de 2000 a 2018, organizadas pelo PSL.Br e pela ASL.',
    body: [
      'Criado em 2000, o Fórum Internacional Software Livre tornou-se um ponto de encontro anual de pessoas de todo o Brasil e do mundo para debates técnicos e estratégicos sobre as novas tecnologias da informação.',
      'Promovido, organizado e realizado pelo Projeto Software Livre Brasil e pela ASL, foi o maior evento de software livre da América do Sul e um dos maiores do mundo. A maior edição, o FISL 10, em 2009, teve 8.232 inscritos; a última, o FISL 18, aconteceu em 2018.',
    ],
    since: '2000',
    until: '2018',
    // fisl.org.br no longer resolves; the Wikipedia article keeps the record.
    url: 'https://pt.wikipedia.org/wiki/F%C3%B3rum_Internacional_Software_Livre',
  },
  {
    slug: 'tv-software-livre',
    name: 'TV Software Livre',
    summary:
      'Transmitiu o FISL e outros eventos de software livre com ferramentas livres e de código aberto. É um dos maiores cases de transmissão ao vivo na internet.',
    body: [
      'A TVSL disponibiliza sua plataforma de ferramentas, infraestrutura e conhecimentos para a transmissão de eventos de software livre no Brasil.',
      'De 2005 a 2018 transmitiu o FISL, um dos maiores cases de transmissão ao vivo na internet com ferramentas livres e de código aberto.',
    ],
    since: '2005',
    // tv.softwarelivre.org no longer resolves, so no outbound link.
  },
  {
    slug: 'radio-software-livre',
    name: 'Rádio Software Livre',
    summary:
      'Entrou no ar em 19 de junho de 2009, numa operação conjunta entre voluntários de Porto Alegre, São Carlos e Denver. Hoje transmite eventos livres e independentes por demanda.',
    body: [
      'A Rádio Software Livre entrou no ar na madrugada de 19 de junho de 2009. Numa operação conjunta entre voluntários de Porto Alegre, São Carlos e Denver, ganhou as ondas da web.',
      'Atualmente transmite por demanda eventos livres e independentes.',
    ],
    since: '2009',
  },
  {
    slug: 'cine-kafune',
    name: 'Cine Kafuné',
    summary:
      'Ponto de Exibição Audiovisual executado pela ASL com o FERES, para ampliar o acesso das comunidades da Restinga e do Extremo Sul de Porto Alegre ao audiovisual.',
    body: [
      'Apoiado pelo Ministério da Cultura, o Ponto de Exibição Audiovisual Cine Kafuné é executado pela ASL e pelo Fórum de Educadores da Restinga e Extremo Sul de Porto Alegre (FERES).',
      'O objetivo é promover o acesso das comunidades ao audiovisual.',
    ],
    url: 'https://cinekafune.org/',
  },
]

export type Partnership = {
  name: string
  summary: string
  body: string[]
}

export const partnerships: Partnership[] = [
  {
    name: 'Banco de Sementes Livres',
    summary:
      'Apoia projetos que cultivam sementes livres de transgênicos e de pesticidas.',
    body: [
      'Tem por objetivo apoiar projetos que implementem o cultivo de sementes livres de transgênicos e de pesticidas.',
      'Em 2009, a ASL apoiou as comunidades quilombolas de Restinga Seca e Mostardas, por meio do Núcleo de Ecologia e Agriculturas Guayí, na aquisição de um engenho de arroz.',
    ],
  },
  {
    name: 'Difusão Audiovisual',
    summary:
      'Parceria com o FERES aprovada pelo Ministério da Cultura em 2006, que deu origem ao Cine Kafuné.',
    body: [
      'Projeto desenvolvido em parceria com o FERES e aprovado pelo Ministério da Cultura em 2006, para debater etnia, raça e gênero nas escolas da Restinga e do Extremo Sul de Porto Alegre.',
      'As projeções começaram itinerantes. Em 2009 o projeto foi reformulado e passou a ser coordenado pelo programa Cine Mais Cultura, do MinC, com o nome de Ponto de Exibição Audiovisual Cine Kafuné.',
    ],
  },
]
