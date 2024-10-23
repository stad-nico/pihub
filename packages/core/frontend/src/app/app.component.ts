import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { Plugin } from 'generated';
import { Observable } from 'rxjs';
import { PiHubApiImpl } from './api';
import { AppState, FetchPlugins, LoadPlugin } from './store';

@Component({
	selector: 'app',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet],
	providers: [{ provide: PiHubApi, useClass: PiHubApiImpl }],
})
export class AppComponent {
	private readonly store: Store;

	private readonly installedPlugins$: Observable<Array<Plugin>>;

	constructor(store: Store) {
		this.store = store;

		this.installedPlugins$ = this.store.select(AppState.selectInstalledPlugins);
	}

	ngOnInit() {
		this.store.dispatch(new FetchPlugins());

		this.installedPlugins$.subscribe((plugins) => {
			this.store.dispatch(plugins.map((plugin) => new LoadPlugin(plugin.id)));
		});
	}
}
