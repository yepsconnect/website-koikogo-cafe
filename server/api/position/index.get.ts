import { Position } from "~/server/models/position.schema";

export default defineEventHandler(async (event) => {
  const { pageId } = getQuery(event);

  try {
    // Query positions where pageId array contains the specified value
    const positions = await Position.find({
      pageId: { $in: ["66952c98a9159c7fc085a872"] },
    });

    // Return the positions found
    return {
      ok: true,
      positions,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error fetching positions:", error);
    return {
      ok: false,
      error: "Failed to fetch positions",
    };
  }
});
