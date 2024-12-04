import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CloudService {
	public getFolders(): Observable<Array<unknown>> {
		return of([]);
	}
}
