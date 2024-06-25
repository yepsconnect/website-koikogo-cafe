import { defineMongooseModel } from "#nuxt/mongoose";

export const User = defineMongooseModel<User>(
  "User",
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "guest",
      enum: ["root", "owner", "manager", "waiter", "guest"],
    },
  },
  {
    timestamps: true,
  }
);
