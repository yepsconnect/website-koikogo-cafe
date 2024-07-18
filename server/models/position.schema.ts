import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

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
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: null },
  type: { type: String },
  isAvailable: { type: Boolean },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
