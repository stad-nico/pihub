import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Plugin } from 'src/db/entities/plugin.entity';
import { PluginController } from 'src/plugins/plugin.controller';
import { PluginRepository } from 'src/plugins/plugin.repository';
import { PluginService } from 'src/plugins/plugin.service';

@Module({
	imports: [MikroOrmModule.forFeature([Plugin])],
	controllers: [PluginController],
	providers: [PluginService, PluginRepository],
})
export class PluginModule {}
