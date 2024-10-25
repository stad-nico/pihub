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
	/**
	 * The id of the plugin
	 *
	 * @example '7d2d646c-196c-4dd9-9227-f58b7f93b667'
	 */
	@PrimaryKey({ type: 'uuid', nullable: false, defaultRaw: 'UUID()', unique: true })
	public readonly id!: string;

	/**
	 * The name of the plugin
	 *
	 * @example 'ui'
	 */
	@Property({ type: 'varchar', nullable: false })
	public readonly name!: string;

	/**
	 * The url of the plugins bundle
	 *
	 * @example '<url>'
	 */
	@Property({ type: 'varchar', nullable: false })
	public readonly url!: string;

	/**
	 * Whether the plugin is currently installed
	 *
	 * @example true
	 */
	@Property({ type: 'boolean', nullable: false })
	public readonly isInstalled!: boolean;
}
