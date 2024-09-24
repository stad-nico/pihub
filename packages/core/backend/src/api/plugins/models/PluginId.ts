import { ApiProperty } from '@nestjs/swagger';

export class PluginId {
	@ApiProperty({ description: 'The id of the plugin' })
	readonly pluginId!: string;
}
