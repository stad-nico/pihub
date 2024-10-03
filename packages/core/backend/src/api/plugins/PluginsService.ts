import { createReadStream } from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import * as path from 'path';
import { Readable } from 'stream';
import { Extract } from 'unzipper';

import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable, StreamableFile } from '@nestjs/common';

import { PluginNotFoundException } from 'src/api/plugins/exceptions/PluginNotFoundException';
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

	public getSourceCode(pluginId: string, sourcePath: string): StreamableFile {
		return new StreamableFile(createReadStream(path.resolve(`plugins/${pluginId}/${sourcePath}`)));
	}

	public async installPlugin(pluginId: string): Promise<void> {
		return await this.entityManager.transactional(async (entityManager) => {
			const pluginInfo = await this.repository.getPluginInfo(entityManager, pluginId);

			if (pluginInfo === undefined) {
				throw new PluginNotFoundException(pluginId);
			}

			if (pluginInfo.isInstalled) {
				console.log('PLUGIN ALREADY INSTALLED, SKIPPING');
				return;
			}

			const sourceZip = await fetch(pluginInfo.url);

			if (!sourceZip.body) {
				throw new Error('EMTPY BODY');
			}

			try {
				await access(path.resolve('plugins'));
			} catch (e) {
				await mkdir(path.resolve('plugins'));
			}

			await new Promise((resolve, reject) => {
				Readable.fromWeb(sourceZip.body!)
					.pipe(Extract({ path: path.resolve(`plugins/${pluginInfo.id}`) }))
					.on('close', resolve)
					.on('error', reject);
			});

			await this.repository.setIsInstalled(entityManager, pluginId, true);
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

			try {
				await access(path.resolve(`plugins/${pluginId}`));

				await rm(path.resolve(`plugins/${pluginId}`), { recursive: true });

				await this.repository.setIsInstalled(entityManager, pluginId, false);
			} catch (e) {
				throw e;
			}
		});
	}

	// public async activatePlugin(pluginId: string): Promise<void> {
	// 	return await this.entityManager.transactional(async (entityManager) => {
	// 		const isPluginActivated = await this.repository.getIsActivated(entityManager, pluginId);

	// 		if (isPluginActivated === undefined) {
	// 			throw new PluginNotInstalledException(pluginId);
	// 		}

	// 		if (isPluginActivated) {
	// 			return;
	// 		}

	// 		await this.repository.setIsActivated(entityManager, pluginId, true);
	// 	});
	// }

	// public async deactivatePlugin(pluginId: string): Promise<void> {
	// 	return await this.entityManager.transactional(async (entityManager) => {
	// 		const isPluginActivated = await this.repository.getIsActivated(entityManager, pluginId);

	// 		if (isPluginActivated === undefined) {
	// 			throw new PluginNotInstalledException(pluginId);
	// 		}

	// 		if (!isPluginActivated) {
	// 			return;
	// 		}

	// 		await this.repository.setIsActivated(entityManager, pluginId, false);
	// 	});
	// }
}
