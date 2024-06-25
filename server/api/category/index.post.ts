import { Category } from "~/server/models/category.schema";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const { description, title } = await readBody(event);

  let slug;
  if (title["en"]) {
    slug = slugify(title["en"], { lower: true });
  } else {
    slug = slugify(title[Object.keys(title)[0]], {
      lower: true,
    });
  }

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
