import { defineMongooseModel } from "#nuxt/mongoose";

export const Category = defineMongooseModel<Category>("Category", {
  description: { type: String },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});
