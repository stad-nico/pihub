import { Component, HostBinding, Input } from '@angular/core';
import {
	CategoryListItem,
	CategoryListItemComponent,
} from 'src/app/features/navigation/components/pure-navigation/components/navigation-category/components/category-list-item/category-list-item.component';

export interface NavigationCategory {
	id: string;
	items: Array<CategoryListItem>;
}

@Component({
	selector: 'navigation-category',
	templateUrl: './navigation-category.component.html',
	styleUrl: './navigation-category.component.scss',
	standalone: true,
	imports: [CategoryListItemComponent],
})
export class NavigationCategoryComponent {
	@Input({ required: true })
	data!: NavigationCategory;

	@Input({ required: true })
	@HostBinding('class.navigation-collapsed')
	isNavigationCollapsed!: boolean;
}
