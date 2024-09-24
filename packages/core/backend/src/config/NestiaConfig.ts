import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/AppModule';

const NESTIA_CONFIG: INestiaConfig = {
	input: async () => await NestFactory.create(AppModule),
	swagger: {
		openapi: '3.1',
		output: '../openapi.json',
		beautify: true,
		info: {
			title: 'PiLabs API',
			license: {
				name: 'license',
				identifier: 'MIT',
			},
		},
		operationId: (props) => props.function,
	},
};

export default NESTIA_CONFIG;
