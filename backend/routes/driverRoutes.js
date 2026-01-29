import express from "express";
import DriverController  from "../controllers/driverController.js";
import verifyToken from "../middleware/verifyToken.js"
 
 const  router =  express.Router();
 
 router.get("/getdriver", verifyToken, DriverController.getAllDrivers );
 router.post("/Createdriver", verifyToken, DriverController.createDriver);
 router.patch("/updateDriver/:id" , verifyToken, DriverController.updateDriver );
 router.delete("/deleteDrriver/:id" , verifyToken, DriverController.deleteDriver);
 
 
 export default router;