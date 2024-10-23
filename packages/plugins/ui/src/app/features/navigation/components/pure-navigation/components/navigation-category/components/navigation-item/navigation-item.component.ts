import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NavigationItem } from '../../../../../../../../api';

@Component({
	selector: 'ui-plugin-navigation-item',
	standalone: true,
	imports: [],
	templateUrl: './navigation-item.component.html',
	styleUrl: './navigation-item.component.scss',
})
export class NavigationItemComponent {
	@Input({ required: true })
	public item!: NavigationItem;

	@Output()
	public onClick: EventEmitter<string> = new EventEmitter();

	@HostListener('click')
	public onClickHandler() {
		this.onClick.emit(this.item.title);
	}
}
