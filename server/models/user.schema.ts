import { defineMongooseModel } from "#nuxt/mongoose";

export const User = defineMongooseModel<User>("User", {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true },
  role: {
    type: String,
    required: true,
    default: "guest",
    enum: ["root", "admin", "manager", "waiter", "guest"],
  },
});
