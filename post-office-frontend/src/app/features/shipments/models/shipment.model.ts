export interface Shipment {
  id: number;
  type: string;
  status: string;
  weightCategory: string;
  originPostOfficeId: number;
  destinationPostOfficeId: number;
}
