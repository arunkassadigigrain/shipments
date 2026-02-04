import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";


class TempUserController {
  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser)
        return res.status(409).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static userLogout = async (req, res) => {

    try {
      // 1. Clear cookies (must match how they were set)
      res.clearCookie('verifyToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      res.clearCookie('is_auth', {
        path: '/'
      });


      // 2. Destroy session (if using sessions)
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("[Logout] Session destruction failed:", err);
            throw new Error("Session destruction failed");
          }
        });
      }

      // 4. Send success response
      res.status(200).json({
        status: "success",
        message: "Logout successful"
      });

    } catch (error) {
      console.error("[Logout] Error during logout:", error);
      res.status(500).json({
        status: "failed",
        message: "Unable to logout, please try again later"
      });
    }
  };

}

export default TempUserController;
