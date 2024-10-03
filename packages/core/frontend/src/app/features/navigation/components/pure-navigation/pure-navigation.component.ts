import { Component, HostBinding, Input } from '@angular/core';
import {
	NavigationCategory,
	NavigationCategoryComponent,
} from 'src/app/features/navigation/components/pure-navigation/components/navigation-category/navigation-category.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

@Component({
	selector: 'pure-navigation',
	templateUrl: './pure-navigation.component.html',
	styleUrl: './pure-navigation.component.scss',
	standalone: true,
	imports: [NavigationCategoryComponent, IconComponent],
})
export class PureNavigationComponent {
	@Input({ required: true })
	categories!: Array<NavigationCategory>;

	@Input({ required: true })
	@HostBinding('class.collapsed')
	isCollapsed!: boolean;
}
