import { Component } from '@angular/core';
import { MasterDetailComponent } from '@pihub/ui';
import { Observable, Subscription } from 'rxjs';
import { CloudService } from './cloud.service';

@Component({
	standalone: true,
	selector: 'plugin-cloud',
	templateUrl: './cloud.component.html',
	styleUrl: './cloud.component.scss',
	imports: [MasterDetailComponent],
})
export class CloudComponent {
	private readonly subscriptions: Subscription = new Subscription();

	private readonly cloudService: CloudService;

	private readonly folders$: Observable<Array<any>>;

	public folders: Array<any> = [];

	public constructor(cloudService: CloudService) {
		this.cloudService = cloudService;

		this.folders$ = this.cloudService.getFolders();
	}

	public ngOnInit() {
		this.subscriptions.add(this.folders$.subscribe((folders) => (this.folders = folders)));
	}
}
