import { Reservation } from "~/server/models/reservation.schema";

export default defineEventHandler(async (event) => {
  const { from, to } = getQuery(event);

  const items = await Reservation.find({
    date: {
      $gte: from,
      $lte: to,
    },
  }).select("from to status date _id tableId");

  return {
    ok: true,
    bookings: items,
  };
});
