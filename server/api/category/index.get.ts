import { Category } from "~/server/models/category.schema";

export default defineEventHandler(async (event) => {
  const { page } = getQuery(event);

  if (page) {
    const categories = await Category.find({
      page,
    });
    return {
      ok: true,
      categories,
    };
  } else {
    const categories = await Category.find();
    return {
      ok: true,
      categories,
    };
  }
});
