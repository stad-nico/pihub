import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';
import { NavigationCategory } from 'src/app/features/navigation/components/pure-navigation/components/navigation-category/navigation-category.component';

interface NavigationStateModel {
	categories: Array<NavigationCategory>;
}

@State<NavigationStateModel>({
	name: 'navigation',
	defaults: {
		categories: [
			{
				id: 'overview',
				items: [
					{ title: 'Home', icon: 'assets/icons/home.svg' },
					{ title: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
				],
			},
			{
				id: 'plugins',
				items: [
					{ title: 'Dashboard', icon: 'api/plugins/pilabs-plugin-poc/icon.svg' },
					{ title: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
					{ title: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
					{ title: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
					{ title: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
				],
			},
			{
				id: 'other',
				items: [
					{ title: 'Settings', icon: 'assets/icons/settings.svg' },
					{ title: 'Help', icon: 'assets/icons/help.svg' },
				],
			},
		],
	},
})
@Injectable()
export class NavigationState {
	@Selector()
	public static getCategories(state: NavigationStateModel) {
		return state.categories;
	}
}
