import { defineMongooseModel } from "#nuxt/mongoose";

export const Table = defineMongooseModel<Table>("Table", {
  name: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
  capacity: { type: Number, required: true },
  hall: { type: String, required: true },
  order: { type: Number, required: true },
});
