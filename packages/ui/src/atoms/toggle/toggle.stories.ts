import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { State, ToggleComponent } from 'src/atoms/toggle/toggle.component';

const meta: Meta<ToggleComponent> = {
	title: 'Design System/Atoms/Toggle',
	component: ToggleComponent,
	argTypes: {
		onToggle: { action: 'onToggle' },
	},
	render: (args) => ({
		props: args,
		template: `
			<div style='width: 100px; resize: both; overflow: hidden'>
				<pihub-toggle ${argsToTemplate(args)}></pihub-toggle>
			</div>
		`,
	}),
};

export default meta;

export const Off: StoryObj<ToggleComponent> = {
	args: {
		state: State.Off,
	},
};

export const On: StoryObj<ToggleComponent> = {
	args: {
		state: State.On,
	},
};

export const Disabled: StoryObj<ToggleComponent> = {
	args: {
		state: State.Disabled,
	},
};
