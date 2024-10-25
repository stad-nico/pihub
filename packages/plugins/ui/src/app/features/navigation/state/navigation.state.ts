import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { NavigationCategory } from '../../../../api';
import { toKebabCase } from './../../../shared/toKebabCase';
import { AppendCategory, AppendItem, Navigate as NavigateAction } from './navigation.action';

export interface LastSelectedModel {
	readonly category: string;

	readonly item: string;
}

interface NavigationStateModel {
	readonly categories: Array<NavigationCategory>;

	readonly lastSelected: LastSelectedModel | null;
}

@State<NavigationStateModel>({
	name: 'navigation',
	defaults: {
		categories: [
			{
				title: 'plugins',
				items: [],
			},
		],
		lastSelected: null,
	},
})
@Injectable()
export class NavigationState {
	@Selector()
	public static getLastSelected(state: NavigationStateModel) {
		return state.lastSelected;
	}

	@Selector()
	public static getCategories(state: NavigationStateModel) {
		return state.categories.filter((category) => category.items.length > 0);
	}

	@Action(AppendCategory)
	public appendCategory(ctx: StateContext<NavigationStateModel>, action: AppendCategory) {
		const categoryTitles = ctx.getState().categories.map((category) => category.title);

		if (categoryTitles.includes(action.category.title)) {
			console.info(`category ${action.category} already present in state`);
			return;
		}

		ctx.setState(patch({ categories: append([action.category]) }));
	}

	@Action(AppendItem)
	public appendItem(ctx: StateContext<NavigationStateModel>, action: AppendItem) {
		const categoryTitles = ctx.getState().categories.map((category) => category.title);

		if (!categoryTitles.includes(action.categoryName)) {
			console.error(`category ${action.categoryName} not present in state`);
			return;
		}

		const category = ctx.getState().categories.find((category) => category.title === action.categoryName);

		if (category?.items.map((item) => item.title).includes(action.item.title)) {
			console.error(`category ${action.categoryName} already has item ${action.item.title}`);
			return;
		}

		ctx.setState(patch({ categories: updateItem((category) => category.title === action.categoryName, patch({ items: append([action.item]) })) }));
	}

	@Action(NavigateAction)
	public navigate(ctx: StateContext<NavigationStateModel>, action: NavigateAction) {
		ctx.setState(patch({ lastSelected: null }));

		const category = ctx.getState().categories.find((category) => category.title === action.event.categoryTitle);

		if (!category) {
			console.error(`could not navigate because category ${action.event.categoryTitle} does not exist`);
			return;
		}

		const item = category.items.find((item) => item.title === action.event.itemTitle);

		if (!item) {
			console.error(`could not navigate because category ${category.title} has no item ${action.event.itemTitle}`);
			return;
		}

		ctx.setState(
			patch({
				lastSelected: {
					category: action.event.categoryTitle,
					item: action.event.itemTitle,
				},
			})
		);
		return ctx.dispatch(new Navigate(['/', toKebabCase(item.title)]));
	}
}
