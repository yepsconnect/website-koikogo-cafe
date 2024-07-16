import { Page } from "~/server/models/page.schema";
import { Category } from "~/server/models/category.schema";
import { Position } from "~/server/models/position.schema";

export default defineEventHandler(async (event) => {
  const { pageId } = getQuery(event);

  if (!pageId) {
    return {
      ok: false,
    };
  }

  const page = await Page.findById(pageId);

  const categories = await Category.find({ _id: { $in: page?.categories } });

  const positions = await Position.find({
    isArchived: false,
    isAvailable: true,
  });

  // Filter positions to only include those with the given pageId
  const filteredPositions = positions.filter((position) =>
    position.pageId.includes(pageId)
  );

  return {
    ok: true,
    categories,
    positions: filteredPositions,
  };
});
