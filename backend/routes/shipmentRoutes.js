import express from "express";
import ShipmentController from "../controllers/shipmentController.js";
 
const router = express.Router();
 
router.post("/createshipment", ShipmentController.createShipment);
router.get("/getshipment/:id", ShipmentController.getShipment);
router.get("/getallshipments", ShipmentController.getAllShipments);
 
export default router;
 