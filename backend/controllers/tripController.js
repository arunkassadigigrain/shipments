import express from "express";
import prisma from "../config/prisma.js";
import TimeRange from "../middleware/timerange.js"
import MyOperatorService from "../middleware/myOperator.js"
import GenerateLink from "../middleware/linkGenerator.js";



class TripController {

  static async createTrip(req, res) {

    try {
      const { tripDate, driverId, truckId, shipmentIds } = req.body;

      if (
        !driverId ||
        !truckId ||
        !Array.isArray(shipmentIds) ||
        shipmentIds.length === 0
      ) {
        console.warn("⚠️ Validation failed");
        return res.status(400).json({
          error: "driverId, truckId and shipmentIds[] are required",
        });
      }

      const result = await prisma.$transaction(async (tx) => {

        // 1️⃣ Create Trip
        const trip = await tx.trip.create({
          data: {
            tripDate: tripDate ? new Date(tripDate) : new Date(),
            Status: "ONTHEWAY",
            driver: { connect: { id: Number(driverId) } },
            truck: { connect: { id: Number(truckId) } },
          },
        });

        // 2️⃣ Update Shipments
        await tx.shipment.updateMany({
          where: {
            id: { in: shipmentIds.map(Number) },
          },
          data: { Status: "ONTHEWAY" },
        });

        // 3️⃣ Trip ↔ Shipment mapping
        await tx.tripShipment.createMany({
          data: shipmentIds.map((id) => ({
            tripId: trip.id,
            shipmentId: Number(id),
          })),
        });

        const otpMap = shipmentIds.map((id) => ({
          shipmentId: Number(id),
          otpCode: Math.floor(100000 + Math.random() * 900000),
        }));

        await tx.shipmentOTP.createMany({
          data: otpMap.map((item) => ({
            tripId: trip.id,
            shipmentId: item.shipmentId,
            otpCode: item.otpCode,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          })),
        });


        // 5️⃣ Fetch business details
        const shipmentsWithBusiness = await tx.shipment.findMany({
          where: {
            id: { in: shipmentIds.map(Number) },
          },
          select: {
            id: true,
            business: {
              select: {
                phoneNumber: true,
              },
            },
          },
        });

        // 6️⃣ WhatsApp notifications with correct OTP
        for (const shipment of shipmentsWithBusiness) {
          const destination = "91" + shipment.business.phoneNumber;

          const otpEntry = otpMap.find(
            (o) => o.shipmentId === shipment.id
          );


          await MyOperatorService.sendWhatsAppTemplate(
            destination,
            shipment.id,
            otpEntry.otpCode
          );
        }

        const driver = await tx.driver.findUnique({
          where: { id: Number(driverId) },
          select: { phoneNumber: true, Drivername: true },
        });

        if (driver && driver.phoneNumber) {
          const driverDestination = "91" + driver.phoneNumber;

          const link = GenerateLink.generateTrackLink(trip.id);
          console.log(link);

          await MyOperatorService.sendWhatsAppDriver(
            driverDestination,
            trip.id,
            link
          );

          console.log(`✅ Driver WhatsApp sent → driverId=${driverId}`);
        }

        return trip;
      });

      console.log("🎉 Trip creation completed successfully");

      res.status(201).json({
        message: "Trip created successfully",
        trip: result,
      });
    } catch (error) {
      console.error("❌ Error in createTrip:", error);
      res.status(500).json({ error: "Failed to create trip" });
    }
  }

