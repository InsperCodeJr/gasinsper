import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membro da Gestão',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Cargo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram (handle, sem @)',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn (URL)',
      type: 'url',
    }),
    defineField({
      name: 'area',
      title: 'Área',
      type: 'reference',
      to: { type: 'area' },
    }),
    defineField({
      name: 'isMatrix',
      title: 'É da Matriz?',
      type: 'boolean',
      initialValue: false,
      description: 'Marque se este membro faz parte da estrutura matricial (diretoria/presidência)',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
    }),
  ],
})
