import prisma from "../config/prisma.js";
import emailMiddleware from "../middleware/email.js";
import TimeRange from "../middleware/timerange.js";

class ShipmentController {

  static async createShipment(req, res) {
    try {
      const { businessId, addressBar, shippingAddress, items } = req.body;

      if (!businessId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const itemIds = items.map(i => Number(i.itemId));

      const existingItems = await prisma.item.findMany({
        where: { id: { in: itemIds }, tenantId: req.user.id },
        select: { id: true },
      });

      if (existingItems.length !== itemIds.length) {
        return res.status(400).json({ error: "Invalid item(s)" });
      }

      let finalShippingAddress;

      if (addressBar === true) {
        const business = await prisma.business.findUnique({
          where: { id: Number(businessId), tenantId: req.user.id },
          include: { billingAddress: true },
        });

        if (!business?.billingAddress) {
          return res.status(404).json({ error: "Billing address not found" });
        }

        finalShippingAddress = business.billingAddress;
      } else {
        if (!shippingAddress) {
          return res.status(400).json({ error: "Shipping address required" });
        }
        finalShippingAddress = shippingAddress;
      }

      // ✅ TRANSACTION = DB ONLY
      const shipment = await prisma.$transaction(async (tx) => {
        const address = await tx.shippingAddress.create({
          data: {
            addressLine1: finalShippingAddress.addressLine1,
            addressLine2: finalShippingAddress.addressLine2 || null,
            cityOrDistrict: finalShippingAddress.cityOrDistrict,
            stateOrProvince: finalShippingAddress.stateOrProvince,
            postalCode: Number(finalShippingAddress.postalCode),
            tenantId: req.user.id,
          },
        });

        let totalAmount = 0;

        const shipmentItems = items.map(i => {
          const qty = Number(i.quantity);
          const rate = Number(i.itemRate);
          const subtotal = qty * rate;
          totalAmount += subtotal;

          return {
            itemId: Number(i.itemId),
            quantity: qty,
            itemRate: rate,
            subtotal,
            tenantId: req.user.id,
          };
        });

        return await tx.shipment.create({
          data: {
            businessId: Number(businessId),
            shippingAddressId: address.id,
            totalAmount,
            tenantId: req.user.id,
            shipmentItems: { create: shipmentItems },
          },
          include: {
            shipmentItems: { include: { item: true } },
            business: { select: { email: true, contactPersonName: true } },
          },
        });
      });

      
        emailMiddleware.emailSending(
          shipment.id,
          shipment.business.email,
          shipment.business.contactPersonName,
          shipment.shipmentItems
        )
        .catch(err => {
          console.error("⚠️ Email failed:", err.message);
        });

      return res.status(201).json({
        message: "Shipment created successfully",
        shipment,
      });

    } catch (error) {
      console.error("🔥 Error creating shipment:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }



  static async getShipment(req, res) {
  try {
    const { id } = req.params;

    const shipments = await prisma.shipment.findMany({
      where: id ? { businessId: Number(id), tenantId: req.user.id, } : {},
      include: {
        business: true,
        shipmentItems: true,
        shippingAddress: true,
      },
    });

    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
}

  static getCreatedShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: {
        tenantId: req.user.id,
        Status: "CREATED",
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        business: true,
        shippingAddress: true,
        shipmentItems: {
          include: {
            item: true,
          },
        },
        tripShipments: {
          include: {
            trip: {
              include: {
                driver: true,
                truck: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch created shipments" });
  }
};

  static countShipmentStatus = async (req, res) => {
  const { range } = req.params;

  try {
    const { startDateUTC, endDateUTC, groupType } =
      TimeRange.getDateRange(range);
    console.log(startDateUTC, endDateUTC);

    const shipments = await prisma.shipment.findMany({
      where: {
        tenantId: req.user.id,
        updatedAt: {
          gte: startDateUTC,
          lte: endDateUTC,
        },
        Status: {
          in: ["ONTHEWAY", "COMPLETED", "CREATED"],
        },
      },
      select: {
        updatedAt: true,
        Status: true,
      },
      orderBy: { updatedAt: "asc" },
    });

    // 🔹 Time-bucketed data
    const timeMap = {};
    // 🔹 Pie totals
    const pieTotals = {
      CREATED: 0,
      ONTHEWAY: 0,
      COMPLETED: 0,
    };

    shipments.forEach((shipment) => {
      const istDate = new Date(
        new Date(shipment.updatedAt).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      );

      let label;
      if (groupType === "hour") {
        label = istDate.getHours().toString().padStart(2, "0");
      } else if (groupType === "day") {
        label = istDate.toISOString().split("T")[0];
      } else {
        label = istDate.toISOString().slice(0, 7);
      }

      if (!timeMap[label]) {
        timeMap[label] = {
          label,
          CREATED: 0,
          ONTHEWAY: 0,
          COMPLETED: 0,
        };
      }

      timeMap[label][shipment.Status]++;
      pieTotals[shipment.Status]++;
    });

    const lineChartData = Object.values(timeMap);
    const pieChartData = Object.entries(pieTotals).map(([name, value]) => ({
      name,
      value,
    }));

    return res.json({
      range,
      groupType,
      startDate: startDateUTC,
      endDate: endDateUTC,
      pieChartData,
      lineChartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to count shipments by status" });
  }
};

  static getAllShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: {
        tenantId: req.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        business: true,
        shipmentItems: true,
        shippingAddress: true,
      },
    });
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
};

  static getShipments = async (req, res) => {
  try {
    const { range } = req.params;
    const { startDateUTC, endDateUTC } = TimeRange.getDateRange(range);
    const shipments = await prisma.shipment.findMany({
      where: {
        updatedAt: {
          gte: startDateUTC,
          lte: endDateUTC,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        business: true,
        shipmentItems: {
          include: {
            item: true,
          },
        },
        shippingAddress: true,
      },
    });
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
};
}

export default ShipmentController;
