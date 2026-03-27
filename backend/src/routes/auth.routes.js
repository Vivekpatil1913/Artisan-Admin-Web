import express from "express";
import { register, login, verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

// ✅ ADD/CONFIRM THESE
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

export default router;