import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppendItem, Navigate, NavigateRoot } from 'src/app/features/navigation/state/navigation.actions';
import { NavigationItem, NavigationState } from 'src/app/features/navigation/state/navigation.state';

@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly store: Store;

	public constructor(store: Store) {
		this.store = store;
	}

	public getItems(): Observable<Array<NavigationItem>> {
		return this.store.select(NavigationState.getItems);
	}

	public getSelected(): Observable<NavigationItem | undefined> {
		return this.store.select(NavigationState.getSelected);
	}

	public navigate(title: string): Observable<void> {
		return this.store.dispatch(new Navigate(title));
	}

	public appendItem(item: NavigationItem): Observable<void> {
		return this.store.dispatch(new AppendItem(item));
	}

	public navigateRoot(): Observable<void> {
		return this.store.dispatch(new NavigateRoot());
	}
}
