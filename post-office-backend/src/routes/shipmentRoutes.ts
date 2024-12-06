import express from "express";
import {
  addShipment,
  deleteShipment,
  filterShipmentsById,
  filterShipmentsByStatus,
  filterShipmentsByWeight,
  getAllShipments,
  getShipmentById,
  updateShipment,
} from "../controllers/shipmentController";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming request to ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", getAllShipments);
router.get("/filter", filterShipmentsByStatus);
router.get("/filter/weight", filterShipmentsByWeight);
router.get("/filter/id", filterShipmentsById);
router.get("/:id", getShipmentById);
router.post("/", addShipment);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);

export default router;
