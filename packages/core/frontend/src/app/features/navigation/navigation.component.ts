import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ListItem } from '@pihub/ui';

import { PureNavigationComponent } from 'src/app/features/navigation/components/pure-navigation/pure-navigation.component';
import { NavigationService } from 'src/app/features/navigation/navigation.service';
import { NavigationItem } from 'src/app/features/navigation/state/navigation.state';

@Component({
	selector: 'navigation',
	standalone: true,
	imports: [PureNavigationComponent],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
	private readonly service: NavigationService;

	private readonly items$: Observable<Array<NavigationItem>>;

	private readonly selected$: Observable<NavigationItem | undefined>;

	public items: Array<NavigationItem> = [];

	public selected: NavigationItem | undefined = undefined;

	public constructor(service: NavigationService) {
		this.service = service;

		this.items$ = service.getItems();
		this.selected$ = service.getSelected();
	}

	public ngOnInit() {
		this.items$.subscribe((items) => (this.items = items));

		this.selected$.subscribe((selected) => (this.selected = selected));
	}

	public onClick(item: ListItem) {
		this.service.navigate(item.title);
	}

	public onHeaderClick() {
		this.service.navigateRoot();
	}
}
