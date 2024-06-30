import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

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
    dish: updatedDish,
  };
});
