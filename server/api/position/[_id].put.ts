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

  const id = event.context.params?._id;
  if (!id) return;

  // update category
  const { position } = await readBody(event);

  const updatedPosition = await Position.findByIdAndUpdate(
    id,
    {
      ...position,
    },
    {
      new: true,
    }
  );

  return {
    ok: true,
    position: updatedPosition,
  };
});
