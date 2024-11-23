import { ConflictException } from '@nestjs/common';

export class PluginCannotBeRemovedException extends ConflictException {
	constructor(pluginId: string) {
		super(`plugin ${pluginId} cannot be removed`);
	}
}
