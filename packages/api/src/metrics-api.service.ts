import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Metrics, MetricsService } from '@pihub/openapi';

@Injectable({ providedIn: 'root' })
export class MetricsAPIService {
	private readonly metricsService: MetricsService;

	constructor(metricsService: MetricsService) {
		this.metricsService = metricsService;
	}

	public getSystemMetrics(): Observable<Metrics> {
		return this.metricsService.getMetrics();
	}
}
