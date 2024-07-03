import { Dish } from "~/server/models/dish.schema";

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
  // update category
  const { isAvailable, id } = await readBody(event);

  await Dish.findByIdAndUpdate(
    id,
    {
      isAvailable,
    },
    {
      new: true,
    }
  );
  const dishes = await Dish.find();

  return {
    ok: true,
    dishes,
  };
});
