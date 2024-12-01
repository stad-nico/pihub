import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CheckboxComponent, State as CheckboxState } from '../../atoms/checkbox/checkbox.component';
import { BoxComponent, Style as BoxStyle } from '../box/box.component';

export enum State {
	Default = 'default',
	Selected = 'selected',
}

@Component({
	standalone: true,
	selector: 'pihub-selectable-box',
	templateUrl: './selectable-box.component.html',
	styleUrl: './selectable-box.component.scss',
	imports: [CheckboxComponent, BoxComponent],
})
export class SelectableBoxCompoennt {
	public boxStyle = BoxStyle.Default;

	@Input({ required: true })
	public title!: string;

	@Input()
	public iconUrl: string | undefined = undefined;

	@Input()
	public state: State = State.Default;

	@Output()
	public onClick: EventEmitter<void> = new EventEmitter();

	@HostListener('click')
	public onClickHandler() {
		this.onClick.emit();
	}

	@HostBinding('class')
	public get className() {
		return this.state;
	}

	public getBoxState() {
		return this.state;
	}

	public getCheckboxState() {
		return this.state === State.Selected ? CheckboxState.Checked : CheckboxState.Unchecked;
	}
}
