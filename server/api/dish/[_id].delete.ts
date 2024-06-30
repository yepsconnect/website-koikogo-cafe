import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const id = event.context.params?._id;
  if (!id) return;

  const dish = await Dish.findByIdAndDelete(id);

  return {
    ok: true,
    dish,
  };
});
