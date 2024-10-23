import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { AppendCategory, AppendItem } from '../features/navigation/state/navigation.action';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface NavigationCategory {
	readonly title: string;

	readonly items: Array<NavigationItem>;
}

export interface NavigationItem {
	readonly title: string;

	readonly pageComponent: Type<unknown>;
}

export interface UiPluginApi {
	appendNavigationCategory(category: PartialBy<NavigationCategory, 'items'>): void;

	appendNavigationItem(categoryName: string, item: NavigationItem): void;
}

export const UiPluginApi = new InjectionToken<UiPluginApi>('UiPluginApi');

@Injectable()
export class UiPluginApiImpl implements UiPluginApi {
	private readonly store: Store;

	private readonly api: PiHubApi;

	public constructor(store: Store, @Inject(PiHubApi) api: PiHubApi) {
		this.store = store;
		this.api = api;
	}

	appendNavigationCategory(category: PartialBy<NavigationCategory, 'items'>): void {
		this.store.dispatch(new AppendCategory({ items: category.items ?? [], ...category }));
	}

	appendNavigationItem(categoryName: string, item: NavigationItem): void {
		this.api.updateRoute('', {
			children: [
				{
					path: `${item.title}`,
					component: item.pageComponent,
				},
			],
		});

		this.store.dispatch(new AppendItem(categoryName, item));
	}
}
