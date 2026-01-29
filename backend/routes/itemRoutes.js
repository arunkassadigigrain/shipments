import express from "express";
import ItemController from "../controllers/itemController.js";
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/getItems", verifyToken, ItemController.getAllItems);
router.post("/createItem", verifyToken, ItemController.createItem);
router.get("/getItem/:id", verifyToken, ItemController.getItemById);
router.patch("/updateItem/:id", verifyToken, ItemController.updateItem);
router.delete("/deleteItem/:id", verifyToken, ItemController.deleteItem);


export default router;
