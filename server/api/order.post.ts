import { Position } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { order } = await readBody(event);

  let totalPrice = 0;

  const positions = await Position.find({
    _id: { $in: order.map((item) => item._id) },
  });

  positions.forEach((position) => {
    totalPrice +=
      position.price *
      order.find((x) => x._id.toString() === position._id.toString()).count;
  });

  return {
    ok: true,
    totalPrice,
    positions,
  };
});
