import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Category = defineMongooseModel<Category>("Category", {
  title: {
    ru: { type: String },
    en: { type: String },
  },
  slug: { type: String },
});

export const Position = defineMongooseModel("Position", {
  order: { type: Number },
  isArchived: { type: Boolean },
  title: {
    ru: { type: String, required: true },
    en: { type: String },
  },
  description: {
    ru: { type: String },
    en: { type: String },
  },
  unit: { type: String },
  price: { type: String, required: true },
  image: { type: String, default: null },
  type: { type: String },
  isAvailable: { type: Boolean },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const Page = defineMongooseModel<Page>("Page", {
  title: {
    ru: { type: String, required: true },
    en: { type: String },
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
  slug: { type: String, required: true },
});

export const Bakery = defineMongooseModel<Bakery>("Bakery", {
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  deliveryType: { type: String, required: true },
  pickupAddress: { type: String },
  city: { type: String },
  street: { type: String },
  house: { type: String },
  flat: { type: String },
  apartment: { type: String },
  status: { type: String, required: true, default: "new" },
});

export const Booking = defineMongooseModel<Booking>("Booking", {
  tableId: { type: String },
  date: { type: String, required: true },
  from: { type: String },
  to: { type: String },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  order: [
    {
      positionId: { type: String, required: true },
      quantity: { type: Number, required: true },
      priceAtOrder: { type: Number, required: true },
    },
  ],
  specialRequests: { type: String },
});
