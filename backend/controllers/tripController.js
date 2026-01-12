import e from "express";
import prisma from "../config/prisma.js";
import generateOtp from "../middleware/otpMiddleware.js"
// import emailMiddleware from "../middleware/emailMiddleware.js";
 
 
 
class TripController {
static async createTrip(req, res) {
    try {
      const { tripDate, driverId, truckId, shipmentId } = req.body;
 
      if (!driverId || !truckId || !shipmentId) {
        return res.status(400).json({
          error: "driverId, truckId and shipmentId are required"
        });
      }
 
      // ✅ Generate OTP (your middleware)
      const otpValue = generateOtp.generateOtpMiddleware(req);
 
      const newTrip = await prisma.trip.create({
        data: {
          tripDate: tripDate ? new Date(tripDate) : new Date(),
          OTPGenerated: Number(otpValue),
          Status: "ONTHEWAY",
          driverId: Number(driverId),
          truckId: Number(truckId),
          shipmentId: Number(shipmentId)
        },
        include: {
          driver: true,
          truck: true,
          shipment: true
        }
      });
 
      res.status(201).json({
        message: "Trip created successfully",
        otp: otpValue, // (optional: remove in production)
        trip: newTrip
      });
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create trip" });
    }
  }
  static async verifyTripOTP(req, res) {
    try {
      const { tripId, enteredOTP } = req.body;
 
      if (!tripId || !enteredOTP) {
        return res.status(400).json({
          error: "tripId and enteredOTP are required"
        });
      }
 
      const trip = await prisma.trip.findUnique({
        where: { id: Number(tripId) }
      });
 
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }
 
      if (trip.Status === "COMPLETED") {
        return res.status(400).json({
          error: "Trip already completed"
        });
      }
 
      // ✅ OTP MATCH CONDITION
      if (Number(enteredOTP) === trip.OTPGenerated) {
        const updatedTrip = await prisma.trip.update({
          where: { id: trip.id },
          data: {
            Status: "COMPLETED"
          }
        });
 
        return res.status(200).json({
          message: "OTP verified. Trip completed successfully",
          trip: updatedTrip
        });
      }
 
      // ❌ OTP WRONG
      return res.status(400).json({
        error: "Invalid OTP"
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
static async deletetrip(req, res){
try{
  const{id}=req.params;
  const trip  = await prisma.trip.findUnique({
    where:{ id: Number(id)}
 
  });
  if(!trip){
    return res.status(404).json({error:" trip not found"});
 
  }
  await prisma.trip.delete({
    where:{id: Number(id)}
  });
  console.log(" 111111111111111")
  res.status(200).json({
    message:"trip delete successfully"
  });
 
}
catch(error){
  console.error(error);
  res.status(500).json({error:"failed to delete trip "})
 
}
 
 
}
static async gettrip(req, res){
 try{
  const {id} = req.params;
  const trip = await  prisma.trip.findUnique({
    where:{id: Number(id)},
    include:{
      driver: true,
      truck: true,
      shipment:true
    }
 
  });
  if(!trip){
    return res.status(404).json({error: "trip not found"});  
  }
     res.status(200).json(trip);
 
 }catch(error){
  console.error(error);
    res.status(500).json({ error: "Failed to fetch trip" });
 
 }
 
}
 
}
 
export default TripController;