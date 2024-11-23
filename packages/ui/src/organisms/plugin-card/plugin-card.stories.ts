import type { Meta, StoryObj } from '@storybook/angular';
import { PluginCardComponent } from 'src/organisms/plugin-card/plugin-card.component';

const meta: Meta<PluginCardComponent> = {
	title: 'Design System/Organisms/Plugin Card',
	component: PluginCardComponent,
	argTypes: {
		onInstallClick: { action: 'onInstallClick' },
		onUninstallClick: { action: 'onUninstallClick' },
	},
};

export default meta;

export const Default: StoryObj<PluginCardComponent> = {
	args: {
		imageSource: './assets/images/example-plugin.jpg',
		title: 'Example Plugin',
		description: 'This is an example description. See how this looks with short text.',
		version: 'v1.0.0',
	},
};

export const LongDescription: StoryObj<PluginCardComponent> = {
	args: {
		imageSource: './assets/images/example-plugin.jpg',
		title: 'Example Plugin',
		description:
			'This is a very long description that need multiple lines and should be truncated correctly. It would be nice if there is a "View More" button if the text is really this long.',
		version: 'v1.0.0',
	},
};

export const NoImage: StoryObj<PluginCardComponent> = {
	args: {
		title: 'Settings',
		description:
			'This is a very long description that need multiple lines and should be truncated correctly. It would be nice if there is a "View More" button if the text is really this long.',
		version: 'v1.0.0',
	},
};

export const Installed: StoryObj<PluginCardComponent> = {
	args: {
		title: 'Settings',
		isInstalled: true,
		description:
			'This is a very long description that need multiple lines and should be truncated correctly. It would be nice if there is a "View More" button if the text is really this long.',
		version: 'v1.0.0',
	},
};

export const Core: StoryObj<PluginCardComponent> = {
	args: {
		title: 'Settings',
		isInstalled: true,
		isCore: true,
		description:
			'This is a very long description that need multiple lines and should be truncated correctly. It would be nice if there is a "View More" button if the text is really this long.',
		version: 'v1.0.0',
	},
};
