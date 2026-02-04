
import prisma from "../config/prisma.js";


class DriverController {

    // 🔹 Get all drivers (with truck info)
    static async getAllDrivers(req, res) {
        try {
            const drivers = await prisma.driver.findMany({
                where: {
                    tenantId: req.user.id,
                 },
                 orderBy:{
                    updatedAt:'desc'
                 },
                include: {
                    truck: true,
                },
            });

            res.status(200).json(drivers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch drivers" });
        }
    }

    static async createDriver(req, res) {
        try {
            const {
                Drivername,
                phoneNumber,
                alternatePhoneNumber,
                truckId,
            } = req.body;

            // ✅ Create driver
            const newDriver = await prisma.driver.create({
                data: {
                    Drivername,
                    phoneNumber,
                    tenantId:req.user.id, 
                    alternatePhoneNumber,
                    truckId: truckId ? Number(truckId) : null,
                },
            });

            res.status(201).json(newDriver);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create driver" });
        }
    }

    // 🔹 Update Driver
    static async updateDriver(req, res) {
        try {
            const { id } = req.params;
            const {
                driverName,
                phoneNumber,
                alternatePhoneNumber,
                truckId,
            } = req.body;

            const updatedDriver = await prisma.driver.update({
                where: { id: Number(id),
                    tenantId:req.user.id,
                 },
                data: {
                    driverName,
                    phoneNumber,
                    alternatePhoneNumber,
                    truckId: truckId ? Number(truckId) : null,
                },
            });

            res.status(200).json(updatedDriver);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update driver" });
        }
    }

    // 🔹 Delete Driver
    static async deleteDriver(req, res) {
        try {
            const { id } = req.params;

            await prisma.driver.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({ message: "Driver deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete driver" });
        }
    }
}

export default DriverController;