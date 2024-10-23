import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Plugin, PluginsService } from 'generated';
import { tap } from 'rxjs';

export class FetchPlugins {
	public static readonly type = '[App] Fetch Plugins';
}

export class LoadPlugin {
	public static readonly type = '[App] Load Plugins';

	public readonly id: string;

	public constructor(id: string) {
		this.id = id;
	}
}

interface AppStateModel {
	plugins: Array<Plugin>;
}

@State<AppStateModel>({
	name: 'app',
	defaults: { plugins: [] },
})
@Injectable()
export class AppState {
	private readonly pluginsService: PluginsService;

	private readonly injector: Injector;

	public constructor(pluginsService: PluginsService, injector: Injector) {
		this.pluginsService = pluginsService;
		this.injector = injector;
	}

	@Selector()
	public static selectInstalledPlugins(state: AppStateModel) {
		return state.plugins.filter((plugin) => plugin.isInstalled);
	}

	@Action(FetchPlugins)
	public fetchPlugins(ctx: StateContext<AppStateModel>) {
		return this.pluginsService.getList().pipe(tap((list) => ctx.patchState({ plugins: list })));
	}

	@Action(LoadPlugin)
	public async loadPlugin(ctx: StateContext<AppStateModel>, action: LoadPlugin) {
		const plugin = ctx.getState().plugins.find((plugin) => plugin.id === action.id);

		if (!plugin) {
			throw new Error('plugin not in state');
		}

		const module = await import(plugin.url);

		runInInjectionContext(this.injector, async () => {
			await module.initialize();
		});
	}
}
