import { Component, HostBinding, Input } from '@angular/core';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

export interface CategoryListItem {
	title: string;
	icon: string;
}

@Component({
	selector: 'category-list-item',
	templateUrl: './category-list-item.component.html',
	styleUrl: './category-list-item.component.scss',
	standalone: true,
	imports: [IconComponent],
})
export class CategoryListItemComponent {
	@Input({ required: true })
	data!: CategoryListItem;

	@Input({ required: true })
	@HostBinding('class.navigation-collapsed')
	isNavigationCollapsed!: boolean;
}
