export type Person = {
  name: string
  role: string
  /** A seat the record lists with no one in it. */
  vacant?: boolean
}

/** Coordination and fiscal council elected on 14 November 2025, for 2025–2028. */
export const governance = {
  term: '2025–2028',
  electedOn: '14 de novembro de 2025',
  coordination: [
    { name: 'Sady Jacques', role: 'Coordenação geral' },
    { name: 'Ricardo Fritsch', role: 'Coordenação adjunta' },
    { name: 'Gabriel Peixoto de Oliveira', role: 'Coordenação financeira' },
    { name: 'Fabrício Reis da Silva', role: 'Coordenação de área 1' },
    { name: 'Tiago Canal Jacques', role: 'Coordenação de área 2' },
    { name: 'Cláudia Maria da Costa Archer', role: 'Coordenação de área 3' },
    { name: 'Carlos Alberto Jacques de Castro', role: 'Coordenação de área 4' },
  ] satisfies Person[],
  coordinationSubstitutes: [
    'Lucas Alberto Souza de Santos',
    'Marcelo Rosauro Zasso',
    'Ana Cristina Fricke Matte',
  ],
  fiscalCouncil: [
    'Thomas Tschoepke Soares',
    'Júnior Goergen',
    'Thiago da Costa Boeira',
  ],
  fiscalSubstitutes: [
    'José Antônio Dias Tavares',
    'Luciano Flores da Fonseca',
    'Alessandra Maria Bohm',
  ],
} as const

export type Group = {
  title: string
  people: Person[]
}

export type PastTerm = {
  period: string
  election?: string
  groups: Group[]
}

const coordination = (
  general: string,
  deputy: string,
  finance: string,
  areas: string[] = [],
): Group => ({
  title: 'Coordenação',
  people: [
    { name: general, role: 'Coordenação geral' },
    { name: deputy, role: 'Coordenação adjunta' },
    { name: finance, role: 'Coordenação financeira' },
    ...areas.map((name, index) => ({
      name,
      role: `Coordenação de área ${index + 1}`,
    })),
  ],
})

/** Seats keep their published position; an empty one is shown, not dropped. */
const seats = (names: (string | null)[], role: (position: number) => string): Person[] =>
  names.map((name, index) =>
    name
      ? { name, role: role(index + 1) }
      : { name: 'Vaga não preenchida', role: role(index + 1), vacant: true },
  )

const substitutes = (names: (string | null)[], title: string): Group => ({
  title,
  people: seats(names, (position) => `${position}º suplente`),
})

const council = (title: string, names: (string | null)[]): Group => ({
  title,
  people: seats(names, (position) => `Conselheiro ${position}`),
})

