import express from "express";
import TempUserController from "../controllers/tempUsercontroller.js";
import  verifyToken  from "../middleware/verifyToken.js";
 
const router = express.Router();
 
router.post("/register", TempUserController.register);
router.post("/login", TempUserController.login);
router.post('/logout', verifyToken, TempUserController.userLogout)


export default router;
 