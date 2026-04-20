import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "ARTISAN"], // ✅ UPDATED
      default: "ADMIN",
    },

    isActive: { type: Boolean, default: true },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);