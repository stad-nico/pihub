export * from './metrics.service';
import { MetricsService } from './metrics.service';
export * from './plugins.service';
import { PluginsService } from './plugins.service';
export const APIS = [MetricsService, PluginsService];
