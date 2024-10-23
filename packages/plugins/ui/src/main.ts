import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { UiPluginApi, UiPluginApiImpl } from './app/api';
import { NavigationState } from './app/features/navigation/state/navigation.state';
import { UiPluginComponent } from './app/ui-plugin.component';

export function initialize() {
	const api = inject(PiHubApi);
	const router = inject(Router);

	api.prependRoute(route);
	router.navigate(['/']);
}

@Component({ standalone: true, selector: 'test', template: '<p>PAGE</p>' })
export class F {}

const route: Route = {
	path: '',
	component: UiPluginComponent,
	providers: [provideStates([NavigationState]), { provide: UiPluginApi, useClass: UiPluginApiImpl }],
	children: [],
};
