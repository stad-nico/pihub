import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { MetricsModule } from 'src/api/api/system/metrics/MetricsModule';
import { PluginsModule } from 'src/api/plugins/PluginsModule';
import config from 'src/config/MikroORMConfig';

@Module({
	imports: [MikroOrmModule.forRoot(config), PluginsModule, MetricsModule],
})
export class AppModule {}
