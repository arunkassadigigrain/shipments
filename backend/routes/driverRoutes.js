import express from "express";
import DriverController  from "../controllers/driverController.js";
 
 const  router =  express.Router();
 
 router.get("/getdriver", DriverController.getAllDrivers );
 router.post("/Createdriver", DriverController.createDriver);
 router.patch("/updateDriver/:id" ,DriverController.updateDriver );
 router.delete("/deleteDrriver/:id" ,DriverController.deleteDriver);
 
 
 export default router;