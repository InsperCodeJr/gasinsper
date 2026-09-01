/**
 * Estrutura do admin local: uma seção por página do site, e dentro dela os
 * painéis daquela página (textos + o conteúdo que a página lista).
 */

export type Row = Record<string, unknown>;

export type SimpleType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "color"
  | "date"
  | "image"
  | "imageList"
  | "media"
  | "area"
  | "partners"
  | "textList";

export type Field =
  | { path: string; label: string; type: SimpleType; help?: string; group?: string }
  | {
      path: string;
      label: string;
      type: "objectList";
      fields: Field[];
      newItem: () => Row;
      itemLabel?: string;
      help?: string;
      group?: string;
    };

export interface Panel {
  id: string;
  label: string;
  kind: "single" | "list";
  /** Caminho dentro do conteúdo, ex: "pages.home" ou "projects". */
  path: string;
  fields: Field[];
  titlePath?: string;
  subtitlePath?: string;
  newItem?: () => Row;
  hint?: string;
}

export interface Section {
  id: string;
  label: string;
  hint: string;
  panels: Panel[];
}

export function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/* ── blocos de campos reaproveitados ─────────────────── */

const statFields: Field[] = [
  { path: "label", label: "Rótulo", type: "text" },
  { path: "value", label: "Valor", type: "text", help: "Ex: +10.000, ~600, 62" },
];

const testimonialFields: Field[] = [
  { path: "author", label: "Autor", type: "text" },
  { path: "role", label: "Papel / relação", type: "text" },
  { path: "text", label: "Depoimento", type: "textarea" },
  { path: "photo", label: "Foto", type: "image" },
];

const heroTitleText = (group: string): Field[] => [
  { path: "hero.eyebrow", label: "Rótulo acima do título", type: "text", group },
  { path: "hero.title", label: "Título", type: "text", group },
  { path: "hero.text", label: "Texto", type: "textarea", group },
  {
    path: "hero.mediaUrl",
    label: "Mídia de fundo do banner",
    type: "media",
    help: "Aceita vídeo, imagem ou GIF. Sem mídia, fica o fundo padrão da página.",
    group,
  },
];

const ctaFields = (group: string): Field[] => [
  { path: "cta.eyebrow", label: "Rótulo", type: "text", group },
  { path: "cta.title", label: "Título", type: "text", group },
  { path: "cta.text", label: "Texto", type: "textarea", group },
  { path: "cta.buttonLabel", label: "Texto do botão", type: "text", group },
  { path: "cta.note", label: "Observação abaixo do botão", type: "text", group },
];

/* ── painéis de conteúdo listado ─────────────────────── */

const areasPanel: Panel = {
  id: "areas",
  label: "Áreas",
  kind: "list",
  path: "areas",
  titlePath: "name",
  newItem: () => ({ _id: uid("area"), _type: "area", name: "Nova área", description: "", order: 99 }),
  fields: [
    { path: "name", label: "Nome da área", type: "text" },
    { path: "order", label: "Ordem de exibição", type: "number" },
    { path: "description", label: "Descrição", type: "textarea" },
  ],
};

const teamPanel: Panel = {
  id: "teamMembers",
  label: "Equipe",
  kind: "list",
  path: "teamMembers",
  titlePath: "name",
  subtitlePath: "position",
  hint: "Membros da matriz aparecem no primeiro bloco de Nossa Equipe.",
  newItem: () => ({ _id: uid("member"), _type: "teamMember", name: "Novo membro", position: "", order: 99 }),
  fields: [
    { path: "name", label: "Nome", type: "text", group: "Identificação" },
    { path: "position", label: "Cargo", type: "text", group: "Identificação" },
    { path: "isMatrix", label: "É da matriz", type: "boolean", group: "Identificação" },
    { path: "area", label: "Área", type: "area", group: "Identificação" },
    { path: "order", label: "Ordem de exibição", type: "number", group: "Identificação" },
    { path: "photo", label: "Foto", type: "image", group: "Contato" },
    { path: "email", label: "E-mail", type: "text", group: "Contato" },
    { path: "instagram", label: "Instagram (sem @)", type: "text", group: "Contato" },
    { path: "linkedin", label: "LinkedIn (URL)", type: "text", group: "Contato" },
  ],
};

