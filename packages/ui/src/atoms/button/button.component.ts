import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IconComponent, IconSize } from '../../atoms/icon';

export enum State {
	Default = 'default',
	Disabled = 'disabled',
}

@Component({
	standalone: true,
	selector: 'pihub-button',
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
	imports: [IconComponent],
})
export class ButtonComponent {
	public readonly iconSize = IconSize;

	@Input({ required: true })
	public title!: string;

	@Input()
	public state: State = State.Default;

	@Input()
	public iconUrl: string | undefined = undefined;

	@Output()
	public onClick: EventEmitter<void> = new EventEmitter();

	@HostBinding('class')
	public get className() {
		return [this.state, this.iconUrl ? 'has-icon' : null].join(' ');
	}

	@HostListener('click')
	public onClickHandler() {
		if (this.state !== State.Disabled) {
			this.onClick.emit();
		}
	}
}
