import { Component } from '@angular/core';
import { PiHubApi } from '@pihub/api';
import { Plugin } from '@pihub/common';
import { PluginCardComponent } from '@pihub/ui';
import { Observable } from 'rxjs';

@Component({
	standalone: true,
	selector: 'plugin-settings-plugins',
	templateUrl: './plugins.component.html',
	styleUrl: './plugins.component.scss',
	imports: [PluginCardComponent],
})
export class PluginsComponent {
	private readonly api: PiHubApi;

	private readonly plugins$: Observable<Array<Plugin>>;

	public plugins: Array<Plugin> = [];

	public constructor(api: PiHubApi) {
		this.api = api;

		this.plugins$ = api.plugins.getPlugins();
	}

	public ngOnInit() {
		this.plugins$.subscribe((plugins) => (this.plugins = plugins));
	}

	public installPlugin(pluginId: string) {
		this.api.plugins.installPlugin(pluginId);
	}

	public uninstallPlugin(pluginId: string) {
		this.api.plugins.uninstallPlugin(pluginId);
	}
}
