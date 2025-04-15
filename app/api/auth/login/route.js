import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Check if password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return new Response(
        JSON.stringify({ message: "Please verify your email to continue." }),
        { status: 403 }
      );
    }

    // Sign token
    const token = signToken({ id: user._id, role: user.role });

    // Return token + basic user data
    return new Response(
      JSON.stringify({
        token,
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
