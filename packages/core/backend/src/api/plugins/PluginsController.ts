import { TypedParam, TypedRoute } from '@nestia/core';
import { Body, Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PluginId } from 'src/api/plugins/models/PluginId';
import { PluginInfo } from 'src/api/plugins/models/PluginInfo';

import { PluginsService } from 'src/api/plugins/PluginsService';

@Controller('plugins')
export class PluginsController {
	private readonly service: PluginsService;

	constructor(service: PluginsService) {
		this.service = service;
	}

	/**
	 * Get a list of available plugins.
	 *
	 * @public @async
	 *
	 * @returns {Promise<Array<PluginInfo>>} The list of available plugins
	 *
	 * @summary get plugins list
	 */
	@ApiTags('plugins')
	@TypedRoute.Get()
	public async getPluginList(): Promise<Array<PluginInfo>> {
		return await this.service.getPluginList();
	}

	/**
	 * Get information about a specific plugin.
	 *
	 * @public @async
	 *
	 * @param {string} pluginId The id of the plugin
	 * @returns {Promise<PluginInfo>} The plugin information
	 *
	 * @summary get plugin info
	 */
	@ApiTags('plugins')
	@TypedRoute.Get(':pluginId')
	public async getPluginInfo(@TypedParam('pluginId') pluginId: string): Promise<PluginInfo> {
		return await this.service.getPluginInfo(pluginId);
	}

	@ApiTags('plugins')
	@Get(':pluginId/:sourcePath')
	public async getSourceCode(
		@Res({ passthrough: true }) res: Response,
		@TypedParam('pluginId') pluginId: string,
		@TypedParam('sourcePath') sourcePath: string,
	): Promise<StreamableFile> {
		res.header({
			'Content-Type': 'application/javascript',
		});

		return this.service.getSourceCode(pluginId, sourcePath);
	}

	/**
	 * Install a plugin.
	 *
	 * @public @async
	 *
	 * @param {string} pluginId The id of the plugin
	 *
	 * @summary install plugin
	 */
	@ApiTags('plugins')
	@TypedRoute.Post('install')
	public async installPlugin(@Body() body: PluginId): Promise<void> {
		return await this.service.installPlugin(body.pluginId);
	}

	// /**
	//  * Activate a plugin.
	//  *
	//  * @public @async
	//  *
	//  * @param {string} pluginId The id of the plugin
	//  *
	//  * @summary activate plugin
	//  */
	// @ApiTags('plugins')
	// @TypedRoute.Post(':pluginId/activate')
	// public async activatePlugin(@TypedParam('pluginId') pluginId: string): Promise<void> {
	// 	return await this.service.activatePlugin(pluginId);
	// }

	// /**
	//  * Deactivate a plugin.
	//  *
	//  * @public @async
	//  *
	//  * @param {string} pluginId The id of the plugin
	//  *
	//  * @summary deactivate plugin
	//  */
	// @ApiTags('plugins')
	// @TypedRoute.Post(':pluginId/deactivate')
	// public async deactivatePlugin(@TypedParam('pluginId') pluginId: string): Promise<void> {
	// 	return await this.service.deactivatePlugin(pluginId);
	// }

	/**
	 * Uninstall a plugin
	 *
	 * @public @async
	 *
	 * @param {string} pluginId The id of the plugin
	 *
	 * @summary uninstall plugin
	 */
	@ApiTags('plugins')
	@TypedRoute.Delete(':pluginId')
	public async uninstallPlugin(@TypedParam('pluginId') pluginId: string): Promise<void> {
		return await this.service.uninstallPlugin(pluginId);
	}
}
