import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, Logger } from '@nestjs/common';
import { PluginRepository } from 'src/plugins/plugin.repository';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class PluginInitService {
	private readonly logger = new Logger(PluginInitService.name);

	private readonly entityManager: EntityManager;

	private readonly pluginRepository: PluginRepository;

	private readonly storeService: StoreService;

	public constructor(entityManager: EntityManager, pluginRepository: PluginRepository, storeService: StoreService) {
		this.entityManager = entityManager;
		this.pluginRepository = pluginRepository;
		this.storeService = storeService;
	}

	public async init() {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugins = await this.pluginRepository.selectAll(entityManager);

			if (!plugins.length) {
				return;
			}

			this.logger.log(`Analyzing ${plugins.length} ${plugins.length === 1 ? 'plugin' : 'plugins'}`);

			for (const plugin of plugins) {
				// if (!plugin.isInstalled) {
				// 	this.logger.log(`Plugin ${plugin.id} (${plugin.name}) not installed, skipping`);
				// 	continue;
				// }

				// if (await this.storeService.has(plugin.id)) {
				// 	this.logger.log(`Plugin ${plugin.id} (${plugin.name}) already downloaded, skipping`);
				// 	continue;
				// }

				// if (plugin.isInstalled && !(await this.storeService.has(plugin.id))) {
				// this.logger.log(`Downloading plugin ${plugin.id} (${plugin.name})...`);
				// const source = await fetch(plugin.url);

				// await this.storeService.store(plugin.id, source.body!);

				// this.logger.log(`Success`);
				// }
				const source = await fetch(plugin.sourceUrl);
				await this.storeService.store(plugin.sourceId, source.body!);

				const config = await fetch(plugin.configUrl);
				await this.storeService.store(plugin.configId, config.body!);
			}
		});
	}
}
