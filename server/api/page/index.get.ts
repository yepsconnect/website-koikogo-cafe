import { Page } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const items = await Page.find();

  return {
    ok: true,
    pages: items,
  };
});
