import { Migration } from '@mikro-orm/migrations';

export class InitialMigration20241021184134 extends Migration {
	override async up(): Promise<void> {
		this.addSql(
			`create table \`plugins\` (\`id\` varchar(36) not null default UUID(), \`name\` varchar(255) not null, \`url\` varchar(255) not null, \`isInstalled\` tinyint(1) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
		);
	}

	override async down(): Promise<void> {
		this.addSql(`drop table if exists \`plugins\`;`);
	}
}
