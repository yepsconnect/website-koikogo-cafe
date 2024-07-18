import { Category } from "~/server/models/index.schema";

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

  const id = event.context.params?._id;
  if (!id) return;

  // update category
  const { description, title, page } = await readBody(event);

  const category = await Category.findByIdAndUpdate(
    id,
    {
      description,
      title,
      page,
    },
    {
      new: true,
    }
  );

  return {
    ok: true,
    category,
  };
});
