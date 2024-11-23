import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Plugin } from '@pihub/common';
import { Observable } from 'rxjs';
import { FetchPlugins, InstallPlugin, LoadPlugin, UninstallPlugin } from 'src/app/core/state/core.actions';
import { CoreState } from 'src/app/core/state/core.state';

@Injectable({ providedIn: 'root' })
export class CoreService {
	private readonly store: Store;

	public constructor(store: Store) {
		this.store = store;
	}

	public fetchPlugins(): Observable<void> {
		return this.store.dispatch(new FetchPlugins());
	}

	public getPlugins(): Observable<Array<Plugin>> {
		return this.store.select(CoreState.getPlugins);
	}

	public getInstalledPlugins(): Observable<Array<Plugin>> {
		return this.store.select(CoreState.getInstalledPlugins);
	}

	public uninstallPlugin(pluginId: string): Observable<void> {
		return this.store.dispatch(new UninstallPlugin(pluginId));
	}

	public installPlugin(pluginId: string): Observable<void> {
		return this.store.dispatch(new InstallPlugin(pluginId));
	}

	public loadPlugin(pluginId: string): Observable<void> {
		return this.store.dispatch(new LoadPlugin(pluginId));
	}
}
