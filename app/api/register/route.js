// app/api/register/route.js
import { connectDB } from "@/lib/db";
import { registerUser } from "@/controllers/authController";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    const data = await registerUser(email, password);
    return Response.json(data);
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
}
