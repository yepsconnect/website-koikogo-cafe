import { Booking } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { reservation } = await readBody(event);
  const item = await Booking.create(reservation);
  return {
    ok: true,
    reservation: item,
    message: "Запись успешно создана",
  };
});
