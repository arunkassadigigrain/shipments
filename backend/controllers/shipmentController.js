import prisma from "../config/prisma.js";

class ShipmentController {

  static async createShipment(req, res) {
    try {

      const { businessId, addressBar, shippingAddress, items } = req.body;

      if (!businessId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const itemIds = items.map(i => Number(i.itemId));

      const existingItems = await prisma.item.findMany({
        where: { id: { in: itemIds } },
        select: { id: true }
      });

      if (existingItems.length !== itemIds.length) {
        return res.status(400).json({
          error: "One or more items do not exist",
          receivedItemIds: itemIds,
          foundItemIds: existingItems.map(i => i.id)
        });
      }

      let finalShippingAddress;

      if (addressBar === true) {

        const business = await prisma.business.findUnique({
          where: { id: Number(businessId) },
          include: { billingAddress: true }
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
      const result = await prisma.$transaction(async (tx) => {

        const address = await tx.shippingAddress.create({
          data: {
            addressLine1: finalShippingAddress.addressLine1,
            addressLine2: finalShippingAddress.addressLine2 || null,
            cityOrDistrict: finalShippingAddress.cityOrDistrict,
            stateOrProvince: finalShippingAddress.stateOrProvince,
            postalCode: Number(finalShippingAddress.postalCode),
          },
        });


        let totalAmount = 0;

        const shipmentItems = items.map(i => {
          const quantity = Number(i.quantity);
          const itemRate = Number(i.itemRate);
          const subtotal = quantity * itemRate;

          totalAmount += subtotal;


          return {
            itemId: Number(i.itemId),
            quantity,
            itemRate,
            subtotal
          };
        });


        const shipment = await tx.shipment.create({
          data: {
            businessId: Number(businessId),
            shippingAddressId: address.id,
            totalAmount,
            shipmentItems: {
              create: shipmentItems
            }
          },
          include: {
            shipmentItems: true,
            shippingAddress: true
          }
        });

        return shipment;
      });


      res.status(201).json({
        message: "Shipment created successfully",
        shipment: result
      });

    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }


  static async getShipment(req, res) {
    try {
      const { id } = req.params;

      const shipments = await prisma.shipment.findMany({
        where: id ? { businessId: Number(id) } : {},
        include: {
          business: true,
          shipmentItems: true,
          shippingAddress: true
        },
      });

      res.status(200).json(shipments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch shipments" });
    }
  }

  static getAllShipments = async (req, res) => {
    try {
      const shipments = await prisma.shipment.findMany(
        {
          include: {
            business: true,
            shipmentItems: true,
            shippingAddress: true
          },
        }
      );
      res.status(200).json(shipments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch shipments" });
    }
  };

}


export default ShipmentController;