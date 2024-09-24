import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';

import { PluginNotFoundException } from 'src/api/plugins/exceptions/PluginNotFoundException';
import { PluginNotInstalledException } from 'src/api/plugins/exceptions/PluginNotInstalledException';
import { PluginInfo } from 'src/api/plugins/models/PluginInfo';
import { PluginsRepository } from 'src/api/plugins/PluginsRepository';

@Injectable()
export class PluginsService {
	private readonly repository: PluginsRepository;

	private readonly entityManager: EntityManager;

	constructor(repository: PluginsRepository, entityManager: EntityManager) {
		this.repository = repository;
		this.entityManager = entityManager;
	}

	public async getPluginList(): Promise<Array<PluginInfo>> {
		return await this.entityManager.transactional(async (entityManager) => {
			return await this.repository.getPluginList(entityManager);
		});
	}

	public async getPluginInfo(pluginId: string): Promise<PluginInfo> {
		return await this.entityManager.transactional(async (entityManager) => {
			const pluginInfo = await this.repository.getPluginInfo(entityManager, pluginId);

			if (!pluginInfo) {
				throw new PluginNotFoundException(pluginId);
			}

			return pluginInfo;
		});
	}

	public async installPlugin(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const isPluginInstalled = await this.repository.getIsInstalled(entityManager, pluginId);

			if (isPluginInstalled === undefined) {
				throw new PluginNotFoundException(pluginId);
			}

			if (isPluginInstalled) {
				return;
			}

			// await install
			await this.repository.setIsInstalled(entityManager, pluginId, true);
		});
	}

	public async activatePlugin(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const isPluginActivated = await this.repository.getIsActivated(entityManager, pluginId);

			if (isPluginActivated === undefined) {
				throw new PluginNotInstalledException(pluginId);
			}

			if (isPluginActivated) {
				return;
			}

			await this.repository.setIsActivated(entityManager, pluginId, true);
		});
	}

	public async deactivatePlugin(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const isPluginActivated = await this.repository.getIsActivated(entityManager, pluginId);

			if (isPluginActivated === undefined) {
				throw new PluginNotInstalledException(pluginId);
			}

			if (!isPluginActivated) {
				return;
			}

			await this.repository.setIsActivated(entityManager, pluginId, false);
		});
	}

	public async uninstallPlugin(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const isPluginInstalled = await this.repository.getIsInstalled(entityManager, pluginId);

			if (isPluginInstalled === undefined) {
				throw new PluginNotFoundException(pluginId);
			}

			if (!isPluginInstalled) {
				return;
			}

			// await uninstall
			await this.repository.setIsInstalled(entityManager, pluginId, false);
		});
	}
}
