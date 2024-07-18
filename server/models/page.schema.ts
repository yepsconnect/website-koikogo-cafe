import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

export const Page = defineMongooseModel<Page>("Page", {
  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  slug: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  positions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
});
