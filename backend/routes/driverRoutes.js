import express from "express";
import DriverControlles  from "../controllers/driverController.js";
 
 const  router =  express.Router();
 
 router.get("/getdriver", DriverControlles.getAllDrivers );
 router.post("/Createdriver", DriverControlles.createDriver);
 router.patch("/updateDriver/:id" ,DriverControlles.updateDriver );
 router.delete("/deleteDrriver/:id" ,DriverControlles.deleteDriver);
 
 
 export default router;