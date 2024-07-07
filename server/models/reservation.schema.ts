import { defineMongooseModel } from "#nuxt/mongoose";

export const Reservation = defineMongooseModel<Reservation>(
  "Reservation",
  {
    tableId: { type: String, required: true },
    date: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);
