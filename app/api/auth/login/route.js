import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    role: user.role,
    username: user.username,
    country: user.country,
    phone: user.phone,
    address: user.address,
    dob: user.dob,
  });

  // Set cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        country: user.country,
        phone: user.phone,
        address: user.address,
        dob: user.dob,
      },
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    }
  );
}
