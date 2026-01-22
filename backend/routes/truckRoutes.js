import express from "express";
import truckControlles from "../controllers/truckController.js";
 
const router = express.Router();
 
 
router.get("/getAllTruck", truckControlles.getAllTruck);
router.post("/createtruck", truckControlles.createTruck);
router.get("/gettruckbyid/:id", truckControlles.getTruckById);
router.patch("/updatetruck/:id", truckControlles.updatetruck);
router.delete("/deletetruck/:id", truckControlles.deletetruck);
 
 
 
 
 
export default router;