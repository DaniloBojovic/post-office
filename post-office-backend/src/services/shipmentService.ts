import { shipments } from "../data/dataStore";
import { Shipment, ShipmentStatus, WeightCategory } from "../models/shipment";

export class ShipmentService {
  getAllShipments(
    page: number,
    limit: number,
    filters: {
      status?: string;
      weight?: string;
      id?: string;
      originPostOfficeId?: number | null;
      destinationPostOfficeId?: number | null;
    }
  ): { data: Shipment[]; total: number } {
    let filteredShipments = shipments;

    if (filters.status) {
      filteredShipments = filteredShipments.filter((shipment) => shipment.status === filters.status);
    }

    if (filters.weight) {
      filteredShipments = filteredShipments.filter((shipment) => shipment.weightCategory === filters.weight);
    }

    if (filters.id) {
      filteredShipments = filteredShipments.filter((shipment) => shipment.id.toString() === filters.id);
    }

    if (filters.originPostOfficeId !== null && filters.originPostOfficeId !== undefined) {
      filteredShipments = filteredShipments.filter((shipment) => shipment.originPostOfficeId === filters.originPostOfficeId);
    }

    if (filters.destinationPostOfficeId !== null && filters.destinationPostOfficeId !== undefined) {
      filteredShipments = filteredShipments.filter(
        (shipment) => shipment.destinationPostOfficeId === filters.destinationPostOfficeId
      );
    }

    const total = filteredShipments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedShipments = filteredShipments.slice(startIndex, endIndex);

    return { data: paginatedShipments, total };
  }

  getShipmentById(id: number): Shipment | undefined {
    return shipments.find((shipment) => shipment.id === id);
  }

  filterShipmentsByStatus(status: ShipmentStatus): Shipment[] {
    return shipments.filter((shipment) => shipment.status === status);
  }

  filterShipmentsByWeight(weightCategory: WeightCategory): Shipment[] {
    return shipments.filter((shipment) => shipment.weightCategory === weightCategory);
  }

  filterShipmentsById(id: number): Shipment[] {
    return shipments.filter((shipment) => shipment.id === id);
  }

  addShipment(newShipment: Shipment): Shipment {
    newShipment.id = shipments.length ? shipments[shipments.length - 1].id + 1 : 1;
    shipments.push(newShipment);
    return newShipment;
  }

  updateShipment(id: number, updatedShipment: Partial<Shipment>): Shipment | undefined {
    const shipment = this.getShipmentById(id);
    if (shipment) {
      Object.assign(shipment, updatedShipment);
      return shipment;
    }
    return undefined;
  }

  deleteShipment(id: number): boolean {
    const index = shipments.findIndex((shipment) => shipment.id === id);
    if (index !== -1) {
      shipments.splice(index, 1);
      return true;
    }
    return false;
  }
}
