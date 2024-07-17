import { defineMongooseModel } from "#nuxt/mongoose";

export const Booking = defineMongooseModel<Booking>("Booking", {
  tableId: { type: String },
  date: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  order: [
    {
      positionId: { type: String, required: true },
      quantity: { type: Number, required: true },
      priceAtOrder: { type: Number, required: true },
    },
  ],
  specialRequests: { type: String },
});
