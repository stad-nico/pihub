import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PiHubApiImpl } from 'src/app/api/PiHubApiImpl';
import { AppService } from 'src/app/app.service';
import { TestComponent } from 'src/app/test.component';

@Component({
	standalone: true,
	selector: 'app',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	private readonly service: AppService;

	private readonly api: PiHubApiImpl;

	@ViewChild('container', { read: ViewContainerRef, static: true })
	private viewContainerRef!: ViewContainerRef;

	public constructor(service: AppService, api: PiHubApiImpl) {
		this.service = service;
		this.api = api;
	}

	ngOnInit() {
		this.service.rootComponent$.subscribe((component) => {
			this.viewContainerRef.clear();
			this.viewContainerRef.createComponent(component);
		});

		this.api.registerRootComponent(TestComponent);
	}
}
