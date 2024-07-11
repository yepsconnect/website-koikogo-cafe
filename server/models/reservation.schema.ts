import mongoose from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";

const OrderItemSchema = new mongoose.Schema({
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true, default: "ordered" },
});

export const Reservation = defineMongooseModel(
  "Reservation",
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    waiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    status: { type: String, required: true, default: "pending" },
    orders: [OrderItemSchema],
  },
  {
    timestamps: true,
  }
);
