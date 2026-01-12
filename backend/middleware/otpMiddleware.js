class generateOtp{
    static generateOtpMiddleware = (req, res) => {
      try {
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
   
        // Attach OTP to request object
        req.generatedOtp = otp;
        console.log(req.generatedOtp, "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        return req.generatedOtp;
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "OTP generation failed" });
      }
    };
}
 
export default generateOtp;