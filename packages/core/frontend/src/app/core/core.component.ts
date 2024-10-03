import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PluginInfo } from '@pihub/openapi';

import { NavigationComponent } from 'src/app/features/navigation/navigation.component';
import { PluginsActions } from './state/plugins.actions';
import { PluginModel, PluginsState } from './state/plugins.state';

@Component({
	selector: 'core',
	templateUrl: './core.component.html',
	styleUrl: './core.component.css',
	standalone: true,
	imports: [NavigationComponent],
})
export class CoreComponent {
	@ViewChild('container', { read: ViewContainerRef })
	private readonly viewContainerRef: ViewContainerRef;

	private readonly store: Store;

	private readonly availablePlugins$: Observable<Array<PluginModel>>;

	private readonly activatedPlugins$: Observable<Array<PluginModel>>;

	activatedPlugins: Array<PluginModel> = [];

	availablePlugins: Array<PluginModel> = [];

	constructor(viewContainerRef: ViewContainerRef, store: Store) {
		this.viewContainerRef = viewContainerRef;
		this.store = store;

		this.availablePlugins$ = store.select(PluginsState.getPlugins);
		this.activatedPlugins$ = store.select(PluginsState.getInstalledPlugins);
	}

	ngOnInit() {
		this.availablePlugins$.subscribe((availablePlugins) => (this.availablePlugins = availablePlugins));

		this.activatedPlugins$.subscribe((activatedPlugins) => {
			this.viewContainerRef.clear();

			for (const plugin of activatedPlugins) {
				if (!plugin.module) {
					continue;
				}

				this.viewContainerRef.createComponent(plugin.module.AppComponent);
			}
		});

		this.store.dispatch(new PluginsActions.FetchPlugins());
	}

	install(plugin: PluginInfo) {
		this.store.dispatch(new PluginsActions.Install(plugin.id));
	}

	uninstall(plugin: PluginInfo) {
		this.store.dispatch(new PluginsActions.Uninstall(plugin.id));
	}
}
