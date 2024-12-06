import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostOffice } from '../models/postOffice.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostOfficeService {
  private apiUrl = `${environment.apiUrl}/post-offices`;

  constructor(private http: HttpClient) {}

  getPostOffices(): Observable<PostOffice[]> {
    return this.http.get<{ id: number; name: string; zipCode: string }[]>(this.apiUrl);
  }

  getPostOfficesWithPaging(page: number, limit: number): Observable<{ data: PostOffice[]; total: number }> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<{ data: PostOffice[]; total: number }>(`${this.apiUrl}/paging`, { params });
  }

  getPostOfficeById(id: number): Observable<PostOffice> {
    return this.http.get<PostOffice>(`${this.apiUrl}/${id}`);
  }

  addPostOffice(postOffice: PostOffice): Observable<PostOffice> {
    return this.http.post<PostOffice>(this.apiUrl, postOffice);
  }

  updatePostOffice(id: number, postOffice: Partial<PostOffice>): Observable<PostOffice> {
    return this.http.put<PostOffice>(`${this.apiUrl}/${id}`, postOffice);
  }

  deletePostOffice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
