import * as authService from "../services/auth.service.js";
import { Admin } from "../models/admin.model.js";
import { Artisan } from "../models/artisan.model.js"; // ✅ ADD THIS
import jwt from "jsonwebtoken";

// 🔐 REGISTER (ADMIN + ARTISAN)
export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body); // ✅ FIX

    res.status(201).json({
      success: true,
      message: "User registered. OTP sent to email",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 🔑 LOGIN (OTP SEND)
export const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body); // ✅ FIX

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
      ...result, // ✅ KEEP
    });

  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// ✅ VERIFY OTP (ADMIN + ARTISAN)
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, role } = req.body; // ✅ GET ROLE

    let user;

    // ✅ CHECK BASED ON ROLE
    if (role === "ARTISAN") {
      user = await Artisan.findOne({ email });
    } else {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ✅ mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    // ✅ generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: role || user.role || "ARTISAN",
      },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "24h" }
    );

    // ✅ send response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: role || user.role || "ARTISAN",
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};