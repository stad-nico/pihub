import { NotFoundException } from '@nestjs/common';

export class PluginNotFoundException extends NotFoundException {
	constructor(pluginId: string) {
		super(`plugin ${pluginId} does not exist`);
	}
}
