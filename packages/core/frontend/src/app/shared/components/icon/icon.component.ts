import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
	standalone: true,
	selector: 'icon',
	templateUrl: './icon.component.html',
})
export class IconComponent {
	private readonly httpClient: HttpClient;

	private readonly elementRef: ElementRef;

	@Input({ required: true })
	url!: string;

	constructor(httpClient: HttpClient, elementRef: ElementRef) {
		this.httpClient = httpClient;
		this.elementRef = elementRef;
	}

	ngOnInit() {
		this.httpClient.get(this.url, { observe: 'body', responseType: 'text' }).subscribe((svg) => {
			this.elementRef.nativeElement.innerHTML = svg;
		});
	}
}
