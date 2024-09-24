import { NotFoundException } from '@nestjs/common';

export class PluginNotInstalledException extends NotFoundException {
	constructor(pluginId: string) {
		super(`plugin with id ${pluginId} is not installed`);
	}
}
