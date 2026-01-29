


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    if (!SECRET_KEY) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ error: "Internal server error." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      // production 
      // req.user = { id: Number(decoded.data.profileId || decoded.data.profileId), roles: decoded.data.role, mobileNo: decoded.data.mobileNo, type: decoded.data.type, email: decoded.data.email }; 
      req.user = { id: Number(decoded.userId || decoded.data.id), roles: decoded.role, email: decoded.email }; 
      console.log("Decoded JWT Payload:", req.user.id);
      next();
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default verifyToken;
