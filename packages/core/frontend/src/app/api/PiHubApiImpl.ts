import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Component, PiHubApi } from '@pihub/api';
import { ROUTES } from 'src/app/app.routes';
import { AppService } from 'src/app/app.service';

@Injectable({ providedIn: 'root' })
export class PiHubApiImpl implements PiHubApi {
	private readonly router: Router;

	private readonly appService: AppService;

	private routes: Routes = ROUTES;

	public constructor(router: Router, appService: AppService) {
		this.router = router;
		this.appService = appService;
	}

	public async registerRootComponent<T>(component: Component<T>): Promise<void> {
		this.appService.replaceRootComponent(component);
	}

	public async appendRoutes(routes: Routes): Promise<void> {
		this.routes = [...this.routes, ...routes];

		this.router.resetConfig(this.routes);
	}
}
