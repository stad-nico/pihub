import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent, State } from '../../atoms/button/button.component';

@Component({
	standalone: true,
	selector: 'pihub-plugin-card',
	templateUrl: './plugin-card.component.html',
	styleUrl: './plugin-card.component.scss',
	imports: [ButtonComponent],
})
export class PluginCardComponent {
	public readonly buttonState: typeof State = State;

	@Input()
	public imageSource!: string | undefined;

	@Input({ required: true })
	public title!: string;

	@Input({ required: true })
	public description!: string;

	@Input({ required: true })
	public version!: string;

	@Input()
	public isInstalled: boolean = false;

	@Input()
	public isCore: boolean = false;

	@Output()
	public onInstallClick: EventEmitter<void> = new EventEmitter();

	@Output()
	public onUninstallClick: EventEmitter<void> = new EventEmitter();
}
