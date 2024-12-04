import { type Meta, type StoryObj } from '@storybook/angular';
import { BoxComponent, State, Style } from 'src/molecules/box/box.component';

const meta: Meta<BoxComponent> = {
	title: 'Design System/Molecules/Box',
	component: BoxComponent,
	argTypes: {
		onClick: { action: 'onClick' },
	},
};

export default meta;

export const Default: StoryObj<BoxComponent> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Default,
		style: Style.Default,
	},
};

export const Selected: StoryObj<BoxComponent> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Selected,
		style: Style.Default,
	},
};

export const Slim: StoryObj<BoxComponent> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Default,
		style: Style.Slim,
	},
};

export const SlimSelected: StoryObj<BoxComponent> = {
	args: {
		title: 'Box',
		iconUrl: 'assets/icons/dashboard.svg',
		state: State.Selected,
		style: Style.Slim,
	},
};
