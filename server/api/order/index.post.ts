import { Dish } from "~/server/models/dish.schema";

export default defineEventHandler(async (event) => {
  const { order } = await readBody(event);

  let totalPrice = 0;

  const dishes = await Dish.find({
    _id: { $in: order.map((item) => item._id) },
  });

  dishes.forEach((dish) => {
    totalPrice +=
      dish.price *
      order.find((x) => x._id.toString() === dish._id.toString()).count;
  });

  return {
    ok: true,
    totalPrice,
    dishes,
  };
});
