import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    amount:   { type: Number, required: [true, "Price amount is required"] },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP", "JPY", "PKR"],
      default: "INR",
    },
  },
  { _id: false, version: false },
);

export default priceSchema;