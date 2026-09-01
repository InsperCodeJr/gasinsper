/**
 * Conteudo inicial do site.
 *
 * E o que vale enquanto ninguem editou nada pelo painel. Depois da primeira
 * gravacao, o conteudo real vive no armazenamento (Vercel Blob em producao,
 * local-content/content.json no ambiente local).
 */
import type {
  Area,
  Event,
  HomeMetricItem,
  ONG,
  Partner,
  Project,
  RoutineStep,
  TeamMember,
  SiteContent,
} from '@/types/content'

export const DEFAULT_AREAS: Area[] = [
  {
    _id: 'local-area-1',
    name: 'Presidência',
    description:
      'Zela pela visão estratégica da entidade, garantindo o crescimento contínuo das áreas e projetos e o fortalecimento da cultura organizacional.',
    order: 1,
  },
  {
    _id: 'local-area-2',
    name: 'Gestão de Projetos',
    description:
      'Acompanha o planejamento e a execução dos projetos, garantindo metodologia, prazos e entregas consistentes para cada organização parceira.',
    order: 2,
  },
  {
    _id: 'local-area-3',
    name: 'Institucional',
    description:
      'Cuida da relação com o Insper, com as organizações sociais e com a rede institucional que sustenta a atuação do GAS.',
    order: 3,
  },
  {
    _id: 'local-area-4',
    name: 'Marketing',
    description:
      'Constrói e comunica a identidade do GAS, ampliando o alcance das iniciativas e fortalecendo a presença digital da organização.',
    order: 4,
  },
  {
    _id: 'local-area-5',
    name: 'Recursos Humanos',
    description:
      'Cuida do recrutamento, do desenvolvimento e do engajamento dos membros, sustentando uma cultura organizacional forte e acolhedora.',
    order: 5,
  },
  {
    _id: 'local-area-6',
    name: 'Novos Negócios',
    description:
      'Prospecta parcerias, patrocínios e novas frentes de atuação que viabilizam e ampliam o impacto dos projetos do GAS.',
    order: 6,
  },
]

function makeProject(
  id: string,
  name: string,
  slug: string,
  description: string,
  targetAudience: string,
  cardColor: string,
  objective: string
): Project {
  return {
    _id: id,
    name,
    slug,
    description,
    objective,
    targetAudience,
    cardColor,
    volunteerInfo: {
      description: `Voluntários do ${name} atuam diretamente na execução das atividades junto à organização parceira.`,
      opportunities: 'Atuação presencial ou remota, conforme a agenda do projeto.',
      demand: 'Vagas abertas',
    },
  }
}

export const DEFAULT_PROJECTS: Project[] = [
  makeProject(
    'local-proj-1',
    'Informar',
    'informar',
    'O Informar busca transformar vidas por meio do ensino de programação para jovens e adultos em situação de vulnerabilidade.',
    'Jovens e adultos',
    '#BB0A24',
    'Ampliar o acesso à tecnologia e a oportunidades de trabalho na área.'
  ),
  makeProject(
    'local-proj-2',
    'Alegrarte',
    'alegrarte',
    'O Alegrarte leva arte, cultura e atividades lúdicas a crianças atendidas por organizações sociais parceiras.',
    'Crianças',
    '#7C5CBF',
    'Estimular criatividade e expressão por meio de oficinas artísticas.'
  ),
  makeProject(
    'local-proj-3',
    'Mentoria Social',
    'mentoria-social',
    'Acompanhamento individual de jovens no desenvolvimento acadêmico e na construção de projetos de vida.',
    'Jovens',
    '#1F7A8C',
    'Apoiar escolhas acadêmicas e profissionais com acompanhamento contínuo.'
  ),
  makeProject(
    'local-proj-4',
    'Educação Financeira',
    'educacao-financeira',
    'Oficinas práticas sobre orçamento, poupança e crédito para comunidades atendidas por organizações parceiras.',
    'Adultos',
    '#2E7D32',
    'Fortalecer a autonomia financeira das famílias atendidas.'
  ),
  makeProject(
    'local-proj-5',
    'Empreendedorismo Local',
    'empreendedorismo-local',
    'Apoio prático a pequenos empreendedores na estruturação e no crescimento de seus negócios.',
    'Empreendedores',
    '#E07A00',
    'Estruturar negócios locais com metodologia e acompanhamento.'
  ),
  makeProject(
    'local-proj-6',
    'Letramento Digital',
    'letramento-digital',
    'Formação básica em computadores, internet e serviços digitais para pessoas idosas.',
    'Idosos',
    '#455A64',
    'Reduzir a exclusão digital entre pessoas idosas.'
  ),
  makeProject(
    'local-proj-7',
    'Reforço Escolar',
    'reforco-escolar',
    'Aulas de apoio em português e matemática para estudantes do ensino fundamental.',
    'Crianças',
    '#C2185B',
    'Melhorar o desempenho escolar dos estudantes atendidos.'
  ),
  makeProject(
    'local-proj-8',
    'Preparatório ENEM',
    'preparatorio-enem',
    'Trilha de estudos e simulados para estudantes de escola pública que vão prestar o ENEM.',
    'Estudantes',
    '#0277BD',
    'Ampliar as chances de aprovação no ensino superior.'
  ),
  makeProject(
    'local-proj-9',
    'Capacitação de Organizações',
    'capacitacao-de-organizacoes',
    'Consultoria em gestão, processos e captação para organizações sociais parceiras.',
    'Organizações sociais',
    '#5D4037',
    'Fortalecer a gestão das organizações parceiras.'
  ),
  makeProject(
    'local-proj-10',
    'Saúde e Bem-Estar',
    'saude-e-bem-estar',
    'Rodas de conversa e atividades de promoção de saúde física e mental na comunidade.',
    'Comunidade',
    '#00897B',
    'Promover hábitos de cuidado e acesso à informação de saúde.'
  ),
  makeProject(
    'local-proj-11',
    'Esporte e Cidadania',
    'esporte-e-cidadania',
    'Atividades esportivas orientadas ao desenvolvimento de disciplina, cooperação e convivência.',
    'Crianças e jovens',
    '#F9A825',
    'Usar o esporte como ferramenta de formação cidadã.'
  ),
]

