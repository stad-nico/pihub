import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { PluginsService } from '@pihub/openapi';
import { from, map, switchMap, tap } from 'rxjs';
import { NavigationComponent } from 'src/app/features/navigation/navigation.component';
import { PluginsActions } from './plugins.actions';

export interface PluginModel {
	name: string;
	id: string;
	url: string;
	description: string;
	version: string;
	isInstalled: boolean;
	module:
		| {
				AppComponent: Type<unknown>;
		  }
		| undefined;
}

interface PluginsStateModel {
	plugins: Array<PluginModel>;
}

@State<PluginsStateModel>({
	name: 'plugins',
	defaults: {
		plugins: [],
	},
})
@Injectable()
export class PluginsState {
	private readonly pluginsService: PluginsService;

	private readonly router: Router;

	constructor(pluginsService: PluginsService, router: Router) {
		this.pluginsService = pluginsService;
		this.router = router;
	}

	@Selector()
	public static getPlugins(state: PluginsStateModel) {
		return state.plugins;
	}

	@Selector()
	public static getInstalledPlugins(state: PluginsStateModel) {
		return state.plugins.filter((plugin) => plugin.isInstalled);
	}

	@Action(PluginsActions.FetchPlugins)
	public fetchPlugins(ctx: StateContext<PluginsStateModel>, action: PluginsActions.FetchPlugins) {
		return this.pluginsService.getPluginList().pipe(
			map((plugins) => plugins.map((plugin) => ({ module: undefined, ...plugin }))),
			tap((plugins) => {
				ctx.setState(patch({ plugins: plugins }));
				return ctx.dispatch(plugins.filter((plugin) => plugin.isInstalled).map((plugin) => new PluginsActions.Install(plugin.id)));
			}),
		);
	}

	@Action(PluginsActions.Install)
	public install(ctx: StateContext<PluginsStateModel>, action: PluginsActions.Install) {
		const plugin = ctx.getState().plugins.find((plugin) => plugin.id === action.id);

		if (!plugin) {
			throw new Error('plugin not found');
		}

		return this.pluginsService.installPlugin({ pluginId: plugin.id }).pipe(
			switchMap(() =>
				from(
					loadRemoteModule({
						remoteName: plugin.id,
						exposedModule: './Component',
						remoteEntry: `/api/plugins/${plugin.id}/remoteEntry.json`,
					}),
				).pipe(
					tap((module) => {
						ctx.setState(patch({ plugins: updateItem((p) => p.id === plugin.id, patch({ isInstalled: true, module: module })) }));
						console.log(this.toKebabCase(plugin.id));
						this.router.resetConfig([
							{ path: 'pilabs-plugin-poc', pathMatch: 'full', component: NavigationComponent },
							// { path: this.toKebabCase(plugin.id), loadComponent: () => NavigationComponent },
						]);
					}),
				),
			),
		);
	}

	@Action(PluginsActions.Uninstall)
	public uninstall(ctx: StateContext<PluginsStateModel>, action: PluginsActions.Uninstall) {
		return this.pluginsService
			.uninstallPlugin(action.id)
			.pipe(tap(() => ctx.setState(patch({ plugins: updateItem((plugin) => plugin.id === action.id, patch({ isInstalled: false })) }))));
	}

	private toKebabCase(str: string) {
		return (
			str &&
			str
				.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
				.map((x) => x.toLowerCase())
				.join('-')
		);
	}
}
