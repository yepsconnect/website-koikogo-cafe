import { Bakery } from "~/server/models/index.schema";

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
  const { status, date } = await readBody(event);

  const updatedItem = await Bakery.findByIdAndUpdate(id, {
    status,
    date,
  });

  return {
    ok: true,
    bakery: updatedItem,
  };
});
