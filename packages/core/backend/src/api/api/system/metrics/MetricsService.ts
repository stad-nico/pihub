import { Injectable } from '@nestjs/common';
import { cpuTemperature } from 'systeminformation';

import { Metrics } from 'src/api/api/system/metrics/models/Metrics';

@Injectable()
export class MetricsService {
	public async getMetrics(): Promise<Metrics> {
		const cpuTemp = await cpuTemperature();

		return Metrics.fromCelsiusTemperature(cpuTemp.main);
	}
}