const projectsPanel: Panel = {
  id: "projects",
  label: "Projetos",
  kind: "list",
  path: "projects",
  titlePath: "name",
  subtitlePath: "slug",
  newItem: () => ({
    _id: uid("proj"),
    _type: "project",
    name: "Novo projeto",
    slug: uid("projeto"),
    description: "",
    cardColor: "#BB0A24",
  }),
  fields: [
    { path: "name", label: "Nome do projeto", type: "text", group: "Identificação" },
    { path: "slug", label: "Slug", type: "text", help: "Âncora /projetos#slug", group: "Identificação" },
    { path: "targetAudience", label: "Público impactado", type: "text", group: "Identificação" },
    { path: "cardColor", label: "Cor do card", type: "color", group: "Identificação" },
    { path: "instagramHandle", label: "Instagram (sem @)", type: "text", group: "Identificação" },
    { path: "description", label: "Descrição", type: "textarea", group: "Conteúdo" },
    { path: "objective", label: "Objetivo", type: "textarea", group: "Conteúdo" },
    { path: "logo", label: "Logo / imagem principal", type: "image", group: "Mídia" },
    {
      path: "galleryImages",
      label: "Galeria de fotos",
      type: "imageList",
      help: "As duas primeiras de cada projeto formam o mural no topo da página.",
      group: "Mídia",
    },
    {
      path: "stats",
      label: "Números do projeto",
      type: "objectList",
      itemLabel: "label",
      fields: statFields,
      newItem: () => ({ label: "Novo número", value: "0" }),
      group: "Números",
    },
    { path: "partners", label: "Parceiros deste projeto", type: "partners", group: "Parceiros" },
    {
      path: "testimonials",
      label: "Depoimentos",
      type: "objectList",
      itemLabel: "author",
      fields: testimonialFields,
      newItem: () => ({ author: "", role: "", text: "" }),
      group: "Depoimentos",
    },
    { path: "volunteerInfo.description", label: "Sobre o voluntariado", type: "textarea", group: "Voluntariado" },
    { path: "volunteerInfo.opportunities", label: "Tipo de atuação", type: "textarea", group: "Voluntariado" },
    { path: "volunteerInfo.process", label: "Como funciona", type: "textarea", group: "Voluntariado" },
    { path: "volunteerInfo.demand", label: "Demanda atual", type: "text", group: "Voluntariado" },
  ],
};

const eventsPanel: Panel = {
  id: "events",
  label: "Eventos",
  kind: "list",
  path: "events",
  titlePath: "title",
  subtitlePath: "date",
  hint: "A ordem de exibição define quem aparece primeiro no slideshow.",
  newItem: () => ({
    _id: uid("event"),
    _type: "event",
    title: "Novo evento",
    slug: uid("evento"),
    description: "",
    cardColor: "#BB0A24",
    order: 99,
  }),
  fields: [
    { path: "title", label: "Título", type: "text", group: "Identificação" },
    { path: "slug", label: "Slug", type: "text", group: "Identificação" },
    { path: "order", label: "Ordem de exibição", type: "number", help: "1 aparece primeiro", group: "Identificação" },
    { path: "date", label: "Data", type: "date", group: "Identificação" },
    { path: "cardColor", label: "Cor do card", type: "color", group: "Identificação" },
    { path: "description", label: "Descrição", type: "textarea", group: "Conteúdo" },
    { path: "image", label: "Foto representativa", type: "image", group: "Mídia" },
    { path: "galleryImages", label: "Galeria de fotos", type: "imageList", group: "Mídia" },
  ],
};

