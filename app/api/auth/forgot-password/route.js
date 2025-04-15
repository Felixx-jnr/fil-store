import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateCode } from "@/lib/utils";
import { sendEmail } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response("User not found", { status: 404 });

  const code = generateCode();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.resetPasswordCode = code;
  user.resetPasswordExpiry = expiry;
  await user.save();

  await sendEmail(email, "Reset your password", `Your reset code is ${code}`);

  return Response.json({ message: "Reset code sent to email" });
}
