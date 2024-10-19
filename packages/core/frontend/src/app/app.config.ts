import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';
import { API } from '@pihub/api';
import { PiHubApiImpl } from './api';
import { routes } from './app.routes';
import { T } from './store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		{ provide: API, useClass: PiHubApiImpl },
		provideStore([T], withNgxsLoggerPlugin()),
	],
};
