import { defineField, defineType } from 'sanity'

export const area = defineType({
  name: 'area',
  title: 'Área',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Área',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição da Atuação',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número para ordenar as áreas (1, 2, 3, 4)',
    }),
  ],
})
