import { Position } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { isAuth, userRole } = event.context;
  if (!isAuth)
    return {
      ok: false,
      message: "Срок сессии истек",
    };
  if (userRole !== "root" && userRole !== "admin" && userRole !== "сhef")
    return {
      ok: false,
      message: "Недостаточно прав для выполнения операции",
    };

  const { firstCategoryId, secondCategoryId } = await readBody(event);

  try {
    const firstPosition = await Position.findById(firstCategoryId);
    const secondPosition = await Position.findById(secondCategoryId);

    if (!firstPosition || !secondPosition) {
      return {
        ok: false,
        message: "Positiones not found",
      };
    }

    const orderOne = firstPosition.order;
    const orderTwo = secondPosition.order;

    firstPosition.order = -1;
    await firstPosition.save();

    secondPosition.order = orderOne;
    firstPosition.order = orderTwo;
    await secondPosition.save();
    await firstPosition.save();

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
