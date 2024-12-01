import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxComponent, State } from 'src/atoms/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
	title: 'Design System/Atoms/Checkbox',
	component: CheckboxComponent,
	argTypes: {
		onClick: { action: 'onClick' },
	},
	render: (args) => ({
		props: args,
		template: `
			<div style='width: 100px; height: 100px;'>
				<pihub-checkbox ${argsToTemplate(args)}></pihub-checkbox>
			</div>
		`,
	}),
};

export default meta;

export const Unchecked: StoryObj<CheckboxComponent> = {
	args: {
		state: State.Unchecked,
	},
};

export const Checked: StoryObj<CheckboxComponent> = {
	args: {
		state: State.Checked,
	},
};

export const Disabled: StoryObj<CheckboxComponent> = {
	args: {
		state: State.Disabled,
	},
};
