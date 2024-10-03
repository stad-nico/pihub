import { Migration } from '@mikro-orm/migrations';

export class InitialMigration20240923204448 extends Migration {
	public async up(): Promise<void> {
		this.addSql(
			`create table \`plugins\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` longtext not null, \`version\` varchar(255) not null, \`url\` varchar(255) not null, \`isActivated\` tinyint(1) not null default false, \`isInstalled\` tinyint(1) not null default false, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
		);
	}
}
