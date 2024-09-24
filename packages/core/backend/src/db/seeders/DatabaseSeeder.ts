import { EntityManager } from '@mikro-orm/mariadb';
import { Seeder } from '@mikro-orm/seeder';

import { PluginsSeeder } from 'src/db/seeders/PluginsSeeder';

export class DatabaseSeeder extends Seeder {
	public async run(entityManager: EntityManager): Promise<void> {
		return this.call(entityManager, [PluginsSeeder]);
	}
}
