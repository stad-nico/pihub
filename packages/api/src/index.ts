import { InjectionToken, Type } from '@angular/core';

export const API = new InjectionToken<PiHubApi>('PiHubApi');

export interface PiHubApi {
	overrideRootComponent<T>(component: Type<T>): void;
}
