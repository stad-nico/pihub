import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IconComponent, IconSize } from '../../atoms/icon';

export enum State {
	Default = 'default',
	Selected = 'selected',
}

export enum Style {
	Default = 'default',
	Slim = 'slim',
}

@Component({
	standalone: true,
	selector: 'pihub-box',
	templateUrl: './box.component.html',
	styleUrl: './box.component.scss',
	imports: [IconComponent],
})
export class BoxComponent {
	public readonly iconSize = IconSize;

	@Input({ required: true })
	public title!: string;

	@Input()
	public iconUrl: string | undefined = undefined;

	@Input()
	public state: State = State.Default;

	@Input()
	public style: Style = Style.Default;

	@Output()
	public onClick: EventEmitter<void> = new EventEmitter();

	@HostListener('click')
	public onClickHandler() {
		this.onClick.emit();
	}

	@HostBinding('class')
	public get className() {
		return `${this.state} ${this.style}`;
	}
}
