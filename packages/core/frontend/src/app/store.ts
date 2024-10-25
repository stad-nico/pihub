import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Plugin, PluginsService } from 'generated';
import { tap } from 'rxjs';

export class FetchPlugins {
	public static readonly type = '[App] Fetch Plugins';
}

export class Initialize {
	public static readonly type = '[App] Initialize';
}

export class LoadPlugins {
	public static readonly type = '[App] Load Plugins';

	public readonly ids: Array<string>;

	public constructor(ids: Array<string>) {
		this.ids = ids;
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

	private injector: Injector;

	private modules: Array<any> = [];

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

	@Action(LoadPlugins)
	public async loadPlugins(ctx: StateContext<AppStateModel>, action: LoadPlugins) {
		const plugins = ctx.getState().plugins;
		const modules: Array<any> = [];

		for (const id of action.ids) {
			const plugin = plugins.find((plugin) => plugin.id === id);

			if (!plugin?.isInstalled) {
				continue;
			}

			// ! WORKAROUND UNTIL IMPORTING FROM BLOBS IS SUPPORTED ! //
			const module = await import((() => `@pihub/plugin-${plugin.name}`)());
			this.injector = Injector.create({ providers: module.providers, parent: this.injector });
			this.modules.push(module);
		}
	}

	@Action(Initialize)
	public async initialize() {
		for (const module of this.modules) {
			await runInInjectionContext(this.injector, async () => {
				await module.initialize();
			});
		}
	}
}
