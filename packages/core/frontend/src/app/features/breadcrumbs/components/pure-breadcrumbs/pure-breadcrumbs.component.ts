import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Breadcrumb } from '@pihub/api';
import { BreadcrumbComponent } from 'src/app/features/breadcrumbs/components/pure-breadcrumbs/components/breadcrumb/breadcrumb.component';

@Component({
	selector: 'pure-breadcrumbs',
	standalone: true,
	templateUrl: './pure-breadcrumbs.component.html',
	styleUrl: './pure-breadcrumbs.component.scss',
	imports: [BreadcrumbComponent],
	animations: [
		trigger('fadeAnimation', [
			transition(':enter', [style({ opacity: 0, translate: '0 4px' }), animate('200ms ease', style({ opacity: 1, translate: 0 }))]),
			transition(':leave', [style({ opacity: 1, translate: 0 }), animate('200ms ease', style({ opacity: 0, translate: '0 4px' }))]),
		]),
	],
})
export class PureBreadcrumbsComponent {
	@Input()
	public breadcrumbs: Array<Breadcrumb> = [];

	@Output()
	public readonly onCrumbClick: EventEmitter<number> = new EventEmitter();
}
