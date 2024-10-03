import { Routes } from '@angular/router';

export interface Component<T> {
	new (...args: Array<unknown>): T;
}

export interface PiHubApi {
	registerRootComponent<T>(component: Component<T>): Promise<void>;
	appendRoutes(routes: Routes): Promise<void>;
}
