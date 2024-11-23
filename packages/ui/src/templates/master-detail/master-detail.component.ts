import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent, ListItem } from '../../organisms';

@Component({
	standalone: true,
	selector: 'pihub-master-detail',
	templateUrl: './master-detail.component.html',
	styleUrl: './master-detail.component.scss',
	imports: [ListComponent, RouterOutlet],
})
export class MasterDetailComponent {
	@Input({ required: true })
	public items: Array<ListItem> = [];

	@Input({ required: true })
	public selected: ListItem | undefined = undefined;

	@Output()
	public onClick: EventEmitter<ListItem> = new EventEmitter();
}
