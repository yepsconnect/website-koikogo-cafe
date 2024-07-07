import { Hall } from "~/server/models/hall.schema";

export default defineEventHandler(async (event) => {
  const halls = await Hall.find();

  return {
    ok: true,
    halls,
  };
});
