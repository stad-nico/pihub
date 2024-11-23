import type { Meta, StoryObj } from '@storybook/angular';
import { MasterDetailComponent } from 'src/templates/master-detail/master-detail.component';

const meta: Meta<MasterDetailComponent> = {
	title: 'Design System/Templates/Master Detail',
	component: MasterDetailComponent,
};

export default meta;

export const Default: StoryObj<MasterDetailComponent> = {
	args: {
		items: [
			{ title: 'Dashboard', iconUrl: 'assets/icons/dashboard.svg' },
			{ title: 'Settings', iconUrl: 'assets/icons/dashboard.svg' },
			{ title: 'Help', iconUrl: 'assets/icons/dashboard.svg' },
		],
	},
};

export const Selected: StoryObj<MasterDetailComponent> = {
	args: {
		items: [
			{ title: 'Dashboard', iconUrl: 'assets/icons/dashboard.svg' },
			{ title: 'Settings', iconUrl: 'assets/icons/dashboard.svg' },
			{ title: 'Help', iconUrl: 'assets/icons/dashboard.svg' },
		],
		selected: { title: 'Dashboard', iconUrl: 'assets/icons/dashboard.svg' },
	},
};
