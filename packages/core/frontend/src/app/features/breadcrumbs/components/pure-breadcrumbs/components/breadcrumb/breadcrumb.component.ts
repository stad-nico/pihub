import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Breadcrumb } from '@pihub/api';
import { IconComponent } from '@pihub/ui';

@Component({
	standalone: true,
	selector: 'breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
	imports: [IconComponent],
})
export class BreadcrumbComponent {
	@Input({ required: true })
	public breadcrumb!: Breadcrumb;

	@Output()
	public onClick: EventEmitter<number> = new EventEmitter();
}
