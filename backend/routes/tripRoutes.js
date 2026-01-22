import express from "express";
import TripController from "../controllers/tripController.js";

 
const router = express.Router();
 
 
router.post("/createTrip",TripController.createTrip);
router.post("/verifyOtp", TripController.verifyTripOTP);
router.patch("/updateTrip/:id", TripController.updateTrip);
router.delete("/deleteTrip/:id",TripController.deletetrip);
router.get("/getTrip/:id", TripController.gettrip);
router.get("/getAllTrips", TripController.getAllTrips);

router.get("/getTripsByDateRange/:range", TripController.countTripsStatus);

export default router;