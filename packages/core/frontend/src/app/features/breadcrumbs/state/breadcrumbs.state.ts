import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { Breadcrumb } from '@pihub/api';
import { AddCrumb, SetCrumbs } from 'src/app/features/breadcrumbs/state/breadcrumbs.actions';

interface BreadcrumbsStateModel {
	crumbs: Array<Breadcrumb>;
}

@State<BreadcrumbsStateModel>({
	name: 'breadcrumbs',
	defaults: {
		crumbs: [],
	},
})
@Injectable()
export class BreadcrumbsState {
	@Selector()
	public static getCrumbs(state: BreadcrumbsStateModel) {
		return state.crumbs;
	}

	@Action(SetCrumbs)
	public setBreadcrumbs(ctx: StateContext<BreadcrumbsStateModel>, action: SetCrumbs) {
		const crumbs: Array<Breadcrumb> = action.titles.map((title, index) => ({ title: title, id: index }));

		ctx.setState(patch({ crumbs: crumbs }));
	}

	@Action(AddCrumb)
	public addBreadcrum(ctx: StateContext<BreadcrumbsStateModel>, action: AddCrumb) {
		const id = Math.max(...ctx.getState().crumbs.map((crumb) => crumb.id)) + 1;

		ctx.setState(patch({ crumbs: append([{ title: action.title, id: id }]) }));
	}
}
