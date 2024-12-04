import { Inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbApi, PiHubApi, PluginApi, PluginConfig, RouteApi } from '@pihub/api';
import { Plugin } from '@pihub/common';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { BreadcrumbsService } from 'src/app/features/breadcrumbs/breadcrumbs.service';

@Injectable({ providedIn: 'root' })
export class PiHubApiImpl implements PiHubApi {
	public readonly routes: RouteApi;

	public readonly plugins: PluginApi;

	public readonly breadcrumbs: BreadcrumbApi;

	public constructor(routes: RouteApiImpl, plugins: PluginApiImpl, breadcrumbs: BreadcrumbApiImpl) {
		this.routes = routes;
		this.plugins = plugins;
		this.breadcrumbs = breadcrumbs;
	}
}

@Injectable({ providedIn: 'root' })
export class RouteApiImpl implements RouteApi {
	private readonly config: PluginConfig;

	private readonly routesService: RoutesService;

	public constructor(@Inject(PluginConfig) config: PluginConfig, routesService: RoutesService) {
		this.config = config;
		this.routesService = routesService;
	}

	public appendChildRoute(route: Route): void {
		this.routesService.appendChildRoute(this.config.name, route);
	}

	public hasChildRoute(path: string): boolean {
		return this.routesService.hasChildRoute(this.config.name, path);
	}
}

@Injectable({ providedIn: 'root' })
export class PluginApiImpl implements PluginApi {
	private readonly coreService: CoreService;

	public constructor(coreService: CoreService) {
		this.coreService = coreService;
	}

	public getPlugins(): Observable<Array<Plugin>> {
		return this.coreService.getPlugins();
	}

	public uninstallPlugin(pluginId: string): Observable<void> {
		return this.coreService.uninstallPlugin(pluginId);
	}

	public installPlugin(pluginId: string): Observable<void> {
		return this.coreService.installPlugin(pluginId);
	}
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbApiImpl implements BreadcrumbApi {
	private readonly breadcrumbsService: BreadcrumbsService;

	public constructor(breadcrumbsService: BreadcrumbsService) {
		this.breadcrumbsService = breadcrumbsService;
	}

	public getCrumbs(): Observable<Array<Breadcrumb>> {
		return this.breadcrumbsService.getCrumbs();
	}

	public addCrumb(crumb: string): Observable<void> {
		return this.breadcrumbsService.addBreadcrumb(crumb);
	}

	public setCrumbs(crumbs: Array<string>): Observable<void> {
		return this.breadcrumbsService.setBreadcrumbs(crumbs);
	}

	public crumbClick$(): Observable<number> {
		return this.breadcrumbsService.crumbsClick$;
	}
}

@Injectable({ providedIn: 'root' })
export class RoutesService {
	private readonly routes: Map<string, Route> = new Map();

	private readonly router: Router;

	public constructor(router: Router) {
		this.router = router;
	}

	public createRoute(pluginId: string, route: Route) {
		this.routes.set(pluginId, route);

		this.applyRoutes();
	}

	public removeChildRoute(pluginId: string, path: string) {
		const pluginRoute = this.routes.get(pluginId);

		if (!pluginRoute) {
			return;
		}

		pluginRoute.children?.filter((route) => route.path !== path);

		this.routes.set(pluginId, pluginRoute);

		this.applyRoutes();
	}

	public appendChildRoute(pluginId: string, route: Route) {
		const pluginRoute = this.routes.get(pluginId);

		if (!pluginRoute) {
			throw new Error('Plugin route not found');
		}

		if (!pluginRoute.children) {
			pluginRoute.children = [];
		}

		const index = pluginRoute.children.findIndex((item) => item.path === route.path);

		if (index !== -1) {
			console.log('Route already present, skipping');
			return;
		} else {
			pluginRoute.children.push(route);
		}

		this.routes.set(pluginId, pluginRoute);

		this.applyRoutes();
	}

	public hasChildRoute(pluginId: string, path: string) {
		const pluginRoute = this.routes.get(pluginId);

		if (!pluginRoute?.children) {
			return false;
		}

		return pluginRoute.children?.map((route) => route.path).includes(path);
	}

	private applyRoutes() {
		this.router.resetConfig([...this.routes.values()]);
	}
}
