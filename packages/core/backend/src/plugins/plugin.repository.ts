import { EntityManager } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';
import { Plugin, PLUGIN_TABLE_NAME, SqlPlugin } from 'src/db/entities/plugin.entity';

@Injectable()
export class PluginRepository {
	public async selectAll(entityManager: EntityManager): Promise<Array<Plugin>> {
		const query = `SELECT id, name, url, isInstalled FROM ${PLUGIN_TABLE_NAME}`;

		const [rows] = await entityManager.getKnex().raw<[SqlPlugin[]]>(query);

		if (!rows) {
			return [];
		}

		return rows.map((row) => ({ ...row, isInstalled: Boolean(row.isInstalled) }));
	}

	public async select(entityManager: EntityManager, id: string): Promise<Plugin | null> {
		const query = `SELECT id, name, url, isInstalled FROM ${PLUGIN_TABLE_NAME} WHERE id = :id`;
		const params = { id: id };

		const [rows] = await entityManager.getKnex().raw<[SqlPlugin[]]>(query, params);

		const plugin: Plugin | undefined = rows?.map((row) => ({ ...row, isInstalled: Boolean(row.isInstalled) }))[0];

		if (!plugin) {
			return null;
		}

		return plugin;
	}

	public async install(entityManager: EntityManager, id: string) {
		const query = `UPDATE ${PLUGIN_TABLE_NAME} SET isInstalled = true WHERE id = :id`;
		const params = { id: id };

		await entityManager.getKnex().raw<[SqlPlugin[]]>(query, params);
	}

	public async uninstall(entityManager: EntityManager, id: string) {
		const query = `UPDATE ${PLUGIN_TABLE_NAME} SET isInstalled = false WHERE id = :id`;
		const params = { id: id };

		await entityManager.getKnex().raw<[SqlPlugin[]]>(query, params);
	}
}
