import { connectToDatabase } from "../../../../lib/mongodb";
import { unstable_cache } from "next/cache";

const getCachedPhotos = unstable_cache(
  async (query, skip, limit) => {
    const { db } = await connectToDatabase();
    const uniquePhotos = await db.collection("images")
      .aggregate([
        { $match: query },
        { $group: { _id: "$src", doc: { $first: "$$ROOT" } } }, 
        { $replaceRoot: { newRoot: "$doc" } }, 
        { $sort: { priority: -1, _id: 1 } },
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray();
    
    return uniquePhotos;
  },
  ["photos"],
  { revalidate: 60 }
);

const getCachedCategories = unstable_cache(
  async () => {
    const { db } = await connectToDatabase();
    return db.collection("images").distinct("category");
  },
  ["categories"],
  { revalidate: 60 }
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;
  const category = searchParams.get("category");

  try {
    const { db } = await connectToDatabase();
    const skip = (page - 1) * limit;
    const query = category && category !== "all" ? { category } : {};

    const [photos, categories, total] = await Promise.all([
      getCachedPhotos(query, skip, limit),
      getCachedCategories(),
      db.collection("images").countDocuments(query)
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        photos,
        categories,
        total,
        hasMore: skip + photos.length < total,
        currentPage: page
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
        }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
