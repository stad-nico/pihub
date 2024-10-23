import { NotFoundException } from '@nestjs/common';

export class PluginNotInstalledException extends NotFoundException {
	constructor(pluginId: string) {
		super(`plugin ${pluginId} is not installed`);
	}
}
