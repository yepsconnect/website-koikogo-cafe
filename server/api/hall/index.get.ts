import { Hall } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const halls = await Hall.find();

  return {
    ok: true,
    halls,
  };
});
