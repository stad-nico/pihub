import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SelectTab, Unselect } from './state/settings.action';
import { SettingsState, Tab } from './state/settings.state';

@Injectable({ providedIn: 'root' })
export class SettingsService {
	private readonly store: Store;

	public constructor(store: Store) {
		this.store = store;
	}

	public getTabs(): Observable<Array<Tab>> {
		return this.store.select(SettingsState.getTabs);
	}

	public getSelected(): Observable<Tab | undefined> {
		return this.store.select(SettingsState.getSelected);
	}

	public selectTab(tab: Tab, route: ActivatedRoute): Observable<void> {
		return this.store.dispatch(new SelectTab(tab, route));
	}

	public unselect(): Observable<void> {
		return this.store.dispatch(new Unselect());
	}
}
