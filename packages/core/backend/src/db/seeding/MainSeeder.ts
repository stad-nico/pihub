import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PluginSeeder } from 'src/db/seeding/PluginSeeder';

export class MainSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [PluginSeeder]);
	}
}
