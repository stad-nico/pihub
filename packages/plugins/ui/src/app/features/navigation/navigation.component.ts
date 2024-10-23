import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationCategory } from '../../api';
import { PureNavigationComponent } from './components/pure-navigation/pure-navigation.component';
import { Navigate } from './state/navigation.action';
import { NavigationState } from './state/navigation.state';

@Component({
	selector: 'ui-plugin-navigation',
	standalone: true,
	imports: [PureNavigationComponent],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
	private readonly store: Store;

	private readonly categories$: Observable<Array<NavigationCategory>>;

	public categories: Array<NavigationCategory> = [];

	public constructor(store: Store) {
		this.store = store;

		this.categories$ = this.store.select(NavigationState.getCategories);
	}

	public ngOnInit() {
		this.categories$.subscribe((categories) => (this.categories = categories));
	}

	public onClickHandler(event: { categoryTitle: string; itemTitle: string }) {
		this.store.dispatch(new Navigate(event));
	}
}
