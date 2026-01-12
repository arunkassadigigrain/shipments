
import prisma from "../config/prisma.js";

class DriverControlles {
    static async getAllDrivers(req, res) {
        try {
            const drivers = await prisma.driver.findMany();
            res.json(drivers);
        }
        catch (error) {
            res.status(500).json({ error: 'failed  to fetch driver' });
        }
    }
    static async createDriver(req, res) {
        try {
            const { Drivername, phoneNumber, alternatePhoneNumber } = req.body;
            console.log(req.body);
            const newDriver = await prisma.driver.create({
                data: { Drivername, phoneNumber, alternatePhoneNumber }
            });
            console.log(newDriver);

            res.status(201).json(newDriver);

        }
        catch (error) {
            res.status(500).json(error.message, { error: 'Failed to create driver' });

        }

    }
    static async updateDriver(req, res) {
        try {
            const { id } = req.params;
            const { Drivername, phoneNumber, alternatePhoneNumber } = req.body;
            const updateDriver = await prisma.driver.update({
                where: { id: Number(id) },
                data: { Drivername, phoneNumber, alternatePhoneNumber }
            });
            res.status(201).json(updateDriver);

        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create update' });
        }
    }
    static async deleteDriver(req, res) {
        try {
            const { id } = req.params;
            await prisma.driver.delete({
                where: { id: Number(id) }
            });
            res.json({ Message: 'Driver deleted successfully' });

        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete driver' });
        }
    }
}
export default DriverControlles;