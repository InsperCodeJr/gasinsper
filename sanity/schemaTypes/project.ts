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
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo/Imagem Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galeria de Fotos (Mural)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
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
      title: 'Instagram do Projeto (@)',
      type: 'string',
      description: 'Apenas o handle, sem o @. Ex: gas.mentoria',
    }),
    defineField({
      name: 'partners',
      title: 'Parceiros do Projeto',
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
            { name: 'role', type: 'string', title: 'Papel/Relação com o projeto' },
            { name: 'text', type: 'text', title: 'Texto do Depoimento' },
            { name: 'photo', type: 'image', title: 'Foto', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'cardColor',
      title: 'Cor do Card (hex)',
      type: 'string',
      description: 'Cor de destaque do card deste projeto. Ex: #BB0A24',
    }),
    defineField({
      name: 'volunteerInfo',
      title: 'Informações de Voluntariado',
      type: 'object',
      fields: [
        { name: 'description', type: 'text', title: 'Sobre o Voluntariado neste Projeto' },
        { name: 'opportunities', type: 'text', title: 'Tipo de Atuação' },
        { name: 'process', type: 'text', title: 'Funcionamento do Processo' },
        { name: 'demand', type: 'string', title: 'Demanda Atual (ex: 5 vagas abertas)' },
      ],
    }),
  ],
})
