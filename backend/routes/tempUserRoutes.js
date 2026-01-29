import express from "express";
import TempUserController from "../controllers/tempUsercontroller.js";
 
const router = express.Router();
 
router.post("/register", TempUserController.register);
router.post("/login", TempUserController.login);


export default router;
 