import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationCategory } from 'src/app/features/navigation/components/pure-navigation/components/navigation-category/navigation-category.component';
import { NavigationState } from 'src/app/features/navigation/state/navigation.state';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	private readonly store: Store;

	public constructor(store: Store) {
		this.store = store;
	}

	public getCategories(): Observable<Array<NavigationCategory>> {
		return this.store.select(NavigationState.getCategories);
	}
}
