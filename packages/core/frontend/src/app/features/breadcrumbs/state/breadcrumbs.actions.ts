export class SetCrumbs {
	public static type = '[Breadcrumbs] Set Crumbs';

	public readonly titles: Array<string>;

	public constructor(titles: Array<string>) {
		this.titles = titles;
	}
}

export class AddCrumb {
	public static type = '[Breadcrumbs] Add Crumb';

	public readonly title: string;

	public constructor(title: string) {
		this.title = title;
	}
}
