import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Compare password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }

  // Sign token
  const token = signToken({ id: user._id, role: user.role });

  // Return response
  return Response.json({
    message: "Login successful",
    token,
    user: {
      email: user.email,
      role: user.role,
    },
  });
}
