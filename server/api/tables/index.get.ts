import { Table } from "~/server/models/table.schema";

export default defineEventHandler(async (event) => {

  const tables = await Table.find();

  return {
    ok: true,
    tables,
  };
});
