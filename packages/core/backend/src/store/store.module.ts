import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StoreService } from 'src/store/store.service';

@Global()
@Module({
	providers: [StoreService, ConfigService],
	exports: [StoreService],
})
export class StoreModule {
	public static async forRootAsync(): Promise<DynamicModule> {
		return {
			module: StoreModule,
			providers: [
				{
					provide: StoreService,
					inject: [ConfigService],
					useFactory: async (configService: ConfigService) => {
						const storeService = new StoreService(configService);

						await storeService.init();

						return storeService;
					},
				},
			],
		};
	}
}
