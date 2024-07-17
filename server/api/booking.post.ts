import { Booking } from "~/server/models/booking.schema";

export default defineEventHandler(async (event) => {
  const { booking } = await readBody(event);

  const newItem = await Booking.create(booking);

  return {
    ok: true,
    booking: newItem,
    message: "Запись успешно создана",
  };
});
