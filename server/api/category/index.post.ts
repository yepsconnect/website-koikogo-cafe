import { Category } from "~/server/models/index.schema";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const { isAuth, userRole } = event.context;
  if (!isAuth)
    return {
      ok: false,
      message: "Срок сессии истек",
    };
  if (userRole !== "root" && userRole !== "admin" && userRole !== "сhef")
    return {
      ok: false,
      message: "Недостаточно прав для выполнения операции",
    };

  const { category } = await readBody(event);

  let slug;
  if (category.title["en"]) {
    slug = slugify(category.title["en"], { lower: true });
  } else {
    slug = slugify(category.title[Object.keys(category.title)[0]], {
      lower: true,
    });
  }

  // нужно добавить порядковый номер категории
  const lastCategory = await Category.find().sort({ order: -1 }).limit(1);
  const order = lastCategory.length ? lastCategory[0].order + 1 : 1;

  const newCategory = await Category.create({
    ...category,
    slug,
    order,
  });

  return {
    ok: true,
    message: "Категория создана",
    category: newCategory,
  };
});
