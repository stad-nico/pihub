import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, Logger } from '@nestjs/common';
import { ReadStream } from 'fs';
import { Plugin } from 'src/db/entities/plugin.entity';
import { PluginCannotBeRemovedException } from 'src/exceptions/PluginCannotBeRemovedException';
import { PluginNotFoundException } from 'src/exceptions/PluginNotFoundException';
import { PluginNotInstalledException } from 'src/exceptions/PluginNotInstalledException';
import { PluginRepository } from 'src/plugins/plugin.repository';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class PluginService {
	private readonly logger = new Logger(PluginService.name);

	private readonly pluginRepository: PluginRepository;

	private readonly entityManager: EntityManager;

	private readonly storeService: StoreService;

	public constructor(pluginRepository: PluginRepository, entityManager: EntityManager, storeService: StoreService) {
		this.pluginRepository = pluginRepository;
		this.entityManager = entityManager;
		this.storeService = storeService;
	}

	public async reload(): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugins = await this.pluginRepository.selectAll(entityManager);

			for (const plugin of plugins) {
				if (plugin.isInstalled) {
					const source = await fetch(plugin.sourceUrl);
					await this.storeService.store(plugin.sourceId, source.body!);

					const config = await fetch(plugin.configUrl);
					await this.storeService.store(plugin.configId, config.body!);
				}
			}
		});
	}

	public async getList(): Promise<Array<Plugin>> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugins = await this.pluginRepository.selectAll(entityManager);

			return plugins;
		});
	}

	public async getSourceCode(pluginId: string): Promise<ReadStream> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugin = await this.pluginRepository.select(entityManager, pluginId);

			if (!plugin) {
				throw new PluginNotFoundException(pluginId);
			}

			if (!plugin.isInstalled) {
				throw new PluginNotInstalledException(pluginId);
			}

			const readStream = await this.storeService.get(plugin.sourceId);

			if (!readStream) {
				throw new Error(`plugin ${pluginId} is installed but no source code is present`);
			}

			return readStream;
		});
	}

	public async getConfig(pluginId: string): Promise<ReadStream> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugin = await this.pluginRepository.select(entityManager, pluginId);

			if (!plugin) {
				throw new PluginNotFoundException(pluginId);
			}

			if (!plugin.isInstalled) {
				throw new PluginNotInstalledException(pluginId);
			}

			const readStream = await this.storeService.get(plugin.configId);

			if (!readStream) {
				throw new Error(`plugin ${pluginId} is installed but no config code is present`);
			}

			return readStream;
		});
	}

	public async install(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugin = await this.pluginRepository.select(entityManager, pluginId);

			if (!plugin) {
				throw new PluginNotFoundException(pluginId);
			}

			// if (plugin.isInstalled && (await this.storeService.has(plugin.))) {
			// 	this.logger.log(`plugin ${pluginId} already installed, skipping installation`);
			// 	return;
			// }

			const source = await fetch(plugin.sourceUrl);
			await this.storeService.store(plugin.sourceId, source.body!);

			const config = await fetch(plugin.configUrl);
			await this.storeService.store(plugin.configId, config.body!);

			await this.pluginRepository.install(entityManager, pluginId);
		});
	}

	public async uninstall(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugin = await this.pluginRepository.select(entityManager, pluginId);

			if (!plugin) {
				throw new PluginNotFoundException(pluginId);
			}

			if (plugin.isCore) {
				throw new PluginCannotBeRemovedException(pluginId);
			}

			if (await this.storeService.has(plugin.configId)) {
				await this.storeService.remove(plugin.configId);
			}

			if (await this.storeService.has(plugin.sourceId)) {
				await this.storeService.remove(plugin.sourceId);
			}

			await this.pluginRepository.uninstall(entityManager, pluginId);
		});
	}
}
