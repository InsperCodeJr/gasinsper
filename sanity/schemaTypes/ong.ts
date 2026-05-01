import { defineField, defineType } from 'sanity'

export const ong = defineType({
  name: 'ong',
  title: 'ONG',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da ONG',
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
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
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
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
  ],
})
