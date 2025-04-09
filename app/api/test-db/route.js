// app/api/test-db/route.js

import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return new Response("✅ DB connected successfully!", { status: 200 });
  } catch (error) {
    return new Response("❌ DB connection failed: " + error.message, {
      status: 500,
    });
  }
}
