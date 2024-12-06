import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShipmentsService } from './shipments.service';
import { environment } from '../../../../environments/environment';
import { Shipment } from '../models/shipment.model';

fdescribe('ShipmentsService', () => {
  let service: ShipmentsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/shipments`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShipmentsService],
    });
    service = TestBed.inject(ShipmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch shipments with filters', () => {
    const mockResponse = {
      data: [{ id: 1, type: 'Package', weight: 'LessThan1kg' } as unknown as Shipment],
      total: 1,
    };

    service.getShipments(1, 10, { status: 'Delivered' }).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('10');
    expect(req.request.params.get('status')).toBe('Delivered');

    req.flush(mockResponse);
  });

  it('should add a new shipment', () => {
    const newShipment: Shipment = {
      id: 2,
      type: 'Letter',
      weightCategory: 'Between1kgAnd5kg',
    } as unknown as Shipment;

    service.addShipment(newShipment).subscribe((response) => {
      expect(response).toEqual(newShipment);
    });

    const req = httpMock.expectOne((request) => request.url === apiUrl && request.method === 'POST');
    expect(req.request.body).toEqual(newShipment);

    req.flush(newShipment);
  });

  it('should update a shipment', () => {
    const shipmentId = 301;
    const updatedShipment = {
      id: shipmentId,
      status: 'Delivered',
      weightCategory: 'MoreThan5kg',
    } as Shipment;

    service.updateShipment(shipmentId, { status: 'Delivered', weightCategory: 'MoreThan5kg' }).subscribe((response) => {
      expect(response).toEqual(updatedShipment);
    });

    const req = httpMock.expectOne((request) => request.url === `${apiUrl}/${shipmentId}` && request.method === 'PUT');

    // Assert the payload sent to the server
    expect(req.request.body).toEqual({
      status: 'Delivered',
      weightCategory: 'MoreThan5kg',
    });

    // Mock the response returned by the server
    req.flush(updatedShipment);
  });
  it('should delete a shipment', () => {
    const shipmentId = 301;

    service.deleteShipment(shipmentId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne((request) => request.url === `${apiUrl}/${shipmentId}` && request.method === 'DELETE');
    req.flush(null);
  });
});