export const DEFAULT_EVENTS: Event[] = [
  {
    _id: 'local-event-1',
    title: 'Semana do Impacto Social',
    slug: 'semana-do-impacto-social',
    description:
      'Uma semana de palestras, oficinas e encontros com lideranças do setor social, conectando estudantes a iniciativas de alto impacto.',
    date: '2026-04-15',
    cardColor: '#BB0A24',
    order: 1,
  },
  {
    _id: 'local-event-2',
    title: 'Demo Day',
    slug: 'demo-day',
    description:
      'Apresentação dos resultados dos projetos do semestre para parceiros, organizações sociais e convidados.',
    date: '2026-06-20',
    cardColor: '#1F7A8C',
    order: 2,
  },
  {
    _id: 'local-event-3',
    title: 'Encontro de Voluntários',
    slug: 'encontro-de-voluntarios',
    description:
      'Integração e capacitação dos voluntários de todos os projetos, com treinamentos práticos e troca de experiências.',
    date: '2026-03-05',
    cardColor: '#7C5CBF',
    order: 3,
  },
]

export const DEFAULT_PARTNERS: Partner[] = [
  {
    _id: 'local-partner-1',
    name: 'Insper',
    description: 'Instituição de ensino que abriga e apoia a atuação do GAS.',
    isHistorical: false,
  },
  {
    _id: 'local-partner-2',
    name: 'Parceiro Corporativo A',
    description: 'Apoio financeiro e mentoria para os projetos do semestre.',
    isHistorical: false,
  },
  {
    _id: 'local-partner-3',
    name: 'Parceiro Corporativo B',
    description: 'Doação de materiais e capacitações para as equipes.',
    isHistorical: false,
  },
  {
    _id: 'local-partner-4',
    name: 'Parceiro Histórico A',
    description: 'Apoiou projetos do GAS em gestões anteriores.',
    isHistorical: true,
  },
  {
    _id: 'local-partner-5',
    name: 'Parceiro Histórico B',
    description: 'Apoiou projetos do GAS em gestões anteriores.',
    isHistorical: true,
  },
  {
    _id: 'local-partner-6',
    name: 'Parceiro Histórico C',
    description: 'Apoiou projetos do GAS em gestões anteriores.',
    isHistorical: true,
  },
]

