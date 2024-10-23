import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export const PLUGIN_TABLE_NAME = 'plugins';

export interface SqlPlugin {
	readonly id: string;

	readonly name: string;

	readonly url: string;

	readonly isInstalled: number;
}

@Entity({ tableName: PLUGIN_TABLE_NAME })
export class Plugin {
	@PrimaryKey({ type: 'uuid', nullable: false, defaultRaw: 'UUID()', unique: true })
	public readonly id!: string;

	@Property({ type: 'varchar', nullable: false })
	public readonly name!: string;

	@Property({ type: 'varchar', nullable: false })
	public readonly url!: string;

	@Property({ type: 'boolean', nullable: false })
	public readonly isInstalled!: boolean;
}
