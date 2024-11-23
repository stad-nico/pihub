import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, PiHubApi } from '@pihub/api';
import { StringService } from '@pihub/common';
import { ListItem, MasterDetailComponent } from '@pihub/ui';
import { Observable, Subscription, map, tap } from 'rxjs';
import { PluginsComponent } from './pages/plugins/plugins.component';
import { SettingsService } from './settings.service';
import { Tab } from './state/settings.state';
import { StateModule } from './state/state.module';

@Component({
	standalone: true,
	selector: 'plugin-settings',
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
	imports: [MasterDetailComponent, StateModule],
})
export class SettingsComponent {
	private readonly subscriptions: Subscription = new Subscription();

	private readonly api: PiHubApi;

	private readonly route: ActivatedRoute;

	private readonly router: Router;

	private readonly settingsService: SettingsService;

	private readonly tabs$: Observable<Array<Tab>>;

	private readonly selected$: Observable<Tab | undefined>;

	private readonly breadcrumbs$: Observable<Array<Breadcrumb>>;

	public tabs: Array<ListItem> = [];

	public selected: ListItem | undefined = undefined;

	public breadcrumbs: Array<Breadcrumb> = [];

	public constructor(settingsService: SettingsService, api: PiHubApi, route: ActivatedRoute, router: Router) {
		this.api = api;
		this.route = route;
		this.router = router;
		this.settingsService = settingsService;

		this.tabs$ = settingsService.getTabs();
		this.selected$ = settingsService.getSelected();
		this.breadcrumbs$ = api.breadcrumbs.getCrumbs();
	}

	public ngOnInit() {
		this.subscriptions.add(this.breadcrumbs$.subscribe((breadcrumbs) => (this.breadcrumbs = breadcrumbs)));

		this.subscriptions.add(
			this.tabs$.subscribe((tabs) => {
				for (const tab of tabs.filter((t) => !this.tabs.includes(t))) {
					this.api.routes.appendChildRoute({
						path: StringService.toKebabCase(tab.title),
						loadComponent: () => PluginsComponent,
					});
				}

				this.tabs = tabs;
			})
		);

		this.subscriptions.add(this.selected$.subscribe((selected) => (this.selected = selected)));

		this.subscriptions.add(
			this.api.breadcrumbs
				.crumbClick$()
				.pipe(
					map((clickedIndex) => this.breadcrumbs.slice(0, clickedIndex + 1).map((breadcrumb) => breadcrumb.title)),
					tap((breadcrumbs) => (breadcrumbs[0] = './')),
					map((paths) => paths.map((path) => StringService.toKebabCase(path)))
				)
				.subscribe((paths) =>
					this.router
						.navigate(paths, { relativeTo: this.route })
						.then(() => this.api.breadcrumbs.setCrumbs(paths.map((path) => (path === './' ? 'Settings' : StringService.toSpacedPascalCase(path)))))
				)
		);
	}

	public ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	public onClick(item: ListItem) {
		this.settingsService.selectTab(item, this.route);
	}
}

@Component({
	standalone: true,
	selector: 'plugin-settings-exapmle',
	template: '<p>EXAMPLE</p>',
})
export class Example {}
