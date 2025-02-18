import { connectToDatabase } from "../../../../../lib/mongodb";
import { authenticateToken } from "../../../../../utils/jwt"; 
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const user = authenticateToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const userData = await db.collection("users").findOne({ email: user.email }, { projection: { password: 0 } });

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    console.error("User Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
