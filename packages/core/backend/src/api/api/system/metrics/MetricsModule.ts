import { Module } from '@nestjs/common';
import { MetricsController } from 'src/api/api/system/metrics/MetricsController';
import { MetricsService } from 'src/api/api/system/metrics/MetricsService';

@Module({
	controllers: [MetricsController],
	providers: [MetricsService],
})
export class MetricsModule {}
