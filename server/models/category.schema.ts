import { defineMongooseModel } from "#nuxt/mongoose";

export const Category = defineMongooseModel<Category>("Category", {
  description: {
    type: Map,
    of: String,
    default: {},
  },
  slug: { type: String, required: true, unique: true },
  title: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
  order: { type: Number, required: true, unique: true },
});
