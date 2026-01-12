import axios from "axios";

class MyOperatorService {

  static async sendWhatsAppTemplate(destination, firstName) {

    try {
      if (!destination) {
        console.error("❌ [MyOperator] Destination number missing");
        return {
          success: false,
          message: "Destination number is required",
        };
      }

      const payload = {
        apiKey: process.env.MYOPERATOR_API_KEY,
        campaignName: process.env.MYOPERATOR_CAMPAIGN,
        destination,
        userName: process.env.MYOPERATOR_USERNAME,
        templateParams: ["$FirstName", "$FirstName"],
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

      const response = await axios.post(
        process.env.MYOPERATOR_URL,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );


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
