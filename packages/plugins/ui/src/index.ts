import { Component, inject } from "@angular/core";
import { API } from "@pihub/api";

export function initialize() {
	const api = inject(API);

	api.overrideRootComponent(UIComponent);
}

@Component({
	standalone: true,
	selector: "ui",
	template: "<p>HELLO</p>",
})
export class UIComponent {}
