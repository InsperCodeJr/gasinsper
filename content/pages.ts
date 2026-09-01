/**
 * Textos de cada pagina do site.
 *
 * Ficavam fixos dentro dos componentes. Agora sao conteudo editavel: o painel
 * (Sanity em producao, admin local em desenvolvimento) sobrescreve o que quiser
 * e o que nao for preenchido cai nos padroes abaixo.
 */

export interface Fact {
  label: string
  value: string
}

export interface TitledBlock {
  title: string
  description: string
}

export interface HomePage {
  /** hero.mediaUrl: video, imagem ou GIF de fundo do banner. */
  hero: {
    mediaUrl: string | null
    eyebrow: string
    titleTop: string
    titleHighlight: string
    subtitle: string
    ctaAbout: string
    ctaProjects: string
    ctaPartners: string
  }
  about: { eyebrow: string; title: string; text: string; linkLabel: string }
  vision: { eyebrow: string; quote: string; facts: Fact[] }
  numbers: { eyebrow: string; title: string }
  projects: { eyebrow: string; title: string; linkLabel: string }
  cta: {
    eyebrow: string
    title: string
    text: string
    memberLabel: string
    volunteerLabel: string
    partnerLabel: string
  }
}

export interface AboutPage {
  /** mediaUrl: video, imagem ou GIF de fundo do topo. */
  hero: { eyebrow: string; title: string; subtitle: string; mediaUrl: string | null }
  about: { eyebrow: string; title: string; paragraphs: string[] }
  mission: { eyebrow: string; quote: string; text: string }
  values: { eyebrow: string; title: string; items: TitledBlock[] }
  structure: { eyebrow: string; title: string; text: string }
  areas: { eyebrow: string; title: string }
  team: { eyebrow: string; title: string }
}

export interface ProjectsPage {
  hero: { eyebrow: string; title: string; intro: string; highlights: string[]; mediaUrl: string | null }
}

export interface EventsPage {
  hero: { eyebrow: string; title: string }
  cta: { eyebrow: string; title: string; text: string; buttonLabel: string; note: string }
}

export interface PartnersPage {
  hero: { eyebrow: string; title: string; text: string; mediaUrl: string | null }
  infoCards: Array<{ title: string; text: string }>
  current: { eyebrow: string; title: string }
  history: { eyebrow: string; title: string }
  cta: { eyebrow: string; title: string; text: string; buttonLabel: string; note: string }
}

export interface OngsPage {
  hero: { eyebrow: string; title: string; text: string; mediaUrl: string | null }
  blocks: Array<{ eyebrow: string; title: string; text: string }>
  testimonials: { eyebrow: string; title: string }
  list: { eyebrow: string; title: string }
  cta: { title: string; text: string; buttonLabel: string }
}

export interface JoinPage {
  hero: {
    eyebrow: string
    title: string
    text: string
    memberLabel: string
    volunteerLabel: string
    mediaUrl: string | null
  }
  member: {
    tabLabel: string
    eyebrow: string
    title: string
    paragraphs: string[]
    linkLabel: string
    benefits: Array<{ title: string; desc: string }>
  }
  routine: { eyebrow: string }
  selection: {
    eyebrow: string
    title: string
    text: string
    steps: Array<{ title: string; desc: string }>
    whenLabel: string
    whenTitle: string
    whenText: string
    instagramNote: string
  }
  volunteer: { tabLabel: string; eyebrow: string; title: string; paragraphs: string[] }
  opportunities: { eyebrow: string; title: string }
}

export interface PageContent {
  home: HomePage
  about: AboutPage
  projects: ProjectsPage
  events: EventsPage
  partners: PartnersPage
  ongs: OngsPage
  join: JoinPage
}

