import { defineMongooseModel } from "#nuxt/mongoose";

export const Bakery = defineMongooseModel<Bakery>("Bakery", {
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  deliveryType: { type: String, required: true },
  pickupAddress: { type: String },
  city: { type: String },
  street: { type: String },
  house: { type: String },
  flat: { type: String },
  apartment: { type: String },
});