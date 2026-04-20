import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  customer: String,
  products: [String],
  amount: Number,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Packed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);