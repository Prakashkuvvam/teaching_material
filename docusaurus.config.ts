import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DevOps Learning Hub',
  tagline: 'Free guides for AWS, Docker, Kubernetes, Terraform and more — all taught through simple, real-world analogies',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://prakashkuvvam.github.io',
  baseUrl: '/teaching_material/',

  organizationName: 'prakashkuvvam',
  projectName: 'teaching_material',

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    '@docusaurus/theme-mermaid',
    'docusaurus-lunr-search',
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aws',
        path: 'docs/aws',
        routeBasePath: 'docs/aws',
        sidebarPath: './sidebars.aws.ts',
        editUrl: 'https://github.com/prakashkuvvam/teaching_material/edit/main/',
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'kubernetes',
        path: 'docs/kubernetes',
        routeBasePath: 'docs/kubernetes',
        sidebarPath: './sidebars.k8s.ts',
        editUrl: 'https://github.com/prakashkuvvam/teaching_material/edit/main/',
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docker',
        path: 'docs/docker',
        routeBasePath: 'docs/docker',
        sidebarPath: './sidebars.docker.ts',
        editUrl: 'https://github.com/prakashkuvvam/teaching_material/edit/main/',
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'terraform',
        path: 'docs/terraform',
        routeBasePath: 'docs/terraform',
        sidebarPath: './sidebars.terraform.ts',
        editUrl: 'https://github.com/prakashkuvvam/teaching_material/edit/main/',
        breadcrumbs: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'DevOps Learning Hub',
      logo: {
        alt: 'DevOps Learning Hub',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/aws/chapter-01-what-is-cloud-computing', label: '☁️ AWS', position: 'left'},
        {to: '/docs/docker/', label: '🐳 Docker', position: 'left'},
        {to: '/docs/kubernetes/chapter-01-the-big-picture', label: '⚓ K8s', position: 'left'},
        {to: '/docs/terraform/', label: '🏗️ Terraform', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Courses',
          items: [
            {label: '☁️ AWS', to: '/docs/aws/chapter-01-what-is-cloud-computing'},
            {label: '🐳 Docker', to: '/docs/docker/'},
            {label: '⚓ Kubernetes', to: '/docs/kubernetes/chapter-01-the-big-picture'},
            {label: '🏗️ Terraform', to: '/docs/terraform/'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/prakashkuvvam/teaching_material',
            },
          ],
        },
      ],
      copyright: `Built with Docusaurus. © ${new Date().getFullYear()} prakashkuvvam`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'hcl'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
