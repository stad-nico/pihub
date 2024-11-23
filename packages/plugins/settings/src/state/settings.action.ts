import { ActivatedRoute } from '@angular/router';
import { Tab } from './settings.state';

export class SelectTab {
	public static type = '[Settings] Select Tab';

	public readonly tab: Tab;

	public readonly route: ActivatedRoute;

	public constructor(tab: Tab, route: ActivatedRoute) {
		this.tab = tab;
		this.route = route;
	}
}

export class Unselect {
	public static type = '[Settings] Unselect';
}
