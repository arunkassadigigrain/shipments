import express from "express";
import ShipmentController from "../controllers/shipmentController.js";
import verifyToken from "../middleware/verifyToken.js"
 
const router = express.Router();
 
router.post("/createshipment", verifyToken, ShipmentController.createShipment);
router.get("/getshipment/:id", verifyToken, ShipmentController.getShipment);
router.get("/getallshipments", verifyToken, ShipmentController.getAllShipments);
router.get("/getAllCreated", verifyToken, ShipmentController.getCreatedShipments);
router.get("/getShipmentByTime/:range", verifyToken, ShipmentController.getShipments);
router.get("/getShipmentByDateRange/:range", verifyToken, ShipmentController.countShipmentStatus);
export default router;
 