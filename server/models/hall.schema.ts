import { defineMongooseModel } from "#nuxt/mongoose";

export const Hall = defineMongooseModel<Hall>("Hall", {
  title: {
    ru: { type: String },
    en: { type: String },
  },
});
