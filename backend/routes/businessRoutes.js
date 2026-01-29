import express from "express";
import BusinessController from "../controllers/businessController.js";
import verifyToken from "../middleware/verifyToken.js"
const router = express.Router();

router.get("/getAllBusiness", verifyToken, BusinessController.getAllBusinesses);
router.post("/createBusiness", verifyToken, BusinessController.createBusiness);
router.get("/getBusiness/:id", verifyToken, BusinessController.getBusinessById);
router.patch("/updateBusiness/:id", verifyToken, BusinessController.updateBusiness);
router.delete("/deleteBusiness/:id", verifyToken, BusinessController.deleteBusiness);
export default router;
