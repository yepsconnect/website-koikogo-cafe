import { Page } from "~/server/models/page.schema";

export default defineEventHandler(async (event) => {
  const { isAuth, userRole } = event.context;
  if (!isAuth)
    return {
      ok: false,
      message: "Срок сессии истек",
    };
  // if (userRole !== "root")
  //   return {
  //     ok: false,
  //     message: "Недостаточно прав для выполнения операции",
  //   };

  const id = event.context.params?._id;
  if (!id) return;

  // update category
  const { categories } = await readBody(event);

  const updatedItem = await Page.findByIdAndUpdate(
    id,
    {
      categories,
    },
    {
      new: true,
    }
  );

  return {
    ok: true,
    page: updatedItem,
  };
});
