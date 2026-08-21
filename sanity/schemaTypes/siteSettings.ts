import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações Gerais — Contato e Redes Sociais',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Configurações Gerais (Contato e Redes Sociais)' }
    },
  },
  fields: [
    defineField({
      name: 'instagramHandle',
      title: 'Instagram do GAS',
      description: 'Usado no rodapé e no botão "Acompanhe o @..." em Como Fazer Parte (sem o @). Ex: gas.insper',
      type: 'string',
      initialValue: 'gas.insper',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn do GAS',
      description: 'URL completa da página do LinkedIn, usada no rodapé.',
      type: 'url',
      initialValue: 'https://linkedin.com',
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-mail de Contato',
      description: 'Usado no rodapé do site.',
      type: 'string',
      initialValue: 'contato@gas.org.br',
    }),
  ],
})
