import express from "express";
import TripController from "../controllers/TripController.js";
// import verifyToken from "../middlewares/verifyToken.js"
 
const router = express.Router();
 
 
router.post("/createTrip",TripController.createTrip);
router.post("/verifyOtp", TripController.verifyTripOTP);
router.patch("/updateTrip/:id", TripController.updateTrip);
router.delete("/deleteTrip/:id",TripController.deletetrip);
router.get("/getTrip/:id", TripController.gettrip);
export default router;