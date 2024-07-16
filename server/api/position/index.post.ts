import { Position } from "~/server/models/position.schema";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  const { isAuth, userRole } = event.context;
  if (!isAuth)
    return {
      ok: false,
      message: "Срок сессии истек",
    };
  if (userRole !== "root")
    return {
      ok: false,
      message: "Недостаточно прав для выполнения операции",
    };

  const { position } = await readBody(event);

  const { categoryId, title, description, unit, price, image } = position;

  let slug;
  if (title["en"]) {
    slug = slugify(title["en"], { lower: true });
  } else {
    slug = slugify(title[Object.keys(title)[0]], {
      lower: true,
    });
  }

  const newPosition = await Position.create({
    categoryId,
    title,
    description,
    unit,
    price,
    image,
    slug,
  });

  return {
    ok: true,
    message: "Позиция создана",
    position: newPosition,
  };
});
