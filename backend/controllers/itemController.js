import prisma from "../config/prisma.js";
import sendWhatsAppTemplate from "../middleware/myOperator.js";

class ItemController {

    static getAllItems = async (req, res) => {
        try {
            const items = await prisma.item.findMany();
            // sendWhatsAppTemplate.sendWhatsAppTemplate("919392382434", "praveen");
            res.status(200).json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch items" });
        }
    };

    static getItemById = async (req, res) => {
        try {
            const { id } = req.params;

            const item = await prisma.item.findUnique({
                where: { id: Number(id) },
            });

            if (!item) {
                return res.status(404).json({ error: "Item not found" });
            }

            res.status(200).json(item);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch item" });
        }
    };

    static createItem = async (req, res) => {
        try {
            const { packingType, itemVariety, itemName } = req.body;
            console.log(req.body);
            if (!itemName || !packingType || !itemVariety) {
                return res.status(400).json({ error: "All fields are required" });
            }
            let Description = itemName + " of " + packingType + " with " + itemVariety;


            const newItem = await prisma.item.create({
                data: {
                    itemName,
                    itemDescription: Description,
                    packingType,
                    itemVariety,
                },
            });

            res.status(201).json(newItem);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to create item" });
        }
    };

    static updateItem = async (req, res) => {
        try {
            const { id } = req.params;
            const { itemDescription, packingType, itemVariety, itemName } = req.body;

            const existingItem = await prisma.item.findUnique({
                where: { id: Number(id) },
            });

            if (!existingItem) {
                return res.status(404).json({ error: "Item not found" });
            }

            const updatedItem = await prisma.item.update({
                where: { id: Number(id) },
                data: {
                    itemName,
                    itemDescription,
                    packingType,
                    itemVariety,
                },
            });

            res.status(201).json(updatedItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update item" });
        }
    };
    static deleteItem = async (req, res) => {
        try {
            const { id } = req.params;

            const existingItem = await prisma.item.findUnique({
                where: { id: Number(id) },
            });

            if (!existingItem) {
                return res.status(404).json({ error: "Item not found" });
            }

            await prisma.item.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({ message: "Item deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete item" });
        }
    };


}

export default ItemController;
