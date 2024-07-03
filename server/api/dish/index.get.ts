import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { available } = getQuery(event);

  if (!!available) {
    const dishes = await Dish.find({ isAvailable: !!available });
    return {
      ok: true,
      dishes,
    };
  }
  const dishes = await Dish.find();
  return {
    ok: true,
    dishes,
  };
});
