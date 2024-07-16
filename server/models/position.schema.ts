import { defineMongooseModel } from "#nuxt/mongoose";

export const Position = defineMongooseModel<Position>("Position", {
  categoryId: { type: String },
  pageId: [{ type: String, default: [] }],
  description: {
    ru: { type: String },
    en: { type: String },
  },
  image: { type: String, default: null },
  title: {
    ru: { type: String },
    en: { type: String },
  },
  price: { type: Number },
  unit: { type: String },
  order: { type: Number },
  isAvailable: { type: Boolean },
  isArchived: { type: Boolean },
  type: { type: String },
});
