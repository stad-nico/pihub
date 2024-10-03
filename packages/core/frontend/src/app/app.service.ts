import { Injectable } from '@angular/core';
import { Component } from '@pihub/api';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
	private readonly rootComponentSubject = new Subject<Component<unknown>>();

	public readonly rootComponent$ = this.rootComponentSubject.asObservable();

	public replaceRootComponent(component: Component<unknown>) {
		this.rootComponentSubject.next(component);
	}
}
