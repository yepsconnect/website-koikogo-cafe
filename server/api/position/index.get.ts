import { Position } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { available } = getQuery(event);

  if (!!available) {
    const positions = await Position.find({ isAvailable: !!available });
    return {
      ok: true,
      positions,
    };
  }
  const positions = await Position.find();
  return {
    ok: true,
    positions,
  };
});
