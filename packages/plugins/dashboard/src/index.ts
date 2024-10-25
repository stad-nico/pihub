import { Component, inject } from '@angular/core';
import { NavigationItem, UiPluginApi } from '@pihub/plugin-ui';

export function initialize() {
	const uiApi = inject(UiPluginApi);

	const item: NavigationItem = {
		title: 'Dashboard',
		pageComponent: Test,
	};

	uiApi.appendNavigationItem('plugins', item);
}

@Component({ standalone: true, selector: 'plugin-dashboard-test', template: '<p>DASHBOARD</p>' })
export class Test {}
