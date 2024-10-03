import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NavigationComponent } from './features/navigation/navigation.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [CoreComponent, RouterOutlet, NavigationComponent],
})
export class AppComponent {}
