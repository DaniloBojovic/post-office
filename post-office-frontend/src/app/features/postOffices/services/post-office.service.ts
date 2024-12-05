import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostOfficeService {
  private apiUrl = 'http://localhost:3000/post-offices';

  constructor(private http: HttpClient) {}

  getPostOffices(): Observable<{ id: number; name: string; zipCode: string }[]> {
    return this.http.get<{ id: number; name: string; zipCode: string }[]>(this.apiUrl);
  }
}
