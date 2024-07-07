import { Reservation } from "~/server/models/reservation.schema";

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

  const { status } = await readBody(event);
  console.log(status);

  const updatedItem = await Reservation.findByIdAndUpdate(id, {
    status: status,
  });

  return {
    ok: true,
    reservation: updatedItem,
  };
});
