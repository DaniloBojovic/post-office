import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment.model';

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

  getShipmentById(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  addShipment(newShipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, newShipment);
  }

  updateShipment(id: number, updatedShipment: Partial<Shipment>): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}`, updatedShipment);
  }

  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
