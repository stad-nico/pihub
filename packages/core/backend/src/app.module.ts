import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PluginModule } from 'src/plugins/plugin.module';
import { StoreModule } from 'src/store/store.module.';

@Module({
	imports: [MikroOrmModule.forRoot(), StoreModule.forRootAsync(), PluginModule],
})
export class AppModule {}
