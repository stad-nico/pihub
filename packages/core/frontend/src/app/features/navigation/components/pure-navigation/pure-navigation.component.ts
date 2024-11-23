import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ListComponent, ListItem } from '@pihub/ui';

@Component({
	selector: 'pure-navigation',
	standalone: true,
	templateUrl: './pure-navigation.component.html',
	styleUrl: './pure-navigation.component.scss',
	imports: [ListComponent],
})
export class PureNavigationComponent {
	@Input({ required: true })
	public items: Array<ListItem> = [];

	@Input({ required: true })
	public selected: ListItem | undefined = undefined;

	@Output()
	public onClick: EventEmitter<ListItem> = new EventEmitter();

	@Output()
	public onHeaderClick: EventEmitter<void> = new EventEmitter();

	public onClickHandler(item: ListItem) {
		this.onClick.emit(item);
	}
}
