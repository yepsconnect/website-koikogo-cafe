import { defineMongooseModel } from "#nuxt/mongoose";

export const Hall = defineMongooseModel<Hall>("Hall", {
  title: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
});
