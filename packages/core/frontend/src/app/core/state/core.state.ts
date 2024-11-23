import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { PiHubApi, PluginConfig } from '@pihub/api';

import { Plugin, PluginsService, StringService } from '@pihub/common';
import { map, of, switchMap, tap } from 'rxjs';
import { BreadcrumbApiImpl, PiHubApiImpl, PluginApiImpl, RouteApiImpl, RoutesService } from 'src/api/api';
import { FetchPlugins, InstallPlugin, LoadPlugin, UninstallPlugin } from 'src/app/core/state/core.actions';
import { AppendItem, RemoveItem } from 'src/app/features/navigation/state/navigation.actions';

interface CoreStateModel {
	readonly plugins: Array<Plugin>;
}

@State<CoreStateModel>({
	name: 'core',
	defaults: {
		plugins: [],
	},
})
@Injectable()
export class CoreState {
	private readonly pluginsService: PluginsService;

	private readonly routesService: RoutesService;

	private readonly blobUrls: Map<string, string> = new Map();

	public constructor(pluginsService: PluginsService, routesService: RoutesService) {
		this.pluginsService = pluginsService;
		this.routesService = routesService;
	}

	@Selector()
	public static getPlugins(state: CoreStateModel): Array<Plugin> {
		return state.plugins;
	}

	@Selector()
	public static getInstalledPlugins(state: CoreStateModel): Array<Plugin> {
		return state.plugins.filter((plugin) => plugin.isInstalled);
	}

	@Action(FetchPlugins)
	public fetchPlugins(ctx: StateContext<CoreStateModel>) {
		return this.pluginsService.getList().pipe(tap((list) => ctx.patchState({ plugins: list })));
	}

	@Action(UninstallPlugin)
	public uninstallPlugin(ctx: StateContext<CoreStateModel>, action: UninstallPlugin) {
		const plugin = ctx.getState().plugins.find((plugin) => plugin.id === action.pluginId);

		if (!plugin?.isInstalled) {
			return;
		}

		return this.pluginsService.uninstall(action.pluginId).pipe(
			switchMap(() => of(this.routesService.removeChildRoute(action.pluginId, StringService.toKebabCase(plugin.name)))),
			switchMap(() => ctx.dispatch(new RemoveItem(StringService.capitalize(plugin.name)))),
			tap(() =>
				ctx.setState(
					patch({
						plugins: updateItem((plugin) => plugin.id === action.pluginId, patch({ isInstalled: false })),
					})
				)
			)
		);
	}

	@Action(InstallPlugin)
	public installPlugin(ctx: StateContext<CoreStateModel>, action: InstallPlugin) {
		const plugin = ctx.getState().plugins.find((plugin) => plugin.id === action.pluginId);

		if (plugin?.isInstalled) {
			return;
		}

		return this.pluginsService.install(action.pluginId).pipe(
			switchMap(() => ctx.dispatch(new LoadPlugin(action.pluginId))),
			tap(() =>
				ctx.setState(
					patch({
						plugins: updateItem((plugin) => plugin.id === action.pluginId, patch({ isInstalled: true })),
					})
				)
			)
		);
	}

	@Action(LoadPlugin)
	public loadPlugin(ctx: StateContext<CoreStateModel>, action: LoadPlugin) {
		return of(ctx.getState().plugins.find((plugin) => plugin.id === action.pluginId)!).pipe(
			switchMap((plugin) =>
				ctx
					.dispatch(
						new AppendItem({
							title: StringService.capitalize(plugin.name),
							iconUrl: './assets/icons/settings.svg',
						})
					)
					.pipe(
						switchMap(() =>
							this.pluginsService.getConfig(plugin.id).pipe(
								map((blob) => URL.createObjectURL(blob)),
								switchMap((url) => import(url)),
								map((module) => module.Config as PluginConfig)
							)
						),
						tap((config) =>
							this.routesService.createRoute(plugin.name, {
								path: StringService.toKebabCase(plugin.name),
								providers: [
									{ provide: PluginConfig, useValue: config },
									{ provide: PiHubApi, useClass: PiHubApiImpl },
									RouteApiImpl,
									PluginApiImpl,
									BreadcrumbApiImpl,
								],
								loadComponent: () =>
									this.blobUrls.has(plugin.id)
										? of(this.blobUrls.get(plugin.id)!).pipe(
												switchMap((url) => import(url)),
												map((module) => module[config.component])
										  )
										: this.pluginsService.getSourceCode(plugin.id).pipe(
												map((blob) => URL.createObjectURL(blob)),
												tap((url) => this.blobUrls.set(plugin.id, url)),
												switchMap((url) => import(url)),
												map((module) => module[config.component])
										  ),
							})
						)
					)
			)
		);
	}
}
