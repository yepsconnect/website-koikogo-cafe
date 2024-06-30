import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const id = event.context.params?._id;
  if (!id) return;

  const dish = await Dish.findById(id);

  return {
    ok: true,
    dish,
  };
});
