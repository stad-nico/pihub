import { NotFoundException } from '@nestjs/common';

export class PluginNotFoundException extends NotFoundException {
	constructor(pluginId: string) {
		super(`plugin with id ${pluginId} does not exist`);
	}
}
