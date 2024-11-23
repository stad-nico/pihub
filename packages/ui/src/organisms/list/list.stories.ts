import type { Meta, StoryObj } from '@storybook/angular';
import { ListComponent } from 'src/organisms/list/list.component';

const meta: Meta<ListComponent> = {
	title: 'Design System/Organisms/List',
	component: ListComponent,
	argTypes: {
		onClick: { action: 'onClick' },
	},
};

export default meta;

const items = [
	{ title: 'Dashboard', iconUrl: 'assets/icons/dashboard.svg' },
	{ title: 'Settings', iconUrl: 'assets/icons/dashboard.svg' },
	{ title: 'Help', iconUrl: 'assets/icons/dashboard.svg' },
];

export const Default: StoryObj<ListComponent> = {
	args: {
		items: items,
	},
};

export const Selected: StoryObj<ListComponent> = {
	args: {
		items: items,
		selected: items[0],
	},
};
