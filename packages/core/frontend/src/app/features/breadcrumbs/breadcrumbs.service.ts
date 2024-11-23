import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Breadcrumb } from '@pihub/api';
import { Observable, Subject } from 'rxjs';
import { AddCrumb, SetCrumbs } from 'src/app/features/breadcrumbs/state/breadcrumbs.actions';
import { BreadcrumbsState } from 'src/app/features/breadcrumbs/state/breadcrumbs.state';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
	private readonly store: Store;

	private readonly crumbsClickSubject: Subject<number> = new Subject();

	public readonly crumbsClick$: Observable<number> = this.crumbsClickSubject.asObservable();

	public constructor(store: Store) {
		this.store = store;
	}

	public getCrumbs(): Observable<Array<Breadcrumb>> {
		return this.store.select(BreadcrumbsState.getCrumbs);
	}

	public setBreadcrumbs(titles: Array<string>): Observable<void> {
		return this.store.dispatch(new SetCrumbs(titles));
	}

	public addBreadcrumb(title: string): Observable<void> {
		return this.store.dispatch(new AddCrumb(title));
	}

	public crumbClick(id: number) {
		this.crumbsClickSubject.next(id);
	}
}
