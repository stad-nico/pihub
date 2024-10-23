import { createReadStream, ReadStream } from 'fs';
import { access, mkdir, rm, statfs, writeFile } from 'fs/promises';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment, NodeEnv } from 'src/config/env.config';

@Injectable()
export class StoreService {
	private readonly logger = new Logger(StoreService.name);

	private readonly configService: ConfigService;

	private readonly storageLocationPath: string;

	public constructor(configService: ConfigService) {
		this.configService = configService;
		this.storageLocationPath = configService.getOrThrow(Environment.StoragePath);
	}

	public async has(id: string): Promise<boolean> {
		return await this.pathExists(path.join(this.storageLocationPath, this.uuidToDirPath(id)));
	}

	public async get(id: string): Promise<ReadStream | null> {
		if (!(await this.has(id))) {
			return null;
		}

		return createReadStream(path.join(this.storageLocationPath, this.uuidToDirPath(id)));
	}

	public async remove(id: string) {
		if (!(await this.has(id))) {
			return;
		}

		await rm(path.join(this.storageLocationPath, this.uuidToDirPath(id)));
	}

	public async store(id: string, data: Buffer | ReadableStream) {
		const filePath = path.join(this.storageLocationPath, this.uuidToDirPath(id));
		const parentPath = path.dirname(filePath);

		if (!(await this.pathExists(parentPath))) {
			await mkdir(parentPath, { recursive: true });
		}

		await writeFile(filePath, data);
	}

	public async beforeApplicationShutdown(): Promise<void> {
		if (this.configService.getOrThrow(Environment.NodeENV) === NodeEnv.Production) {
			return;
		}

		this.logger.log('Cleaning up...');

		await rm(this.storageLocationPath, { recursive: true });

		this.logger.log('Finished cleaning up');
	}

	public async init() {
		if (!(await this.pathExists(this.storageLocationPath))) {
			try {
				this.logger.log(`Trying to initialize storage location '${this.storageLocationPath}' ...`);

				await mkdir(this.storageLocationPath, { recursive: true });

				this.logger.log('Successfully initialized storage location');
			} catch (e) {
				throw new Error(`Could not create storage location '${this.storageLocationPath}': ${e}`);
			}
		}

		const stats = await statfs(this.storageLocationPath);
		const freeSpace = Number(stats.bsize * stats.bfree);

		this.logger.log(`Storage location ${this.storageLocationPath} has ${this.formatBytes(freeSpace)} of free space`);
	}

	private formatBytes(bytes: number, decimals: number = 2): string {
		if (!+bytes) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	private async pathExists(path: string): Promise<boolean> {
		return (await access(path).catch(() => false)) === undefined;
	}

	private uuidToDirPath(uuid: string): string {
		return uuid.match(/.{1,2}/g)!.reduce((acc, curr, ind) => (acc += ind === 1 || ind === 2 ? '/' + curr : curr));
	}
}
