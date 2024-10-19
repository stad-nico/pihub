import {
	Component,
	Injector,
	runInInjectionContext,
	ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { PiHubApiImpl } from './api';
import { T } from './store';

@Component({
	selector: 'app',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	constructor(
		private injector: Injector,
		private api: PiHubApiImpl,
		private store: Store,
		private viewContainerRef: ViewContainerRef
	) {}

	async ngOnInit() {
		this.store.select(T.getR).subscribe((f) => {
			if (!f.rootC) {
				return;
			}

			const m = this.viewContainerRef.createComponent(f.rootC);
			console.log(m);
		});

		const module = await import(
			// @ts-ignore
			'http://127.0.0.1:5500/packages/plugins/dist/ui/fesm2022/ui.mjs'
		);

		runInInjectionContext(this.injector, async () => {
			await module.initialize();
		});
	}
}
