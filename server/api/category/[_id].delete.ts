import { Category } from "~/server/models/category.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const id = event.context.params?._id;
  if (!id) return;

  const category = await Category.findByIdAndDelete(id);

  return {
    ok: true,
    category,
  };
});
