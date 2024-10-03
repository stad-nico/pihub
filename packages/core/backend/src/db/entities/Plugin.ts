import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/mariadb';

export const PLUGINS_TABLE_NAME = 'plugins';

@Entity({ tableName: PLUGINS_TABLE_NAME })
export class Plugin {
	[OptionalProps]?: 'isInstalled' | 'isActivated';

	@PrimaryKey({ type: 'varchar', nullable: false, unique: true })
	readonly id!: string;

	@Property({ type: 'varchar', nullable: false })
	readonly name!: string;

	@Property({ type: 'varchar', nullable: false })
	readonly description!: string;

	@Property({ type: 'varchar', nullable: false })
	readonly version!: string;

	@Property({ type: 'varchar', nullable: false })
	readonly url!: string;

	// @Property({ type: 'boolean', nullable: false, default: false })
	// readonly isActivated!: boolean;

	@Property({ type: 'boolean', nullable: false, default: false })
	readonly isInstalled!: boolean;
}
