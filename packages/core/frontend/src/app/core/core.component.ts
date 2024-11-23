import { first, map, Observable } from 'rxjs';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Plugin } from '@pihub/common';

import { CoreService } from 'src/app/core/core.service';
import { BreadcrumbsComponent } from 'src/app/features/breadcrumbs/breadcrumbs.component';
import { NavigationComponent } from 'src/app/features/navigation/navigation.component';
import { NavigationService } from 'src/app/features/navigation/navigation.service';

@Component({
	selector: 'core',
	standalone: true,
	templateUrl: './core.component.html',
	styleUrl: './core.component.scss',
	imports: [RouterOutlet, NavigationComponent, BreadcrumbsComponent],
})
export class CoreComponent {
	private readonly coreService: CoreService;

	private readonly navigationService: NavigationService;

	private readonly installedPlugins$: Observable<Array<Plugin>>;

	private readonly pageTitle$: Observable<string | undefined>;

	public pageTitle: string | undefined;

	public constructor(coreService: CoreService, navigationService: NavigationService) {
		this.coreService = coreService;
		this.navigationService = navigationService;

		this.installedPlugins$ = coreService.getInstalledPlugins();
		this.pageTitle$ = navigationService.getSelected().pipe(map((selected) => selected?.title));
	}

	public ngOnInit() {
		this.coreService.fetchPlugins().subscribe(() =>
			this.installedPlugins$.pipe(first()).subscribe((plugins) => {
				for (const plugin of plugins) {
					this.coreService.loadPlugin(plugin.id);
				}
			})
		);

		this.pageTitle$.subscribe((title) => (this.pageTitle = title));
	}

	public onPageTitleClick() {
		if (this.pageTitle) {
			this.navigationService.navigate(this.pageTitle);
		}
	}
}
