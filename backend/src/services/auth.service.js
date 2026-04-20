import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { Artisan } from "../models/artisan.model.js";
import { generateOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../utils/email.js";

// 🔐 Generate Token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role || "ARTISAN",
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

// 📝 REGISTER (ADMIN + ARTISAN) ✅ FIXED
export const registerUser = async (data) => {
  const { name, email, password, role } = data;

  if (!role) throw new Error("Role is required");

  // 🔥 MAIN FIX → CHECK BOTH COLLECTIONS
  const existingAdmin = await Admin.findOne({ email });
  const existingArtisan = await Artisan.findOne({ email });

  if (existingAdmin || existingArtisan) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  let user;

  // ✅ ARTISAN REGISTER
  if (role === "ARTISAN") {
    user = await Artisan.create({
      name,
      email,
      password: hashedPassword,
      role: "ARTISAN",
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });
  } 
  // ✅ ADMIN REGISTER
  else {
    user = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });
  }

  await sendOTPEmail(email, otp);

  return user;
};

// 🔑 LOGIN (ROLE BASED + OTP)
export const loginUser = async (data) => {
  const { email, password, role } = data;

  if (!role) throw new Error("Role is required");

  let user;

  // ✅ FIND USER BASED ON ROLE
  if (role === "ARTISAN") {
    user = await Artisan.findOne({ email });
  } else {
    user = await Admin.findOne({ email });
  }

  if (!user) {
    throw new Error(`${role} not found with this email`);
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // 🔐 GENERATE OTP FOR LOGIN
  const otp = generateOTP();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendOTPEmail(user.email, otp);

  return {
    success: true,
    message: "OTP sent to email",
    email: user.email,
    role: user.role,
  };
};