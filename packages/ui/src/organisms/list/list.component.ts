import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoxComponent, BoxState } from '../../molecules/box';

export interface ListItem {
	readonly title: string;

	readonly iconUrl?: string;
}

@Component({
	standalone: true,
	selector: 'pihub-list',
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
	imports: [BoxComponent],
})
export class ListComponent {
	public readonly boxState = BoxState;

	@Input({ required: true })
	public items: Array<ListItem> = [];

	@Input({ required: true })
	public selected: ListItem | undefined = undefined;

	@Output()
	public onClick: EventEmitter<ListItem> = new EventEmitter();
}
