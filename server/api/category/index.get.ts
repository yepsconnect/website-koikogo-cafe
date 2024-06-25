import { Category } from "~/server/models/category.schema";

export default defineEventHandler(async (event) => {
  const categories = await Category.find();

  return {
    ok: true,
    categories,
  };
});
