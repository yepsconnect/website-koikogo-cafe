import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

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

  return {
    ok: true,
    isAvailable,
  };
});
