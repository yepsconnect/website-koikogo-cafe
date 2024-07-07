import { Reservation } from "~/server/models/reservation.schema";

export default defineEventHandler(async (event) => {
  const { reservation } = await readBody(event);
  const item = await Reservation.create(reservation);
  return {
    ok: true,
    reservation: item,
    message: "Запись успешно создана",
  };
});
