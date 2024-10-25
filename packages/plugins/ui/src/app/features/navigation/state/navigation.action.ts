import { NavigationCategory, NavigationItem } from '../../../../api';

export class AppendCategory {
	public static type = '[Navigation] Append Category';

	public readonly category: NavigationCategory;

	public constructor(category: NavigationCategory) {
		this.category = category;
	}
}

export class AppendItem {
	public static type = '[Navigation] Append Item';

	public readonly categoryName: string;

	public readonly item: NavigationItem;

	public constructor(categoryName: string, item: NavigationItem) {
		this.categoryName = categoryName;
		this.item = item;
	}
}

export class Navigate {
	public static type = '[Navigation] Navigate';

	public readonly event: { categoryTitle: string; itemTitle: string };

	public constructor(event: { categoryTitle: string; itemTitle: string }) {
		this.event = event;
	}
}
