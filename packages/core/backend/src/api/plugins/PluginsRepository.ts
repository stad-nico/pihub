import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { PluginInfo } from 'src/api/plugins/models/PluginInfo';
import { Plugin, PLUGINS_TABLE_NAME } from 'src/db/entities/Plugin';

type PluginDbSelectType = Pick<Plugin, 'id' | 'name' | 'description' | 'version' | 'url'> & { isInstalled: number /*; isActivated: number*/ };

@Injectable()
export class PluginsRepository {
	public async getPluginList(entityManager: EntityManager): Promise<Array<PluginInfo>> {
		const query = `SELECT id, name, description, version, url, isActivated, isInstalled FROM ${PLUGINS_TABLE_NAME}`;

		const [rows] = await entityManager.getKnex().raw<[Array<PluginDbSelectType>]>(query);

		return rows?.map((row) => ({ ...row, isInstalled: row.isInstalled === 1 /*, isActivated: row.isActivated === 1*/ })) ?? [];
	}

	public async getPluginInfo(entityManager: EntityManager, pluginId: string): Promise<PluginInfo | undefined> {
		const query = `SELECT id, name, description, version, url, isActivated, isInstalled FROM ${PLUGINS_TABLE_NAME} WHERE id = :id`;
		const params = { id: pluginId };

		const [rows] = await entityManager.getKnex().raw<[Array<PluginDbSelectType>]>(query, params);

		return (rows?.map((row) => ({ ...row, isInstalled: row.isInstalled === 1 /*, isActivated: row.isActivated === 1*/ })) ?? [])[0];
	}

	public async getIsInstalled(entityManager: EntityManager, pluginId: string): Promise<boolean | undefined> {
		const query = `SELECT isInstalled FROM ${PLUGINS_TABLE_NAME} WHERE id = :id`;
		const params = { id: pluginId };

		const [rows] = await entityManager.getKnex().raw<[Array<Pick<PluginInfo, 'isInstalled'>>]>(query, params);

		return (rows ?? [])[0]?.isInstalled;
	}

	public async setIsInstalled(entityManager: EntityManager, pluginId: string, isInstalled: boolean): Promise<void> {
		const query = `UPDATE ${PLUGINS_TABLE_NAME} SET isInstalled = :isInstalled WHERE id = :id`;
		const params = { isInstalled: isInstalled, id: pluginId };

		await entityManager.getKnex().raw(query, params);
	}

	// public async getIsActivated(entityManager: EntityManager, pluginId: string): Promise<boolean | undefined> {
	// 	const query = `SELECT isActivated FROM ${PLUGINS_TABLE_NAME} WHERE id = :id`;
	// 	const params = { id: pluginId };

	// 	const [rows] = await entityManager.getKnex().raw<[Array<Pick<PluginInfo, 'isActivated'>>]>(query, params);

	// 	return (rows ?? [])[0]?.isActivated;
	// }

	// public async setIsActivated(entityManager: EntityManager, pluginId: string, isActivated: boolean): Promise<void> {
	// 	const query = `UPDATE ${PLUGINS_TABLE_NAME} SET isActivated = :isActivated WHERE id = :id`;
	// 	const params = { isActivated: isActivated, id: pluginId };

	// 	await entityManager.getKnex().raw(query, params);
	// }
}
