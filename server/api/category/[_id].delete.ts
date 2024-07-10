import { Category } from "~/server/models/category.schema";
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

  const category = await Category.findById(id);
  if (!category) {
    return {
      ok: false,
      message: "Категория не найдена",
    };
  }

  const dish = await Dish.findOne({
    categoryId: category._id.toString(),
  });

  if (dish) {
    return {
      ok: false,
      message: "Вы не можете удалить категорию, у которой есть блюда",
    };
  }

  const data = await Category.findByIdAndDelete(id);

  return {
    ok: true,
    category: data,
  };
});
