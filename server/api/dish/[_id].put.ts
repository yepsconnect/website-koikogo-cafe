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

  const id = event.context.params?._id;
  if (!id) return;

  // update category
  const { dish } = await readBody(event);

  const updatedDish = await Dish.findByIdAndUpdate(
    id,
    {
      ...dish,
    },
    {
      new: true,
    }
  );

  return {
    ok: true,
  };
});
