import { EntityCaseNamingStrategy, MariaDbDriver, defineConfig } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { config } from 'dotenv';

config({ path: `${process.env.NODE_ENV}.env` });

export default defineConfig({
	driver: MariaDbDriver,
	entities: ['dist/db/entities'],
	entitiesTs: ['src/db/entities'],
	dbName: process.env['DB_NAME']!,
	clientUrl: process.env['CLIENT_URL']!,
	password: process.env['DB_PASSWORD']!,
	extensions: [Migrator, SeedManager],
	forceUtcTimezone: true,
	namingStrategy: EntityCaseNamingStrategy,
	strict: true,
	multipleStatements: true,
	baseDir: process.cwd(),
	migrations: {
		tableName: 'migrations',
		path: 'dist/db/migrations',
		pathTs: 'src/db/migrations',
		transactional: true,
		snapshot: false,
		emit: 'ts',
	},
	seeder: {
		path: 'dist/db/seeders',
		pathTs: 'src/db/seeders',
		emit: 'ts',
		defaultSeeder: 'DatabaseSeeder',
	},
});
