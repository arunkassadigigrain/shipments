import prisma from "../config/prisma.js";


class BusinessController {

  static createBusiness = async (req, res) => {
    try {
      const {
        businessName,
        contactPersonName,
        phoneNumber,
        email,
        billingAddress,
      } = req.body;
      console.log(req.body);

      if (!businessName || !contactPersonName || !phoneNumber || !email || !billingAddress) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const address = await prisma.billingAddress.create({
        data: {
          addressLine1: billingAddress.addressLine1,
          addressLine2: billingAddress.addressLine2,
          cityOrDistrict: billingAddress.cityOrDistrict,
          stateOrProvince: billingAddress.stateOrProvince,
          postalCode: Number(billingAddress.postalCode),
        },
      });

      const business = await prisma.business.create({
        data: {
          businessName,
          contactPersonName,
          phoneNumber,
          email,
          billingAddressId: address.id,
        },
      });

      res.status(201).json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create business" });
    }
  };

  static getAllBusinesses = async (req, res) => {
    try {
      const businesses = await prisma.business.findMany({
        include: {
          billingAddress: true,
        },
      });

      res.status(200).json(businesses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  };

  static getBusinessById = async (req, res) => {
    try {
      const { id } = req.params;

      const business = await prisma.business.findUnique({
        where: { id: Number(id) },
        include: {
          billingAddress: true,
        },
      });

      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }

      res.status(200).json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch business" });
    }
  };

  static updateBusiness = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        businessName,
        contactPersonName,
        phoneNumber,
        email,
      } = req.body;

      const business = await prisma.business.update({
        where: { id: Number(id) },
        data: {
          businessName,
          contactPersonName,
          phoneNumber,
          email,
        },
      });

      res.json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update business" });
    }
  };

  static deleteBusiness = async (req, res) => {
    try {
      const { id } = req.params;

      const business = await prisma.business.findUnique({
        where: { id: Number(id) },
      });

      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      await prisma.business.delete({
        where: { id: Number(id) },
      });

      await prisma.billingAddress.delete({
        where: { id: business.billingAddressId },
      });

      res.json({ message: "Business deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete business" });
    }
  };


}

export default BusinessController;
