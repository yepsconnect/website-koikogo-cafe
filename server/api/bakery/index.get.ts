import { Bakery } from "~/server/models/bakery.schema";

export default defineEventHandler(async (event) => {
  const items = await Bakery.find();

  return {
    ok: true,
    bakery: items,
  };
});
