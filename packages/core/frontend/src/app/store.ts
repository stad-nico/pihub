import { Injectable, Type } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ActionTest } from './action';

interface Model {
	rootC?: Type<unknown> | undefined;
}

@State<Model>({
	name: 'test',
	defaults: {
		rootC: undefined,
	},
})
@Injectable()
export class T {
	@Selector()
	public static getR(s: Model) {
		return s;
	}

	@Action(ActionTest)
	public a(ctx: StateContext<Model>, a: ActionTest) {
		ctx.setState({ rootC: a.comp });
	}
}
