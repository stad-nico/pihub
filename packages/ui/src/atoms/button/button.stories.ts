import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent, State } from 'src/atoms/button/button.component';

const meta: Meta<ButtonComponent> = {
	title: 'Design System/Atoms/Button',
	component: ButtonComponent,
	argTypes: {
		onClick: { action: 'onClick' },
	},
};

export default meta;

export const Default: StoryObj<ButtonComponent> = {
	args: {
		title: 'Button',
		state: State.Default,
	},
};

export const Disabled: StoryObj<ButtonComponent> = {
	args: {
		title: 'Button',
		state: State.Disabled,
	},
};

export const Icon: StoryObj<ButtonComponent> = {
	args: {
		title: 'Button',
		state: State.Default,
		iconUrl: 'assets/icons/dashboard.svg',
	},
};

export const IconDisabled: StoryObj<ButtonComponent> = {
	args: {
		title: 'Button',
		state: State.Disabled,
		iconUrl: 'assets/icons/dashboard.svg',
	},
};
