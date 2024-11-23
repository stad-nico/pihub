import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export const PLUGIN_TABLE_NAME = 'plugins';

export interface SqlPlugin {
	readonly id: string;

	readonly name: string;

	readonly sourceUrl: string;

	readonly sourceId: string;

	readonly configUrl: string;

	readonly configId: string;

	readonly isInstalled: number;

	readonly isCore: number;
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
	public readonly sourceUrl!: string;

	/**
	 * The id of the bundle storage location
	 *
	 * @example '<url>'
	 */
	@Property({ type: 'varchar', nullable: false, defaultRaw: 'UUID()' })
	public readonly sourceId!: string;

	/**
	 * The url of the plugins config
	 *
	 * @example '<url>'
	 */
	@Property({ type: 'varchar', nullable: false })
	public readonly configUrl!: string;

	/**
	 * The id of the config storage location
	 *
	 * @example '<url>'
	 */
	@Property({ type: 'varchar', nullable: false, defaultRaw: 'UUID()' })
	public readonly configId!: string;

	/**
	 * Whether the plugin is currently installed
	 *
	 * @example true
	 */
	@Property({ type: 'boolean', nullable: false, defaultRaw: 'false' })
	public readonly isInstalled!: boolean;

	/**
	 * Whether the plugin is part of the core
	 *
	 * @example true
	 */
	@Property({ type: 'boolean', nullable: false, defaultRaw: 'false' })
	public readonly isCore!: boolean;
}
