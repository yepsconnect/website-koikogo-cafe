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

  const { isAvailable, id } = await readBody(event);

  await Position.findByIdAndUpdate(
    id,
    {
      isAvailable,
    },
    {
      new: true,
    }
  );
  const positions = await Position.find();

  return {
    ok: true,
    positions,
  };
});
