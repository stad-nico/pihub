import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

export const PiHubApi = new InjectionToken<PiHubApi>('PiHubApi');

export interface PiHubApi extends PiHubApiFacade {}

interface PiHubApiFacade {
	readonly routes: RouteApi;
}

export interface RouteApi {
	prependRoute(route: Route): void;
	appendRoute(route: Route): void;
	updateRoute(path: string, partial: Partial<Route>): void;
	getRoute(path: string): Route | null;
}
