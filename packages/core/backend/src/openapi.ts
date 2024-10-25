import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'src/app.module';
// @ts-ignore
import metadata from './metadata';

async function bootstrap() {
	const application = await NestFactory.create(AppModule);

	const config = new DocumentBuilder().addServer('/api').setTitle('Cloud API').setDescription('The cloud API description').setVersion('1.0').build();

	await SwaggerModule.loadPluginMetadata(metadata);
	const document = SwaggerModule.createDocument(application, config);

	const dirPath = '../openapi';
	const fileName = 'openapi.json';

	await mkdir(path.resolve(dirPath), { recursive: true });

	await writeFile(path.resolve(path.join(dirPath, fileName)), JSON.stringify(document), 'utf-8');

	await application.close();
}

bootstrap();
