import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private readonly apiUrl = 'https://mocki.io/v1/61c56458-2b07-44e2-9ec9-c7df98ccbe9f';

	constructor(private http: HttpClient) {}

	getData(): Observable<any> {
		return this.http.get<any>(this.apiUrl);
	}
}
