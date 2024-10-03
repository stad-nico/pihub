import { Plugin } from 'src/db/entities/Plugin';

export const plugins: Array<Pick<Plugin, 'id' | 'name' | 'description' | 'version' | 'url'>> = [
	{
		id: 'pilabs-plugin-poc',
		name: 'Proof of Concept Plugin',
		description:
			'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
		version: 'v0.0.1',
		url: 'http://127.0.0.1:5500/pilabs-plugin-poc/dist/pilabs-plugin-poc.zip',
	},
];
