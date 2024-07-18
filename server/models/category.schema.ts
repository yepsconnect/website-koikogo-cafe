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
});
