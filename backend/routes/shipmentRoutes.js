import express from "express";
import ShipmentController from "../controllers/shipmentController.js";
 
const router = express.Router();
 
router.post("/createshipment", ShipmentController.createShipment);
router.get("/getshipment/:id", ShipmentController.getShipment);
router.get("/getallshipments", ShipmentController.getAllShipments);
router.get("/getAllCreated", ShipmentController.getCreatedShipments);
router.get("/getShipmentByDateRange/:range", ShipmentController.countShipmentStatus);
export default router;
 