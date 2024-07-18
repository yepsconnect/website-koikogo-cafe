import { Category } from "~/server/models/category.schema";

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
    const firstCategory = await Category.findById(firstCategoryId);
    const secondCategory = await Category.findById(secondCategoryId);

    if (!firstCategory || !secondCategory) {
      return {
        ok: false,
        message: "Categories not found",
      };
    }

    const orderOne = firstCategory.order;
    const orderTwo = secondCategory.order;

    firstCategory.order = -1;
    await firstCategory.save();

    secondCategory.order = orderOne;
    firstCategory.order = orderTwo;
    await secondCategory.save();
    await firstCategory.save();

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
