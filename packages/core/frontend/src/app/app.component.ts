import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PluginsService } from '@pihub/openapi';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HttpClientModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	pluginsService!: PluginsService;

	plugins: Array<any> = [];

	constructor(pluginsService: PluginsService) {
		this.pluginsService = pluginsService;
	}

	ngOnInit() {
		this.pluginsService.getPluginList().subscribe((list) => (this.plugins = list));
	}
}
