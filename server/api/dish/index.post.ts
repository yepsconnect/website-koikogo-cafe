import { Dish } from "~/server/models/dish.schema";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const { dish } = await readBody(event);

  const { categoryId, name, description, unit, price, image } = dish;

  let slug;
  if (name["en"]) {
    slug = slugify(name["en"], { lower: true });
  } else {
    slug = slugify(name[Object.keys(name)[0]], {
      lower: true,
    });
  }

  const newDish = await Dish.create({
    categoryId,
    name,
    description,
    unit,
    price,
    image,
    slug,
  });

  return {
    ok: true,
    message: "Позиция создана",
    dish: newDish,
  };
});
