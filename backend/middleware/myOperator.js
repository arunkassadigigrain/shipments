import axios from "axios";

class MyOperatorService {

  // static async sendWhatsAppTemplate(destination, firstName, newOTP) {

  //   try {
  //     if (!destination) {
  //       console.error("❌ [MyOperator] Destination number missing");
  //       return {
  //         success: false,
  //         message: "Destination number is required",
  //       };
  //     }
  //     const OTP = newOTP
  //     const payload = {
  //       apiKey: process.env.MYOPERATOR_API_KEY,
  //       campaignName: process.env.MYOPERATOR_CAMPAIGN,
  //       destination,
  //       userName: process.env.MYOPERATOR_USERNAME,
  //       templateParams: ["$FirstName", OTP],
  //       source: "node-express-api",
  //       media: {},
  //       buttons: [],
  //       carouselCards: [],
  //       location: {},
  //       attributes: {},
  //       paramsFallbackValue: {
  //         FirstName: firstName || "user",
  //       },
  //     };

  //     console.log(payload, "111111111111111111111111111111111");

  //     const response = await axios.post(
  //       process.env.MYOPERATOR_URL,
  //       payload,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         timeout: 20000,
  //       }
  //     );

  //     console.log("message sent succesfully", response);


  //     return {
  //       success: true,
  //       message: "WhatsApp sent successfully",
  //       data: response.data,
  //     };

  //   } catch (error) {

  //     if (error.response) {
  //     } else {
  //       console.error("📛 Message:", error.message);
  //     }

  //     return {
  //       success: false,
  //       message: "Failed to send WhatsApp",
  //       error: error.response?.data || error.message,
  //     };
  //   }
  // }

  static async sendWhatsAppTemplate(destination, firstName, newOTP) {

    try {
      if (!destination) {
        console.error("❌ [MyOperator] Destination number missing");
        return {
          success: false,
          message: "Destination number is required",
        };
      }

      console.log(destination, firstName, newOTP, "111111111111111111111111111111111111111112")
      const OTP = String(newOTP)
      const shipmentId = String(firstName)
      const payload = {
        apiKey: process.env.MYOPERATOR_API_KEY,
        campaignName: process.env.MYOPERATOR_CAMPAIGN,
        destination,
        userName: process.env.MYOPERATOR_USERNAME,
        templateParams: [shipmentId, OTP],
        source: "node-express-api",
        media: {},
        buttons: [],
        carouselCards: [],
        location: {},
        attributes: {},
        paramsFallbackValue: {
          FirstName: firstName || "user",
        },
      };

      console.log(payload, "111111111111111111111111111111111");

      const response = await axios.post(
        process.env.MYOPERATOR_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );

      console.log("message sent succesfully", response);


      return {
        success: true,
        message: "WhatsApp sent successfully",
        data: response.data,
      };

    } catch (error) {

      if (error.response) {
      } else {
        console.error("📛 Message:", error.message);
      }

      return {
        success: false,
        message: "Failed to send WhatsApp",
        error: error.response?.data || error.message,
      };
    }
  }

  static async sendWhatsAppDriver(driverDestination, trip, link) {

    try {
      if (!driverDestination) {
        console.error("❌ [MyOperator] Destination number missing");
        return {
          success: false,
          message: "Destination number is required",
        };
      }
    
      const tripid = String(trip);
      const payload = {
        apiKey: process.env.MYOPERATOR_API_KEY,
        campaignName: process.env.MYOPERATOR_CAMPAIGNDRIVER,
        destination: driverDestination,
        userName: process.env.MYOPERATOR_USERNAME,
        templateParams: [tripid, link],
        source: "node-express-api",
        media: {},
        buttons: [],
        carouselCards: [],
        location: {},
        attributes: {},
        paramsFallbackValue: {
          FirstName: "user",
        },
      };


      const response = await axios.post(
        process.env.MYOPERATOR_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );

      console.log("message sent succesfully", response);


      return {
        success: true,
        message: "WhatsApp sent successfully",
        data: response.data,
      };

    } catch (error) {

      if (error.response) {
      } else {
        console.error("📛 Message:", error.message);
      }

      return {
        success: false,
        message: "Failed to send WhatsApp",
        error: error.response?.data || error.message,
      };
    }
  }

}

export default MyOperatorService;
