import type { Meta, StoryObj } from '@storybook/angular';
import { SelectableBoxCompoennt, State } from 'src/molecules/selectable-box/selectable-box.component';

const meta: Meta<SelectableBoxCompoennt> = {
	title: 'Design System/Molecules/Selectable Box',
	component: SelectableBoxCompoennt,
	argTypes: {
		onClick: { action: 'onClick' },
	},
};

export default meta;

export const Default: StoryObj<SelectableBoxCompoennt> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Default,
	},
};

export const Selected: StoryObj<SelectableBoxCompoennt> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Selected,
	},
};
