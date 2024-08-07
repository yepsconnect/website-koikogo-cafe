import { Bakery } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { bakery } = await readBody(event);

  const newItem = await Bakery.create(bakery);

  return {
    ok: true,
    bakery: newItem,
    message: "Запись успешно создана",
  };
});
