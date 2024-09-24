import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PiLabsAPIService } from '../api/pi-labs-api.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'frontend';

	constructor(s: PiLabsAPIService) {
		s.plugins.
	}
}
