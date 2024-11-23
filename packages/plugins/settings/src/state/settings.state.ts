import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { PiHubApi } from '@pihub/api';
import { switchMap } from 'rxjs';
import { SelectTab, Unselect } from './settings.action';

export interface Tab {
	readonly title: string;
}

interface SettingsStateModel {
	readonly tabs: Array<Tab>;

	readonly selected: Tab | undefined;
}

@State<SettingsStateModel>({
	name: 'settings',
	defaults: {
		tabs: [{ title: 'Plugins' }],
		selected: undefined,
	},
})
@Injectable()
export class SettingsState {
	private api: PiHubApi;

	public constructor(api: PiHubApi) {
		this.api = api;
	}

	@Selector()
	public static getTabs(state: SettingsStateModel) {
		return state.tabs;
	}

	@Selector()
	public static getSelected(state: SettingsStateModel) {
		return state.selected;
	}

	@Action(SelectTab)
	public selectTab(ctx: StateContext<SettingsStateModel>, action: SelectTab) {
		ctx.setState(patch({ selected: action.tab }));

		return ctx
			.dispatch(new Navigate([this.toKebabCase(action.tab.title)], {}, { relativeTo: action.route }))
			.pipe(switchMap(() => this.api.breadcrumbs.setCrumbs(['Settings', action.tab.title])));
	}

	@Action(Unselect)
	public unselect(ctx: StateContext<SettingsStateModel>) {
		ctx.setState(patch({ selected: undefined }));
	}

	private toKebabCase(input: string) {
		return input
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}
}
