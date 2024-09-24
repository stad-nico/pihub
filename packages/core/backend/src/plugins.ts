import { Plugin } from 'src/db/entities/Plugin';

export const plugins: Array<Pick<Plugin, 'id' | 'name' | 'description' | 'version' | 'url'>> = [
	{ id: 'example', name: 'example', description: 'example', version: 'example', url: 'example' },
];
