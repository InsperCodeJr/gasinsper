import { defineField, defineType } from 'sanity'

export const homeMetrics = defineType({
  name: 'homeMetrics',
  title: 'Home - Nossos Números',
  type: 'document',
  fields: [
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
