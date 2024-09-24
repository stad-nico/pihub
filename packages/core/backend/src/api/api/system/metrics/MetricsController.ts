import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetricsService } from 'src/api/api/system/metrics/MetricsService';
import { Metrics } from 'src/api/api/system/metrics/models/Metrics';

@Controller('api/system/metrics')
export class MetricsController {
	private readonly service: MetricsService;

	constructor(service: MetricsService) {
		this.service = service;
	}

	/**
	 * Get system metrics.
	 *
	 * @public @async
	 *
	 * @returns {Promise<Metrics>} The system metrics
	 *
	 * @summary get system metrics
	 */
	@ApiTags('metrics')
	@TypedRoute.Get()
	public async getMetrics(): Promise<Metrics> {
		return await this.service.getMetrics();
	}
}
