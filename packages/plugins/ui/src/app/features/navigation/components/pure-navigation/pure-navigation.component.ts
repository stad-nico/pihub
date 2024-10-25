import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationCategory } from '../../../../../api';
import { LastSelectedModel } from '../../state/navigation.state';
import { NavigationCategoryComponent } from './components/navigation-category/navigation-category.component';

@Component({
	selector: 'ui-plugin-pure-navigation',
	standalone: true,
	imports: [NavigationCategoryComponent],
	templateUrl: './pure-navigation.component.html',
	styleUrl: './pure-navigation.component.scss',
})
export class PureNavigationComponent {
	@Input({ required: true })
	public categories: Array<NavigationCategory> = [];

	@Input({ required: true })
	public lastSelected: LastSelectedModel | null = null;

	@Output()
	public onClick: EventEmitter<{ categoryTitle: string; itemTitle: string }> = new EventEmitter();

	public onClickHandler(event: { categoryTitle: string; itemTitle: string }) {
		this.onClick.emit(event);
	}
}
