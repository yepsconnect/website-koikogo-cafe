import { Category } from "~/server/models/category.schema";

export default defineEventHandler(async (event) => {
  const { isAuth } = event.context;
  if (!isAuth) return;

  const id = event.context.params?._id;
  if (!id) return;

  // update category
  const { description, title, slug } = await readBody(event);

  const category = await Category.findByIdAndUpdate(
    id,
    {
      description,
      slug,
      title,
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
