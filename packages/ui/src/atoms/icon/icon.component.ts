import { Component, ElementRef, HostBinding, Input } from '@angular/core';

export enum Size {
	Default = 'default',
	Small = 'small',
	ExtraSmall = 'extra-small',
}

@Component({
	standalone: true,
	selector: 'pihub-icon',
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	@Input({ required: true })
	public url!: string;

	@Input()
	public size: Size = Size.Default;

	constructor(public elementRef: ElementRef) {}

	public async ngOnInit() {
		const response = await fetch(this.url);

		this.elementRef.nativeElement.innerHTML = await response.text();
	}

	@HostBinding('class')
	public get className() {
		return this.size;
	}
}
