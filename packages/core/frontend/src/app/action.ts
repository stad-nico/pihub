export class ActionTest {
	public static readonly type = '[Breadcrumbs] Build Crumbs';

	public readonly comp: any;

	constructor(comp: any) {
		this.comp = comp;
	}
}
