import { Component } from '@angular/core';

import { CoreComponent } from 'src/app/core/core.component';

@Component({
	selector: 'app',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [CoreComponent],
})
export class AppComponent {}
