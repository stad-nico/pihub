import { NavigationItem } from 'src/app/features/navigation/state/navigation.state';

export class AppendItem {
	public static type = '[Navigation] Append Item';

	public readonly item: NavigationItem;

	public constructor(item: NavigationItem) {
		this.item = item;
	}
}

export class RemoveItem {
	public static type = '[Navigation] Remove Item';

	public readonly title: string;

	public constructor(title: string) {
		this.title = title;
	}
}

export class Navigate {
	public static type = '[Navigation] Navigate';

	public readonly title: string;

	public constructor(title: string) {
		this.title = title;
	}
}

export class NavigateRoot {
	public static type = '[Navigation] NavigateRoot';
}
