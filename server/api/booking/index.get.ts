import { Booking } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { from, to, page = 1, limit = 10, status } = getQuery(event);

  const dateFilter = {
    date: {
      $gte: from,
    },
  };

  if (to) {
    dateFilter.date.$lte = to;
  }

  if (status) {
    dateFilter.status = status;
  }

  const skip = (page - 1) * limit;

  const reservations = await Booking.find(dateFilter)
    .sort({ date: 1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalCount = await Booking.countDocuments(dateFilter);

  return {
    ok: true,
    reservations,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
});