/** Terms before 2025–2028, most recent first, as published by the association. */
export const pastTerms: PastTerm[] = [
  {
    period: '2022–2025',
    election: 'Eleita em 22 de outubro de 2022',
    groups: [
      coordination(
        'Sady Jacques',
        'Ricardo Fritsch',
        'Gabriel Peixoto de Oliveira',
        [
          'Clarisse de Lima Abrahão',
          'Augusto Cezar Machado dos Santos',
          'Cláudia Maria da Costa Archer',
          'Carlos Alberto Jacques de Castro',
        ],
      ),
      substitutes(
        ['Thiago da Costa Boeira', 'Luciano Flores da Fonseca', 'Ana Cristina Fricke Matte'],
        'Suplentes da coordenação',
      ),
      council('Conselho fiscal', [
        'Thomas Tschoepke Soares',
        'Júnior Goergen',
        'Lucas Alberto Souza de Santos',
      ]),
      substitutes(
        ['José Antônio Dias Tavares', 'Paulo Albert Ressadori', 'Alessandra Maria Bohm'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2019–2021',
    election: 'Eleita em 15 de dezembro de 2018',
    groups: [
      coordination('Fabrício Reis da Silva', 'Daniel Muller', 'Sady Jacques'),
      council('Conselho geral', ['Ricardo Fritsch', 'Carlos Alberto Jacques de Castro', 'José Francisco Nunes Fernandez', 'Clarisse de Lima Abrahão']),
      substitutes([null, 'Cláudia Maria da Costa Archer', 'Paulo Roberto Miranda Meirelles'], 'Suplentes do conselho geral'),
      council('Conselho fiscal', [
        'Thomas Tschoepke Soares',
        'Júnior Goergen',
        'Flávio Eduardo Neves Teixeira',
      ]),
      substitutes(
        ['Tânia Regina da Silva', 'José Antônio Dias Tavares', 'Alexandre Junqueira Thomé'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2016–2018',
    election: 'Eleita em 14 de dezembro de 2016',
    groups: [
      coordination('Sady Jacques', 'Ricardo Fritsch', 'Clarisse de Lima Abrahão'),
      council('Conselho geral', [
        'José Francisco Nunes Fernandez',
        'Eloir José Rockenbach',
        'Daniel Muller',
        'Deobrandino Ninrod Borges',
      ]),
      substitutes(['Tatiane Pires da Silva', 'Carlos Alberto Jacques de Castro', 'Paulo Roberto Miranda Meirelles'], 'Suplentes do conselho geral'),
      council('Conselho fiscal', [
        'Thomas Tschoepke Soares',
        'Júnior Goergen',
        'Flávio Eduardo Neves Teixeira',
      ]),
      substitutes(
        ['Tânia Regina da Silva', 'José Antônio Dias Tavares', 'Alexandre Junqueira Thomé'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2014–2016',
    groups: [
      coordination('Sady Jacques', 'Felipe Santos da Silva', 'Ricardo Fritsch'),
      council('Conselho geral', [
        'Tatiane Pires da Silva',
        'José Francisco Nunes Fernandez',
        'Eloir José Rockenbach',
        'Gustavo Buzzatti Pacheco',
      ]),
      substitutes(
        ['Paulo Roberto Miranda Meirelles', 'Clarisse de Lima Abrahão', 'Ronaldo Cardozo Lages (in memoriam)'],
        'Suplentes do conselho geral',
      ),
      council('Conselho fiscal', ['Tânia Regina da Silva', 'Deobrandino Ninrod Borges', 'Daniel Barbieri']),
      substitutes(
        ['Flávio Eduardo Neves Teixeira', 'Claudimir Zavalik', 'José Antônio Dias Tavares'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2013–2014',
    groups: [
      coordination('Ricardo Fritsch', 'Thomas Tschoepke Soares', 'Felipe Santos da Silva'),
      council('Conselho geral', [
        'Tatiane Pires da Silva',
        'Jonatas Daniel Dornelles Barbieri',
        'Tânia Regina da Silva',
        'Ronaldo Cardozo Lages',
      ]),
      substitutes(
        ['Flávio Eduardo Neves Teixeira', 'Clarisse de Lima Abrahão', 'Eloir José Rockenbach'],
        'Suplentes do conselho geral',
      ),
      council('Conselho fiscal', [
        'Gisele Machado de Oliveira',
        'Virgínia Silva Ferreira',
        'Deobrandino Ninrod Borges',
      ]),
      substitutes(
        ['Alexandre Junqueira Thomé', 'Vinicius John', 'Paulo Roberto Miranda Meirelles'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2010–2012',
    groups: [
      coordination('Ricardo Fritsch', 'Thomas Tschoepke Soares', 'Felipe Santos da Silva'),
      council('Conselho geral', [
        'Eloir José Rockenbach',
        'Jonatas Daniel Dornelles Barbieri',
        'Tânia Regina da Silva',
        'José Francisco Nunes Fernandez',
      ]),
      substitutes(
        ['Flávio Eduardo Neves Teixeira', 'Priscilla Kurtz Vieira de Carvalho', 'Ronaldo Cardozo Lages'],
        'Suplentes do conselho geral',
      ),
      council('Conselho fiscal', [
        'Gisele Machado de Oliveira',
        'Virgínia Silva Ferreira',
        'José Antônio Dias Tavares',
      ]),
      substitutes(
        ['Paloma Brandão da Costa', 'Vinicius John', 'Paulo Roberto Miranda Meirelles'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2008–2010',
    groups: [
      coordination('Marcelo D’Elia Branco', 'Virgínia Silva Ferreira', 'Ricardo Fritsch'),
      council('Conselho geral', [
        'Fabrício Solagna',
        'Priscilla Kurtz Vieira de Carvalho',
        'Gustavo Barboza de Melo',
        'José Francisco Nunes Fernandez',
      ]),
      substitutes(
        [
          'Noemi Yoshinaga Cunha de Souza',
          'Carlos Eurico Pittas do Canto',
          'Sílvio Antonio Hoffmann Jacques',
        ],
        'Suplentes do conselho geral',
      ),
      council('Conselho fiscal', [
        'Paloma Brandão da Costa',
        'Douglas Kellerman',
        'Marlon Feijó Dutra',
      ]),
      substitutes(
        ['Gisele Machado de Oliveira', 'Fátima de Fátima Torres Formoso', 'Fabrizio Almeida Marodin'],
        'Suplentes do conselho fiscal',
      ),
    ],
  },
  {
    period: '2006–2008',
    groups: [
      coordination('Sady Jacques', 'Gustavo Buzzatti Pacheco', 'Ricardo Fritsch'),
      council('Conselho geral', [
        'Priscilla Kurtz Vieira de Carvalho',
        'Pablo Longhi Lorenzzoni',
        'Joel Corrêa',
        'Andres Renato Biaggi',
      ]),
      council('Conselho fiscal', [
        'Sílvio Antonio Hoffmann Jacques',
        'Ronaldo Cardozo Lages',
        'Marlon Feijó Dutra',
      ]),
    ],
  },
]