const partnersPanel: Panel = {
  id: "partners",
  label: "Parceiros",
  kind: "list",
  path: "partners",
  titlePath: "name",
  hint: "Marque histórico para mover o parceiro ao carrossel de baixo.",
  newItem: () => ({
    _id: uid("partner"),
    _type: "partner",
    name: "Novo parceiro",
    description: "",
    isHistorical: false,
  }),
  fields: [
    { path: "name", label: "Nome", type: "text" },
    { path: "website", label: "Site", type: "text" },
    { path: "isHistorical", label: "É parceiro histórico", type: "boolean" },
    { path: "logo", label: "Logo", type: "image" },
    { path: "description", label: "Descrição", type: "textarea" },
  ],
};

const ongsPanel: Panel = {
  id: "ongs",
  label: "ONGs",
  kind: "list",
  path: "ongs",
  titlePath: "name",
  newItem: () => ({ _id: uid("ong"), _type: "ong", name: "Nova organização", description: "" }),
  fields: [
    { path: "name", label: "Nome", type: "text", group: "Identificação" },
    { path: "website", label: "Site", type: "text", group: "Identificação" },
    { path: "logo", label: "Logo", type: "image", group: "Identificação" },
    { path: "description", label: "Descrição", type: "textarea", group: "Conteúdo" },
    {
      path: "testimonials",
      label: "Depoimentos",
      type: "objectList",
      itemLabel: "author",
      fields: [
        { path: "author", label: "Autor", type: "text" },
        { path: "text", label: "Depoimento", type: "textarea" },
        { path: "photo", label: "Foto", type: "image" },
      ],
      newItem: () => ({ author: "", text: "" }),
      group: "Depoimentos",
    },
  ],
};

/* ── seções, na ordem do menu do site ────────────────── */