export const DEFAULT_ONGS: ONG[] = [
  {
    _id: 'local-ong-1',
    name: 'Organização Parceira 1',
    description:
      'Atua na garantia de direitos de crianças e adolescentes em situação de vulnerabilidade social.',
    testimonials: [
      {
        author: 'Coordenação da organização',
        text: 'A parceria com o GAS fortaleceu nossa capacidade de gestão e trouxe metodologia para o dia a dia da equipe.',
      },
    ],
  },
  {
    _id: 'local-ong-2',
    name: 'Organização Parceira 2',
    description: 'Promove desenvolvimento humano por meio de educação, saúde e geração de renda.',
    testimonials: [
      {
        author: 'Equipe de projetos',
        text: 'O projeto desenvolvido com o GAS nos ajudou a estruturar o planejamento e a medir resultados.',
      },
    ],
  },
  {
    _id: 'local-ong-3',
    name: 'Organização Parceira 3',
    description: 'Trabalha com formação profissional e inserção no mercado de trabalho.',
  },
  {
    _id: 'local-ong-4',
    name: 'Organização Parceira 4',
    description: 'Desenvolve ações culturais e educativas em comunidades da região.',
  },
]

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    _id: 'local-member-1',
    name: 'Membro da Presidência',
    position: 'Presidência',
    isMatrix: true,
    order: 1,
  },
  {
    _id: 'local-member-2',
    name: 'Membro da Vice-Presidência',
    position: 'Vice-Presidência',
    isMatrix: true,
    order: 2,
  },
  {
    _id: 'local-member-3',
    name: 'Membro da Diretoria de Projetos',
    position: 'Diretoria',
    isMatrix: true,
    order: 3,
  },
  {
    _id: 'local-member-4',
    name: 'Membro de Gestão de Projetos',
    position: 'Gerência',
    order: 4,
    area: DEFAULT_AREAS[1],
  },
  {
    _id: 'local-member-5',
    name: 'Membro de Institucional',
    position: 'Gerência',
    order: 5,
    area: DEFAULT_AREAS[2],
  },
  {
    _id: 'local-member-6',
    name: 'Membro de Marketing',
    position: 'Gerência',
    order: 6,
    area: DEFAULT_AREAS[3],
  },
  {
    _id: 'local-member-7',
    name: 'Membro de Recursos Humanos',
    position: 'Gerência',
    order: 7,
    area: DEFAULT_AREAS[4],
  },
  {
    _id: 'local-member-8',
    name: 'Membro de Novos Negócios',
    position: 'Gerência',
    order: 8,
    area: DEFAULT_AREAS[5],
  },
]

export const DEFAULT_HOME_STATS: HomeMetricItem[] = [
  { label: 'Pessoas impactadas ao longo da nossa atuação', value: '+10.000' },
  { label: 'Histórico de membros e voluntários desde 2020', value: '+1.055' },
  { label: 'Pessoas impactadas por semestre', value: '~600' },
  { label: 'Membros em 2026.2', value: '62' },
]

export const DEFAULT_ROUTINE_STEPS: RoutineStep[] = [
  {
    _key: 'local-step-1',
    title: 'Onboarding',
    desc: 'Integração com a cultura e a estrutura do GAS, conhecendo membros e metodologias.',
  },
  {
    _key: 'local-step-2',
    title: 'Alocação em projeto e área',
    desc: 'Cada membro assume responsabilidades em um projeto e em uma área da entidade.',
  },
  {
    _key: 'local-step-3',
    title: 'Execução',
    desc: 'Trabalho semanal com reuniões, entregas e acompanhamento junto à organização parceira.',
  },
  {
    _key: 'local-step-4',
    title: 'Review e feedback',
    desc: 'Ciclos regulares de revisão para garantir qualidade e desenvolvimento pessoal.',
  },
  {
    _key: 'local-step-5',
    title: 'Apresentação de resultados',
    desc: 'Fechamento do semestre com a apresentação dos resultados para toda a comunidade GAS.',
  },
]

export const DEFAULT_SITE_SETTINGS = {
  instagramHandle: 'gasinsper',
  linkedinUrl: 'https://www.linkedin.com/company/gas-insper',
  contactEmail: 'contato@gas.org.br',
}

/** Conteudo inicial completo. */
export const DEFAULT_CONTENT: SiteContent = {
  pages: {},
  home: { stats: DEFAULT_HOME_STATS },
  areas: DEFAULT_AREAS,
  projects: DEFAULT_PROJECTS,
  events: DEFAULT_EVENTS,
  partners: DEFAULT_PARTNERS,
  ongs: DEFAULT_ONGS,
  teamMembers: DEFAULT_TEAM_MEMBERS,
  memberRoutine: { title: 'Rotina de um Membro', steps: DEFAULT_ROUTINE_STEPS },
  siteSettings: DEFAULT_SITE_SETTINGS,
}
