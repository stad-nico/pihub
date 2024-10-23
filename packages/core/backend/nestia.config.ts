import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
// import { FastifyAdapter } from "@nestjs/platform-fastify";

import { AppModule } from 'src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
	input: async () => {
		const app = await NestFactory.create(AppModule);

		return app;
	},
	swagger: {
		openapi: '3.1',
		output: '../openapi.json',
		servers: [
			{
				url: '/api',
				description: 'Local Server',
			},
		],
		beautify: true,
		info: {
			title: 'pihub',
			version: '0.0.1',

			license: {
				identifier: '',
				name: 'UNLICENSED',
			},
		},
		operationId: (props) => {
			return props.function;
		},
	},
};
export default NESTIA_CONFIG;
