import express from "express";
import truckControlles from "../controllers/truckController.js";
import verifyToken from "../middleware/verifyToken.js"
const router = express.Router();
 
 
router.get("/getAllTruck", verifyToken, truckControlles.getAllTruck);
router.post("/createtruck", verifyToken, truckControlles.createTruck);
router.get("/gettruckbyid/:id", verifyToken, truckControlles.getTruckById);
router.patch("/updatetruck/:id", verifyToken, truckControlles.updatetruck);
router.delete("/deletetruck/:id", verifyToken, truckControlles.deletetruck);
 
 
 
 
 
export default router;