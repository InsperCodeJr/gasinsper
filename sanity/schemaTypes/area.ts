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
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
