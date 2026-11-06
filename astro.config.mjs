// SPDX-FileCopyrightText: 2026 Nubian Ibex and IbexWall contributors
// SPDX-License-Identifier: GPL-3.0-or-later
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.ibexwall.com',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'IbexWall',
      description: 'Documentation of IbexWall, the security center for Linux.',
      logo: { src: './src/assets/logo.png', alt: '' },
      favicon: '/favicon.png',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/nubian-ibex/ibexwall' }],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR' },
        es: { label: 'Español', lang: 'es' },
        fr: { label: 'Français', lang: 'fr' },
        de: { label: 'Deutsch', lang: 'de' },
      },
      customCss: ['./src/styles/custom.css'],
      editLink: { baseUrl: 'https://github.com/nubian-ibex/ibexwall-docs/edit/main/' },
      lastUpdated: false,
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.ibexwall.com/og.png' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
      sidebar: [
        { label: 'Getting started', translations: { 'pt-BR': 'Primeiros passos', es: 'Primeros pasos', fr: 'Pour commencer', de: 'Erste Schritte' }, autogenerate: { directory: 'getting-started' } },
        { label: 'Concepts', translations: { 'pt-BR': 'Conceitos', es: 'Conceptos', fr: 'Concepts', de: 'Konzepte' }, autogenerate: { directory: 'concepts' } },
        { label: 'Guides', translations: { 'pt-BR': 'Guias', es: 'Guías', fr: 'Guides', de: 'Anleitungen' }, autogenerate: { directory: 'guides' } },
        { label: 'Reference', translations: { 'pt-BR': 'Referência', es: 'Referencia', fr: 'Référence', de: 'Referenz' }, autogenerate: { directory: 'reference' } },
        { label: 'Contributing', translations: { 'pt-BR': 'Contribuir', es: 'Contribuir', fr: 'Contribuer', de: 'Mitwirken' }, autogenerate: { directory: 'contributing' } },
        { label: 'FAQ', translations: { 'pt-BR': 'Perguntas frequentes', es: 'Preguntas frecuentes', fr: 'Questions fréquentes', de: 'Häufige Fragen' }, link: '/faq/' },
      ],
    }),
  ],
});
