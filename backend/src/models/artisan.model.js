import mongoose from "mongoose";

const artisanSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "ARTISAN"
  },
  otp: String,
  otpExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false
  }
});

export const Artisan = mongoose.model("Artisan", artisanSchema);