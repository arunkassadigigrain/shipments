import express from "express";
import BusinessController from "../controllers/businessController.js";

const router = express.Router();

router.get("/getAllBusiness", BusinessController.getAllBusinesses);
router.post("/createBusiness", BusinessController.createBusiness);
router.get("/getBusiness/:id", BusinessController.getBusinessById);
router.patch("/updateBusiness/:id", BusinessController.updateBusiness);
router.delete("/deleteBusiness/:id", BusinessController.deleteBusiness);

export default router;
