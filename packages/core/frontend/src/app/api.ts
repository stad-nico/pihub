import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { PiHubApi, RouteApi } from '@pihub/api';

@Injectable({ providedIn: 'root' })
export class PiHubApiImpl implements PiHubApi {
	public readonly routes: RouteApiImpl;

	public constructor(routes: RouteApiImpl) {
		this.routes = routes;
	}
}

@Injectable({ providedIn: 'root' })
export class RouteApiImpl implements RouteApi {
	private readonly router: Router;

	private readonly routes: Routes = [];

	constructor(router: Router) {
		this.router = router;
	}

	public getRoute(path: string): Route | null {
		return this.routes.find((route) => route.path === path) ?? null;
	}

	public appendRoute(route: Route): void {
		this.routes.push(route);
		this.router.resetConfig(this.routes);
	}

	public prependRoute(route: Route): void {
		this.routes.unshift(route);
		this.router.resetConfig(this.routes);
	}

	public updateRoute(path: string, partial: Partial<Route>): void {
		const index = this.routes.findIndex((route) => route.path === path);

		this.routes[index] = { ...this.routes.at(index), ...partial };

		this.router.resetConfig(this.routes);
	}
}
