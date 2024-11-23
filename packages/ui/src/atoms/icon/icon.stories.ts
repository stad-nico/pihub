import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent, Size } from 'src/atoms/icon/icon.component';

const meta: Meta<IconComponent> = {
	title: 'Design System/Atoms/Icon',
	component: IconComponent,
};

export default meta;

export const Default: StoryObj<IconComponent> = {
	args: {
		url: 'assets/icons/dashboard.svg',
		size: Size.Default,
	},
};

export const Small: StoryObj<IconComponent> = {
	args: {
		url: 'assets/icons/dashboard.svg',
		size: Size.Small,
	},
};
