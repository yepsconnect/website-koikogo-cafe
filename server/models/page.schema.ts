import { defineMongooseModel } from "#nuxt/mongoose";

export const Page = defineMongooseModel<Page>("Page", {
  name: { type: String, unique: true },
});
