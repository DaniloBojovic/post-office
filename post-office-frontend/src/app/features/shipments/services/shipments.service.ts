import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Shipment {
  id: number;
  type: string;
  status: string;
  weightCategory: string;
  originPostOfficeId: number;
  destinationPostOfficeId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  private apiUrl = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  // getShipments(): Observable<Shipment[]> {
  //   return this.http.get<Shipment[]>(this.apiUrl);
  // }

  getShipments(
    page: number,
    limit: number,
    filters: {
      status?: string;
      weight?: string;
      id?: string;
      originPostOfficeId?: number | null;
      destinationPostOfficeId?: number | null;
    } = {}
  ): Observable<{ data: Shipment[]; total: number }> {
    const params: any = { page, limit, ...filters };
    return this.http.get<{ data: Shipment[]; total: number }>(this.apiUrl, { params });
    //return this.http.get<{ data: Shipment[]; total: number }>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
