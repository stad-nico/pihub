import { Injectable } from '@angular/core';
import { MetricsAPIService } from './metrics-api.service';

@Injectable({ providedIn: 'root' })
export class PiHubAPIService {
	// public readonly plugins: PluginsAPIService;

	public readonly systemMetrics: MetricsAPIService;

	constructor(/*plugins: PluginsAPIService, */ systemMetrics: MetricsAPIService) {
		/*this.plugins = plugins;*/
		this.systemMetrics = systemMetrics;
	}
}
