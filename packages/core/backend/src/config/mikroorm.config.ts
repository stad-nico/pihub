import { config } from 'dotenv';

import { EntityCaseNamingStrategy, MariaDbDriver, defineConfig } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

import { Environment } from './env.config';

config({ path: `${process.env?.['NODE_ENV']}.env` });

export default defineConfig({
	driver: MariaDbDriver,
	entities: ['dist/src/db/entities'],
	entitiesTs: ['src/db/entities'],
	clientUrl: process.env[Environment.DBUrl],
	dbName: process.env[Environment.DBName],
	password: process.env[Environment.DBPassword],
	extensions: [Migrator, SeedManager],
	forceUtcTimezone: true,
	namingStrategy: EntityCaseNamingStrategy,
	strict: true,
	multipleStatements: true,
	baseDir: process.cwd(),
	migrations: {
		tableName: 'migrations',
		path: 'dist/src/db/migrations',
		pathTs: 'src/db/migrations',
		transactional: true,
		snapshot: false,
		emit: 'ts',
	},
	seeder: {
		path: 'dist/src/db/seeding',
		pathTs: 'src/db/seeding',
		emit: 'ts',
		defaultSeeder: 'MainSeeder',
	},
});
