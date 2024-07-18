import { Position } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const id = event.context.params?._id;
  if (!id) return;

  const position = await Position.findById(id);

  return {
    ok: true,
    position,
  };
});
