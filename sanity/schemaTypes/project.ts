import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Projeto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo/Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'objective',
      title: 'Objetivo',
      type: 'text',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Público Impactado',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Números do Projeto',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Rótulo' },
            { name: 'value', type: 'string', title: 'Valor' },
          ],
        },
      ],
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram (@)',
      type: 'string',
    }),
    defineField({
      name: 'partners',
      title: 'Parceiros',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'partner' } }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'author', type: 'string', title: 'Autor' },
            { name: 'text', type: 'text', title: 'Texto' },
            { name: 'photo', type: 'image', title: 'Foto' },
          ],
        },
      ],
    }),
    defineField({
      name: 'volunteerInfo',
      title: 'Informações de Voluntariado',
      type: 'object',
      fields: [
        { name: 'description', type: 'text', title: 'Descrição' },
        { name: 'opportunities', type: 'text', title: 'Tipo de Atuação' },
        { name: 'process', type: 'text', title: 'Funcionamento do Processo' },
      ],
    }),
  ],
})
