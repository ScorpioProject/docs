// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Plugins
import starlightSidebarTopics from 'starlight-sidebar-topics';

// https://astro.build/config
export default defineConfig({
  site: 'https://scorpioproject.github.io',
  base: '/docs',
  integrations: [
		starlight({
			title: 'ScorpioBot',
			description: 'Documentation for the Scorpio project.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ScorpioProject/bot' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/GvyuDDFeZU' }
			],
			plugins: [
				starlightSidebarTopics([
					{
						label: 'Guides',
						link: '/guides',
						icon: 'open-book',
						items: [
							'guides',
              {
                label: 'Getting Started',
                items: [
                  'guides/setup/prerequisites',
                  'guides/setup/app',
                  'guides/setup/install',
                  'guides/setup/configuration',
                  'guides/setup/startup',
                ]
              },
              {
                label: 'Developer Guide',
                items: [
                  'guides/developer',
                  'guides/developer/events',
                  'guides/developer/commands',
                  'guides/developer/configs',
                  'guides/developer/languages',
                ],
              }
						],
					},
          {
            label: 'Community',
            link: '/community',
            icon: 'comment',
            items: [
              {
                label: 'Introduction',
                items: [
                  'community',
                  'community/guidelines',
                  'community/marketplaces'
                ],
              },
            ]
          },
					{
						label: 'Reference',
						link: '/reference',
						icon: 'information',
						items: [
							'reference'
						]
					},
				]),
			],
		}),
	],
});
