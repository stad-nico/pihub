import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: ['./**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/addon-interactions', 'storybook-css-modules'],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	staticDirs: [{ from: '../src/assets', to: '/assets' }],
};
export default config;
