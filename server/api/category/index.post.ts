import { Category } from "~/server/models/category.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const { description, title, slug } = await readBody(event);

  const category = await Category.create({
    description,
    slug,
    title,
  });

  return {
    ok: true,
    message: "Категория создана",
    category,
  };
});
