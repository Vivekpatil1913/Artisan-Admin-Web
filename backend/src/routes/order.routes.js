import express from "express";
import {
  getOrders,
  getOrdersByStatus,
  updateOrderStatus
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/status/:status", getOrdersByStatus);
router.put("/:id", updateOrderStatus);

export default router;