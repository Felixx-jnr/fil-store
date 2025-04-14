// app/api/auth/route.js
import { connectDB } from "@/lib/db";
import { loginUser } from "@/controllers/authController";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  try {
    const data = await loginUser(email, password);
    return Response.json(data);
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 401,
    });
  }
}
