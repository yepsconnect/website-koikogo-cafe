import { defineMongooseModel } from "#nuxt/mongoose";

export const Category = defineMongooseModel<ICategory>("Category", {
  description: { type: String },
  title: { type: String, required: true },
});