export const SECTIONS: Section[] = [
  {
    id: "home",
    label: "Home",
    hint: "Página inicial do site.",
    panels: [
      {
        id: "home-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.home",
        fields: [
          { path: "hero.eyebrow", label: "Rótulo acima do título", type: "text", group: "Topo" },
          { path: "hero.titleTop", label: "Título (primeira linha)", type: "text", group: "Topo" },
          { path: "hero.titleHighlight", label: "Título (linha em vermelho)", type: "text", group: "Topo" },
          { path: "hero.subtitle", label: "Subtítulo", type: "textarea", group: "Topo" },
          { path: "hero.ctaAbout", label: "Botão: conhecer o GAS", type: "text", group: "Topo" },
          { path: "hero.ctaProjects", label: "Botão: ver projetos", type: "text", group: "Topo" },
          { path: "hero.ctaPartners", label: "Botão: parceiros", type: "text", group: "Topo" },
          {
            path: "hero.mediaUrl",
            label: "Mídia de fundo do banner",
            type: "media",
            help: "Aceita vídeo, imagem ou GIF. Sem mídia, fica o fundo padrão da página.",
            group: "Topo",
          },

          { path: "about.eyebrow", label: "Rótulo", type: "text", group: "Bloco Sobre o GAS" },
          { path: "about.title", label: "Título", type: "textarea", group: "Bloco Sobre o GAS" },
          { path: "about.text", label: "Texto", type: "textarea", group: "Bloco Sobre o GAS" },
          { path: "about.linkLabel", label: "Texto do link", type: "text", group: "Bloco Sobre o GAS" },

          { path: "vision.eyebrow", label: "Rótulo", type: "text", group: "Bloco Nossa Visão" },
          { path: "vision.quote", label: "Frase da visão", type: "textarea", group: "Bloco Nossa Visão" },
          {
            path: "vision.facts",
            label: "Destaques",
            type: "objectList",
            itemLabel: "label",
            fields: [
              { path: "label", label: "Rótulo", type: "text" },
              { path: "value", label: "Valor", type: "text" },
            ],
            newItem: () => ({ label: "Novo destaque", value: "" }),
            group: "Bloco Nossa Visão",
          },

          { path: "numbers.eyebrow", label: "Rótulo", type: "text", group: "Seção Nossos Números" },
          { path: "numbers.title", label: "Título", type: "text", group: "Seção Nossos Números" },

          { path: "projects.eyebrow", label: "Rótulo", type: "text", group: "Seção Nossos Projetos" },
          { path: "projects.title", label: "Título", type: "text", group: "Seção Nossos Projetos" },
          { path: "projects.linkLabel", label: "Texto do link", type: "text", group: "Seção Nossos Projetos" },

          { path: "cta.eyebrow", label: "Rótulo", type: "text", group: "Chamada final" },
          { path: "cta.title", label: "Título", type: "text", group: "Chamada final" },
          { path: "cta.text", label: "Texto", type: "textarea", group: "Chamada final" },
          { path: "cta.memberLabel", label: "Botão: membro", type: "text", group: "Chamada final" },
          { path: "cta.volunteerLabel", label: "Botão: voluntário", type: "text", group: "Chamada final" },
          { path: "cta.partnerLabel", label: "Botão: parceiro", type: "text", group: "Chamada final" },
        ],
      },
      {
        id: "home-numbers",
        label: "Números",
        kind: "single",
        path: "home",
        hint: "Os cards da seção Impacto que se mede.",
        fields: [
          {
            path: "stats",
            label: "Números da home",
            type: "objectList",
            itemLabel: "label",
            fields: statFields,
            newItem: () => ({ label: "Novo indicador", value: "0" }),
          },
        ],
      },
    ],
  },

  {
    id: "about",
    label: "Sobre Nós",
    hint: "Textos institucionais, áreas e equipe.",
    panels: [
      {
        id: "about-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.about",
        fields: [
          { path: "hero.eyebrow", label: "Rótulo", type: "text", group: "Topo" },
          { path: "hero.title", label: "Título", type: "text", group: "Topo" },
          { path: "hero.subtitle", label: "Subtítulo", type: "textarea", group: "Topo" },
          {
            path: "hero.mediaUrl",
            label: "Mídia de fundo do banner",
            type: "media",
            help: "Aceita vídeo, imagem ou GIF. Sem mídia, fica o gradiente vinho.",
            group: "Topo",
          },

          { path: "about.eyebrow", label: "Rótulo", type: "text", group: "Bloco O que é o GAS" },
          { path: "about.title", label: "Título", type: "text", group: "Bloco O que é o GAS" },
          {
            path: "about.paragraphs",
            label: "Parágrafos",
            type: "textList",
            help: "Cada item vira um parágrafo.",
            group: "Bloco O que é o GAS",
          },

          { path: "mission.eyebrow", label: "Rótulo", type: "text", group: "Bloco Missão" },
          { path: "mission.quote", label: "Frase da missão", type: "textarea", group: "Bloco Missão" },
          { path: "mission.text", label: "Texto de apoio", type: "textarea", group: "Bloco Missão" },

          { path: "values.eyebrow", label: "Rótulo", type: "text", group: "Bloco Valores" },
          { path: "values.title", label: "Título", type: "text", group: "Bloco Valores" },
          {
            path: "values.items",
            label: "Valores",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "title", label: "Nome do valor", type: "text" },
              { path: "description", label: "Descrição", type: "textarea" },
            ],
            newItem: () => ({ title: "Novo valor", description: "" }),
            group: "Bloco Valores",
          },

          { path: "structure.eyebrow", label: "Rótulo", type: "text", group: "Bloco Estrutura" },
          { path: "structure.title", label: "Título", type: "text", group: "Bloco Estrutura" },
          { path: "structure.text", label: "Texto", type: "textarea", group: "Bloco Estrutura" },

          { path: "areas.eyebrow", label: "Rótulo", type: "text", group: "Seção Áreas" },
          { path: "areas.title", label: "Título", type: "text", group: "Seção Áreas" },

          { path: "team.eyebrow", label: "Rótulo", type: "text", group: "Seção Equipe" },
          { path: "team.title", label: "Título", type: "text", group: "Seção Equipe" },
        ],
      },
      areasPanel,
      teamPanel,
    ],
  },

  {
    id: "projects",
    label: "Projetos",
    hint: "Topo da página e os projetos listados.",
    panels: [
      {
        id: "projects-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.projects",
        fields: [
          { path: "hero.eyebrow", label: "Rótulo", type: "text", group: "Topo" },
          { path: "hero.title", label: "Título", type: "text", group: "Topo" },
          { path: "hero.intro", label: "Texto de introdução", type: "textarea", group: "Topo" },
          {
            path: "hero.highlights",
            label: "Destaques",
            type: "textList",
            help: "Itens da linha ao lado da contagem de projetos.",
            group: "Topo",
          },
          {
            path: "hero.mediaUrl",
            label: "Mídia de fundo do banner",
            type: "media",
            help: "Aceita vídeo, imagem ou GIF. Sem mídia, fica o fundo padrão da página.",
            group: "Topo",
          },
        ],
      },
      projectsPanel,
    ],
  },

  {
    id: "events",
    label: "Nossos Eventos",
    hint: "Slideshow e chamada para parceiros.",
    panels: [
      {
        id: "events-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.events",
        fields: [
          { path: "hero.eyebrow", label: "Rótulo", type: "text", group: "Topo" },
          { path: "hero.title", label: "Título", type: "text", group: "Topo" },
          ...ctaFields("Chamada para parceiros"),
        ],
      },
      eventsPanel,
    ],
  },

  {
    id: "partners",
    label: "Parceiros",
    hint: "Textos da página e os parceiros listados.",
    panels: [
      {
        id: "partners-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.partners",
        fields: [
          ...heroTitleText("Topo"),
          {
            path: "infoCards",
            label: "Cards de informação",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "title", label: "Título", type: "text" },
              { path: "text", label: "Texto", type: "textarea" },
            ],
            newItem: () => ({ title: "Novo card", text: "" }),
            group: "Cards",
          },
          { path: "current.eyebrow", label: "Rótulo", type: "text", group: "Seção Parceiros Atuais" },
          { path: "current.title", label: "Título", type: "text", group: "Seção Parceiros Atuais" },
          { path: "history.eyebrow", label: "Rótulo", type: "text", group: "Seção Histórico" },
          { path: "history.title", label: "Título", type: "text", group: "Seção Histórico" },
          ...ctaFields("Chamada final"),
        ],
      },
      partnersPanel,
    ],
  },

  {
    id: "ongs",
    label: "ONGs",
    hint: "Textos da página e as organizações parceiras.",
    panels: [
      {
        id: "ongs-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.ongs",
        fields: [
          ...heroTitleText("Topo"),
          {
            path: "blocks",
            label: "Blocos sobre as parcerias",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "eyebrow", label: "Rótulo", type: "text" },
              { path: "title", label: "Título", type: "text" },
              { path: "text", label: "Texto", type: "textarea" },
            ],
            newItem: () => ({ eyebrow: "", title: "Novo bloco", text: "" }),
            group: "Blocos",
          },
          { path: "testimonials.eyebrow", label: "Rótulo", type: "text", group: "Seção Depoimentos" },
          { path: "testimonials.title", label: "Título", type: "text", group: "Seção Depoimentos" },
          { path: "list.eyebrow", label: "Rótulo", type: "text", group: "Seção ONGs Parceiras" },
          { path: "list.title", label: "Título", type: "text", group: "Seção ONGs Parceiras" },
          { path: "cta.title", label: "Título", type: "text", group: "Chamada final" },
          { path: "cta.text", label: "Texto", type: "textarea", group: "Chamada final" },
          { path: "cta.buttonLabel", label: "Texto do botão", type: "text", group: "Chamada final" },
        ],
      },
      ongsPanel,
    ],
  },

  {
    id: "join",
    label: "Como Fazer Parte",
    hint: "Seções de membros e voluntários.",
    panels: [
      {
        id: "join-text",
        label: "Textos da página",
        kind: "single",
        path: "pages.join",
        fields: [
          { path: "hero.eyebrow", label: "Rótulo", type: "text", group: "Topo" },
          { path: "hero.title", label: "Título", type: "text", group: "Topo" },
          { path: "hero.text", label: "Texto", type: "textarea", group: "Topo" },
          { path: "hero.memberLabel", label: "Botão: membro", type: "text", group: "Topo" },
          { path: "hero.volunteerLabel", label: "Botão: voluntário", type: "text", group: "Topo" },
          {
            path: "hero.mediaUrl",
            label: "Mídia de fundo do banner",
            type: "media",
            help: "Aceita vídeo, imagem ou GIF. Sem mídia, fica o fundo padrão da página.",
            group: "Topo",
          },

          { path: "member.tabLabel", label: "Faixa da seção", type: "text", group: "Seção Membros" },
          { path: "member.eyebrow", label: "Rótulo", type: "text", group: "Seção Membros" },
          { path: "member.title", label: "Título", type: "text", group: "Seção Membros" },
          { path: "member.paragraphs", label: "Parágrafos", type: "textList", group: "Seção Membros" },
          { path: "member.linkLabel", label: "Texto do link para as áreas", type: "text", group: "Seção Membros" },
          {
            path: "member.benefits",
            label: "Blocos de destaque",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "title", label: "Título", type: "text" },
              { path: "desc", label: "Texto", type: "textarea" },
            ],
            newItem: () => ({ title: "Novo bloco", desc: "" }),
            group: "Seção Membros",
          },

          { path: "routine.eyebrow", label: "Rótulo", type: "text", group: "Seção Rotina" },

          { path: "selection.eyebrow", label: "Rótulo", type: "text", group: "Seção Processo Seletivo" },
          { path: "selection.title", label: "Título", type: "text", group: "Seção Processo Seletivo" },
          { path: "selection.text", label: "Texto", type: "textarea", group: "Seção Processo Seletivo" },
          {
            path: "selection.steps",
            label: "Etapas",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "title", label: "Título", type: "text" },
              { path: "desc", label: "Descrição", type: "textarea" },
            ],
            newItem: () => ({ title: "Nova etapa", desc: "" }),
            group: "Seção Processo Seletivo",
          },
          { path: "selection.whenLabel", label: "Rótulo do card de datas", type: "text", group: "Seção Processo Seletivo" },
          { path: "selection.whenTitle", label: "Título do card de datas", type: "text", group: "Seção Processo Seletivo" },
          { path: "selection.whenText", label: "Texto do card de datas", type: "textarea", group: "Seção Processo Seletivo" },
          { path: "selection.instagramNote", label: "Observação sobre inscrições", type: "text", group: "Seção Processo Seletivo" },

          { path: "volunteer.tabLabel", label: "Faixa da seção", type: "text", group: "Seção Voluntários" },
          { path: "volunteer.eyebrow", label: "Rótulo", type: "text", group: "Seção Voluntários" },
          { path: "volunteer.title", label: "Título", type: "text", group: "Seção Voluntários" },
          { path: "volunteer.paragraphs", label: "Parágrafos", type: "textList", group: "Seção Voluntários" },

          { path: "opportunities.eyebrow", label: "Rótulo", type: "text", group: "Seção Voluntariado por Projeto" },
          { path: "opportunities.title", label: "Título", type: "text", group: "Seção Voluntariado por Projeto" },
        ],
      },
      {
        id: "routine",
        label: "Rotina do membro",
        kind: "single",
        path: "memberRoutine",
        fields: [
          { path: "title", label: "Título da seção", type: "text" },
          {
            path: "steps",
            label: "Etapas",
            type: "objectList",
            itemLabel: "title",
            fields: [
              { path: "title", label: "Título", type: "text" },
              { path: "desc", label: "Descrição", type: "textarea" },
            ],
            newItem: () => ({ _key: uid("step"), title: "Nova etapa", desc: "" }),
          },
        ],
      },
    ],
  },

  {
    id: "settings",
    label: "Contato e Redes",
    hint: "Usado no rodapé e no botão do Instagram.",
    panels: [
      {
        id: "settings-main",
        label: "Contato",
        kind: "single",
        path: "siteSettings",
        fields: [
          { path: "instagramHandle", label: "Instagram (sem @)", type: "text" },
          { path: "linkedinUrl", label: "LinkedIn (URL)", type: "text" },
          { path: "contactEmail", label: "E-mail de contato", type: "text" },
        ],
      },
    ],
  },
];
