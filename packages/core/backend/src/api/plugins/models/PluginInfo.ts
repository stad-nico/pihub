import { Plugin } from 'src/db/entities/Plugin';

export type PluginInfo = Pick<Plugin, 'id' | 'name' | 'description' | 'url' | 'version' | 'isActivated' | 'isInstalled'>;
