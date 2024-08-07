// @/serve/api/menu.get.ts
import { Page } from "~/server/models/index.schema";

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);

  const page = await Page.findOne({
    slug,
  })
    .populate("categories")
    .populate({
      path: "positions",
      match: {
        isArchived: false,
        isAvailable: true,
      },
      options: {
        sort: { order: 1 },
      },
    });

  return page;
});
