import { defineMongooseModel } from "#nuxt/mongoose";

export const Category = defineMongooseModel<Category>("Category", {
  title: {
    ru: { type: String },
    en: { type: String },
  },
  slug: { type: String },
});
