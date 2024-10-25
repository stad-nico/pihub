import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PluginInitModule } from 'src/plugins/init/plugin-init.module';
import { PluginModule } from 'src/plugins/plugin.module';
import { StoreModule } from 'src/store/store.module';

@Module({
	imports: [MikroOrmModule.forRoot(), StoreModule.forRootAsync(), PluginModule, PluginInitModule.forRootAsync()],
})
export class AppModule {}
