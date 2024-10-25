import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { Plugin } from 'src/db/entities/plugin.entity';
import plugins from 'src/plugins.json';

export class PluginSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.insertMany(Plugin, plugins);
	}
}
