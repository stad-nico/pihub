import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem } from '@ngxs/store/operators';
import { StringService } from '@pihub/common';
import { switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/features/breadcrumbs/breadcrumbs.service';
import { AppendItem, Navigate as NavigateAction, NavigateRoot, RemoveItem } from './navigation.actions';

export interface NavigationItem {
	readonly title: string;

	readonly iconUrl?: string;
}

interface NavigationStateModel {
	readonly items: Array<NavigationItem>;

	readonly selected: NavigationItem | undefined;
}

@State<NavigationStateModel>({
	name: 'navigation',
	defaults: {
		items: [],
		selected: undefined,
	},
})
@Injectable()
export class NavigationState {
	private readonly breadcrumbsService: BreadcrumbsService;

	public constructor(breadcrumbsService: BreadcrumbsService) {
		this.breadcrumbsService = breadcrumbsService;
	}

	@Selector()
	public static getSelected(state: NavigationStateModel) {
		return state.selected;
	}

	@Selector()
	public static getItems(state: NavigationStateModel) {
		return state.items;
	}

	@Action(AppendItem)
	public appendItem(ctx: StateContext<NavigationStateModel>, action: AppendItem) {
		if (ctx.getState().items.includes(action.item)) {
			return;
		}

		ctx.setState(patch({ items: append([action.item]) }));
	}

	@Action(RemoveItem)
	public removeItem(ctx: StateContext<NavigationStateModel>, action: RemoveItem) {
		if (
			!ctx
				.getState()
				.items.map((item) => item.title)
				.includes(action.title)
		) {
			return;
		}

		ctx.setState(patch({ items: removeItem((item) => item.title === action.title) }));
	}

	@Action(NavigateAction)
	public navigate(ctx: StateContext<NavigationStateModel>, action: NavigateAction) {
		ctx.setState(patch({ selected: ctx.getState().items.find((item) => item.title === action.title) }));

		return ctx
			.dispatch(new Navigate(['/', StringService.toKebabCase(action.title)]))
			.pipe(switchMap(() => this.breadcrumbsService.setBreadcrumbs([StringService.capitalize(action.title)])));
	}

	@Action(NavigateRoot)
	public navigateRoot(ctx: StateContext<NavigationStateModel>) {
		ctx.setState(patch({ selected: undefined }));

		return ctx.dispatch(new Navigate(['/']));
	}
}
