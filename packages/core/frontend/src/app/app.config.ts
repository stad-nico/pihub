import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';

import { CoreState } from 'src/app/core/state/core.state';
import { BreadcrumbsState } from 'src/app/features/breadcrumbs/state/breadcrumbs.state';
import { NavigationState } from 'src/app/features/navigation/state/navigation.state';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter([]),
		provideStore([CoreState, NavigationState, BreadcrumbsState], withNgxsLoggerPlugin(), withNgxsRouterPlugin()),
	],
};
