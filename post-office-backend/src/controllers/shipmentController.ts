import { Request, Response } from "express";
import { ShipmentService } from "../services/shipmentService";
import { ShipmentStatus, WeightCategory } from "../models/shipment";

const shipmentService = new ShipmentService();

export const getAllShipments = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page <= 0 || limit <= 0) {
    res.status(400).json({ error: "Page and limit must be positive integers." });
    return;
  }

  const { data, total } = shipmentService.getAllShipments(page, limit);
  res.json({ data, total, page, limit });
};

// export const getAllShipments = (req: Request, res: Response) => {
//   const shipments = shipmentService.getAllShipments();
//   res.json(shipments);
// };

export const getShipmentById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const shipment = shipmentService.getShipmentById(id);
  if (shipment) {
    res.json(shipment);
  } else {
    res.status(404).json({ error: "Shipment not found" });
  }
};

export const filterShipmentsByStatus = (req: Request, res: Response) => {
  const { status } = req.query;

  if (!status || !Object.values(ShipmentStatus).includes(status as ShipmentStatus)) {
    res.status(400).json({ error: "Invalid or missing 'status' query parameter." });
    return;
  }

  const filteredShimpents = shipmentService.filterShipmentsByStatus(status as ShipmentStatus);
  res.json({ data: filteredShimpents });
};

export const filterShipmentsByWeight = (req: Request, res: Response) => {
  const weightCategory = req.query.weightCategory as WeightCategory;
  console.log("weightCategory: ", weightCategory);
  console.log("WeightCategory#ies: ", Object.values(WeightCategory));

  if (!Object.values(WeightCategory).includes(weightCategory)) {
    res.status(400).json({ error: "Invalid or missing 'weightCategory' query parameter." });
    return;
  }

  const filteredShipments = shipmentService.filterShipmentsByWeight(weightCategory);
  console.log("filteredShipments: ", filteredShipments);

  if (filteredShipments.length === 0) {
    res.status(404).json({ error: "No shipments found for the given weight filter." });
  } else {
    res.json({ data: filteredShipments });
  }
};

export const filterShipmentsById = (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid or missing 'id' query parameter." });
    return;
  }

  const filteredShipments = shipmentService.filterShipmentsById(id);

  if (filteredShipments.length === 0) {
    res.status(404).json({ error: "No shipments found for the given ID filter." });
  } else {
    res.json({ data: filteredShipments });
  }
};

export const addShipment = (req: Request, res: Response) => {
  const newShipment = req.body;
  const addedShipment = shipmentService.addShipment(newShipment);
  res.status(201).json(addedShipment);
};

export const updateShipment = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedShipment = shipmentService.updateShipment(id, req.body);
  if (updatedShipment) {
    res.json(updatedShipment);
  } else {
    res.status(404).json({ error: "Shipment not found" });
  }
};

export const deleteShipment = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const isDeleted = shipmentService.deleteShipment(id);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Shipment not found" });
  }
};
