import { Category } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const list = await Category.find();

  return {
    ok: true,
    categories: list,
  };
});
