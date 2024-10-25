import { inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { UiPluginApi, UiPluginApiImpl } from './api';
import { NavigationState } from './app/features/navigation/state/navigation.state';
import { UiPluginComponent } from './app/ui-plugin.component';

export async function initialize() {
	const api = inject(PiHubApi);
	const router = inject(Router);

	api.routes.prependRoute(route);
	await router.navigate(['/']);
}

const route: Route = {
	path: '',
	component: UiPluginComponent,
	providers: [provideStore([NavigationState]), { provide: UiPluginApi, useClass: UiPluginApiImpl }],
	children: [],
};

export * from './api';

export const providers = [{ provide: UiPluginApi, useClass: UiPluginApiImpl }];