  static getAllTrips = async (req, res) => {
    try {
      const trips = await prisma.trip.findMany({
        orderBy: {
        updatedAt: "desc", 
      },
        include: {
          driver: true,
          truck: true,

          tripShipments: {
            include: {
              shipment: {
                include: {
                  business: true,
                  shippingAddress: true,
                  shipmentItems: {
                    include: {
                      item: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      res.status(200).json(trips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch trips" });
    }
  };


  static async verifyTripOTP(req, res) {
    try {
      const { tripId, shipmentId, enteredOTP } = req.body;
      console.log(tripId, shipmentId, enteredOTP)
      if (!tripId || !shipmentId || !enteredOTP) {
        return res.status(400).json({
          error: "tripId, shipmentId and enteredOTP are required",
        });
      }

      // 1️⃣ Find OTP using composite key
      const shipmentOtp = await prisma.shipmentOTP.findUnique({
        where: {
          tripId_shipmentId: {
            tripId: Number(tripId),
            shipmentId: Number(shipmentId),
          },
        },
      });

      if (!shipmentOtp) {
        return res.status(404).json({
          error: "OTP not found for this trip and shipment",
        });
      }

      // 2️⃣ Check expiry
      if (shipmentOtp.expiresAt < new Date()) {
        return res.status(400).json({
          error: "OTP has expired",
        });
      }

      // 3️⃣ Check already verified
      if (shipmentOtp.isVerified) {
        return res.status(400).json({
          error: "OTP already verified",
        });
      }

      // 4️⃣ Compare OTP
      if (Number(enteredOTP) !== shipmentOtp.otpCode) {
        return res.status(400).json({
          error: "Invalid OTP",
        });
      }

      // 5️⃣ Mark OTP as verified
      await prisma.shipmentOTP.update({
        where: {
          id: shipmentOtp.id,
        },
        data: {
          isVerified: true,
        },
      });

      // 6️⃣ Mark shipment as COMPLETED
      await prisma.shipment.update({
        where: { id: Number(shipmentId) },
        data: {
          Status: "COMPLETED",
        },
      });

      // 7️⃣ Check if all shipments of this trip are verified
      const pendingOtps = await prisma.shipmentOTP.count({
        where: {
          tripId: Number(tripId),
          isVerified: false,
        },
      });

      // 8️⃣ If all verified → complete trip
      let updatedTrip = null;
      if (pendingOtps === 0) {
        updatedTrip = await prisma.trip.update({
          where: { id: Number(tripId) },
          data: {
            Status: "COMPLETED",
          },
        });
      }

      return res.status(200).json({
        message: "OTP verified successfully",
        tripCompleted: pendingOtps === 0,
        trip: updatedTrip,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "OTP verification failed" });
    }
  }


  static async updateTrip(req, res) {
    try {
      const { id } = req.params;
      const { tripDate, driverId, truckId, shipmentId, Status } = req.body;

      const trip = await prisma.trip.findUnique({
        where: { id: Number(id) }
      });

      if (!trip) return res.status(404).json({ error: "Trip not found" });

      const updatedTrip = await prisma.trip.update({
        where: { id: Number(id) },
        data: {
          tripDate: tripDate ? new Date(tripDate) : trip.tripDate,
          driverId: driverId ? Number(driverId) : trip.driverId,
          truckId: truckId ? Number(truckId) : trip.truckId,
          shipmentId: shipmentId ? Number(shipmentId) : trip.shipmentId,
          Status: Status || trip.Status
        },
        include: {
          driver: true,
          truck: true,
          shipment: true
        }
      });

      res.status(200).json({
        message: "Trip updated successfully",
        trip: updatedTrip
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update trip" });
    }
  }
  static async deletetrip(req, res) {
    try {
      const { id } = req.params;
      const trip = await prisma.trip.findUnique({
        where: { id: Number(id) }

      });
      if (!trip) {
        return res.status(404).json({ error: " trip not found" });

      }
      await prisma.trip.delete({
        where: { id: Number(id) }
      });
      res.status(200).json({
        message: "trip delete successfully"
      });

    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to delete trip " })

    }


  }

  static async gettrip(req, res) {
    try {
      const { id } = req.params;
      const trip = await prisma.trip.findUnique({
        where: { id: Number(id) },
        include: {
          driver: true,
          truck: true,
          tripShipments: {
            include: {
              shipment: {
                include: {
                  business: true,
                  shippingAddress: true,
                  shipmentItems: {
                    include: {
                      item: true
                    }
                  }
                }
              }
            }
          }
        }

      });
      if (!trip) {
        return res.status(404).json({ error: "trip not found" });
      }
      res.status(200).json(trip);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch trip" });

    }

  }



  static countTripsStatus = async (req, res) => {
    const { range } = req.params;

    try {
      const { startDateUTC, endDateUTC, groupType } = TimeRange.getDateRange(range);
      console.log(startDateUTC, endDateUTC)

      const trips = await prisma.trip.findMany({
        where: {
          updatedAt: {
            gte: startDateUTC,
            lte: endDateUTC,
          },
          Status: {
            in: ["ONTHEWAY", "COMPLETED"],
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
        ONTHEWAY: 0,
        COMPLETED: 0,
      };

      trips.forEach((trip) => {
        const istDate = new Date(
          new Date(trip.updatedAt).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })
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
            ONTHEWAY: 0,
            COMPLETED: 0,
          };
        }

        timeMap[label][trip.Status]++;
        pieTotals[trip.Status]++;
      });


      const lineChartData = Object.values(timeMap);
      const pieChartData = Object.entries(pieTotals).map(
        ([name, value]) => ({ name, value })
      );

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
      res.status(500).json({ message: "Failed to count trips by status" });
    }
  };

}

export default TripController;