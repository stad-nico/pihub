import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export enum State {
	Off = 'off',
	On = 'on',
	Disabled = 'disabled',
}

@Component({
	standalone: true,
	selector: 'pihub-toggle',
	templateUrl: './toggle.component.html',
	styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
	@Input()
	public state: State = State.Off;

	@Output()
	public readonly onToggle: EventEmitter<void> = new EventEmitter();

	@HostBinding('class')
	public get className() {
		return this.state;
	}

	@HostListener('click')
	private onClick() {
		this.onToggle.emit();
	}
}
