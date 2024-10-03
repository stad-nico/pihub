import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NavigationState } from 'src/app/features/navigation/state/navigation.state';
import { routes } from './app.routes';
import { PluginsState } from './core/state/plugins.state';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		importProvidersFrom(NgxsModule.forRoot([PluginsState, NavigationState]), NgxsLoggerPluginModule.forRoot(), NgxsRouterPluginModule.forRoot()),
	],
};
