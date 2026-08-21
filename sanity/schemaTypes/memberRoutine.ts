import { defineField, defineType } from 'sanity'

export const memberRoutine = defineType({
  name: 'memberRoutine',
  title: 'Como Fazer Parte — Rotina do Membro',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Rotina de um Membro' }
    },
  },
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Título da Seção',
      description: 'Título exibido acima da lista de etapas na página "Como Fazer Parte".',
      type: 'string',
      initialValue: 'Rotina de um Membro',
    }),
    defineField({
      name: 'steps',
      title: 'Etapas da Rotina',
      description: 'Adicione, remova ou reordene as etapas. A numeração (01, 02…) é gerada automaticamente pela ordem dos itens.',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: { title: 'title', subtitle: 'desc' },
          },
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'desc',
              title: 'Descrição',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
