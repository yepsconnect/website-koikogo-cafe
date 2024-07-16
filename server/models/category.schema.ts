import { defineMongooseModel } from "#nuxt/mongoose";

export const Category = defineMongooseModel<Category>("Category", {
  title: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
  description: {
    type: Map,
    of: String,
    default: {},
  },
  slug: { type: String, required: true, unique: true },
  order: { type: Number, required: true, unique: true },
});
