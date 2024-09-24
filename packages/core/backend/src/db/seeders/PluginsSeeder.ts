import { EntityManager } from '@mikro-orm/mariadb';
import { Seeder } from '@mikro-orm/seeder';

import { Plugin } from 'src/db/entities/Plugin';
import { plugins } from 'src/plugins';

export class PluginsSeeder extends Seeder {
	public async run(entityManager: EntityManager): Promise<void> {
		for (const plugin of plugins) {
			entityManager.insert(Plugin, plugin);
		}
	}
}
