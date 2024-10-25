import { EntityManager } from '@mikro-orm/mariadb';
import { DynamicModule, Module } from '@nestjs/common';
import { PluginInitService } from 'src/plugins/init/plugin-init.service';
import { PluginRepository } from 'src/plugins/plugin.repository';
import { StoreService } from 'src/store/store.service';

@Module({
	providers: [PluginRepository],
})
export class PluginInitModule {
	public static async forRootAsync(): Promise<DynamicModule> {
		return {
			module: PluginInitModule,
			providers: [
				{
					provide: PluginInitService,
					inject: [EntityManager, PluginRepository, StoreService],
					useFactory: async (entityManager: EntityManager, pluginRepository: PluginRepository, storeService: StoreService) => {
						const pluginInitService = new PluginInitService(entityManager, pluginRepository, storeService);

						await pluginInitService.init();

						return pluginInitService;
					},
				},
			],
		};
	}
}
