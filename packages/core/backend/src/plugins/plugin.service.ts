import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, Logger } from '@nestjs/common';
import { ReadStream } from 'fs';
import { Plugin } from 'src/db/entities/plugin.entity';
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
					const source = await fetch(plugin.url);

					await this.storeService.store(plugin.id, source.body!);
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

			const readStream = await this.storeService.get(pluginId);

			if (!readStream) {
				throw new Error(`plugin ${pluginId} is installed but no source code is present`);
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

			if (plugin.isInstalled && (await this.storeService.has(pluginId))) {
				this.logger.log(`plugin ${pluginId} already installed, skipping installation`);
				return;
			}

			const source = await fetch(plugin.url);

			await this.storeService.store(pluginId, source.body!);

			await this.pluginRepository.install(entityManager, pluginId);
		});
	}

	public async uninstall(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const plugin = await this.pluginRepository.select(entityManager, pluginId);

			if (!plugin) {
				throw new PluginNotFoundException(pluginId);
			}

			if (!plugin.isInstalled && !this.storeService.has(pluginId)) {
				this.logger.log(`plugin ${pluginId} already uninstalled, skipping removal`);
				return;
			}

			if (await this.storeService.has(pluginId)) {
				await this.storeService.remove(pluginId);
			}

			await this.pluginRepository.uninstall(entityManager, pluginId);
		});
	}
}
