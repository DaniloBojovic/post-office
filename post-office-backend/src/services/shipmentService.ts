import { shipments } from "../data/dataStore";
import { Shipment, ShipmentStatus, WeightCategory } from "../models/shipment";

export class ShipmentService {
  getAllShipments(page: number, limit: number): { data: Shipment[]; total: number } {
    const total = shipments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedShipments = shipments.slice(startIndex, endIndex);
    return { data: paginatedShipments, total };
  }

  //   getAllShipments(): Shipment[] {
  //     return shipments;
  //   }

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
