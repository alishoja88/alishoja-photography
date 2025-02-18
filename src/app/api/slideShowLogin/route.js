import { connectToDatabase } from "../../../../lib/mongodb";

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();

    const photos = await db
      .collection("images")
      .find({ priority: { $in: [1, 2, 3] } })
      .toArray();

    
    const uniquePhotos = [];
    const seenSrcs = new Set();

    for (const photo of photos) {
      if (!seenSrcs.has(photo.src)) {
        seenSrcs.add(photo.src);
        uniquePhotos.push(photo);
      }
    }

    console.log("Total unique photos found:", uniquePhotos.length);

    return new Response(
      JSON.stringify({ success: true, photos: uniquePhotos }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching slideshow images:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch images" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