export const PAGE_DEFAULTS: PageContent = {
  home: {
    hero: {
      eyebrow: 'Grupo de Ação Social · Insper',
      titleTop: 'Potencial estudantil.',
      titleHighlight: 'Impacto real.',
      subtitle:
        'O GAS conecta estudantes excepcionais a causas sociais urgentes, construindo projetos de longo prazo com ONGs e parceiros que geram transformação mensurada.',
      ctaAbout: 'Conheça o GAS',
      ctaProjects: 'Ver Projetos',
      ctaPartners: 'Parceiros',
      mediaUrl: null,
    },
    about: {
      eyebrow: 'Sobre o GAS',
      title: 'Formação, estratégia e ação para ampliar o impacto social.',
      text: 'O GAS é uma organização estudantil que desenvolve projetos sociais com foco em impacto consistente. Atuamos lado a lado com ONGs e parceiros para construir soluções que geram valor real para comunidades e aceleram o desenvolvimento de nossos membros.',
      linkLabel: 'Conhecer nossa história',
    },
    vision: {
      eyebrow: 'Nossa Visão',
      quote:
        'Ser referência em protagonismo estudantil e transformação social, conectando talento, gestão e propósito em iniciativas de alto impacto.',
      facts: [
        { label: 'Estrutura', value: 'Matriz: área + projeto' },
        { label: 'Atuação', value: 'Semestral' },
        { label: 'Foco', value: 'Impacto Mensurável' },
        { label: 'Origem', value: 'Insper, São Paulo' },
      ],
    },
    numbers: { eyebrow: 'Nossos Números', title: 'Impacto que se mede' },
    projects: {
      eyebrow: 'Nossos Projetos',
      title: 'Iniciativas que geram resultado.',
      linkLabel: 'Ver todos',
    },
    cta: {
      eyebrow: 'Junte-se a Nós',
      title: 'Pronto para fazer parte do GAS?',
      text: 'Seja como membro da organização ou voluntário em nossos projetos, há um espaço para você contribuir e crescer.',
      memberLabel: 'Quero ser Membro',
      volunteerLabel: 'Quero ser Voluntário',
      partnerLabel: 'Virar Parceiro',
    },
  },

  about: {
    hero: {
      eyebrow: 'Sobre Nós',
      title: 'Conheça o GAS',
      subtitle: 'Uma organização estudantil que transforma potencial em impacto social real.',
      mediaUrl: null,
    },
    about: {
      eyebrow: 'Sobre a Organização',
      title: 'O que é o GAS?',
      paragraphs: [
        'O GAS (Grupo de Ação Social) é uma organização estudantil do Insper dedicada ao desenvolvimento de projetos de impacto social. Fundado em 2001, foi a primeira entidade de ação social da América Latina e conecta o rigor acadêmico da formação em negócios e tecnologia com a urgência de causas sociais reais.',
        'Atuamos em parceria com ONGs, empresas e comunidades para construir soluções que vão além do voluntariado pontual: criamos programas estruturados, de longo prazo, com metodologia, acompanhamento e métricas de impacto.',
        'Cada projeto é uma oportunidade de aprendizado mútuo: nossos membros desenvolvem competências de liderança e gestão enquanto geram valor concreto para as organizações e pessoas que apoiamos.',
      ],
    },
    mission: {
      eyebrow: 'Nossa Missão',
      quote:
        'Formar líderes socialmente responsáveis, conectando talento estudantil a causas reais por meio de projetos estruturados e parcerias de longo prazo.',
      text: 'Acreditamos que a universidade é o momento ideal para desenvolver não apenas competências técnicas, mas também a consciência social e a capacidade de gerar mudança positiva no mundo.',
    },
    values: {
      eyebrow: 'Nossos Valores',
      title: 'O que nos guia',
      items: [
        { title: 'Pessoas', description: 'O GAS é feito, pensado, planejado e executado por pessoas, para pessoas.' },
        { title: 'Respeito', description: 'Respeito com o trabalho que fazemos e com a sociedade ao redor.' },
        { title: 'Vontade', description: 'Vontade de fazer mais e fazer melhor, todo dia.' },
        { title: 'Compromisso com impacto', description: 'Compromisso com o efeito que provocamos na comunidade.' },
        {
          title: 'Futuro',
          description: 'Busca por um futuro melhor, socialmente responsável, com líderes ativos e conscientes.',
        },
      ],
    },
    structure: {
      eyebrow: 'Como Funcionamos',
      title: 'Estrutura Organizacional',
      text: 'Cada membro executa tarefas únicas, sendo responsável por uma área de um projeto. Temos 6 áreas e 11 projetos, cada uma com autonomia para desenvolver suas iniciativas dentro da missão da organização.',
    },
    areas: { eyebrow: 'Como nos organizamos', title: 'Nossas Áreas' },
    team: { eyebrow: 'Gestão 2026', title: 'Nossa Equipe' },
  },

  projects: {
    hero: {
      eyebrow: 'Nossas Iniciativas',
      title: 'Projetos que geram impacto real',
      intro:
        'O GAS desenvolve projetos com escopos distintos, de educação financeira a empreendedorismo social, todos orientados por metodologia rigorosa e resultados mensuráveis.',
      highlights: ['Múltiplas ONGs impactadas', 'Voluntários em todo o Brasil'],
      mediaUrl: null,
    },
  },

  events: {
    hero: { eyebrow: 'Nossos Eventos', title: 'Onde o impacto se torna experiência' },
    cta: {
      eyebrow: 'Seja Parceiro',
      title: 'Colabore com nossos eventos',
      text: 'Buscamos parceiros que compartilhem nosso propósito de ampliar o impacto social. Sua empresa pode apoiar eventos, patrocinar projetos ou co-criar iniciativas que conectam mercado e sociedade.',
      buttonLabel: 'Entre em contato',
      note: 'Também disponível por e-mail e Instagram',
    },
  },

  partners: {
    hero: {
      eyebrow: 'Parceiros',
      title: 'Juntos, ampliamos o impacto',
      text: 'As parcerias são o coração do modelo do GAS. Cada colaboração, seja com empresas, fundações ou organizações acadêmicas, fortalece nossa capacidade de gerar transformação social consistente e de longo prazo.',
      mediaUrl: null,
    },
    infoCards: [
      {
        title: 'Por que ser um parceiro',
        text: 'As parcerias viabilizam recursos, metodologias e redes que potencializam cada projeto do GAS, aumentando o alcance e a qualidade das nossas ações.',
      },
      {
        title: 'Como colaborar?',
        text: 'Apoio financeiro, doação de produtos e materiais, capacitações, mentorias: qualquer forma de ajuda é muito bem-vinda!',
      },
      {
        title: 'O Retorno',
        text: 'Parceiros ganham acesso a talentos excepcionais, visibilidade no ecossistema de impacto e a satisfação de contribuir com iniciativas que realmente funcionam.',
      },
    ],
    current: { eyebrow: 'Parceiros Atuais', title: 'Quem nos apoia hoje' },
    history: { eyebrow: 'Histórico', title: 'Quem já caminhou conosco' },
    cta: {
      eyebrow: 'Faça Parte',
      title: 'Torne-se um parceiro do GAS',
      text: 'Se sua empresa ou organização compartilha do propósito de transformação social, há muitas formas de colaborar. Entre em contato e vamos construir algo juntos.',
      buttonLabel: 'Entrar em Contato',
      note: 'Respondemos em até 48h',
    },
  },

  ongs: {
    hero: {
      eyebrow: 'ONGs',
      title: 'As organizações que dão sentido ao nosso trabalho',
      text: 'O GAS existe para servir. Cada projeto nasce de uma demanda real de uma ONG parceira, e é para elas que direcionamos toda a nossa energia, competência e comprometimento.',
      mediaUrl: null,
    },
    blocks: [
      {
        eyebrow: 'Nosso Papel',
        title: 'Como funcionam as parcerias',
        text: 'O GAS conta com 11 projetos, cada um com uma proposta, um público e uma dinâmica de atuação específicos. Os projetos possuem uma estrutura previamente elaborada, com objetivos e atividades definidos, e são realizados em parceria com organizações sociais cuja atuação esteja alinhada à proposta de cada iniciativa.',
      },
      {
        eyebrow: 'Nossos Critérios',
        title: 'Como escolhemos nossas organizações parceiras',
        text: 'Buscamos organizações que atendam ao público para o qual cada projeto foi pensado e que tenham disponibilidade e interesse em receber nossos voluntários. Também consideramos fatores como horários, facilidade de acesso e proximidade com o Insper, além de valorizarmos uma comunicação próxima, aberta e transparente durante toda a parceria.',
      },
      {
        eyebrow: 'O Impacto da Colaboração',
        title: 'Construindo impacto juntos',
        text: 'Mais do que espaços onde os projetos acontecem, as organizações são parceiras essenciais da atuação do GAS. É por meio dessa conexão que aproximamos projetos estruturados das pessoas e das comunidades que eles buscam atender.',
      },
    ],
    testimonials: { eyebrow: 'O que dizem sobre nós', title: 'Depoimentos' },
    list: { eyebrow: 'ONGs Parceiras', title: 'Organizações com quem trabalhamos' },
    cta: {
      title: 'Sua ONG pode ser a próxima',
      text: 'Se você representa uma organização social e acredita que poderíamos fazer grandes coisas juntos, entre em contato. Estamos sempre abertos a novas parcerias de impacto.',
      buttonLabel: 'Entrar em contato',
    },
  },

  join: {
    hero: {
      eyebrow: 'Como Fazer Parte',
      title: 'Faça parte de algo maior',
      text: 'Há duas formas de contribuir com o GAS: como membro da organização ou como voluntário em nossos projetos. Ambos os caminhos levam ao mesmo lugar: impacto real.',
      memberLabel: 'Quero ser Membro',
      volunteerLabel: 'Quero ser Voluntário',
      mediaUrl: null,
    },
    member: {
      tabLabel: 'Seção 01: Membros',
      eyebrow: 'Membros',
      title: 'O que é ser membro do GAS?',
      paragraphs: [
        'Ser membro do GAS é estar por trás de tudo o que faz nossos projetos acontecerem. São os membros que planejam e organizam as ações, mantêm o contato com ONGs e parceiros, coordenam os voluntários e cuidam de cada etapa necessária para transformar uma ideia em uma ação concreta.',
        'Nossa estrutura funciona em um modelo de matriz: cada membro é alocado em um projeto e em uma área, assumindo responsabilidades específicas dentro daquela iniciativa. Assim, desde o início, cada pessoa tem autonomia, responsabilidade e espaço para contribuir de verdade com o funcionamento do GAS.',
      ],
      linkLabel: 'Conhecer as áreas',
      benefits: [
        {
          title: 'Projetos reais',
          desc: 'Aqui, você coloca a mão na massa. Não trabalhamos com cases ou simulações: são projetos reais, com pessoas reais e impacto real.',
        },
        {
          title: 'Desenvolvimento de competências',
          desc: 'Na prática, você desenvolve habilidades como liderança, gestão de projetos, comunicação, organização e trabalho em equipe.',
        },
        {
          title: 'Contato com o mercado',
          desc: 'Nossos membros têm contato com empresas, organizações e profissionais de destaque, criando conexões e experiências para além da sala de aula.',
        },
        {
          title: 'Uma comunidade com propósito',
          desc: 'Mais do que uma organização, somos uma comunidade de pessoas unidas pelo mesmo propósito: gerar impacto e transformar realidades.',
        },
      ],
    },
    routine: { eyebrow: 'Sua Jornada' },
    selection: {
      eyebrow: 'Como Entrar',
      title: 'Processo Seletivo',
      text: 'Abrimos seleção todo semestre. O processo é desenhado para identificar candidatos com potencial, engajamento e alinhamento aos valores do GAS, não apenas currículo.',
      steps: [
        { title: 'Inscrição', desc: 'Formulário disponível no Instagram do GAS durante o período de seleção.' },
        {
          title: 'Dinâmica em Grupo',
          desc: 'Atividade coletiva para avaliar colaboração, raciocínio e alinhamento de valores.',
        },
        {
          title: 'Entrevista Individual',
          desc: 'Conversa com membros da gestão sobre motivações, experiências e expectativas.',
        },
        { title: 'Resultado e Onboarding', desc: 'Comunicação do resultado e início da jornada como membro do GAS.' },
      ],
      whenLabel: 'Quando?',
      whenTitle: 'Todo semestre',
      whenText:
        'As inscrições são anunciadas no Instagram do GAS. Fique de olho para não perder as próximas datas!',
      instagramNote: 'Inscrições abertas exclusivamente pelo Instagram',
    },
    volunteer: {
      tabLabel: 'Seção 02: Voluntários',
      eyebrow: 'Voluntariado',
      title: 'O voluntariado que gera impacto real',
      paragraphs: [
        'Diferente do voluntariado tradicional, as oportunidades do GAS são estruturadas, com papéis claros e entregas definidas. Cada voluntário é parte essencial da execução de um projeto social.',
        'Você não precisa ser estudante do Insper. Qualquer pessoa com vontade de contribuir e aprender pode se envolver. O que importa é o comprometimento com o impacto.',
      ],
    },
    opportunities: { eyebrow: 'Oportunidades', title: 'Voluntariado por Projeto' },
  },
}
