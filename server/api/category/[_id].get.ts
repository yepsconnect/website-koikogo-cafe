import { Category } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const id = event.context.params?._id;
  if (!id) return;

  const category = await Category.findById(id);

  return {
    ok: true,
    category,
  };
});
