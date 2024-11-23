import { Controller, Get, Header, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Plugin } from 'src/db/entities/plugin.entity';
import { PluginService } from 'src/plugins/plugin.service';

@ApiTags('plugins')
@Controller('plugins')
export class PluginController {
	private readonly pluginService: PluginService;

	public constructor(pluginService: PluginService) {
		this.pluginService = pluginService;
	}

	/**
	 * Get a list of all available plugins
	 * @public @async
	 */
	@Get('')
	public async getList(): Promise<Array<Plugin>> {
		return await this.pluginService.getList();
	}

	@Post('reload')
	public async reload(): Promise<void> {
		await this.pluginService.reload();
	}

	/**
	 * Get the source code of an installed plugin
	 * @public @async
	 *
	 * @param res the response
	 * @param pluginId the pluginId
	 * @returns the source code
	 */
	@Get(':pluginId/source')
	@Header('Content-Type', 'application/javascript')
	@ApiResponse({ content: { 'application/javascript': { schema: { type: 'string', format: 'binary' } } } })
	public async getSourceCode(@Res({ passthrough: true }) res: Response, @Param('pluginId') pluginId: string): Promise<StreamableFile> {
		console.log(pluginId);
		const readStream = await this.pluginService.getSourceCode(pluginId);

		res.set({
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/javascript',
		});
		return new StreamableFile(readStream);
	}

	/**
	 * Get the config code of an installed plugin
	 * @public @async
	 *
	 * @param res the response
	 * @param pluginId the pluginId
	 * @returns the config code
	 */
	@Get(':pluginId/config')
	@Header('Content-Type', 'application/javascript')
	@ApiResponse({ content: { 'application/javascript': { schema: { type: 'string', format: 'binary' } } } })
	public async getConfig(@Res({ passthrough: true }) res: Response, @Param('pluginId') pluginId: string): Promise<StreamableFile> {
		console.log(pluginId);
		const readStream = await this.pluginService.getConfig(pluginId);

		res.set({
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/javascript',
		});
		return new StreamableFile(readStream);
	}

	/**
	 * Install a plugin
	 * @public @async
	 *
	 * @param pluginId
	 */
	@Post(':pluginId/install')
	public async install(@Param('pluginId') pluginId: string): Promise<void> {
		await this.pluginService.install(pluginId);
	}

	/**
	 * Uninstall a plugin
	 * @public @async
	 *
	 * @param pluginId
	 */
	@Post(':pluginId/uninstall')
	public async uninstall(@Param('pluginId') pluginId: string): Promise<void> {
		await this.pluginService.uninstall(pluginId);
	}
}
