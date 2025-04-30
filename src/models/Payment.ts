import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  rods: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
