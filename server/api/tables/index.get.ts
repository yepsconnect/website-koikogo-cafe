import { Table } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const tables = await Table.find();

  return {
    ok: true,
    tables,
  };
});
