import express from "express";
import TripController from "../controllers/tripController.js";
import verifyToken from "../middleware/verifyToken.js"

 
const router = express.Router();
 
 
router.post("/createTrip", verifyToken, TripController.createTrip);
router.post("/verifyOtp", TripController.verifyTripOTP);
router.patch("/updateTrip/:id", verifyToken, TripController.updateTrip);
router.delete("/deleteTrip/:id", verifyToken, TripController.deletetrip);
router.get("/getTrip/:id", verifyToken, TripController.gettrip);
router.get("/getAllTrips", verifyToken, TripController.getAllTrips);
router.get("/getTripByTime/:range", verifyToken, TripController.getTrips);
router.get("/getTripsByDateRange/:range", verifyToken, TripController.countTripsStatus);

export default router;