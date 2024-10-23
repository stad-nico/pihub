import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationCategory } from '../../../../../../api';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';

@Component({
	selector: 'ui-plugin-navigation-category',
	standalone: true,
	imports: [NavigationItemComponent],
	templateUrl: './navigation-category.component.html',
	styleUrl: './navigation-category.component.scss',
})
export class NavigationCategoryComponent {
	@Input({ required: true })
	public category!: NavigationCategory;

	@Output()
	public onClick: EventEmitter<{ categoryTitle: string; itemTitle: string }> = new EventEmitter();

	public onClickHandler(itemTitle: string) {
		this.onClick.emit({ categoryTitle: this.category.title, itemTitle: itemTitle });
	}
}
