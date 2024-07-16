import { Page } from "~/server/models/page.schema";

export default defineEventHandler(async (event) => {
  const items = await Page.find();

  return {
    ok: true,
    pages: items,
  };
});
