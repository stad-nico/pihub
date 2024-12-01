import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export enum State {
	Unchecked = 'unchecked',
	Checked = 'checked',
	Disabled = 'disabled',
}

@Component({
	standalone: true,
	selector: 'pihub-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
	@Input()
	public state: State = State.Unchecked;

	@Output()
	public readonly onClick: EventEmitter<void> = new EventEmitter();

	@HostBinding('class')
	public get className() {
		return this.state;
	}

	@HostListener('click')
	private onClickHandler() {
		this.onClick.emit();
	}
}
