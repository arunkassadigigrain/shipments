import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.BASEURI;

class GenerateLink{

static generateTrackLink(tripId) {
  const random = Math.random().toString(36).substring(2, 10); // 6 chars
  return `${baseURL}/verify-OTP/${random}-TRIP${tripId}`;
}

}
export default GenerateLink;