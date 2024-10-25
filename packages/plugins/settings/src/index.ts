import { Component, inject } from '@angular/core';
import { NavigationItem, UiPluginApi } from '@pihub/plugin-ui';

export function initialize() {
	const uiApi = inject(UiPluginApi);

	const item: NavigationItem = {
		title: 'Settings',
		pageComponent: Test,
	};

	uiApi.appendNavigationItem('plugins', item);
}

@Component({ standalone: true, selector: 'plugin-settings-test', template: '<p>Settings</p>' })
export class Test {}
