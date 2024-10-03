export namespace PluginsActions {
	export class FetchPlugins {
		public static readonly type = '[Plugins] Fetch Plugins';
	}

	export class Install {
		public static readonly type = '[Plugins] Install';

		public readonly id: string;

		constructor(id: string) {
			this.id = id;
		}
	}

	export class Uninstall {
		public static readonly type = '[Plugins] Uninstall';

		public readonly id: string;

		constructor(id: string) {
			this.id = id;
		}
	}
}
