import express from "express";
import ItemController from "../controllers/itemController.js";
// import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router();

router.get("/getItems", ItemController.getAllItems);
router.post("/createItem", ItemController.createItem);
router.get("/getItem/:id", ItemController.getItemById);
router.patch("/updateItem/:id", ItemController.updateItem);
router.delete("/deleteItem/:id", ItemController.deleteItem);


export default router;
