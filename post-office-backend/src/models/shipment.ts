export enum ShipmentType {
  Letter = "Letter",
  Package = "Package",
}

export enum ShipmentStatus {
  Origin = "Origin", //ProcessedAtOrigin = 'Processed at Origin',
  Destination = "Destination", //ProcessedAtDestination = 'Processed at Destination',
  Delivered = "Delivered",
}

export enum WeightCategory {
  LessThan1kg = "LessThan1kg",
  Between1kgAnd5kg = "Between1kgAnd5kg",
  MoreThan5kg = "MoreThan5kg",
}

export enum WeightCategory {}

export interface Shipment {
  id: number;
  type: ShipmentType;
  status: ShipmentStatus;
  weightCategory: WeightCategory;
  originPostOfficeId: number;
  destinationPostOfficeId: number;
}
