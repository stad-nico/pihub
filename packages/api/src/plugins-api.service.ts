import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PluginInfo, PluginsService } from '@pihub/openapi/generated';

@Injectable({ providedIn: 'root' })
export class PluginsAPIService {
	private readonly pluginsService: PluginsService;

	constructor(pluginsService: PluginsService) {
		this.pluginsService = pluginsService;
	}

	public getPluginInfo(pluginId: string): Observable<PluginInfo> {
		return this.pluginsService.getPluginInfo(pluginId);
	}
}
