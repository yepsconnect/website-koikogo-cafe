import { defineMongooseModel } from "#nuxt/mongoose";

interface Page {
  _id: string;
  title: {
    ru: string;
    en: string;
  };
  categories: [string];
}

export const Page = defineMongooseModel<Page>("Page", {
  title: {
    ru: { type: String },
    en: { type: String },
  },
  categories: [{ type: String }],
});
