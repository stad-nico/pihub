import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

export const PiHubApi = new InjectionToken<PiHubApi>('PiHubApi');

export interface PiHubApi extends PiHubApiFacade {}

interface PiHubApiFacade {
	readonly routes: RouteApi;
	readonly plugins: PluginApi;
}

interface RouteApi {
	prependRoute(route: Route): void;
	appendRoute(route: Route): void;
	updateRoute(path: string, partial: Partial<Route>): void;
}

interface PluginApi {
	installPlugin(id: string): Observable<void>;
	uninstallPlugin(id: string): Observable<void>;
}
