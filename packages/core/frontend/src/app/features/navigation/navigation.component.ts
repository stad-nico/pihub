import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationCategory } from 'src/app/features/navigation/components/pure-navigation/components/navigation-category/navigation-category.component';
import { PureNavigationComponent } from 'src/app/features/navigation/components/pure-navigation/pure-navigation.component';
import { NavigationService } from 'src/app/features/navigation/navigation.service';

@Component({
	selector: 'navigation',
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	standalone: true,
	imports: [PureNavigationComponent, AsyncPipe],
})
export class NavigationComponent {
	private readonly service: NavigationService;

	public categories$: Observable<Array<NavigationCategory>>;

	public isCollapsed: boolean = false;

	constructor(service: NavigationService) {
		this.service = service;

		this.categories$ = this.service.getCategories();
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		this.isCollapsed = false;
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.isCollapsed = true;
	}

	ngOnInit() {
		this.categories$.subscribe();
	}
}
