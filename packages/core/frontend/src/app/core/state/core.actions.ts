export class FetchPlugins {
	public static readonly type = '[Core] Fetch Plugins';
}

export class InstallPlugin {
	public static type = '[Core] Install Plugin';

	public readonly pluginId: string;

	public constructor(pluginId: string) {
		this.pluginId = pluginId;
	}
}

export class UninstallPlugin {
	public static type = '[Core] Uninstall Plugin';

	public readonly pluginId: string;

	public constructor(pluginId: string) {
		this.pluginId = pluginId;
	}
}

export class LoadPlugin {
	public static type = '[Core] Load Plugin';

	public readonly pluginId: string;

	public constructor(pluginId: string) {
		this.pluginId = pluginId;
	}
}
