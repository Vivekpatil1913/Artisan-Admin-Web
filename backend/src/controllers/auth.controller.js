import * as authService from "../services/auth.service.js";
import { Admin } from "../models/admin.model.js"; // ✅ add this import

// REGISTER
export const register = async (req, res) => {
  try {
    const admin = await authService.registerAdmin(req.body);

    res.status(201).json({
      success: true,
      message: "Super Admin created. OTP sent to email", // updated msg
      data: admin,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const result = await authService.loginAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// ✅ VERIFY OTP (ADD THIS NEW API)
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (admin.otp !== otp || admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    admin.isVerified = true;
    admin.otp = null;
    admin.otpExpiry = null;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};