import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { PiHubApi } from '@pihub/api';
import { PiHubApiImpl } from './api';
import { routes } from './app.routes';
import { AppState } from './store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideStore([AppState], withNgxsLoggerPlugin(), withNgxsRouterPlugin()),
		{ provide: PiHubApi, useClass: PiHubApiImpl },
	],
};
