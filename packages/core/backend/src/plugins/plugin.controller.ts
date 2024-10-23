import { SwaggerCustomizer, TypedParam, TypedRoute } from '@nestia/core';
import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';

import { Plugin } from 'src/db/entities/plugin.entity';
import { PluginService } from 'src/plugins/plugin.service';

@Controller('plugins')
export class PluginController {
	private readonly pluginService: PluginService;

	public constructor(pluginService: PluginService) {
		this.pluginService = pluginService;
	}

	/**
	 *
	 *
	 * @tag plugins
	 */
	@TypedRoute.Get('')
	public async getList(): Promise<Array<Plugin>> {
		return await this.pluginService.getList();
	}

	/**
	 *
	 *
	 * @tag plugins
	 */
	@SwaggerCustomizer((props) => {
		props.route.responses!['200']!.content = { '*/*': { schema: { type: 'string', format: 'binary' } } };
	})
	@Get(':pluginId/source')
	public async getSourceCode(@Res({ passthrough: true }) res: Response, @TypedParam('pluginId') pluginId: string): Promise<StreamableFile> {
		const readStream = await this.pluginService.getSourceCode(pluginId);

		res.header({ 'Content-Type': 'text/javascript' });

		return new StreamableFile(readStream);
	}

	/**
	 *
	 *
	 * @tag plugins
	 */
	@TypedRoute.Post(':pluginId/install')
	public async install(@TypedParam('pluginId') pluginId: string): Promise<void> {
		return await this.pluginService.install(pluginId);
	}

	/**
	 *
	 *
	 * @tag plugins
	 */
	@TypedRoute.Post(':pluginId/uninstall')
	public async uninstall(@TypedParam('pluginId') pluginId: string): Promise<void> {
		return await this.pluginService.uninstall(pluginId);
	}
}
