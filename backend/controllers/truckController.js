import prisma from "../config/prisma.js";

class TruckController {

    static async getAllTruck(req, res) {
        try {
            const trucks = await prisma.truck.findMany();
            res.json(trucks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch trucks' });
        }
    }

        static getTruckById = async (req, res) => {
        try {
            const { id } = req.params;

            const truck = await prisma.truck.findUnique({
                where: { id: Number(id) },
            });

            if (!truck) {
                return res.status(404).json({ error: "Truck not found" });
            }

            res.status(200).json(truck);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch truck" });
        }
    };

    static async createTruck(req, res) {
        try {
            const {
                truckNumber,
                truckCapacity,
                truckModel,
                ownerPhoneNumber,
                alternatePhoneNumber
            } = req.body;

            const newTruck = await prisma.truck.create({
                data: {
                    truckNumber,
                    truckCapacity,
                    truckModel,
                    ownerPhoneNumber,
                    alternatePhoneNumber
                }
            });

            res.status(201).json(newTruck);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create truck' });
        }
    }


    static async updatetruck(req, res) {
        try {
            const { id } = req.params;

            const {
                truckNumber,
                truckCapacity,
                truckModel,
                ownerPhoneNumber,
                alternatePhoneNumber
            } = req.body;

            const updatedTruck = await prisma.truck.update({
                where: { id: Number(id) },
                data: {
                    truckNumber,
                    truckCapacity,
                    truckModel,
                    ownerPhoneNumber,
                    alternatePhoneNumber
                }
            });

            res.json(updatedTruck);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to update truck" });
        }
    }
    static async deletetruck(req, res) {
        try {
            const { id } = req.params;

            await prisma.truck.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({ message: "Truck deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to delete truck" });
        }
    }


}



export default TruckController;
