import { defineMongooseModel } from "#nuxt/mongoose";

export const Dish = defineMongooseModel<Dish>("Dish", {
  name: {
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
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: String, required: true },
  image: { type: String, default: null },
  slug: { type: String, required: true, unique: true },
  order: { type: Number, default: 0, unique: true },
});
