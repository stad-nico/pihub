import { Injectable, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { Subject } from 'rxjs';
import { ActionTest } from './action';

@Injectable({ providedIn: 'root' })
export class PiHubApiImpl implements PiHubApi {
	private readonly store: Store;

	private readonly rootComponentSubject = new Subject<Type<unknown>>();

	public readonly rootComponent$ = this.rootComponentSubject.asObservable();

	constructor(store: Store) {
		this.store = store;
	}

	public overrideRootComponent<T>(component: Type<T>): void {
		this.store.dispatch(new ActionTest(component));
	}
}
