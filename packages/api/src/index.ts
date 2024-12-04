import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { Plugin } from '@pihub/common';
import { Observable } from 'rxjs';

export const PluginConfig = new InjectionToken<PluginConfig>('PluginConfig');

export interface PluginConfig {
	readonly name: string;

	readonly component: string;
}

export const PiHubApi = new InjectionToken<PiHubApi>('PiHubApi');

export interface PiHubApi {
	readonly routes: RouteApi;

	readonly plugins: PluginApi;

	readonly breadcrumbs: BreadcrumbApi;
}

export interface RouteApi {
	appendChildRoute(route: Route): void;

	hasChildRoute(path: string): boolean;
}

export interface PluginApi {
	getPlugins(): Observable<Array<Plugin>>;

	uninstallPlugin(pluginId: string): Observable<void>;

	installPlugin(pluginId: string): Observable<void>;
}

export interface Breadcrumb {
	readonly id: number;

	readonly title: string;
}

export interface BreadcrumbApi {
	getCrumbs(): Observable<Array<Breadcrumb>>;

	addCrumb(crumb: string): Observable<void>;

	setCrumbs(crumbs: Array<string>): Observable<void>;

	crumbClick$(): Observable<number>;
}
