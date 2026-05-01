import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Parceiro',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Parceiro',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição da Atuação',
      type: 'text',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'isHistorical',
      title: 'É Parceiro Histórico?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
