import { Booking } from "~/server/models/booking.schema";

export default defineEventHandler(async (event) => {
  const { reservation } = await readBody(event);
  const item = await Booking.create(reservation);
  return {
    ok: true,
    reservation: item,
    message: "Запись успешно создана",
  };
});
