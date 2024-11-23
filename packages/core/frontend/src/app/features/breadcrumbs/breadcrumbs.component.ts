import { Component } from '@angular/core';
import { Breadcrumb } from '@pihub/api';
import { Observable } from 'rxjs';
import { BreadcrumbsService } from 'src/app/features/breadcrumbs/breadcrumbs.service';
import { PureBreadcrumbsComponent } from './components/pure-breadcrumbs/pure-breadcrumbs.component';

@Component({
	selector: 'breadcrumbs',
	standalone: true,
	templateUrl: './breadcrumbs.component.html',
	styleUrl: './breadcrumbs.component.scss',
	imports: [PureBreadcrumbsComponent],
})
export class BreadcrumbsComponent {
	private readonly breadcrumbsService: BreadcrumbsService;

	private readonly breadcrumbs$: Observable<Array<Breadcrumb>>;

	public breadcrumbs: Array<Breadcrumb> = [];

	public constructor(breadcrumbsService: BreadcrumbsService) {
		this.breadcrumbsService = breadcrumbsService;

		this.breadcrumbs$ = breadcrumbsService.getCrumbs();
	}

	public ngOnInit() {
		this.breadcrumbs$.subscribe((breadcrumbs) => (this.breadcrumbs = breadcrumbs));
	}

	public onCrumbClick(id: number) {
		this.breadcrumbsService.crumbClick(id);
	}
}
