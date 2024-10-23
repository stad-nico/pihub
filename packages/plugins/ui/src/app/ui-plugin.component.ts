import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './features/navigation/navigation.component';

@Component({
	standalone: true,
	selector: 'ui-plugin',
	templateUrl: './ui-plugin.component.html',
	styleUrl: './ui-plugin.component.scss',
	imports: [NavigationComponent, RouterOutlet],
})
export class UiPluginComponent {}
