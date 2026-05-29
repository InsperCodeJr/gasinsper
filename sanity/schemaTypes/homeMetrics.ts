import { defineField, defineType } from 'sanity'

export const homeMetrics = defineType({
  name: 'homeMetrics',
  title: 'Home - Nossos Números',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Home — Números e Vídeo Institucional' }
    },
  },
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'URL do Vídeo Institucional',
      type: 'url',
      description: 'Link do YouTube ou Vimeo para o vídeo da seção Sobre Nós',
    }),
    defineField({
      name: 'manualStats',
      title: 'Números Editáveis',
      description:
        'O número de projetos é automático. Cadastre aqui os demais indicadores.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Valor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
