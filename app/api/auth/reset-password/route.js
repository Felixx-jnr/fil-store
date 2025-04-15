import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, code, newPassword } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response("User not found", { status: 404 });

  if (
    user.resetPasswordCode !== code ||
    user.resetPasswordExpiry < new Date()
  ) {
    return new Response("Invalid or expired code", { status: 400 });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  user.resetPasswordCode = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  return Response.json({ message: "Password reset successfully" });
}
