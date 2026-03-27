import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { generateOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../utils/email.js";

// 🔐 Generate Token
const generateToken = (admin) => {
  return jwt.sign(
    {
      userId: admin._id,
      role: admin.role,
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

// 📝 REGISTER (Super Admin with OTP)
export const registerAdmin = async (data) => {
  const { name, email, password } = data;

  const existing = await Admin.findOne({ email });
  if (existing) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔢 Generate OTP
  const otp = generateOTP();

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role: "superadmin",
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min
    isVerified: false,
  });

  // ✉️ Send OTP email
  await sendOTPEmail(email, otp);

  return admin;
};

// 🔑 LOGIN
export const loginAdmin = async (data) => {
  const { email, password } = data;

  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Invalid credentials");

  // ❗ Block login if not verified
  if (!admin.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(admin);

  return {
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    token,
  };
};