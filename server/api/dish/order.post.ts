import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const { firstCategoryId, secondCategoryId } = await readBody(event);

  try {
    const firstDish = await Dish.findById(firstCategoryId);
    const secondDish = await Dish.findById(secondCategoryId);

    if (!firstDish || !secondDish) {
      return {
        ok: false,
        message: "Dishes not found",
      };
    }

    const orderOne = firstDish.order;
    const orderTwo = secondDish.order;

    firstDish.order = -1;
    await firstDish.save();

    secondDish.order = orderOne;
    firstDish.order = orderTwo;
    await secondDish.save();
    await firstDish.save();

    return {
      ok: true,
      message: "Order updated successfully",
    };
  } catch (e) {
    return {
      ok: false,
      message: "An error occurred while updating the order",
      error: e,
    };
  }
});
