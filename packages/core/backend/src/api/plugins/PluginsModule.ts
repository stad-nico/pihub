import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PluginsController } from 'src/api/plugins/PluginsController';
import { PluginsRepository } from 'src/api/plugins/PluginsRepository';
import { PluginsService } from 'src/api/plugins/PluginsService';
import { Plugin } from 'src/db/entities/Plugin';

@Module({
	imports: [MikroOrmModule.forFeature([Plugin])],
	controllers: [PluginsController],
	providers: [PluginsService, PluginsRepository],
})
export class PluginsModule {}
