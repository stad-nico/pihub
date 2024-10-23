import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import plugins from 'plugins.json';
import { Plugin } from 'src/db/entities/plugin.entity';

export class PluginSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.insertMany(Plugin, plugins);
	}
}
