import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const dishes = await Dish.find();

  return {
    ok: true,
    dishes,
  };
});
